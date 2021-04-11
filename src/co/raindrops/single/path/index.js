import s from './index.module.css'
import { Image } from '~co/icon'
import Button from '~co/button'

export default function RaindropsSinglePath({ item, collection, collections, user }) {
    if (!collection ||
        item.collection?.$id == collection._id)
        return null

    const parent = (collections||[])
        .find(({_id})=>_id == item.collection?.$id)

    if (!parent)
        return null

    return (
        <Button 
            href={`/${user.name}/${parent.slug}-${parent._id}`}
            className={s.path}
            variant='flat' 
            size='small'
            prefetch={false}>
            {!!parent.cover?.length && (
                <Image 
                    src={parent.cover[0]}
                    size='small' />
            )}

            {parent.title}
        </Button>
    )
}