import Api from '~api'

const base = {
    success: true,
    version: '1.0',
    type: 'rich',
    provider_name: 'Raindrop.io',
    provider_url: 'https://raindrop.io/',
    width: 500,
    height: 400
}

export function getHTML(user_name, { title, slug, _id }) {
    const url = `https://raindrop.io/${user_name}/${slug}-${_id}/embed`

    return (`<iframe 
        width="${base.width}" 
        height="${base.height}" 
        src="${url}" 
        title="${title}"
        frameborder="0"
        allowfullscreen><a href="${url}" target="_blank">${title}</a></iframe>`)
        .replace(/\s+/g, ' ')
}

export async function getServerSideProps({ params: { id, user_name }, res }) {
    const collection = await Api.collection.get(id)
    if (!collection)
        return {
            notFound: true
        }

    const json = {
        ...base,
        title: collection.title,
        author_name: user_name,
        author_url: `https://raindrop.io/${user_name}`,
        thumbnail_url: collection.cover?.length ? 
            collection.cover[0] : 
            `https://${process.env.VERCEL_URL}/icon_128.png`,
        thumbnail_width: 128,
        thumbnail_height: 128,
        cache_age: 3600
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.write(JSON.stringify({
        ...json,
        html: getHTML(user_name, collection)
    }, null, 4))
    res.end()

    return { props: {} }
}

export default function Oembed() {
    return null
}