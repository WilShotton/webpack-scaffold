
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlPlugin = require('html-webpack-plugin')
var path = require('path')
var webpack = require('webpack')


var ROOT_PATH = path.resolve(__dirname)

var extractCSS = new ExtractTextPlugin('styles.css', {
    allChunks: true
})

var htmlPlugin = new HtmlPlugin({
    title: 'Scaffold'
})

var oldWatchingPlugin = new webpack.OldWatchingPlugin()

var sassVars = path.resolve(ROOT_PATH, './src/styles/config.json');

module.exports = {

    entry: [
        path.resolve(ROOT_PATH, 'src/main.jsx')
    ],

    output: {
        path: 'build',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.jsx$/,
                loader: 'babel-loader',
                include: path.resolve(ROOT_PATH, 'src'),
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    plugins: ['transform-class-properties']
                }
            }, {
                test: /.scss$/,
                loader: extractCSS.extract('style', 'css!postcss!sass!jsontosass?path='+ sassVars + "&" +
                    "includePaths[]=" + (path.resolve(ROOT_PATH, "bower_components")) + "&" +
                    "includePaths[]=" + (path.resolve(ROOT_PATH, "node_modules"))
                )
            },

            // Images
            {
                test: /\.gif$/,
                loader: 'url-loader?limit=10000&mimetype=image/gif'
            }, {
                test: /\.jpg$/,
                loader: 'url-loader?limit=10000&mimetype=image/jpg'
            }, {
                test: /\.png$/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            },

            // Fonts
            {
                test: /\.woff(\?43278770)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/[name].[ext]'
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/[name].[ext]'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=assets/[name].[ext]'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=assets/[name].[ext]'
            }
        ],

        preLoaders: [
            {
                test: /\.jsx$/,
                loader: 'eslint-loader',
                include: path.resolve(ROOT_PATH, 'src')
            }
        ]
    },

    sassLoader: {
        precision: 10
    },

    postcss: [
        require('autoprefixer-core')
    ],

    plugins: [extractCSS, htmlPlugin, oldWatchingPlugin],

    devtool: 'source-map',

    devServer: {
        colors: true,
        contentBase: "./build",
        https: false,
        host: '0.0.0.0',
        port: 7001,
        filename: 'main.js',
        hot: false,
        progress: true,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            children: false
        }
    }
}
