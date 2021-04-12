import Api from '~api'

const cache = {}

async function getUrl(id) {
    if (cache[id]) return cache[id]

    const collection = await Api.collection.get(id)
    if (!collection) return null

    const user = await Api.user.getById(collection.user?.$id)
    if (!user) return null

    return cache[id]=`https://raindrop.io/${user.name}/${collection.slug}-${collection._id}`
}

export async function getServerSideProps({ params: { id }, res }) {
    const url = await getUrl(id)
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