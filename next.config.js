const SentryWebpackPlugin = require('@sentry/webpack-plugin')

module.exports = {
    assetPrefix: process.env.SITE_URL || '',
    poweredByHeader: false,
    productionBrowserSourceMaps: true,

    future: {
        webpack5: true
    },

    async redirects() {
        return [
            //view index in iframe
            {
                source: '/:user_name/(.*)-:id(\\d+$)',
                has: [{
                    type: 'header',
                    key: 'Sec-Fetch-Dest',
                    value: 'iframe'
                },],
                permanent: false,
                destination: '/:user_name/embed/:id',
            },
            //user in iframe
            {
                source: '/:user_name',
                has: [{
                    type: 'header',
                    key: 'Sec-Fetch-Dest',
                    value: 'iframe'
                },],
                permanent: false,
                destination: '/:user_name/embed/me',
            }
        ]
    },

    async rewrites() {
        return [
            //view
            {
                source: '/:user_name/(.*)-:id(\\d+$)',
                destination: '/:user_name/view/:id',
            },
            
            //collection embed/search/etc...
            {
                source: '/:user_name/(.*)-:id(\\d+)/:section/:path*',
                destination: '/:user_name/:section/:id/:path*',
            },
        ]
    },

    async headers() {
        return [
            //security
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: `
                            default-src *;
                            script-src 'self' https://*.raindrop.io https://*.sentry.io https://sentry.io https://*.googletagmanager.com https://*.google-analytics.com ${process.env.NODE_ENV === 'development' ? '\'unsafe-inline\' \'unsafe-eval\'' : ''};
                            style-src 'self' 'unsafe-inline' https://*.raindrop.io;
                            img-src * blob:;
                            object-src 'self' up.raindrop.io;
                        `.replace(/\s+/g, ' ')
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    }
                ]
            }
        ]
    },

    webpack(config, options) {
        //sentry
        if (!options.isServer) 
            config.resolve.alias['@sentry/node'] = '@sentry/browser'

        config.plugins.push(
            new options.webpack.DefinePlugin({
                'process.env.NEXT_IS_SERVER': JSON.stringify(options.isServer.toString()),
                'process.env.VERCEL_GIT_COMMIT_SHA': JSON.stringify(process.env.VERCEL_GIT_COMMIT_SHA||''),
            })
        )

        if (process.env.VERCEL_GIT_COMMIT_SHA)
            config.plugins.push(
                new SentryWebpackPlugin({
                    org: 'oblako-corp',
				    project: 'public',
				    authToken: process.env.SENTRY_AUTH_TOKEN, //required in CI environment
                    release: process.env.VERCEL_GIT_COMMIT_SHA,

                    include: '.next',
                    ignore: ['node_modules'],
                    stripPrefix: ['webpack://_N_E/'],
                    urlPrefix: `app:///_next`,
                })
            )

        //svg's
        config.module.rules.push({
            test: /\.svg$/,
            oneOf: [
                {
                    use: ['@svgr/webpack']
                }
            ]
        })
    
        return config
    }
}