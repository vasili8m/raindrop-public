import s from './index.module.css'
import sortBy from 'lodash/sortBy'

import Link from 'next/link'
import Childrens from '../childrens'
import Icon, { Logo, Image } from '~co/icon'

export default function CollectionsListing({ items }) {
    const root = sortBy(items.filter(({parent})=>!parent), ['title'])

    return (
        <div className={s.listing}>
            {root.map(item=>(
                <div className={s.item}>
                    <div className={s.cover}>
                        {!!item.cover?.length && (
							<Image 
								src={item.cover[0]}
								size='large' />
						)}
                    </div>
                    
                    <Link href={`/${item.slug}-${item._id}`}>
                        <a className={s.title}>
                            {item.title}
                        </a>
                    </Link>

                    <Childrens
                        inline={true}
                        className={s.childrens}
                        collection={item}
                        collections={items} />
                </div>
            ))}
        </div>
    )
}