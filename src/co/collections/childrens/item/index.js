import s from './index.module.css'
import Link from 'next/link'

export default function ChildrenItem({ _id, title, slug }) {
    return (
        <Link 
            href={`/${slug}-${_id}`} 
            className={s.item}>
            {title}
        </Link>
    )
}