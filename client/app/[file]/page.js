import PageContent from "./PageContent"

export const dynamicParams = true

async function getData(fileId) {
  const res = await fetch(`http://127.0.0.1:8000/conversation/${fileId}`)
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await res.json()
  return data
}

export async function generateStaticParams() {
  const posts = await fetch("http://127.0.0.1:8000/files/all").then((res) =>
    res.json()
  )

  return posts.map((post) => ({
    file: post.file_id,
  }))
}

export default async function Page({ params }) {
  const { file } = params
  const file_details = await getData(file)

  return <PageContent params={params} data={file_details} />
}
