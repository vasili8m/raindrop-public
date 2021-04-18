import { useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Select } from '~co/button'
import Icon from '~co/icon'

export default function RaindropsSort({ options={} }) {
    const router = useRouter()

    const sort = options.sort
    const sorts = useMemo(()=>[
        { value: '-created', label: 'By date (from new)', dir: 'desc' },
        { value: 'created', label: 'By date (from old)', dir: 'asc' },
        { value: 'title', label: 'By name (A-Z)', dir: 'desc' },
        { value: '-title', label: 'By name (Z-A)', dir: 'asc' },
        ...options.search ? [{ value: 'score', label: 'By relevancy', dir: 'desc' }] : []
    ], [options])

    const onChange = useCallback(value=>{
        router.push({
            pathname: router.pathname.endsWith('[options]') ? router.pathname : `${router.pathname}/[options]`,
            query: {
                ...router.query,
                options: new URLSearchParams({
                    ...options,
                    sort: value
                }).toString()
            }
        })
    }, [])

    return (
        <Select 
            variant='ghost'
            selected={sort}
            options={sorts}
            onChange={onChange}>
            {({label, dir})=>(<>
                <Icon
                    name={`sort-${dir}`}
                    variant=''
                    size='small' />

                {label.replace(/\s\(.*\)/, '')}
            </>)}
        </Select>
    )
}