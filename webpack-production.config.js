var webpackConfig = require('./webpack.config')
var webpack = require('webpack')


webpackConfig.plugins.push(

    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
)

module.exports = webpackConfig
