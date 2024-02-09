"use client";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "../ui/tooltip";
import React from "react";
import { Nav } from "./nav";
import Image from "next/image";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  PenBox,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  MessageSquareText,
  UploadCloud,
  FileText,
} from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export default function HomePage({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          minSize={20}
          maxSize={20}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div className="flex flex-1 flex-col">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold flex gap-2">
                <FileText /> PDFGPT
              </h1>
            </div>
            <Separator className="mt-auto" />
            <h4 className="mb-1 mt-3 px-2 text-xs font-semibold text-gray-600">
              Chat with any PDF
            </h4>
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "A governance model.pdf",
                  icon: MessageSquareText,
                  variant: "default",
                },
                {
                  title: "A governance model.pdf",
                  icon: MessageSquareText,
                  variant: "ghost",
                },
              ]}
            />
            <div className="flex px-2 py-2 items-center justify-center w-full mt-1">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud
                    className="w-8 h-8 text-gray-500 dark:text-gray-400"
                    color="#6b7280"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Drop PDF Files</span>
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Upload your files and chat with multiple PDFs in one single
              conversation.
            </p>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">PDF File</h1>
          </div>
          <Separator className="mt-auto" />
          <object
            data="http://127.0.0.1:8000/uploads/bpCACbAo29_An1bwHoPW6bFavSLnuZK67FG_x2g_.pdf"
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              Alternative text - include a link{" "}
              <a href="http://127.0.0.1:8000/uploads/bpCACbAo29_An1bwHoPW6bFavSLnuZK67FG_x2g_.pdf">
                to the PDF!
              </a>
            </p>
          </object>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <div className="flex flex-1 flex-col h-full">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Chat</h1>
            </div>
            <Separator className="mt-auto" />
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm overflow-y-auto">
              <div className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-accent text-gray-600">
                <p className="text-xs">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>

                <p className="text-sm font-medium leading-none mt-3">
                  Example questions:
                </p>
                <div className="grid gap-0 mt-2">
                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-1 transition-all hover:bg-accent hover:text-accent-foreground">
                    <Send
                      className="shrink-0 w-4 h-4 relative top-1"
                      color="blue"
                    />
                    <div className="space-y-1">
                      <p className="text-xs">
                        What are the main ethical and regulatory concerns
                        surrounding the application of AI in health care?
                      </p>
                    </div>
                  </div>
                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-1 transition-all hover:bg-accent hover:text-accent-foreground">
                    <Send
                      className="shrink-0 w-4 h-4 relative top-1"
                      color="blue"
                    />
                    <div className="space-y-1">
                      <p className="text-xs">
                        How can biases, lack of transparency, privacy concerns,
                        and safety issues be addressed in the use of AI in
                        clinical settings?
                      </p>
                    </div>
                  </div>
                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-1 transition-all hover:bg-accent hover:text-accent-foreground">
                    <Send
                      className="shrink-0 w-4 h-4 relative top-1"
                      color="blue"
                    />
                    <div className="space-y-1">
                      <p className="text-xs">
                        What are the recommendations provided in this document
                        for the governance of AI in health care?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="messages"
                className="flex flex-col space-y-4 mt-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              >
                <div className="chat-message">
                  <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs order-1 items-end">
                      <div>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-black text-white ">
                          Your error message says permission denied, npm global
                          installs must be given root privileges.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chat-message">
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs order-2 items-start">
                      <div>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-accent text-gray-600">
                          Can be verified on any platform using docker
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="mt-auto" />
            <div className="p-4">
              <form>
                <div className="flex items-center space-x-2">
                  <Input placeholder={`Ask any question...`} />
                  <Button onClick={(e) => e.preventDefault()}>
                    <Send size={18} />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
