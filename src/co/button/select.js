import s from './select.module.css'
import { useCallback } from 'react'
import { Base } from './index'

/*
    options = [ { value, label, ..anything } ]
    selected = value
    children = function({ value, label, ...}=>render) optional
*/
export function Select({ className='', options=[], selected, children, onChange, ...etc }) {
    const active = options.find(({value})=>value == selected)

    const onNativeChange = useCallback(e=>{
        e.preventDefault()
        onChange && onChange(e.target.value)
    }, [onChange])

    return (
        <Base 
            {...etc}
            className={s.select+' '+className}
            as='div'>
            {!!active && (children ? children(active) : active.label)}
            
            <select value={selected} onChange={onNativeChange}>
                {options.map(({separator, value, label}, i)=>
                    separator ? (
                        <option key={i} disabled>―――――――</option>
                    ) : (
                        <option 
                            key={value}
                            value={value}>
                            {label}
                        </option>
                    )
                )}
            </select>
        </Base>
    )
}