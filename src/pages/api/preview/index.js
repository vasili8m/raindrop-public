import screenshot from '~modules/puppeteer/screenshot'
import links from '~config/links'

const routes = [
    {
        capture: /\/(?<username>.*)\/(?<slug>.*)-(?<id>\d+)/,
        embed: ({ username, slug, id })=>`/${username}/${slug}-${parseInt(id)}/embed`
    },
    {
        capture: /\/(?<username>.*)/,
        embed: ({ username })=>`/${username}/embed/me/no-header=true`
    }
]

export default async function oembed({ query }, res) {
    const { format='og' } = query

    let url

    if (query.url) {
        let pathname
        try{ pathname = new URL(query.url).pathname } catch(e) {}

        for(const { capture, embed } of routes)
            if (capture.test(pathname)){
                url = `${links.site.index}${embed(capture.exec(pathname).groups)}`
                break
            }
    }

    if (!url){
        res.status(400)
        res.write('Please provide correct `url`')
        res.end()
        return
    }

    const image = await screenshot({
        url,
        viewport: {
            ...(format == 'twitter' ? {
                width: 504,
                height: 263,
            } : {
                width: 602,
                height: 401,
            }),
            deviceScaleFactor: 2
        }
    })

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Cache-Control': 'public,max-age=3600,stale-while-revalidate=3600'
    })
    image.pipe(res)
}