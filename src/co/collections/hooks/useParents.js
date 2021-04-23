import { useMemo } from 'react'

export function useParents(collections, collection) {
    return useMemo(()=>{
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

        return parents
    }, [collections, collection])
}