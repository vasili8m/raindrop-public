import Index from './index'
import { getStaticPaths, getStaticProps as _getStaticProps } from './index'

export { getStaticPaths }

export async function getStaticProps(props) {
    let query = new URLSearchParams(
        props.params?.query ? props.params?.query.replace(':', '=').replace(';', '&') : ''
    )

    return _getStaticProps({
        ...props,
        params: {
            ...props.params,
            query: Object.fromEntries(query || {})
        }
    })
}

export default Index