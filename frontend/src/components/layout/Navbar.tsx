import { Bell, User } from "lucide-react"

export function Navbar() {

  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
          
            <a href="/" className="text-xl font-bold flex items-center lg:ml-2.5">
              <span className="self-center whitespace-nowrap">Dashboard</span>
            </a>
          </div>
          <div className="flex items-center">
            <button className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100">
              <span className="sr-only">View notifications</span>
              <Bell className="w-6 h-6" />
            </button>
            <button className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300">
              <span className="sr-only">Open user menu</span>
              <User className="w-8 h-8 rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

