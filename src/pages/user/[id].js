import Api from '~api'

const cache = {}

async function getUrl(id) {
    if (cache[id]) return cache[id]

    const user = await Api.user.getById(id)
    if (!user) return cache[id]=null

    return cache[id]=`https://raindrop.io/${user.name}`
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