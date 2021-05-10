import { useEffect } from 'react'
import { useRouter } from 'next/router'

export function EmbedRedirect({ children }) {
    const router = useRouter()
    const inIframe = (typeof window != 'undefined' && window.self !== window.top)

    useEffect(()=>{
        if (inIframe)
            router.replace({
                pathname: `/[user_name]/embed/me/[options]`,
                query: {
                    user_name: router.query.user_name,
                    options: router.query.options||''
                }
            })
    }, [router.asPath])

    return inIframe ? null : children
}