import s from './index.module.css'
import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import Icon, { ActivityIndicator } from '~co/icon'
import Button from '~co/button'

export default function SearchField({ option='search' }) {
    const router = useRouter()
    const input = useRef(null)
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setValue(
            new URLSearchParams(router.query.options).get(option) || ''
        )
    }, [router.query.options])

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

    const onSubmit = useCallback(e=>{
        e.preventDefault()

        router.push({
            pathname: router.pathname.endsWith('[options]') ? router.pathname : `${router.pathname}/[options]`,
            query: {
                ...router.query,
                options: new URLSearchParams({ [option]: value }).toString()
            }
        })
    }, [value])

    const onFormClick = useCallback(e=>{
        input.current.focus()
    }, [input])

    const onResetClick = useCallback(e=>{
        e.preventDefault()
        setValue('')
        onSubmit(e)
    }, [setValue])
    
    return (
        <form 
            onSubmit={onSubmit}
            className={s.form}
            onClick={onFormClick}>
            {loading ? (
                <ActivityIndicator
                    className={s.magnifier}
                    color='accent' />
            ) : (
                <Icon 
                    className={s.magnifier}
                    name='search' />
            )}

            <input
                ref={input}
                className={s.field}
                type='text'
                value={value}
                placeholder='Search'
                autoFocus
                onChange={e=>setValue(e.target.value)} />

            {!!value && (
                <Button 
                    className={s.reset}
                    variant='flat'
                    onClick={onResetClick}>
                    <Icon name='close' />
                </Button>
            )}
        </form>
    )
}