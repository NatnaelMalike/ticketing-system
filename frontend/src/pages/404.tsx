import { Search, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-blue-100 p-4">
              <Search className="h-12 w-12 text-blue-500" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Page Not Found
          </h2>
       
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
