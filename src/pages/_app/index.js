import 'modern-normalize'
import './index.css'
import RemixIcon from './remixicon/remixicon.symbol.svg?raw'
import '~modules/vendor/sentry'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />

            <div dangerouslySetInnerHTML={{__html: RemixIcon}} />
        </>
    )
}

export default MyApp  