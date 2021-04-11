import s from './index.module.css'
import { useRouter } from 'next/router'
import { Image } from '~co/icon'
import Button from '~co/button'

export default function RaindropsSinglePath({ item, collections }) {
    const { query: { user_name, id } } = useRouter()

    if (!id ||
        item.collection?.$id == id)
        return null

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
            {!!parent.cover?.length && (
                <Image 
                    src={parent.cover[0]}
                    size='small' />
            )}

            {parent.title}
        </Button>
    )
}