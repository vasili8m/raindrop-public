import s from './index.module.css'

import Header from './header'
import Description from './description'
import Content from './content'
import Footer from './footer'
import Pagination from './pagination'
import Loading from './loading'
import Toolbar from './toolbar'

export default {
    Wrap: function({ children, full=false, accentColor, className='' }) {
        return (
            <div 
                className={s.page+' '+className}
                data-full={full}
                style={{
                    ...(accentColor ? {
                        '--accent-color': accentColor
                    } : {})
                }}>
                <Loading />
                
                {children}
            </div>
        )
    },

    Header,
    Description,
    Content,
    Footer,
    Pagination,
    Toolbar
}