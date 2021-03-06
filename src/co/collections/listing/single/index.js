import s from './index.module.css'
import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import colorConvert from 'color-convert'

import Cover from '../../cover'

export default function CollectionsSingle({ item, target }) {
    const { query: { user_name } } = useRouter()

    const folderStyle = useMemo(()=>
        item.color ? {
            '--bg-rgb': colorConvert.hex.rgb(item.color.replace('#',''))
        } : undefined,
        [item.color]
    )

    return (
        <Link 
            href={`/${user_name}/${item.slug}-${item._id}`}
            prefetch={false}> 
            <a 
                target={target}
                className={s.single}>
                <span 
                    className={s.folder}
                    data-custom-bg={folderStyle ? true : false}
                    style={folderStyle}>
                    <Cover 
                        {...item} 
                        className={s.cover}
                        size='xlarge' />
                </span>

                <span className={s.title}>
                    {item.title}
                </span>
            </a>
        </Link>
    )
}