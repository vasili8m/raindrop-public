import s from './index.module.css'
import Picture from '~co/picture'
import { FAVICON_ENDPOINT } from '~config/api'

let sizes = {
    default: {
        ar: '4:3',
        height: 69,
        mode: 'crop'
    },
    simple: {
        ar: '1:1',
        height: 24
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

export default function RaindropsCover({ view, src, link, domain }) {
    return (
        <Picture 
            {...(sizes[view] || sizes.default)}
            endpoint={view == 'simple' ? FAVICON_ENDPOINT : undefined}
            className={s.cover+' '+s[view]}
            src={view == 'simple' ? domain : src || link} />
    )
}