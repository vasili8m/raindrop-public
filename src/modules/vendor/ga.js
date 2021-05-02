import React, { useEffect } from 'react'
import { GOOGLE_ANALYTICS_ID } from '~config/vendors'

export function PageView() {
    useEffect(() => {
        window.dataLayer = window.dataLayer || []
        window.gtag = function(){dataLayer.push(arguments);}
        window.gtag('js', new Date())
        window.gtag('config', GOOGLE_ANALYTICS_ID);
    }, [])

    return null
}

export default function GA() {
    return (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />
    )
}