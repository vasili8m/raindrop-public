import s from './index.module.css'
import Icon, { Image } from '~co/icon'

export default function CollectionCover({ cover, title, size, fallback=true }) {
    if (!Array.isArray(cover) || 
        !cover.length)
        return fallback ? (
            <Icon 
                className={s.fallback}
                name='folder'
                size={size} />
        ) : null

    return (
        <Image 
            src={cover[0]}
            alt={title}
            size={size} />
    )
}