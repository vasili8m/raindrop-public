import 'modern-normalize'
import './index.css'
import './fonts/remixicon.css'
import Head from 'next/head'

function App({ Component, pageProps }) {
	return (
		<>
			<Head>
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default App