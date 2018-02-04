var config = {
    entry: {
        'index' : './components/index.js'
    },
	
    output: {
        path:__dirname + '/js',
        filename: '[name].js',
        publicPath: '/js/'
    },
    
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
				
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                // Match woff2 and patterns like .woff?v=1.1.1.
                test: /\.ttf$/,
                loader: "url-loader"
            },
        ]
    },
    devServer: {
        inline: true,
        port: 8080
    },
    devtool: 'eval-source-map'
}

module.exports = config;