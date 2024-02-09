"use client"
import { useEffect, useRef, useState } from "react"
import Chat from "./chat"
import Summary from "./summary"
import { ConversationsAddMessage } from "@/provider/redux/ConversationReducer"
import { useDispatch } from "react-redux"

export default function Conversations({ file_details, loading, ngn }) {
  const messagesRef = useRef(null)
  const dispatch = useDispatch()
  const [typingText, setTypingText] = useState("")

  useEffect(() => {
    if (messagesRef.current) {
      const lastMessage = messagesRef.current.lastChild

      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [file_details])

  const startTypingEffect = (txt) => {
    var i = 0
    var speed = 10 /* The speed/duration of the effect in milliseconds */
    const lastMessage = messagesRef.current.lastChild

    const typeWriter = () => {
      if (i < txt.length) {
        setTypingText((prevText) => prevText + txt.charAt(i))
        i++
        setTimeout(typeWriter, speed)
        lastMessage.scrollIntoView({ behavior: "smooth" })
      }
    }

    typeWriter()
  }

  ngn.question.AddMessage = function (message) {
    dispatch(ConversationsAddMessage(message))

    if (messagesRef.current) {
      const lastMessage = messagesRef.current.lastChild
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth" })
        message?.role === "assistant" && startTypingEffect(message?.content)
      }
    }
  }

  return (
    <div className="flex-1 whitespace-pre-wrap p-4 text-sm overflow-y-auto">
      {file_details?.summary && file_details?.questions && (
        <Summary
          summary={file_details?.summary}
          questions={file_details?.questions}
        />
      )}
      <div
        id="messages"
        className="flex flex-col space-y-4 mt-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        ref={messagesRef}
      >
        {file_details?.chat_history?.map((history, index) => {
          const lastItem = file_details?.chat_history.length - 1 === index
          if (lastItem && typingText) {
            return (
              <Chat
                key={index}
                conversation={{ content: typingText, role: history?.role }}
                index={index}
              />
            )
          } else {
            return <Chat key={index} conversation={history} index={index} />
          }
        })}
        {loading && (
          <Chat conversation={{ content: "Typing...", role: "assistant" }} />
        )}
      </div>
    </div>
  )
}
