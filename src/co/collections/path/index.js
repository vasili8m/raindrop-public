import Link from 'next/link'

export default function CollectionsPath({ collection, collections }) {
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
                <Link href={`/${slug}-${_id}`}>
                    <a>{title}</a>
                </Link>
            ))}
        </h2>
    )
}