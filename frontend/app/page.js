import Image from "next/image";

export default function Home() {
  return (
    <div
      className="flex w-full data-[panel-group-direction=vertical]:flex-col h-full item-center justify-center basis-0 shrink-0 overflow-hidden"
      style={{ flexGrow: 80 }}
    >
      <div className="flex flex-col item-center h-full justify-center relative">
        <div style={{ width: "300px", height: "300px", position: "relative" }}>
          <Image
            alt="404"
            src="/File-Upload.png"
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <p
          className="text-muted-foreground text-center font-semibold"
          style={{ width: 300 }}
        >
          Upload your files or Select file and chat with multiple PDFs in one
          single conversation.
        </p>
      </div>
    </div>
  );
}
