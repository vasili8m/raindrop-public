import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta name='og:site_name' content='Raindrop.io' />
                    <meta name='twitter:site' content='@raindrop_io' />
                    <meta name='twitter:domain' content='raindrop.io' />

                    <link rel='preconnect' href='https://rdl.ink' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument