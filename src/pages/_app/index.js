import '~modules/vendor/sentry'
import 'modern-normalize'
import './index.css'
import { PageView } from '~modules/vendor/ga'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <PageView />
        </>
    )
}

export default MyApp  