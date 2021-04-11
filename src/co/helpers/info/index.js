import s from './index.module.css'
import { Fragment } from 'react'

export default function Info({ className='', children, ...etc }) {
    return (
        <div {...etc} className={s.info+' '+className}>
            {Array.isArray(children) ?
                children.filter(child=>!!child).map((child, i, { length })=>(
                    <Fragment key={child.key||i}>
                        <span className={s.part}>{child}</span>
                        {i<length-1 && <span className={s.divider}>·</span>}
                    </Fragment>
                ))
                : children
            }
        </div>
    )
}