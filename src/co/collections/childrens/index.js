import s from './index.module.css'
import sortBy from 'lodash/sortBy'
import Item from './item'

export default function Childrens({ collection={}, collections=[] }) {
    if (!collection ||
        !collection._id ||
        !collections.length)
        return null

    const childrens = sortBy(
        collections.filter(c=>c.parent?.$id == collection._id), 
        ['sort']
    )

    if (!childrens.length)
        return null

    return (
        <div className={s.childrens}>
            <div className={s.items}>
                {childrens.map(item=>(
                    <Item 
                        key={item._id}
                        {...item} />
                ))}
            </div>
        </div>
    )
}