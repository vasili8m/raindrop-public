import Api from '~api'

async function getUrl(id, { q, sort='' }, embed) {
    const collection = await Api.collection.get(id)
    if (!collection) return null

    const user = await Api.user.getById(collection.user?.$id)
    if (!user) return null

    return `/${user.name}/${collection.slug}-${collection._id}/${q ? 'search' : (embed ? 'embed' : 'view')}/${new URLSearchParams({
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

export async function getServerSideProps({ params: { id }, query={}, req, res }) {
    res.removeHeader('X-Frame-Options')

    if (isNaN(id))
        return { notFound: true }

    const destination = await getUrl(id, query, embed)
    if (!destination)
        return { notFound: true }

    return {
        redirect: {
            destination
        }
    }
}

export default function CollectionLegacy() {
    return null
}