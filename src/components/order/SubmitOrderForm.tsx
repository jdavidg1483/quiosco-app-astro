import { useState } from "react"
import { useOrderStore } from "@/stores/order"
import { actions, isActionError, isInputError } from "astro:actions"
import { navigate } from "astro:transitions/client"
import { toast } from "react-toastify"

export default function SubmitOrderForm() {
  const { order, clearOrder } = useOrderStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')?.toString() ?? ''

    try {
      const { data, error } = await actions.orders.createOrder({ name, order })

      if (isInputError(error)) {
        error.issues.forEach(issue => toast.error(issue.message))
        setIsSubmitting(false)
        return
      }

      if (isActionError(error)) {
        toast.error(error.message)
        setIsSubmitting(false)
        return
      }

      if (data) {
        toast.success("¡Orden creada con éxito!")
        
        // Limpia el estado local y cierra la sesión
        if (clearOrder) clearOrder()
        await actions.auth.signOut()
        form.reset()

        setTimeout(() => {
          navigate('/')
        }, 3000)
      }
    } catch (err) {
      toast.error("Ocurrió un error inesperado")
      setIsSubmitting(false)
    }
  }

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <label htmlFor="name" className="font-bold text-lg">Tu Nombre:</label>

        <input 
          type="text" 
          id="name"
          name="name"
          placeholder="Coloca tu Nombre"
          className="border border-gray-300 p-2 w-full rounded-xl"
          disabled={isSubmitting}
        />
      </div>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white w-full rounded-xl py-3 mt-5 text-lg font-bold uppercase cursor-pointer transition-colors"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Procesando..." : "Realizar Pedido"}
      </button>
    </form>
  )
}