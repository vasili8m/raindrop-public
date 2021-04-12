import s from './index.module.css'
import sortBy from 'lodash/sortBy'
import { useRouter } from 'next/router'

import { Buttons } from '~co/button'
import Link from 'next/link'
import Childrens from '../childrens'
import CollectionCover from '~co/collections/cover'

export default function CollectionsListing({ items }) {
    const router = useRouter()
    
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
                        <CollectionCover
                            {...item}
                            size='large' />
                    </div>
                    
                    <Link href={`/${router.query.user_name}/${item.slug}-${item._id}`}>
                        <a className={s.title}>
                            {item.title}
                        </a>
                    </Link>

                    <Buttons className={s.childrens}>
                        <Childrens
                            inline={true}
                            collection={item}
                            collections={items} />
                    </Buttons>
                </div>
            ))}
        </div>
    )
}