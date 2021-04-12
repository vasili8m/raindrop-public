import Button from '~co/button'
import { useRouter } from 'next/router'
import CollectionCover from '~co/collections/cover'

export default function ChildrenItem({ _id, title, slug, cover, variant }) {
    const router = useRouter()

    return (
        <Button 
            href={`/${router.query.user_name}/${slug}-${_id}`}
            variant={variant}>
            <CollectionCover
                cover={cover}
                title={title}
                size='small' />

            {title}
        </Button>
    )
}