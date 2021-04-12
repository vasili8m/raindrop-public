import { API_ENDPOINT } from '~config/api'

export async function get(id, options={}) {
    const params = new URLSearchParams(options)

    const res = await fetch(`${API_ENDPOINT}/filters/${id}?${params.toString()}`)
    if (!res.ok)
        return []

    const { result, ...items } = await res.json()

    if (!result)
        return []

    return items
}