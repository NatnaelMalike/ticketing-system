import { Shield } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 p-4">
              <Shield className="h-12 w-12 text-red-500" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Unauthorized</h2>
          <p className="mt-4 text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    </div>
  )
}

