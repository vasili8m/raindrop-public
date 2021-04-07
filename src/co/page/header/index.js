import s from './index.module.css'
import { useState, useEffect } from 'react'

export default {
    Wrap: function({ children }) {
        const [pinned, setPinned] = useState(false)
    
        useEffect(()=>{
            let pinned = false
            const onScroll = function(e) {
                const changed = window.scrollY > 10

                if (pinned != changed){
                    pinned = changed
                    setPinned(changed)
                }
            }
    
            onScroll()
    
            window.addEventListener('scroll', onScroll)
            return ()=>window.removeEventListener('scroll', onScroll)
        }, [])
    
        return (
            <header 
                className={s.header}
                data-pinned={pinned}>
                <div className={s.inner}>
                    {children}
                </div>
            </header>
        )
    },

    Title: function({ children }) {
        return (
            <div className={s.title}>
                {children}
            </div>
        )
    },

    Buttons: function({ children }) {
        return (
            <div className={s.buttons}>
                {children}
            </div>
        )
    }
}