import 'modern-normalize'
import './index.css'
import './fonts/remixicon.css'
import Head from 'next/head'

function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name='og:site_name' content='Raindrop.io' />
				<meta name='twitter:site' content='@raindrop_io' />
				<meta name='twitter:domain' content='raindrop.io' />

				<link rel='preconnect' href='https://rdl.ink' />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default App