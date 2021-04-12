import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function CollectionLegacy() {
    const router = useRouter()
    const { id, ...query } = router.query

    useEffect(()=>{
        if (typeof window == 'undefined') return
        if (!id) return
        window.location = `/collection/${id}/${new Date().getTime()}?${new URLSearchParams(query)}`
    }, [router.query])

    return null 
}