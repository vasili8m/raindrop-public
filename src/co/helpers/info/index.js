import s from './index.module.css'

export default function Info({ className='', ...etc }) {
    return (
        <div {...etc} className={s.info+' '+className} />
    )
}