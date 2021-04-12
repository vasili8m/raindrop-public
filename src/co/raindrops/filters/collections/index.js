import s from './index.module.css'

import { useRef, useState, useCallback } from 'react'
import Button, { Buttons } from '~co/button'
import Icon from '~co/icon'
import Popover from '~co/popover'
import Childrens from '~co/collections/childrens'

export default function RaindropsCollections({ collection, collections }) {
    const button = useRef(null)
    const [show, setShow] = useState(false)

    const onShowClick = useCallback(e=>{
        e.preventDefault()
        setShow(true)
    }, [setShow])

    const onClose = useCallback(()=>{
        setShow(false)
    }, [setShow])

    return (
        <>
            <Button 
                ref={button}
                onClick={onShowClick}>
                <Icon name='folder' size='small' />
                Filter by Collections
            </Button>

            {show && (
                <Popover
                    pin={button}
                    onClose={onClose}>
                    <div className={s.collections}>
                        <Childrens 
                            collection={collection} 
                            collections={collections}
                            variant='flat' />
                    </div>
                </Popover>
            )}
        </>
    )
}