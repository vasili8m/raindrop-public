import { useState, useRef, useCallback } from 'react'
import Button from '~co/button'
import Icon from '~co/icon'
import Popover from '~co/popover'

const sorts = {
    '-created': {
        title: 'By date',
        dir: 'desc'
    },
    'created': {
        title: 'By date',
        dir: 'asc'
    },
    'title': {
        title: 'By name',
        dir: 'desc'
    },
    '-title': {
        title: 'By name',
        dir: 'asc'
    },
    'domain': {
        title: 'By site name',
        dir: 'desc'
    },
    '-domain': {
        title: 'By site name',
        dir: 'asc'
    },
    'score': {
        title: 'By relevancy',
        dir: 'desc'
    },
}

export default function RaindropsSort({ options={} }) {
    let { sort='' } = options
    if (!sorts[sort])
        sort = '-created'

    const { title, dir } = sorts[sort]

    const button = useRef(null)
    const [show, setShow] = useState(false)

    return (
        <>
            <Button 
                ref={button}
                variant='ghost'
                onClick={()=>setShow(true)}>
                <Icon
                    name={`sort-${dir}`}
                    variant=''
                    size='small' />

                {title}
            </Button>

            {show && (
                <Popover 
                    pin={button}
                    onClose={()=>setShow(false)}>
                    
                </Popover>
            )}
        </>
    )
}