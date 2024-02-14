function Chat({ conversation, index }) {
  return (
    <div className="chat-message">
      <div
        className={`flex items-end ${
          conversation.role === "user" ? "justify-end" : ""
        }`}
      >
        <div
          className={`flex flex-col space-y-2 text-xs max-w-lg order-${index} ${
            conversation.role === "user" ? "items-start" : "items-end"
          }`}
        >
          <div>
            <span
              id="content"
              className={`px-4 py-2 rounded-lg inline-block rounded-br-none ${
                conversation.role === "user"
                  ? "bg-black text-white"
                  : "bg-accent text-gray-600"
              }`}
            >
              {conversation.content}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
