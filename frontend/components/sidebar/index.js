import SidebarContent from "./SidebarContent"

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/files/all")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await res.json()
  return data
}

export default async function Sidebar() {
  const files = await getData()

  return <SidebarContent navigations={files} />
}
