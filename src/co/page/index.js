import s from './index.module.css'
import t from './theme.module.scss'

import Head from 'next/head'
import Header from './header'
import Subheader from './subheader'
import Content from './content'
import Footer from './footer'
import Pagination from './pagination'
import Path from './path'
import Loading from './loading'

export default {
    Wrap: function({ children, theme='light', wide=false, accentColor, className='' }) {
        return (
            <div 
                className={t.theme + ' ' + s.page + ' ' + className}
                data-wide={wide}
                data-theme={theme}
                style={{
                    ...(accentColor ? {
                        '--accent-color': accentColor
                    } : {})
                }}>
                <Head>
                    <meta name='color-scheme' content={theme=='auto' ? 'dark light' : theme} />
                </Head>
                
                <Loading />
                
                {children}
            </div>
        )
    },

    Header,
    Subheader,
    Content,
    Footer,
    Pagination,
    Path
}