import PageContent from "./PageContent"

async function getData(fileId) {
  const res = await fetch(`http://127.0.0.1:8000/conversation/${fileId}`)
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await res.json()
  return data
}

export default async function Page({ params }) {
  const file_details = await getData(params.file)
  
  return <PageContent params={params} data={file_details} />
}
