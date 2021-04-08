import { API_ENDPOINT } from '~config/api'

export async function get(userId, options={}) {
    const params = new URLSearchParams(options)

    const res = await fetch(`${API_ENDPOINT}/collections/${userId}?${params.toString()}`)
    if (!res.ok)
        return []

    const { result, items } = await res.json()

    if (!result)
        return []

    return items
}