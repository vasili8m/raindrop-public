import { useMemo } from 'react'
import sortBy from 'lodash/sortBy'

export function useChildrens(items, collection) {
    return useMemo(()=>
        sortBy(
            items.filter(c=>c.parent?.$id == collection._id), 
            ['sort']
        ),
        items
    )
}