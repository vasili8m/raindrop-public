import s from './index.module.css'
import Button from '~co/button'
import Icon from '~co/icon'

export default function Pagination({ prefix='', count, perpage, ...etc }) {
    const page = parseInt(etc.page)||0
    const pagesCount = parseInt(count/perpage)

    if (pagesCount<=1)
        return null

    let pages = []
    for(var i=0;i<=pagesCount;i++)
        pages.push(
            <Button
                key={i}
                href={`${prefix}${i}`}
                className={s.page}
                variant={page == i ? 'active' : 'regular'}
                prefetch={false}>
                {i+1}
            </Button>
        )

    return (
        <div className={s.pagination}>
            <div className={s.pages}>
                {pages}
            </div>

            <div className={s.navigation}>
                {!!(page > 0) && (
                    <Button href={`${prefix}${page-1}`}>
                        <Icon name='arrow-left' />
                    </Button>
                )}

                {!!(page < pagesCount) && (
                    <Button href={`${prefix}${page+1}`}>
                        <Icon name='arrow-right' />
                    </Button>
                )}
            </div>
        </div>
    )
}