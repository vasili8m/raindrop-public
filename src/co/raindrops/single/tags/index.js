import s from './index.module.css'
import Tag from './tag'

export default function RaindropsSingleTags({ tags }) {
    if (!tags.length)
        return null

    return (
        <div className={s.tags}>
            {tags.map(_id=>
                <Tag 
                    key={_id}
                    _id={_id} />
            )}
        </div>
    )
}