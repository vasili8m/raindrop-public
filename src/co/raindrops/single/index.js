import s from './index.module.css'
import Link from 'next/link'
import Info from '~co/helpers/info'
import Cover from './cover'
import Path from './path'
import { ShortDate } from '~modules/format/date'

export default function RaindropsSingle({ item, collection, collections }) {
    const { cover, title, excerpt, domain, created, link, tags } = item

    return (
        <article
            className={s.single+' '+s[collection.view]}>
            <div className={s.item}>
                <Cover
                    view={collection.view} 
                    src={cover}
                    domain={domain}
                    link={link} />

                <div className={s.about}>
                    <div className={s.title}>
                        {title}
                    </div>

                    {!!excerpt && (
                        <div className={s.excerpt}>
                            {excerpt}
                        </div>
                    )}

                    {!!tags && (
                        <div className={s.tags}>
                            {tags.map(tag=>
                                <Link 
                                    key={tag}
                                    href={`${collection.slug}-${collection._id}/search/${encodeURIComponent('#'+tag)}`}
                                    prefetch={false}>
                                    <a className={s.tag}>{tag}</a>
                                </Link>
                            )}
                        </div>
                    )}

                    <Info className={s.info}>
                        <Path 
                            item={item}
                            collection={collection}
                            collections={collections} />

                        <span>{domain}</span>
                        <span><ShortDate date={created} /></span>
                    </Info>
                </div>
            </div>

            <a href={link} className={s.permalink} />
        </article>
    )
}