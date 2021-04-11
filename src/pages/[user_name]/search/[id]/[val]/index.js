import Index from '../index'
import { getStaticPaths, getStaticProps as _getStaticProps } from '../index'

export { getStaticPaths }

export async function getStaticProps(props) {
    let query = Object.fromEntries(new URLSearchParams(props.params?.query))

    if (props.params?.val){
        query.search = []

        const rules = [
            { regex: /("#)([^#]*?)"/gmi, override_key: 'tag' },
            { regex: /(#)([^\s#]*)/gmi, override_key: 'tag' }, //if space /(#)([^\s#]*)/gmi
            { regex: /([\w.]+):([a-z0-9-]+)/gmi },
        ]

        let clean = String(props.params?.val).trim()

        //rules
        for(const { regex, override_key='' } of rules){
            let match

            while ((match = regex.exec(clean)) !== null) {
                const [_, key, val] = match
                
                if (val)
                    query.search.push({ key: override_key||key, val })
            }
            
            clean = clean.replace(regex, '')
        }

        if (clean.trim())
            query.search.push({ key: 'word', val: clean.trim() })
    }

    return _getStaticProps({
        ...props,
        params: {
            ...props.params,
            query
        }
    })
}

export default Index