import s from './index.module.css'
import { Logo } from '~co/icon'
import Button from '~co/button'

export default function Footer() {
    return (
        <footer className={s.footer}>
            <Button href='https://raindrop.io' variant='flat'>
                <Logo />
            </Button>

            <a href='https://raindrop.io' className={s.brand}>
                <span className={s.site}>Raindrop.io</span>
                <span className={s.desc}>All-in-one bookmark manager</span>
            </a>

            <Button href='https://raindrop.io' variant='flat'>Create your own public page</Button>
            <Button href='https://help.raindrop.io' variant='flat'>Help</Button>
        </footer>
    )
}