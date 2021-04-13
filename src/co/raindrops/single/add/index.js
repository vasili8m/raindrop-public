import s from './index.module.css'
import { useCallback } from 'react'
import Button from '~co/button'
import Icon from '~co/icon'

export default function RaindropsSingleAdd({ link, title }) {
    const onClick = useCallback(e=>{
        e.preventDefault()

        const width = 420;
        const height = 600;
        const left = parseInt((screen.width/2)-(width/2));
        const top = parseInt((screen.height/2)-(height/2)); 

        window.open(e.currentTarget.href, '', `width=${width},height=${height},top=${top},left=${left},menubar=no,status=no,titlebar=no`)
    }, [])

    return (
        <Button 
            className={s.add} 
            onClick={onClick}
            href={'https://app.raindrop.io/add?'+new URLSearchParams({
                link,
                title
            })}>
            <Icon name='add' />
        </Button>
    )
}