import s from './index.module.css'
import { useCallback, useState } from 'react'

import Button from '~co/button'
import Icon from '~co/icon'

export default function CollectionsListingShort({ children, items, onToggleTall }) {
    const [masked, setMasked] = useState(false)
    const bindRef = useCallback(r=>{
        if (r && r.scrollWidth > r.offsetWidth)
            setMasked(true)
    }, [setMasked])
    
    return (
        <div className={s.short}>
            <div 
                ref={bindRef}
                key={items.length}
                className={s.items+' '+(masked ? s.masked : '')}>
                {children}
            </div>

            {!!masked && (
                <div className={s.expand}>
                    <Button 
                        title='Show all collections'
                        className={s.expandButton}
                        size='large' 
                        variant='ghost'
                        onClick={onToggleTall}>
                        <Icon name='arrow-down-s' />
                    </Button>
                </div>
            )}
        </div>
    )
}