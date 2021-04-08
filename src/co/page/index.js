import s from './index.module.css'

import Header from './header'
import Description from './description'
import Content from './content'
import Footer from './footer'
import Pagination from './pagination'

export default {
    Wrap: function({ children, full=false, accentColor }) {
        return (
            <div 
                className={s.page} 
                data-full={full}
                style={{
                    ...(accentColor ? {
                        '--accent-color': accentColor
                    } : {})
                }}>
                {children}
            </div>
        )
    },

    Header,
    Description,
    Content,
    Footer,
    Pagination
}