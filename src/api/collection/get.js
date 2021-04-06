import { API_ENDPOINT } from '~config/api'

export async function get(id) {
    const res = await fetch(`${API_ENDPOINT}/collection/${id}`)
    const { result, item } = await res.json()

    if (!result)
        return null

    return item
}