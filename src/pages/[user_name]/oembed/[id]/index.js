import Api from '~api'

export function getHTML(json) {
    return `<iframe width="${json.width}" height="${json.height}" src="${json.author_url}/design-66/embed" title="${json.title}" frameborder="0" allowfullscreen></iframe>`
}

export async function getServerSideProps({ params: { id, user_name }, res }) {
    const collection = await Api.collection.get(id)
    if (!collection)
        return {
            notFound: true
        }

    const json = {
        version: '1.0',
        type: 'rich',
        provider_name: 'Raindrop.io',
        provider_url: 'https://raindrop.io/',
        width: 500,
        height: 400,
        title: collection.title,
        author_name: user_name,
        author_url: `https://raindrop.io/${user_name}`,
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.write(JSON.stringify({
        ...json,
        html: getHTML(json)
    }, null, 4))
    res.end()

    return { props: {} }
}

export default function Oembed() {
    return null
}