import s from './index.module.css'
import { useRouter } from 'next/router'
import Icon from '~co/icon'
import { ShortDate } from '~modules/format/date'
import { compactDomain } from '~modules/format/url'

import Info from '~co/helpers/info'
import Cover from './cover'
import Path from './path'
import Tags from './tags'

export default function RaindropsSingle({ item, collection, collections, target }) {
    const { cover, title, excerpt, domain, created, link, tags, important } = item
    const { query } = useRouter()

    return (
        <article
            className={s.single+' '+s[collection.view]}>
            <div className={s.item}>
                <Cover
                    view={collection.view} 
                    src={cover}
                    domain={domain}
                    link={link}
                    alt={title} />

                <div className={s.about}>
                    <div className={s.title}>
                        {title}
                    </div>

                    {!!(excerpt || important) && (
                        <div className={s.excerpt}>
                            {important && (
                                <Icon 
                                    className={s.important}
                                    name='heart-3'
                                    variant='fill' 
                                    size='small' />
                            )}

                            {excerpt}
                        </div>
                    )}

                    <Tags 
                        target={target}
                        tags={tags} />

                    <Info className={s.info}>
                        {!!(query.id && item.collection?.$id != query.id) && (
                            <Path 
                                target={target}
                                item={item}
                                collections={collections} />
                        )}

                        <span>{compactDomain(domain)}</span>
                        <span><ShortDate date={created} /></span>
                    </Info>
                </div>
            </div>

            <a 
                target={target}
                href={link} 
                className={s.permalink}>
                {title}
            </a>
        </article>
    )
}