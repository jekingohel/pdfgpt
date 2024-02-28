const UploadFiles = async function (files) {
  this.files.loader.showLoader();

  let formData = new FormData();
  Object.values(files)?.map((file) => {
    formData.append("file", file);
  });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const respones = await res.json();
    const data = respones?.files?.map((x) => {
      return { file_id: x?.id, filename: x?.filename };
    });

    if (respones) {
      this.files.addFile(data);
      this.files.loader.hideLoader();
    }
  } catch (error) {
    this.files.loader.hideLoader();
    throw new Error("Failed to fetch data");
  }
};
export default UploadFiles;
