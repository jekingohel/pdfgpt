from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory, ChatMessageHistory
from langchain.chains import ConversationalRetrievalChain
from langchain.schema import HumanMessage, AIMessage
from langchain.chat_models import ChatOpenAI
from ..models import Conversation
from .. import db
from PyPDF2 import PdfReader
from ..models import UploadedFile
from flask import current_app
import os
import json
from langchain.chains.summarize import load_summarize_chain
from langchain.docstore.document import Document
from langchain.text_splitter import CharacterTextSplitter
import openai

ALLOWED_EXTENSIONS = {'pdf'}

def serialize_message(message):
    return {
        'content': message['content'],
        'role': message['role']
    }

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    
def initialize_conversation_chain(text, chat_history):
    llm = ChatOpenAI()
    text_chunks = get_text_chunks(text)

    vectorstore = get_vectorstore(text_chunks)
    messages = json.loads(chat_history)
    
    history = ChatMessageHistory()
    for i, message in enumerate(messages):
        if message['role'] == 'user':
            history.add_user_message(message['content'])
        else:
            history.add_ai_message(message['content'])

    memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)

    memory.chat_memory = history

    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory,
    )

    return conversation_chain

def add_message(file_id, question, chain):
    
    response = chain({'question': question['content']});

    chat_history = response['chat_history']

    history = []
    for message in chat_history:
        role = None
        if isinstance(message, HumanMessage):
            role = 'user'
        elif isinstance(message, AIMessage):
            role = 'assistant'
        history.append({'content': message.content, 'role': role})

    serialized_chat_history = [serialize_message(message) for message in history]

    conversation = Conversation.query.filter_by(file_id=file_id).first()
    if not conversation:
        conversation = Conversation()
        conversation.file_id = file_id
        conversation.text = ""  # Set the text value
        conversation.messages = json.dumps(serialized_chat_history)  # Set the messages value
        db.session.add(conversation)
        db.session.commit()
    else:
        conversation.messages = json.dumps(serialized_chat_history)
        db.session.commit()

    return response['answer']

def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=2000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore

def get_pdf_text(pdf_file):
    # Initialize an empty string to store extracted text
    text = ""

    # Check if the provided file is a PDF
    if pdf_file and allowed_file(pdf_file.filename):
        pdf_reader = PdfReader(pdf_file)
        for page in pdf_reader.pages:
            text += page.extract_text()

    return text

def get_chat_histories():
    global chat_histories
    if not chat_histories:
        chat_histories = {}
    return chat_histories

def save_file_data_to_db(file_id, filename, text, summary, questions):
    # Create a new UploadedFile instance and add it to the database
    uploaded_file = UploadedFile(file_id=file_id, filename=filename, text=text, summary=summary, questions= json.dumps(questions))
    db.session.add(uploaded_file)
    db.session.commit()

def get_pdf_text_from_folder(file_path):
    # Check if the file exists
    if not os.path.exists(file_path):
        return None

    # Open the PDF file using PdfReader
    with open(file_path, 'rb') as pdf_file:
        pdf_reader = PdfReader(pdf_file)

        # Initialize an empty string to store extracted text
        text = ""

        # Iterate through each page and extract text
        for page in pdf_reader.pages:
            text += page.extract_text()

    return text

def get_pdf_file_content(filename):
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    text = get_pdf_text_from_folder(file_path)
    return text

def generate_summary(text):

    text_splitter = CharacterTextSplitter()
    texts = text_splitter.split_text(text)
    docs = [Document(page_content=t) for t in texts]
    
    llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo-1106")
    chain = load_summarize_chain(llm, chain_type="stuff")

    return chain.run(docs)

def extract_unique_questions(response):
    choices = response['choices']
    unique_questions = []

    for choice in choices:
        content = choice['message']['content']
        questions = [question.strip("1234567890. ") for question in content.split('\n') if question]
        unique_questions.extend(questions)

    return unique_questions

def generate_questions(prompt):
    
    # Specify the model and create a prompt message
    model = "gpt-3.5-turbo-1106"
    prompt_message = {"role": "user", "content": f"Use the following pieces of context to generate three questions. Don't try to make up an questions:\n{prompt}\n\n1. "}
    
    # Generate questions
    response = openai.ChatCompletion.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            prompt_message,
        ],
        max_tokens=200,
        n=1,  # Generate 3 questions
        stop=None,
        temperature=0.5,
    )
    
    unique_questions = extract_unique_questions(response)
    
    return unique_questions