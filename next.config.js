module.exports = {
    future: {
        webpack5: true
    },

    async rewrites() {
        return [
            {
                source: '/(.*)-:id(\\d+$)',
                destination: '/view/:id',
            },
            {
                source: '/(.*)-:id(\\d+)/:query(.+:.+)',
                destination: '/view/:id/:query',
            },

            {
                source: '/(.*)-:id(\\d+)/:section/:path*',
                destination: '/:section/:id/:path*',
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