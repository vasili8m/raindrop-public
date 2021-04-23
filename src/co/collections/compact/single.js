import Button from '~co/button'
import Cover from '../cover'

export default function CollectionsCompactSingle({ item, user }) {
    return (
        <Button
            href={`/${user.name}/${item.slug}-${item._id}`}>
            <Cover 
                {...item} 
                size='small' />

            {item.title}
        </Button>
    )
}