module.exports = {
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
            {
                source: '/:user_name/(.*)-:id(\\d+)/:query(.+:.+)',
                destination: '/:user_name/view/:id/:query',
            },

            //collection embed/search/...
            {
                source: '/:user_name/(.*)-:id(\\d+)/:section/:path*',
                destination: '/:user_name/:section/:id/:path*',
            },
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