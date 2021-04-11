import s from './index.module.css'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Icon from '~co/icon'

export default function RaindropsSearchField({ query: { search=[], ...query }, collection, user }) {
    const router = useRouter()

    const [value, setValue] = useState(()=>
        search
            .map(({key, val})=>{
                switch(key) {
                    case 'word': return val
                    case 'tag': return `#${val}`
                    default: `${key}:${val}`
                }
            })
            .join(' ')
    )

    const onSubmit = useCallback(e=>{
        e.preventDefault()

        const path = `/${user.name}/${collection.slug}-${collection._id}/search`
        router.push(value ? 
            `${path}/${encodeURIComponent(value)}/${new URLSearchParams(query)}` :
            path)
    }, [value])
    
    return (
        <form 
            onSubmit={onSubmit}
            className={s.form}>
            <Icon 
                className={s.magnifier}
                name='search' />

            <input
                className={s.field}
                type='text'
                value={value}
                placeholder='Search'
                autoFocus
                onChange={e=>setValue(e.target.value)} />
        </form>
    )
}