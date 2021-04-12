import { API_ENDPOINT } from '~config/api'
import { optionsToQueryString } from '~api/raindrops/get'

export async function get(id, options={}) {
    const res = await fetch(`${API_ENDPOINT}/filters/${id}?${optionsToQueryString(options)}`)
    if (!res.ok)
        return []

    const { result, ...items } = await res.json()

    if (!result)
        return []

    return items
}