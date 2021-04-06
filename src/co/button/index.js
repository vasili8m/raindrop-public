import s from './index.module.css'
import Icon, { Logo } from '~co/icon'

export default function Button({ className='', variant, color, size, block=false, ...props }) {
    return (
        <a 
            {...props} 
            className={s.button+' '+className}
            data-variant={variant || 'regular'}
            data-color={color || 'secondary'}
            data-size={size || 'regular'}
            data-block={block}
            data-single-icon={props.children?.type == Icon || props.children?.type == Logo} />
    )
}