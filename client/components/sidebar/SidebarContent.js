"use client";
import { FileBox, Loader, MessageSquareText, UploadCloud } from "lucide-react";
import { Nav } from "../nav";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import ngn from "@/engine/Files";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FilesAddFile, FilesSetData } from "@/provider/redux/FilesReducer";

export default function SidebarContent({ navigations = [] }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const data = useSelector((state) => state.Files?.collection);
  const navLinks = data?.map((file) => {
    return {
      title: file.filename,
      href: `/${file.file_id}`,
      variant: pathname === `/${file.file_id}` ? "default" : "ghost",
      icon: MessageSquareText,
    };
  });

  useEffect(() => {
    dispatch(FilesSetData(navigations));
  }, [dispatch, navigations]);

  const uploadFiles = (e) => {
    const { files } = e.target;
    ngn.files.uploadFiles(files);
  };

  ngn.files.addFile = function (file) {
    dispatch(FilesAddFile(file));
  };

  ngn.files.loader.showLoader = function () {
    setLoading(true);
  };

  ngn.files.loader.hideLoader = function () {
    setLoading(false);
  };
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">
          <Link href="/" className="flex gap-1">
            <FileBox /> <span>PDFGPT</span>
          </Link>
        </h1>
      </div>
      <Separator className="mt-auto" />
      {navigations.length > 0 && (
        <h4 className="mb-1 mt-3 px-2 text-xs font-semibold text-gray-600">
          Chat with any PDF
        </h4>
      )}
      <Nav links={navLinks} />
      <div className="flex px-2 py-2 items-center justify-center w-full mt-1">
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
            loading ? " " : "cursor-pointer"
          }`}
        >
          {loading ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud
                  className="w-8 h-8 text-gray-500 dark:text-gray-400"
                  color="#6b7280"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Drop PDF Files</span>
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                multiple
                className="hidden"
                onChange={uploadFiles}
              />
            </>
          )}
        </label>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Upload your files and chat with multiple PDFs in one single
        conversation.
      </p>
    </div>
  );
}
