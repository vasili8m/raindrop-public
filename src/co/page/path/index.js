import s from './index.module.css'
import last from 'lodash/last'
import Info from '~co/layout/info'
import Button from '~co/button'
import Icon from '~co/icon'

export default {
    Wrap: function({ children }) {
        const backHref = (last(children) || {}).props?.href || ''

        return (
            <div className={s.path}>
                <Button
                    className={s.back}
                    href={backHref}
                    size='small'
                    variant='ghost'>
                    <Icon 
                        name='arrow-left-s'
                        size='small' />
                </Button>

                <Info 
                    className={s.content}
                    divider='/'>
                    {children}
                </Info>
            </div>
        )
    },

    Part: function(props) {
        return (
            <Button
                {...props}
                prefetch={false}
                variant='flat'
                size='small' />
        )
    }
}