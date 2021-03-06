import Document, { Html, Head, Main, NextScript } from 'next/document'
import GA from '~modules/vendor/ga'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta name='viewport' content='width=device-width,height=device-height,initial-scale=1' />

                    <meta name='og:site_name' content='Raindrop.io' />
                    <meta name='twitter:site' content='@raindrop_io' />
                    <meta name='twitter:domain' content='raindrop.io' />

                    <link rel='preconnect' href={process.env.SITE_URL} />
                    <link rel='preconnect' href='https://rdl.ink' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <GA />
                </body>
            </Html>
        )
    }
}

export default MyDocument