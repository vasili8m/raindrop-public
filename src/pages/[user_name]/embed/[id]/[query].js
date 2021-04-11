import Index from './index'
import { getStaticPaths, getStaticProps as _getStaticProps } from './index'

export { getStaticPaths }

export async function getStaticProps(props) {
    return _getStaticProps({
        ...props,
        params: {
            ...props.params,
            query: Object.fromEntries(new URLSearchParams(props.params?.query))
        }
    })
}

export default Index