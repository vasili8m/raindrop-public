import s from './index.module.css'
import sortBy from 'lodash/sortBy'
import Tag from './tag'
import { Buttons } from '~co/button'

export default function SearchTags({ tags }) {
    return (
        <Buttons className={s.tags}>
            {sortBy(tags, ['_id']).map(tag=>(
                <Tag 
                    key={tag._id}
                    {...tag} />
            ))}
        </Buttons>
    )
}