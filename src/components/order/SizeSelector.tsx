import { useState, useEffect } from 'react'
import { useOrderStore } from '@/stores/order'
import type { OrderItem } from '@/types'
import { Radio, RadioGroup } from '@headlessui/react'

const sizes = [
  { name: 'Pequeño' },
  { name: 'Mediano' },
  { name: 'Grande' },
]

type Props = {
  item: OrderItem
  onSizeChange?: (newSize: string) => void 
}

export default function SizeSelector({ item, onSizeChange }: Props) {
  // 1. Invocar correctamente el hook de Zustand
  const updateItemSize = useOrderStore((state) => state.updateItemSize)

  const initialSize = sizes.find(s => s.name === item.size) || sizes[0]
  const [selectedSize, setSelectedSize] = useState(initialSize)

  useEffect(() => {
    const matchedSize = sizes.find(s => s.name === item.size)
    if (matchedSize) {
      setSelectedSize(matchedSize)
    }
  }, [item.size])

  const handleChange = (newSize: typeof sizes[number]) => {
    setSelectedSize(newSize)
    
    // 2. Actualizar el store de Zustand con el nuevo tamaño
    updateItemSize(item, newSize.name)

    // Notificar opcionalmente al componente padre
    if (onSizeChange) {
      onSizeChange(newSize.name)
    }
  }

  return (
    <div>
      <RadioGroup
        value={selectedSize}
        onChange={handleChange}
        className="grid gap-4 lg:grid-cols-3"
      >
        {sizes.map((size) => (
          <Radio
            key={size.name}
            value={size}
            className={
              'cursor-pointer focus:outline-hidden flex items-center justify-center rounded-md border border-gray-600 bg-white px-3 py-3 text-sm font-medium text-gray-900 uppercase hover:bg-amber-500 hover:text-white hover:border-0 data-checked:border-transparent data-checked:bg-amber-500 data-checked:text-white data-checked:hover:bg-amber-600 data-focus:ring-2 data-focus:ring-amber-500 data-focus:ring-offset-2 sm:flex-1'
            }
          >
            {size.name}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  )
}