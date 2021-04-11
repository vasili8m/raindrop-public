import s from './index.module.css'
import Single from '../single'

export default function RaindropsListing({ items=[], collection, collections, user }) {
    return (
        <div className={s.listing+' '+s[collection.view]}>
            <div className={s.items}>
                {items.map(item=>(
                    <Single 
                        key={item._id}
                        collection={collection}
                        collections={collections}
                        user={user}
                        item={item} />
                ))}
            </div>
        </div>
    )
}