import PageContent from "./PageContent";

export const dynamicParams = true;

async function getData(fileId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/conversation/${fileId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

export async function generateStaticParams() {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/files/all`
  ).then((res) => res.json());

  return posts.map((post) => ({
    file: post.file_id,
  }));
}

export default async function Page({ params }) {
  const { file } = params;
  const file_details = await getData(file);

  return <PageContent params={params} data={file_details} />;
}
