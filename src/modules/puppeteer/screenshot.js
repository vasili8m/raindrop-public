import chromium from 'chrome-aws-lambda'
import { PassThrough } from 'stream'
import { pause } from '~modules/async'

let _browser
async function newPage() {
    try{
        if (_browser){
            const page = await Promise.race([ _browser.newPage(), pause(1000) ])
            if (typeof page == 'object') return page
        }
    } catch(e) {}

    try{
        if (_browser)
            await Promise.race([ _browser.close(), pause(1000) ])
    } catch(e) {}
    finally { _browser = undefined }

    _browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: {
            ...chromium.defaultViewport,
            width: 1280,
            height: 900
        },
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true
    })

    return _browser.newPage()
}

export default async({ url, viewport })=>{
    let page = null

    try{
        page = await newPage()

        //viewport
        if (viewport)
            await page.setViewport(viewport)

        //no js
        await page.isJavaScriptEnabled(false)

        //load
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 15000
        })
        await pause(500)

        //generate screenshot
        const image = await page.screenshot({ type: 'png' })

        const stream = new PassThrough()
        stream.end(image)

        return stream
    } catch (e) {
        console.log(e)

        throw e
    } finally {
        try{await Promise.race([ page.close(), pause(1000) ])}catch(e){}
    }
}