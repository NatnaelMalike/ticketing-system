import { Home, TicketIcon, Users, Settings } from "lucide-react"

const sidebarItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Tickets", icon: TicketIcon, href: "/dashboard/tickets" },
  { name: "Users", icon: Users, href: "/dashboard/users" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function Sidebar() {

  return (
    <aside
      className={`fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75`}
    >
      <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 bg-white divide-y space-y-1">
            <ul className="space-y-2 pb-2">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <h3
                    className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                  >
                    <item.icon className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" />
                    <span className="ml-3">{item.name}</span>
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}

