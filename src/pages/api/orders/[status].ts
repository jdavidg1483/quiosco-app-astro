import type { APIRoute } from "astro";

export const GET: APIRoute = async({params, request}) => {

    const data = new URL(request.url)
    const perPage = data.searchParams.get('per_page') || 100
 

    const url = `${import.meta.env.PUBLIC_SITE_URL}/wp-json/freshcoffee/v1/api/filter-orders?status=${params.status}&per_page=${perPage}`
    const res = await fetch(url)
    const json = await res.json()

    return new Response(
        JSON.stringify(json)
    )
}
