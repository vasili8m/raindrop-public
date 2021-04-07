import s from './index.module.css'
import { Image } from '~co/icon'

export default function RaindropsSinglePath({ item, collection, collections }) {
    if (!collection ||
        item.collection?.$id == collection._id)
        return null

    const parent = (collections||[])
        .find(({_id})=>_id == item.collection?.$id)

    if (!parent)
        return null

    return (
        <a 
            href={`/${parent.slug}-${parent._id}`}
            className={s.path}>
            {!!parent.cover?.length && (
                <Image 
                    src={parent.cover[0]}
                    size='small' />
            )}

            {parent.title}
        </a>
    )
}