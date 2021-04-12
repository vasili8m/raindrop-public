import { useRouter } from 'next/router'

import Button from '~co/button'
import Icon from '~co/icon'
import Collections from './collections'
import { getChildrens } from '~co/collections/childrens'

export default function RaindropsFilters({ filters={}, collection={}, collections=[] }) {
    const { query } = useRouter()
    
    const show = [
        ...(getChildrens({ collection, collections }).length ? ['collections'] : []),
        ...(filters.tags?.length ? ['filters'] : []),
        ...(filters.important?.count ? ['important'] : []),
    ]

    if (!show.length)
        return null

    return (
        <>
            {show.includes('collections') && (
                <Collections
                    key={collection._id}
                    collection={collection}
                    collections={collections} />
            )}

            {show.includes('filters') && (
                <Button
                    href={{
                        pathname: '/[user_name]/search/[id]',
                        query
                    }}
                    prefetch={false}>
                    <Icon name='hashtag' size='small' variant='' />
                    Filter by Tags
                </Button>
            )}

            {show.includes('important') && (
                <Button
                    href={{
                        pathname: '/[user_name]/search/[id]/[options]',
                        query: {
                            ...query,
                            options: new URLSearchParams({ search: `important:1` }).toString()
                        }
                    }}
                    prefetch={false}>
                    <Icon name='heart-3' size='small' />
                    Favorites
                </Button>
            )}
        </>
    )
}