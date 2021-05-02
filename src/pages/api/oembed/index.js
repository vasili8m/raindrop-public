import * as collection from './collection'
import * as user from './user'

const providers = [
    collection,
    user
]

export default async function oembed({ query: { url='' } }, res) {
    let json

    for(const provider of providers){
        let valid = false

        try{ valid = provider.validateURL(url) } catch(e) {}

        if (valid){
            json = await provider.default(url)
            break
        }
    }

    if (json){
        res.setHeader('Cache-Control', 'public,max-age=3600,stale-while-revalidate=3600')
        return res.json(json)
    }

    res.status(400)
    res.write('Please provide correct `url`')
    res.end()
}