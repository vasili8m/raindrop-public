import s from './index.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Loading() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const routeChangeStart = () => setLoading(true)
        const routeChangeComplete = () => setLoading(false)
    
        router.events.on('routeChangeStart', routeChangeStart)
        router.events.on('routeChangeComplete', routeChangeComplete)
    
        return () => {
            router.events.off('routeChangeStart', routeChangeStart)
            router.events.off('routeChangeComplete', routeChangeComplete)
        }
    }, [setLoading])

    return (
        <figure className={s.loading} data-show={loading}>
            <figcaption className={s.indicator} />
        </figure>
    )
}