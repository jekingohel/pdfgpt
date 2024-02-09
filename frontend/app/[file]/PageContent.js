"use client"
import Conversations from "@/components/conversations"
import SubmitQuestion from "@/components/conversations/submit-question"
import PDFViewer from "@/components/pdfviewer"
import { Separator } from "@/components/ui/separator"
import { ConversationsSetData } from "@/provider/redux/ConversationReducer"
import { Suspense, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ngn from "@/engine/Chat"

export default function PageContent({ data, params }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const file_details = useSelector((state) => state?.Conversations)

  useEffect(() => {
    dispatch(ConversationsSetData(data))
  }, [dispatch, data])

  ngn.chat.question.loader.showLoader = function () {
    setLoading(true)
  }

  ngn.chat.question.loader.hideLoader = function () {
    setLoading(false)
  }

  return (
    <Suspense fallback={<p>Loading feed...</p>} key={params}>
      <div
        className="flex w-full data-[panel-group-direction=vertical]:flex-col h-full items-stretch basis-0 shrink-0 overflow-hidden"
        style={{ flexGrow: 80 }}
      >
        <div
          className="grow-40 basis-0 shrink-0 overflow-hidden"
          style={{ flexGrow: 40 }}
        >
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">{file_details?.filename}</h1>
          </div>
          <Separator className="mt-auto" />
          <PDFViewer file_url={file_details?.file_url} />
        </div>
        <div className="relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90"></div>
        <div
          className="grow-40 basis-0 shrink-0 overflow-hidden"
          style={{ flexGrow: 40 }}
        >
          <div className="flex flex-1 flex-col h-full">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Chat</h1>
            </div>
            <Separator className="mt-auto" />
            <Conversations
              file_details={file_details}
              loading={loading}
              ngn={ngn.chat}
            />
            <Separator className="mt-auto" />
            <SubmitQuestion loading={loading} ngn={ngn.chat} />
          </div>
        </div>
      </div>
    </Suspense>
  )
}
