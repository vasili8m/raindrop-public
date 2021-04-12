import s from './index.module.css'
import { useRouter } from 'next/router'
import CollectionCover from '~co/collections/cover'
import Button from '~co/button'

export default function RaindropsSinglePath({ item, collections }) {
    const { query: { user_name, id } } = useRouter()

    const parent = (collections||[])
        .find(({_id})=>_id == item.collection?.$id)

    if (!parent)
        return null

    return (
        <Button 
            href={`/${user_name}/${parent.slug}-${parent._id}`}
            className={s.path}
            variant='flat' 
            size='small'
            prefetch={false}>
            <CollectionCover 
                {...parent}
                size='small' />

            {parent.title}
        </Button>
    )
}