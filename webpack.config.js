const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const paths = {

    sassVars: path.resolve(__dirname, './src/styles/config.json'),
    src: path.resolve(__dirname, 'src')
}

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

module.exports = {

    context: __dirname,

    entry: {
        main: './src/main.jsx'
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },

    resolveLoader: {
        alias: {
            'jstosass-loader': path.join(__dirname, './js-to-sass-loader.jsx')
        }
    },

    module: {

        rules: [
            {
                test: /\.jsx?$/,
                include: paths.src,
                use: ['babel-loader']
            }, {
                test: /.scss$/,
                include: paths.src,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader'
                        }, {
                            loader: 'sass-loader'
                        }, {
                            loader: 'jstosass-loader'
                        }
                    ]
                })
            }
        ]
    },

    plugins: [

        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true,
        }),

        new HtmlWebpackPlugin({
            favicon: './src/assets/favicon.ico',
            title: 'Scaffold'
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [require('autoprefixer')],
                jsToSass: {
                    foo: 'foo'
                }
            }
        })
    ],

    devServer: {
        colors: true,
        contentBase: './build',
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
