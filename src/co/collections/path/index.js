import s from './index.module.css'
import { Fragment } from 'react'
import Link from 'next/link'
import Icon from '~co/icon'

export default function CollectionsPath({ collection, collections, user }) {
    const parents = []

    const find = (findId)=>{
		const parent = collections.find(({_id})=>_id == findId)
		
		if (parent){
			parents.unshift(parent)

			if (parent.parent?.$id)
                find(parent.parent.$id)
		}
	}
    find(collection.parent?.$id)

    if (!parents.length)
        return null

    return (
        <h2>
            {parents.map(({ _id, slug, title })=>(
                <Fragment key={_id}>
                    <Link href={`/${user.name}/${slug}-${_id}`}>
                        <a>{title}</a>
                    </Link>

                    <Icon 
                        className={s.chevron}
                        name='arrow-right-s' 
                        size='small' />
                </Fragment>
            ))}
        </h2>
    )
}