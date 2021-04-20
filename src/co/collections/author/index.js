import Button from '~co/button'
import { Avatar } from '~co/icon'
import Info from '~co/layout/info'
import Badge from '~co/badge'
import { ShortDate } from '~modules/format/date'

export default function CollectionAuthor({ collection, user, target }) {
    return (
        <>
            {!!collection.description && (
                <h2>{collection.description}</h2>
            )}
            
            <Info>
                <Button 
                    target={target}
                    href={`/${user.name}`}
                    variant='flat' 
                    size='small'>
                    {!!user.avatar && <Avatar src={user.avatar} alt={user.name} />}
                    
                    {user.name}

                    {!!user.pro && (
                        <Badge variant='disabled'>Pro</Badge>
                    )}
                </Button>

                <span>created <ShortDate date={collection.created} /></span>
            </Info>
        </>
    )
}