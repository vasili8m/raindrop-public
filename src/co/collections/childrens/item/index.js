import s from './index.module.css'
import Link from 'next/link'
import { Image } from '~co/icon'

export default function ChildrenItem({ _id, title, slug, cover, count }) {
    return (
        <Link href={`/${slug}-${_id}`}>
            <a className={s.item}>
                {!!(cover && cover.length) && (
                    <Image src={cover[0]} />
                )}

                <span className={s.title}>
                    {title}
                </span>

                {/*<span className={s.count}>
                    {count}
                </span>*/}
            </a>
        </Link>
    )
}