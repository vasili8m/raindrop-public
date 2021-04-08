import s from './index.module.css'
import { useEffect, useRef } from 'react'
import Button from '~co/button'
import Icon from '~co/icon'

export default function Pagination({ prefix='', count, perpage, ...etc }) {
    const _pagesRef = useRef(null)
    const page = parseInt(etc.page)||0
    const pagesCount = parseInt(count/perpage)

    useEffect(()=>{
        const elem = document.getElementById(`page-${page}`)
        if (elem){
            const { left } = elem.getBoundingClientRect()
            _pagesRef.current.scrollLeft = left
        }
    }, [page])

    if (pagesCount<=1)
        return null

    let pages = []
    for(var i=0;i<=pagesCount;i++)
        pages.push(
            <Button
                key={i}
                id={`page-${i}`}
                href={`${prefix}${i}`}
                className={s.page}
                variant={page == i ? 'active' : 'flat'}
                prefetch={false}>
                {i+1}
            </Button>
        )

    return (
        <div className={s.pagination}>
            <div className={s.inner}>
                <div 
                    ref={_pagesRef}
                    className={s.pages}>
                    {pages}
                    <div className={s.space} />
                </div>

                <div className={s.navigation}>
                    <Button 
                        href={`${prefix}${page-1}`}
                        disabled={!page}>
                        <Icon name='arrow-left' />
                    </Button>

                    <Button 
                        href={`${prefix}${page+1}`}
                        disabled={page >= pagesCount}>
                        <Icon name='arrow-right' />
                    </Button>
                </div>
            </div>
        </div>
    )
}