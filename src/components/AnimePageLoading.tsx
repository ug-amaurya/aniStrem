import BackButton from "./BackButton";

export default function AnimePageLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="mb-4 sm:mb-6">
        <BackButton />
      </div>

      {/* Hero Section Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-pulse">
        {/* Image Skeleton */}
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <div className="w-48 sm:w-56 md:w-64 lg:w-72 h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 min-w-0">
          <div className="h-8 sm:h-10 md:h-12 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 sm:h-5 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>

      {/* Season Label Skeleton */}
      <div className="mt-4 sm:mt-6 h-5 bg-gray-300 dark:bg-gray-700 rounded w-40"></div>

      {/* Episodes Section Skeleton */}
      <section className="mt-8 sm:mt-10">
        <div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4 sm:mb-6 w-32"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 dark:bg-gray-800 p-3 sm:p-4 rounded-lg"
            >
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-3 w-2/3"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Section Skeleton */}
      <section className="mt-8 sm:mt-10">
        <div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4 sm:mb-6 w-24"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 dark:bg-gray-800 p-4 sm:p-5 rounded-lg"
            >
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations Section Skeleton */}
      <section className="mt-8 sm:mt-10">
        <div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4 sm:mb-6 w-36"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="h-32 sm:h-36 md:h-40 bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-2 sm:p-3">
                <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section Skeleton */}
      <section className="mt-8 sm:mt-10">
        <div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4 sm:mb-6 w-20"></div>
        <div className="space-y-4 sm:space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 dark:bg-gray-800 p-4 sm:p-5 md:p-6 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
