import s from './index.module.css'
import { Fragment, forwardRef } from 'react'
import Link from 'next/link'
import Icon, { Logo } from '~co/icon'

function Button({ className='', prefetch, variant, color, size, block=false, href, disabled=false, forwardedRef, ...props }) {
    const Wrap = href ? Link : Fragment 

    return (
        <Wrap {...Wrap == Link ? { href, prefetch } : {}}>
            <a 
                {...props} 
                ref={forwardedRef}
                className={s.button+' '+className}
                data-variant={disabled ? 'disabled' : (variant || 'regular')}
                data-color={color || 'secondary'}
                data-size={size || 'regular'}
                data-block={block}
                data-single-icon={props.children?.type == Icon || props.children?.type == Logo} />
        </Wrap>
    )
}

export default forwardRef((props, ref) => {
    return <Button {...props} forwardedRef={ref} />
})

export function Buttons({ className='', ...etc }) {
    return (
        <div {...etc} className={s.buttons+' '+className} />
    )
}