import * as collection from './collection'

export default async function oembed({ query: { url='' } }, res) {
    let json

    if (collection.validateURL(url))
        json = await collection.default(url)

    if (json)
        return res.json(json)

    res.status(404).end()
}