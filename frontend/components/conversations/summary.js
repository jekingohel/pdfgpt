"use client"
import { Send } from "lucide-react"
import ngn from "@/engine/Chat"
import { useParams } from "next/navigation"

export default function Summary({ summary, questions }) {
  const params = useParams()
  return (
    <div className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-accent text-gray-600">
      <p className="text-xs">{summary}</p>
      {questions.length > 0 && (
        <p className="text-sm font-medium leading-none mt-3">
          Example questions:
        </p>
      )}

      <div className="grid gap-0 mt-2">
        {questions?.map((question, index) => {
          return (
            <div
              key={index}
              className="-mx-2 flex items-start space-x-4 rounded-md p-1 transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <Send
                onClick={() =>
                  ngn.chat.question.add({ file_id: params.file, question })
                }
                className="shrink-0 w-4 h-4 relative top-1 cursor-pointer"
                color="blue"
              />
              <div className="space-y-1">
                <p className="text-xs">{question}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
