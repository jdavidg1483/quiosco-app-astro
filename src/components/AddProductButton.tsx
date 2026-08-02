import type{ SelectedProduct } from '@/types'

type Props = {
    product: SelectedProduct
}
export default function AddProductButton({product} : Props) {
    const handleClick = () => {
        console.log(product)
    }
  return (
    <button
    
    type="button"
    className="bg-black hover:bg-amber-400 text-lg text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-xl"
    onClick={handleClick}
    >
  Agregar
    </button>
  )
}
