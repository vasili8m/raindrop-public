import { useRouter } from 'next/router'

export function useTagHref(tag) {
    const { query, pathname } = useRouter()
    const { search='' } = Object.fromEntries(new URLSearchParams(query.options))
    const val = tag.includes(' ') ? `"#${tag}"` : `#${tag}`

    if (search.includes(val))
        return {
            pathname,
            query
        }

    return {
        pathname: '/[user_name]/search/[id]/[options]',
        query: {
            ...query,
            options: new URLSearchParams({
                search: (search ? 
                    `${search.trim()} ${val}` :
                    val) + ' '
            }).toString()
        }
    }
}