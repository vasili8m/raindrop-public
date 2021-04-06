import s from './index.module.css'
import Info from '~co/helpers/info'
import Cover from './cover'
import { ShortDate } from '~modules/format/date'

export default function RaindropsSingle({ view, cover, title, excerpt, domain, created, link }) {
    return (
        <article
            className={s.single+' '+s[view]}>
            <div className={s.item}>
                <Cover
                    view={view} 
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

                    <Info className={s.info}>
                        <span>{domain}</span>
                        <span><ShortDate date={created} /></span>
                    </Info>
                </div>
            </div>

            <a href={link} className={s.permalink} />
        </article>
    )
}