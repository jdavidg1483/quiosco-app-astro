import type { APIRoute } from "astro";

export const GET: APIRoute = async({params}) => {

    const url = `${import.meta.env.PUBLIC_SITE_URL}/wp-json/freshcoffee/v1/api/filter-orders?status=${params.status}`
    const res = await fetch(url)
    const json = await res.json()
    return new Response(
        JSON.stringify(json)
    )
}
