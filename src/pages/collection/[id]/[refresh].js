import Api from '~api'

const cache = {}

async function getUrl(id, { q, sort='' }) {
    if (cache[id]) return cache[id]

    const collection = await Api.collection.get(id)
    if (!collection) return null

    const user = await Api.user.getById(collection.user?.$id)
    if (!user) return null

    return cache[id]=`/${user.name}/${collection.slug}-${collection._id}/${q ? 'search' : 'view'}/${new URLSearchParams({
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
    const destination = await getUrl(id, query)
    if (!destination)
        return { notFound: true }

    return {
        redirect: {
            destination
        }
    }
}

export default function CollectionRedirect() {
    return null
}