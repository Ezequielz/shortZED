

export const TopMenuButtonSkeleton = () => {
  return (
    <button className="flex gap-2 justify-center items-center m-2 group rounded-md transition-all relative overflow-hidden px-5 py-2 text-sm font-medium animate-pulse">
      <div className="rounded-full h-8 w-8 bg-gray-200"></div>
      <div className="h-4 bg-gray-200 rounded w-28"></div>
    </button>
  )
}
