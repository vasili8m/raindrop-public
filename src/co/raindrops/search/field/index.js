import s from './index.module.css'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Icon from '~co/icon'

export default function RaindropsSearchField() {
    const router = useRouter()
    const [value, setValue] = useState(()=>
        new URLSearchParams(router.query.options).get('search')
    )

    const onSubmit = useCallback(e=>{
        e.preventDefault()

        router.push({
            pathname: router.pathname.endsWith('[options]') ? router.pathname : `${router.pathname}/[options]`,
            query: {
                ...router.query,
                options: new URLSearchParams({ search: value }).toString()
            }
        })
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