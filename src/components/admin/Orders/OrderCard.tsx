import { useState, useEffect } from "react";
import type { OrderContent } from "@/types";
import { formatCurrency } from "@/utils"; // ✅ Actualizado aquí
import { orderStatusOptions } from '@/utils/constants'
import { actions } from "astro:actions";
import { toast } from "react-toastify";
import type { KeyedMutator } from "swr";

type Props = {
    order: OrderContent;
    mutate: KeyedMutator<OrderContent[]>;
};

export default function OrderCard({ order, mutate }: Props) {
    // 1. Estado local sincronizado con la prop `order.status`
    const [status, setStatus] = useState(order.status || 'pending');

    // Sincronizar si order.status cambia desde SWR/Backend
    useEffect(() => {
        if (order.status) {
            setStatus(order.status);
        }
    }, [order.status]);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        const previousStatus = status;

        // 2. Feedback inmediato en la UI
        setStatus(newStatus);

        const { id } = order; 
        const { data, error } = await actions.orders.updateStatus({ status: newStatus, id });

        if (data && !error) {
            toast.success(data.message);
            mutate(); // Revalida los datos con SWR
        } else {
            // Revertir si ocurre un error
            setStatus(previousStatus);
            toast.error("No se pudo actualizar el estado de la orden");
        }
    };

    return (
        <div className="p-5 shadow-lg space-y-5 border border-gray-200">
            <div className="text-sm grid grid-cols-2 justify-between text-gray-600">
                <h2>ID Orden: <span className="font-black">{order.id}</span></h2>
                <p className="text-right">Cliente: {order.name}</p>
            </div>
            
            <div>
                Contenido: 
                <div dangerouslySetInnerHTML={{ __html: order.contents }}></div>
            </div>

            {/* ✅ Se utiliza la variable de estado local `status` */}
            <select 
                onChange={handleChange} 
                value={status} 
                className="border border-gray-300 w-full p-2 text-center"
            >
                {orderStatusOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                        {s.label}
                    </option>
                ))}
            </select>

            <p className="text-right text-lg">
                Total orden: 
                <span className="text-amber-400 font-black ml-2">
                    {formatCurrency(order.total)}
                </span>
            </p>
        </div>
    );
}