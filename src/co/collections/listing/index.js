import { useMemo, useState, useCallback } from 'react'
import sortBy from 'lodash/sortBy'
import { useRouter } from 'next/router'

import Tall from './tall'
import Short from './short'
import Single from '../single'

export default function CollectionsListing({ items, short=false }) {
    const { query: { user_name } } = useRouter()

    //force tall
    const [ forceTall, setForceTall ] = useState(false)
    const onToggleTall = useCallback(()=>
        setForceTall(!forceTall),
        [forceTall, setForceTall]
    )

    const Component = short && !forceTall ? Short : Tall

    if (!items.length)
        return null

    return (
        <Component
            items={items}
            onToggleTall={onToggleTall}>
            {items.map(item=>(
                <Single 
                    key={item._id}
                    item={item}
                    href={`/${user_name}/${item.slug}-${item._id}`} />
            ))}
        </Component>
    )
}

export function Root({ items, ...etc }) {
    const filtered = useMemo(()=>
        sortBy(
            items.filter(({parent})=>{
                if (parent)
                    return !items.find(({_id})=>_id==parent.$id)

                return true
            }),
            ['title']
        ),
        items
    )

    return (
        <CollectionsListing
            {...etc}
            items={filtered} />
    )
}

export function Childrens({ collection, items, ...etc }) {
    const filtered = useMemo(()=>
        sortBy(
            items.filter(c=>c.parent?.$id == collection._id), 
            ['sort']
        ),
        items
    )

    return (
        <CollectionsListing
            {...etc}
            items={filtered} />
    )
}