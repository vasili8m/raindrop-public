import sortBy from 'lodash/sortBy'
import Item from './item'

export function getChildrens({ collections, collection }) {
    return sortBy(
        collections.filter(c=>c.parent?.$id == collection._id), 
        ['sort']
    )
}

export default function Childrens({ collection={}, collections=[], variant }) {
    if (!collection ||
        !collection._id ||
        !collections.length)
        return null

    const childrens = getChildrens({ collections, collection })

    if (!childrens.length)
        return null

    return childrens.map(item=>(
        <Item 
            key={item._id}
            {...item}
            variant={variant} />
    ))
}