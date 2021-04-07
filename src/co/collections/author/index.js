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
                    href={`https://${user.name}.raindrop.io`}
                    variant='flat' 
                    size='small'>
                    <Avatar 
                        src="https://avatars.githubusercontent.com/u/1203812?v=4" />
                    
                    {user.name}

                    {!!user.pro && (
                        <Badge variant='disabled'>Pro</Badge>
                    )}
                </Button>

                {/*<span>{collection.count} bookmarks</span>*/}
                <span>created <ShortDate date={collection.created} /></span>
            </Info>
        </>
    )
}