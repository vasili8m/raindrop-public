import s from './index.module.css'
import Single from '../single'

export default function BookmarkListing({ items=[], view='list' }) {
    return (
        <div className={s.listing+' '+s[view]}>
            <div className={s.items}>
                {items.map(item=>(
                    <Single 
                        key={item._id}
                        view={view}
                        {...item} />
                ))}
            </div>
        </div>
    )
}