import s from './index.module.css'

export default function Description({ children }) {
    return (
        <div className={s.description}>
            {children}
        </div>
    )
}