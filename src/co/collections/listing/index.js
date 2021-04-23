import s from './index.module.css'
import Single from './single'

export default function CollectionsListing({ items, user }) {
    if (!items.length)
        return null

    return (
        <div className={s.listing}>
            {items.map(item=>(
                <Single 
                    key={item._id}
                    item={item}
                    href={`/${user.name}/${item.slug}-${item._id}`} />
            ))}
        </div>
    )
}