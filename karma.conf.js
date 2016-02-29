var path = require('path')
var webpackConfig = require('./webpack.config.js')


var ROOT_PATH = path.resolve(__dirname)

webpackConfig.cache = true

webpackConfig.module.preLoaders = [{
    test: /\.jsx?$/,
    loaders: ['isparta', 'eslint'],
    include: path.resolve(ROOT_PATH, 'src')
}]

module.exports = function(config) {

    config.set({

        browsers: ['Chrome'],

        files: ['test/spec/**/*.spec.jsx'],

        frameworks: ['mocha'],

        preprocessors: {
            'test/spec/**/*.spec.jsx': ['webpack']
        },

        reporters: ['mocha', 'coverage'],

        coverageReporter: {
            reporters: [
                {
                    type: 'text-summary'
                }, {
                    type: 'html',
                    dir: 'docs/coverage'
                }
            ]
        },

        singleRun: false,

        webpack: {
            node : {
                fs: 'empty'
            },

            module: {
                preLoaders: [{
                    test: /\.jsx?$/,
                    loaders: ['isparta', 'eslint'],
                    include: path.resolve(ROOT_PATH, 'src')
                }],
                loaders: [{
                    test: /\.jsx?$/,
                    loader: 'babel',
                    include: path.resolve(ROOT_PATH, 'src')
                }]
            }
        },

        webpackMiddleware: {
            noInfo: true
        }
    })
}
