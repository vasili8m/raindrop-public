import 'modern-normalize'
import './index.css'
import RemixIcon from './remixicon/remixicon.symbol.svg?raw'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />

            <div dangerouslySetInnerHTML={{__html: RemixIcon}} />
        </>
    )
}

export default MyApp  