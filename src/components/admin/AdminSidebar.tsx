import {
  DocumentDuplicateIcon,
  NewspaperIcon
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Ordenes", href: "/admin/orders/pending", icon: NewspaperIcon, bgColor: 'bg-teal-400' },
  { name: "Productos", href: "/admin/products", icon: DocumentDuplicateIcon, bgColor: 'bg-indigo-400' }
];

export default function AdminSidebar() {

  const currentPath = location.pathname

  const isActive = (href: string) => {
    if(href === '/admin') return currentPath === '/admin'
    return currentPath.startsWith( href )
  }

  return (
    <nav className="flex flex-1 flex-col mt-10">
      <ul role="list" className="space-y-2 ">

          {
            navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`${isActive(item.href) ? 'bg-gray-200' : '' } hover:bg-gray-200 group flex items-center gap-x-3 rounded-md p-2 text-sm`}
                >
                  <item.icon className={`${item.bgColor} w-8 h-8 p-2 text-white rounded-lg `} />
                  {item.name}
                </a>
              </li>
            ))
          }
      </ul>
    </nav>
  )
}