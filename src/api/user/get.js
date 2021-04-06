import { API_ENDPOINT } from '~config/api'

export async function get(id) {
    const res = await fetch(`${API_ENDPOINT}/user/${id}`)
    const { result, user } = await res.json()

    if (!result)
        return null

    return user
}