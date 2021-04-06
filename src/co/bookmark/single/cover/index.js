import s from './index.module.css'
import Picture from '~co/picture'

let sizes = {
    default: {
        ar: '4:3',
        height: 69,
        mode: 'crop'
    },
    grid: {
        ar: '16:9',
        width: 300,
        mode: 'crop'
    },
    masonry: {
        width: 300
    }
}

export default function BookmarkCover({ view, src, link }) {
    return (
        <Picture 
            {...(sizes[view] || sizes.default)}
            className={s.cover+' '+s[view]}
            src={src || link} />
    )
}