import s from './index.module.css'
import Link from 'next/link'
import { useTagHref } from '~co/search/hooks'

export default function SearchTag({ _id, target }) {
    const href = useTagHref(_id)

    return (
        <Link 
            href={href}
            prefetch={false}>
            <a 
                className={s.tag}
                target={target}>
                {_id}
            </a>
        </Link>
    )
}