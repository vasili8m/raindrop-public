import s from './select.module.css'
import { useCallback } from 'react'
import { Base } from './index'
import Icon from '~co/icon'

/*
    options = [ { value, label, ..anything } ]
    selected = value
    children = function({ value, label, ...}=>render) optional
    onChange = functioon(value)
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
            {!!active && (children ? 
                children(active) : 
                (
                    <>
                        {active.label}
                        <Icon 
                            name='arrow-drop-down'
                            className={s.dropDownIcon} />
                    </>
                )
            )}
            
            <select value={selected} onChange={onNativeChange}>
                {options.map(({separator, value, label}, i)=>
                    separator ? (
                        <option key={i} disabled>―――――――</option>
                    ) : (
                        <option 
                            key={value||i}
                            value={value}>
                            {label}
                        </option>
                    )
                )}
            </select>
        </Base>
    )
}