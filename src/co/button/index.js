import s from './index.module.css'
import { Fragment } from 'react'
import Link from 'next/link'
import Icon, { Logo } from '~co/icon'

export default function Button({ className='', variant, color, size, block=false, href, ...props }) {
    const Wrap = href ? Link : Fragment 

    return (
        <Wrap href={href}>
            <a 
                {...props} 
                className={s.button+' '+className}
                data-variant={variant || 'regular'}
                data-color={color || 'secondary'}
                data-size={size || 'regular'}
                data-block={block}
                data-single-icon={props.children?.type == Icon || props.children?.type == Logo} />
        </Wrap>
    )
}