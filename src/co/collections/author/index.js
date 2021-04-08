import Button from '~co/button'
import { Avatar } from '~co/icon'
import Info from '~co/helpers/info'
import Badge from '~co/helpers/badge'
import { ShortDate } from '~modules/format/date'

export default function CollectionAuthor({ collection, user }) {
    return (
        <>
            {!!collection.description && (
                <h2>{collection.description}</h2>
            )}
            
            <Info>
                <Button 
                    href='/'
                    variant='flat' 
                    size='small'>
                    {!!user.avatar && <Avatar src={user.avatar} alt={user.name} />}
                    
                    {user.name}

                    {!!user.pro && (
                        <Badge variant='disabled'>Pro</Badge>
                    )}
                </Button>

                {/*<span>{collection.count} bookmarks</span>*/}
                <span>updated <ShortDate date={collection.lastAction} /></span>
            </Info>
        </>
    )
}