import s from './index.module.css'
import { Fragment, forwardRef } from 'react'
import Link from 'next/link'
import Icon, { Logo, Avatar } from '~co/icon'

export * from './select'
export * from './share'

export function Base({ as='a', className='', prefetch, variant, color, size, bold=false, href, disabled=false, forwardedRef, ...props }) {
    const Wrap = href ? Link : Fragment
    const Component = as

    return (
        <Wrap {...Wrap == Link ? { href, prefetch } : {}}>
            <Component 
                {...props}
                ref={forwardedRef}
                className={s.button+' '+className}
                data-variant={disabled ? 'disabled' : (variant || 'regular')}
                data-color={color || 'secondary'}
                data-size={size || 'regular'}
                data-bold={bold}
                data-single-icon={props.children?.type == Icon || props.children?.type == Logo || props.children?.type == Avatar} />
        </Wrap>
    )
}

export default forwardRef((props, ref) => {
    return <Base {...props} forwardedRef={ref} />
})

export function Buttons({ className='', tight=false, ...etc }) {
    return (
        <div {...etc} data-tight={tight} className={s.buttons+' '+className} />
    )
}