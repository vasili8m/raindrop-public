import s from './index.module.css'
import { useRouter } from 'next/router'
import { Buttons } from '~co/button'
import { ShortDate } from '~modules/format/date'
import { compactDomain } from '~modules/format/url'

import Info from '~co/layout/info'
import Cover from './cover'
import Path from './path'
import Tags from './tags'
import Important from './important'
import Add from './add'

export default function RaindropsSingle({ item, collection, collections, user, target }) {
    const { cover, title, excerpt, domain, created, link, tags } = item
    const { query } = useRouter()

    return (
        <article
            className={s.single+' '+s[collection.view]}>
            <div className={s.item}>
                <Cover
                    className={s.cover}
                    view={collection.view} 
                    src={cover}
                    domain={domain}
                    link={link}
                    alt={title} />

                <div className={s.about}>
                    <div className={s.title}>
                        {title}
                    </div>

                    {!!excerpt && (
                        <div className={s.excerpt}>
                            {excerpt}
                        </div>
                    )}

                    <Buttons className={s.filters}>
                        <Important
                            item={item} />

                        {!!(query.id && item.collection?.$id != query.id) && (
                            <Path 
                                target={target}
                                item={item}
                                user={user}
                                collections={collections} />
                        )}

                        <Tags 
                            target={target}
                            tags={tags} />
                    </Buttons>

                    <Info className={s.info}>
                        <span>{compactDomain(domain)}</span>
                        <span><ShortDate date={created} /></span>
                    </Info>
                </div>

                <Buttons className={s.actions}>
                    <Add 
                        link={link}
                        title={title} />
                </Buttons>
            </div>

            <a 
                target={target}
                href={link} 
                className={s.permalink}
                rel='nofollow'>
                {title}
            </a>
        </article>
    )
}