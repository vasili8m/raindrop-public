import s from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Image } from '~co/icon'

export default function ChildrenItem({ _id, title, slug, cover, count }) {
    const router = useRouter()

    return (
        <Link href={`/${router.query.user_name}/${slug}-${_id}`}>
            <a className={s.item}>
                {!!(cover && cover.length) && (
                    <Image 
                        src={cover[0]}
                        alt={title} />
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