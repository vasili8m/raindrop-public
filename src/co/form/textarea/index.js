import s from './index.module.css'
import { useCallback, useContext } from 'react'
import { Context } from '../form'

export function Textarea({ className='', ...etc }) {
    const { values, onChange } = useContext(Context)
    const onClick = useCallback(e=>{
        if (etc.readOnly)
            e.target.select()

        if (etc.onClick)
            etc.onClick(e)
    })

    return (
        <textarea 
            {...etc}
            value={values[etc.name]}
            className={s.textarea+' '+className}
            onClick={onClick}
            onChange={onChange} />
    )
}