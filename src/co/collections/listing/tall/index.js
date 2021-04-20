import s from './index.module.css'
import { useMemo } from 'react'
import maxBy from 'lodash/maxBy'

export default function CollectionsListingTall({ children, items }) {
    const style = useMemo(()=>
        ({
            '--item-width': (maxBy(items, ({ title })=>title.length)?.title?.length || 0)+'ch'
        }),
        [items]
    )

    return (
        <div 
            className={s.tall}
            style={style}>
            {children}
        </div>
    )
}