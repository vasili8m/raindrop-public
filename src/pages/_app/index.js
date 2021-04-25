import 'modern-normalize'
import './index.css'
import RemixIcon from './remixicon/remixicon.symbol.svg?raw'
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
			<div dangerouslySetInnerHTML={{__html: RemixIcon}} />
			<Component {...pageProps} />
		</>
	)
}

export default App