import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

type Props = {
  name: string
  id: number
}

export default function ProductMenu({name, id}: Props) {

  const handleClick = () => {

  }

  return (
    <Menu as="div" className="relative flex-none">
      <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
        <span className="sr-only">Open options</span>
        <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
      </MenuButton>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem>
          <a
            href={`/admin/products/${id}/edit`}
            className="block px-3 py-1 text-sm text-left text-indigo-500 data-focus:bg-gray-50 data-focus:outline-hidden"
          >
            Editar <span className="sr-only">, {name}</span>
          </a>
        </MenuItem>
        <MenuItem>
            <button 
              onClick={handleClick}
              type="button" 
              className="block px-3 py-1 text-sm text-left text-red-500 data-focus:bg-gray-50 data-focus:outline-hidden cursor-pointer"
            >Eliminar</button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}