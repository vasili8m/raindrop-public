import s from './index.module.css'
import sortBy from 'lodash/sortBy'

import Link from 'next/link'
import Childrens from '../childrens'
import Icon, { Logo, Image } from '~co/icon'

export default function CollectionsListing({ items, user }) {
    const root = sortBy(
        items.filter(({parent})=>{
            if (parent)
                return !items.find(({_id})=>_id==parent.$id)

            return true
        }),
        ['title']
    )

    return (
        <div className={s.listing}>
            {root.map(item=>(
                <div 
                    key={item._id}
                    className={s.item}>
                    <div className={s.cover}>
                        {!!item.cover?.length && (
							<Image 
								src={item.cover[0]}
                                alt={item.title}
								size='large' />
						)}
                    </div>
                    
                    <Link href={`/${user.name}/${item.slug}-${item._id}`}>
                        <a className={s.title}>
                            {item.title}
                        </a>
                    </Link>

                    <Childrens
                        inline={true}
                        className={s.childrens}
                        collection={item}
                        collections={items}
                        user={user} />
                </div>
            ))}
        </div>
    )
}