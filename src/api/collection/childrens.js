import { API_ENDPOINT } from '~config/api'

export async function childrens(userId, parentId) {
    if (typeof userId == 'undefined' ||
        typeof parentId == 'undefined')
        return null

    const res = await fetch(`${API_ENDPOINT}/collections/${userId}?parent=${parentId}`)
    const { result, items } = await res.json()

    if (!result)
        return []

    return items
}