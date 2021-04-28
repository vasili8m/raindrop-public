import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GOOGLE_ANALYTICS_ID } from '~config/vendors'

export function PageView() {
    const router = useRouter()

    useEffect(() => {
        const routeChangeComplete = url => 
            window.gtag('config', GOOGLE_ANALYTICS_ID, {
                page_location: url,
                page_title: document.title,
            })
    
        router.events.on('routeChangeComplete', routeChangeComplete)
        return () => router.events.off('routeChangeComplete', routeChangeComplete)
    }, [router])

    return null
}

export default function GA() {
    return (
        <>
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />
            <script
                dangerouslySetInnerHTML={{__html: `
                    window.dataLayer = window.dataLayer || []
                    window.gtag = function(){dataLayer.push(arguments);}
                    window.gtag('js', new Date())
                    window.gtag('config', '${GOOGLE_ANALYTICS_ID}');
                `}} />
        </>
    )
}