import { API_ENDPOINT } from '~config/api'

//id or name
export async function getById(id) {
    const res = await fetch(`${API_ENDPOINT}/user/${id}`)
    if (!res.ok)
        return null

    const { result, user } = await res.json()

    if (!result)
        return null

    return user
}

export async function getByName(name) {
    const res = await fetch(`${API_ENDPOINT}/user/name/${name}`)
    if (!res.ok)
        return null

    const { result, user } = await res.json()

    if (!result)
        return null

    return user
}