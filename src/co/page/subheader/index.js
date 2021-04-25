import s from './index.module.css'

export default function Subheader({ children }) {
    return (
        <div className={s.subheader}>
            {children}
        </div>
    )
}