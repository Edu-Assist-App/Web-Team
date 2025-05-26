export default function ShimmerCard() {
  return (
    <div className="min-w-[calc(50%-8px)] sm:min-w-[calc(50%-8px)] md:min-w-[calc(33.333%-16px)] lg:min-w-[calc(25%-16px)] snap-start">
      <div className="relative overflow-hidden border border-gray-200 h-full rounded-xl animate-pulse bg-white">
        <div className="absolute top-2 left-2 rounded-full">
          <div className="h-6 w-24 bg-gray-200 rounded-md" />
        </div>
        <div className="p-6 pt-10 flex flex-col items-center text-center h-full">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full" />
          </div>
          <div className="h-5 w-3/4 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />
          <div className="h-9 w-24 bg-gray-300 rounded-full mt-auto" />
        </div>
      </div>
    </div>
  );
}
