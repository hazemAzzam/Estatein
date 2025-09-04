import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container>
      <div className="flex flex-col gap-8 py-8">
        {/* Header Skeleton */}
        <div className="flex flex-row items-center justify-between flex-wrap gap-5">
          <div className="flex flex-row items-center gap-4 flex-wrap">
            <div className="h-9 w-64 bg-gray-15 rounded animate-pulse"></div>
            <div className="h-10 w-48 bg-gray-15 rounded-lg animate-pulse"></div>
          </div>
          <div className="flex flex-col text-start gap-2">
            <div className="h-4 w-16 bg-gray-15 rounded animate-pulse"></div>
            <div className="h-8 w-32 bg-gray-15 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Gallery Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-15 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </Container>
  );
}
