import s from './index.module.css'

export default function Toolbar({ children }) {
    return (
        <div className={s.toolbar}>
            <div className={s.inner}>
                {children}
            </div>
        </div>
    )
}