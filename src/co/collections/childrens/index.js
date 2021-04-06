import s from './index.module.css'
import sortBy from 'lodash/sortBy'
import Item from './item'

export default function Childrens({ items=[] }) {
    if (!items?.length)
        return null

    return (
        <div className={s.childrens}>
            {sortBy(items, ['sort']).map(item=>(
                <Item 
                    key={item._id}
                    {...item} />
            ))}
        </div>
    )
}