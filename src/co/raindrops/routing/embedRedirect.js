import { useEffect } from 'react'
import { useRouter } from 'next/router'

export function EmbedRedirect({ children }) {
    const router = useRouter()
    const inIframe = (typeof window != 'undefined' && window.self !== window.top)

    useEffect(()=>{
        if (inIframe)
            router.replace({
                pathname: `/[user_name]/embed/[id]/[options]`,
                query: {
                    ...router.query,
                    options: router.query.options || 'a=a'
                }
            })
    }, [router.asPath])

    return inIframe ? null : children
}