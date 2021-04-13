module.exports = {
    assetPrefix: process.env.SITE_URL || '',
    poweredByHeader: false,

    future: {
        webpack5: true
    },

    async rewrites() {
        return [
            //view
            {
                source: '/:user_name/(.*)-:id(\\d+$)',
                destination: '/:user_name/view/:id',
            },
            
            //collection embed/search/...
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

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        })
    
        return config
    }
}