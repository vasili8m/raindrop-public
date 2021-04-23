import { Buttons } from '~co/button'
import Single from './single'

export default function CollectionsCompact({ items, user }) {
    return (
        <Buttons>
            {items.map(item=>(
                <Single
                    item={item}
                    user={user} />
            ))}
        </Buttons>
    )
}