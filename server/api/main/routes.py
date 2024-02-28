from flask import send_from_directory, request, jsonify, current_app
from werkzeug.utils import secure_filename

from . import main_blueprint
from .. import db
from .services import initialize_conversation_chain, add_message, get_pdf_text, allowed_file, save_file_data_to_db, get_pdf_file_content, generate_summary, generate_questions
from ..models import Conversation, UploadedFile
import os
import uuid
import json


@main_blueprint.route('/')
def index():
    return "This is an example app"

@main_blueprint.route('/add_message/<file_id>', methods=['POST'])
def add_message_route(file_id):
    data = request.json
    message = {'role': data['role'], 'content': data['content']}
    conversation = Conversation.query.filter_by(file_id=file_id).first()

    file_details = UploadedFile.query.filter_by(file_id=file_id).first()

    if not file_details:
        return jsonify({'error': 'Conversation not found for the given file_id'}), 404

    pdf_file_content = get_pdf_file_content(file_details.filename)

    chat_history = '{}'
    if conversation:
        chat_history = conversation.messages

    chain = initialize_conversation_chain(pdf_file_content, chat_history)
    answer = add_message(file_id, message, chain)

    return jsonify({'success': True, 'answer': answer})

@main_blueprint.route('/conversation/<file_id>')
def get_conversation(file_id):
    conversation = Conversation.query.filter_by(file_id=file_id).first()
    file_details = UploadedFile.query.filter_by(file_id=file_id).first()

    chat_histories = []

    if not file_details:
        return jsonify({'error': 'File details not found for the given file_id'}), 404
    
    if conversation:
        chat_histories = json.loads(conversation.messages)

    url = request.url_root.replace('http://', 'https://', 1)
    file_url = f"{url}uploads/{file_details.filename}"
    print(f"Constructed File URL: {file_url}")  # Add this line for debugging

    return jsonify({
        'file': os.path.join(current_app.config['UPLOAD_FOLDER'], file_details.filename),
        'file_url': file_url,
        'filename': file_details.filename,
        'summary': file_details.summary,
        'questions': json.loads(file_details.questions),
        'chat_history': chat_histories
    })

@main_blueprint.route('/files/all')
def get_all_files():
    try:
        # Query all files from the database
        files = UploadedFile.query.all()

        # Serialize the files to JSON
        serialized_files = [{
            'file_id': file.file_id,
            'filename': file.filename,
            # Add other fields as needed
        } for file in files]

        # Return the JSON response
        return jsonify(serialized_files)

    except Exception as e:
        # Handle any exceptions
        return jsonify({'error': str(e)}), 500
    

@main_blueprint.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'],filename)

@main_blueprint.route('/upload', methods=['POST'])
def upload():
    # Check if the POST request has files part
    if 'file' not in request.files:
        return jsonify({'error': 'No files part'}), 400

    files = request.files.getlist('file')

    # Check if the user submitted empty files
    if not files:
        return jsonify({'error': 'No selected files'}), 400

    file_info_list = []

    for file in files:
        # Check if the file has a valid PDF extension
        if allowed_file(file.filename):
            # Generate a unique file ID
            unique_id = str(uuid.uuid4())

            # Save the uploaded file to a secure location
            filename = secure_filename(file.filename)
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)

            # Extract text from the uploaded PDF file
            text = get_pdf_text(file)

            summary = generate_summary(text)
            questions = generate_questions(text)

            # Save file data to the database
            save_file_data_to_db(unique_id, filename, '', summary, questions)

            # Append file information to the list
            file_info_list.append({
                'filename': filename,
                'id': unique_id,
                'summary': summary,
                'questions': questions
            })
        else:
            return jsonify({'error': 'Invalid file type. Only PDF files are allowed.'}), 400

    # Return a success response with information about uploaded files
    return jsonify({'success': True, 'files': file_info_list})

