import { API_ENDPOINT } from '~config/api'

//id or name
export async function get(id) {
    const res = await fetch(`${API_ENDPOINT}/user/${id}`)
    if (!res.ok)
        return null

    const { result, user } = await res.json()

    if (!result)
        return null

    return user
}