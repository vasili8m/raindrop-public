import Api from '~api'

const cache = {}

async function getUrl(id, { q, sort='' }) {
    if (cache[id]) return cache[id]

    const collection = await Api.collection.get(id)
    if (!collection) return null

    const user = await Api.user.getById(collection.user?.$id)
    if (!user) return null

    return cache[id]=`https://raindrop.io/${user.name}/${collection.slug}-${collection._id}/${q ? 'search' : 'view'}/${new URLSearchParams({
        sort,
        ...(q ? {
            search: q
                .split(',')
                .map(part=>{
                    if (part.includes('word:'))
                        return part.replace('word:', '')

                    return part.includes(' ') ? `"${part.replace('tag:', '#')}"` : part.replace('tag:', '#')
                })
                .join(' ')
        } : {})
    })}`
}

export async function getServerSideProps({ params: { id }, query={}, res }) {
    const url = await getUrl(id, query)
    if (!url)
        return { notFound: true }

    res.statusCode = 308;
    res.setHeader('Location', url)
    res.end()

    return { props: {} }
}

export default function Oembed() {
    return null
}