import s from './index.module.css'
import BrandIcon from '~assets/brand/icon_48.svg'

function Base({ as='span', size, className='', ...etc }) {
    const Component = as

    return (
        <Component 
            {...etc}
            data-size={size||'regular'}
            className={s.icon+' '+className} />
    )
}

export default function Icon({ name, variant, ...etc }) {
    return (
        <Base {...etc}>
            <i className={`ri-${name}-${variant||'line'}`}></i>
        </Base>
    )
}

export function Logo(props) {
    return (
        <Base 
            {...props}
            as={BrandIcon} />
    )
}

export function Image(props) {
    return (
        <Base
            {...props}
            as='img' />
    )
}

export function Avatar(props) {
    return (
        <span className={s.avatar}>
            <Base
                {...props}
                as='img' />
        </span>
    )
}