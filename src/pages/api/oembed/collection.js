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

const regex = /^\/(.+)\/(.+)-(\d+)/

export function validateURL(url) {
    const { pathname } = new URL(url)
    return regex.test(pathname)
}

export function getHTML({ user, collection }, options={}) {
    const { width, height, ...etc } = options

    const url = `https://raindrop.io/${user.name}/${collection.slug}-${collection._id}/embed`+(
        Object.keys(etc).length ? '?'+new URLSearchParams(etc) : ''
    )

    return (`<iframe 
        width="${width || base.width}" 
        height="${height || base.height}" 
        src="${url}" 
        title="${collection.title}"
        frameborder="0"
        allowfullscreen><a href="${url}" target="_blank">${collection.title}</a></iframe>`)
        .replace(/\s+/g, ' ')
}

export default async function getJSON(url) {
    const [ pathname, user_name, slug, id ] = new URL(url).pathname.match(regex)

    const [ collection, user ] = await Promise.all([
        Api.collection.get(id),
        Api.user.getByName(user_name),
    ])

    if (!collection || !user)
        return null

    if (user._id != collection.user?.$id)
        return null

    return {
        ...base,
        title: collection.title,
        author_name: user_name,
        author_url: `https://raindrop.io/${user_name}`,
        thumbnail_url: collection.cover?.length ? 
            collection.cover[0] : 
            `https://${process.env.VERCEL_URL}/icon_128.png`,
        thumbnail_width: 128,
        thumbnail_height: 128,
        cache_age: 3600,
        html: getHTML({ user, collection })
    }
}