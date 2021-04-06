import s from './index.module.css'
import { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'

export default function Header({ children }) {
    const [pinned, setPinned] = useState(false)

    useEffect(()=>{
        const onScroll = debounce(function(e) {
            setPinned(window.scrollY ? true : false)
        }, 50, { leading: true, trailing: true })

        onScroll()

        window.addEventListener('scroll', onScroll)
        return ()=>window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header 
            className={s.header}
            data-pinned={pinned}>
            {children}

            <div className={s.shadow} />
        </header>
    )
}