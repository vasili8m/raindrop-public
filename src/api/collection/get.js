import { API_ENDPOINT } from '~config/api'

export async function get(id) {
    if (typeof id == 'undefined')
        return null

    const res = await fetch(`${API_ENDPOINT}/collection/${id}`)
    if (!res.ok)
        return null
        
    const { result, item } = await res.json()

    if (!result)
        return null

    return item
}