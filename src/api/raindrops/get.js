import { API_ENDPOINT } from '~config/api'

export async function get(id, options={}) {
    //query
    const params = new URLSearchParams(options)
    params.set('nested', true)

    if (!params.get('sort'))
        params.set('sort', '-created')

    if (typeof options.search == 'object')
        params.set('search', JSON.stringify(options.search))

    //request
    const res = await fetch(`${API_ENDPOINT}/raindrops/${id}?${params.toString()}`)
    if (!res.ok)
        return {
            items: [],
            count: 0
        }

    const { result, items, count=0 } = await res.json()

    if (!result)
        return {
            items: [],
            count: 0
        }

    return {
        items,
        count
    }
}