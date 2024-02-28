import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import Sidebar from "@/components/sidebar";
import ReduxProvider from "@/provider/redux/ReduxProvider";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PDFGPT",
  description:
    "Upload your files and chat with multiple PDFs in one single conversation.",
};

export default async function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <div className="flex w-full data-[panel-group-direction=vertical]:flex-col h-full items-stretch">
            <div
              className="basis-0 shrink-0 overflow-hidden"
              style={{ flexGrow: 20 }}
            >
              <Sidebar />
            </div>
            <div className="relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90"></div>
            {children}
          </div>
        </body>
      </html>
    </ReduxProvider>
  );
}
