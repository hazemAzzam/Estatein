import Link from "next/link";
import { Home, Search } from "lucide-react";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <div className="text-6xl font-bold text-gray-60">404</div>
        <h1 className="text-3xl font-bold">Property Not Found</h1>
        <p className="text-gray-60 max-w-md">
          Sorry, the property you&apos;re looking for doesn&apos;t exist or has
          been removed.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-gray-15 border border-gray-20 rounded-lg hover:bg-gray-20 transition-colors"
          >
            <Home size={20} />
            Go Home
          </Link>
          <Link
            href="/properties"
            className="flex items-center gap-2 px-6 py-3 bg-purple-60 text-white rounded-lg hover:bg-purple-65 transition-colors"
          >
            <Search size={20} />
            Browse Properties
          </Link>
        </div>
      </div>
    </Container>
  );
}
