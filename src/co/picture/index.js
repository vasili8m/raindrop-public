import s from './index.module.css'
import { THUMBNAILS_ENDPOINT } from '~config/api'

export default function Image({ className='', src, width, height, ar, mode, endpoint=THUMBNAILS_ENDPOINT }) {
    let link

    if (src)
        link = `${endpoint}/${src.includes(endpoint+'/') ? src.replace(endpoint+'/','') : encodeURIComponent(src)}?width=${width||''}&height=${height||''}&ar=${ar||''}&mode=${mode||''}`

    return (
        <picture 
            className={s.picture + ' ' + className}
            style={{width, height, aspectRatio: ar ? ar.replace(':', '/') : ''}}>
            <source srcSet={`${link}&format=avif&dpr=1 1x, ${link}&format=avif&dpr=2 2x`} type='image/avif' />
            <source srcSet={`${link}&dpr=1 1x, ${link}&dpr=2 2x`} />

            <img 
                loading='lazy'
                decoding='async' />
        </picture>
    )
}