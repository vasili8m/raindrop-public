import { useRouter } from 'next/router'

import Button, { Buttons } from '~co/button'
import Icon from '~co/icon'

export default function RaindropsFilters() {
    const { query } = useRouter()

    return (
        <Buttons>
            <Button>
                <Icon name='folder' size='small' />
                Filter by Collections
            </Button>

            <Button
                href={{
                    pathname: '/[user_name]/search/[id]',
                    query
                }}
                prefetch={false}>
                <Icon name='hashtag' size='small' variant='' />
                Filter by Tags
            </Button>

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
        </Buttons>
    )
}