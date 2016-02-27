var path = require('path')
var webpackConfig = require('./webpack.config.js')

var ROOT = path.resolve(__dirname)

webpackConfig.cache = true

webpackConfig.module.preLoaders = [{
    test: /\.jsx?$/,
    loaders: ['isparta', 'eslint-loader'],
    include: path.resolve(ROOT, 'src')
}]

module.exports = function(config) {


    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: ROOT,

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
                    dir: './docs/coverage'
                }
            ]
        },

        singleRun: false,

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        autoWatch: true,

        plugins: [
            require('../node_modules/karma-mocha'),
            require('../node_modules/karma-mocha-reporter'),
            require('../node_modules/karma-coverage'),
            require('../node_modules/karma-webpack'),
            require('../node_modules/karma-chrome-launcher')
        ]
    })
}
