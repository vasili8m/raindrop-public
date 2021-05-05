import { API_ENDPOINT } from '~config/api'
import { FetchError } from '../errors'

export function optionsToQueryString(options={}) {
    const params = new URLSearchParams(options)
    params.set('version', 2)

    //nested
    if (params.get('nested') === 'false')
        params.delete('nested')
    else
        params.set('nested', true)

    //search
    if (params.get('search')){
        let search = []
        
        const rules = [
            { regex: /("#)([^#]*?)"/gmi, override_key: 'tag' },
            { regex: /(#)([^\s#]*)/gmi, override_key: 'tag' }, //if space /(#)([^\s#]*)/gmi
            { regex: /([\w.]+):([a-z0-9-]+)/gmi },
        ]

        let clean = String(params.get('search')).trim()

        //rules
        for(const { regex, override_key='' } of rules){
            let match

            while ((match = regex.exec(clean)) !== null) {
                const [_, key, val] = match
                
                if (val)
                    search.push({ key: override_key||key, val })
            }
            
            clean = clean.replace(regex, '')
        }

        if (clean.trim())
            search.push({ key: 'word', val: clean.trim() })

        params.delete('search')
        params.set('search', JSON.stringify(search))
    }

    return params.toString()
} 

export async function get(id, options={}) {
    const res = await fetch(`${API_ENDPOINT}/raindrops/${id}?${optionsToQueryString(options)}`)
    if (!res.ok)
        throw new FetchError(res.status, res.statusText)

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