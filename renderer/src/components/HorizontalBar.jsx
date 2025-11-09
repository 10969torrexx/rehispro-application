import { capitalizeFirst } from "@myTools";
export default function HorizontalBar({ title }) {
  return (
    <div className="p-4 w-full justify-between items-center flex">
      <h2 className="text-lg font-semibold text-left">{title}</h2>
      <h2 className="text-sm text-left">Login As: <strong>{capitalizeFirst(JSON.parse(localStorage.getItem('user'))?.role)}</strong></h2>
    </div>
  )
}
