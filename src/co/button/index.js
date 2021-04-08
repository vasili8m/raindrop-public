import s from './index.module.css'
import { Fragment } from 'react'
import Link from 'next/link'
import Icon, { Logo } from '~co/icon'

export default function Button({ className='', prefetch, variant, color, size, block=false, href, disabled=false, ...props }) {
    const Wrap = href ? Link : Fragment 

    return (
        <Wrap 
            href={href}
            prefetch={prefetch}>
            <a 
                {...props} 
                className={s.button+' '+className}
                data-variant={disabled ? 'disabled' : (variant || 'regular')}
                data-color={color || 'secondary'}
                data-size={size || 'regular'}
                data-block={block}
                data-single-icon={props.children?.type == Icon || props.children?.type == Logo} />
        </Wrap>
    )
}