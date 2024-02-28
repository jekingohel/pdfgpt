import SidebarContent from "./SidebarContent";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/files/all`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

export default async function Sidebar() {
  const files = await getData();

  return <SidebarContent navigations={files} />;
}
