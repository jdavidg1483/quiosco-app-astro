import type { SelectedProduct } from "@/types"

type Props = {
    product: SelectedProduct
}

export default function AddProductVariantProduct({product}: Props) {
     const handleClick = () => {
        console.log(product)
    }
  return (
     <button
    
    type="button"
    className="bg-black hover:bg-amber-400 text-lg text-white w-full  p-3 uppercase font-bold cursor-pointer rounded-xl leading-2"
    onClick={handleClick}
    >
     +
    </button>
  )
}
