import { API_ENDPOINT } from '~config/api'

export async function get(id, options={}) {
    const params = new URLSearchParams(options)
    params.set('nested', true)

    if (!params.get('sort'))
        params.set('sort', '-created')

    const res = await fetch(`${API_ENDPOINT}/raindrops/${id}?${params.toString()}`)
    const { result, items, count=0 } = await res.json()

    if (!result)
        return []

    return {
        items,
        count
    }
}