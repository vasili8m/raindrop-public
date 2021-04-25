import { useRouter } from 'next/router'

export function useFilterHref(filter) {
    const { query, pathname } = useRouter()
    const { search='' } = Object.fromEntries(new URLSearchParams(query.options))

    let val = filter.includes(' ') ? `"${filter}"` : filter

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