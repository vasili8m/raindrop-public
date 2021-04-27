const SentryWebpackPlugin = require('@sentry/webpack-plugin')

module.exports = {
    assetPrefix: process.env.SITE_URL || '',
    poweredByHeader: false,
    productionBrowserSourceMaps: true,

    future: {
        webpack5: true
    },

    env: {
        //sentry
        NEXT_PUBLIC_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
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
            //deny iframe all except /embed routes
            {
                source: '/((?!.+\/embed).+)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
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
            })
        )

        if (process.env.SENTRY_DSN &&
            process.env.SENTRY_ORG &&
            process.env.SENTRY_PROJECT &&
            process.env.SENTRY_AUTH_TOKEN &&
            process.env.VERCEL_GIT_COMMIT_SHA &&
            process.env.NODE_ENV === 'production')
            config.plugins.push(
                new SentryWebpackPlugin({
                    include: '.next',
                    ignore: ['node_modules'],
                    stripPrefix: ['webpack://_N_E/'],
                    urlPrefix: `~/_next`,
                    release: process.env.VERCEL_GIT_COMMIT_SHA,
                })
            )

        //svg's
        config.module.rules.push({
            test: /\.svg$/,
            oneOf: [
                {
					resourceQuery: /raw/,
					loader: 'raw-loader'
				},
                {
                    use: ['@svgr/webpack']
                }
            ]
        })
    
        return config
    }
}