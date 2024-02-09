export default function PDFViewer({ file_url }) {
  return (
    <object data={file_url} type="application/pdf" width="100%" height="100%">
      <p>
        Alternative text - include a link <a href={file_url}>to the PDF!</a>
      </p>
    </object>
  );
}
