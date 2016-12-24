const _ = require('lodash')

const jsToSass = raw => {

    const parse = target => {

        if (_.isString(target)) {

            return target
        }

        if (_.isBoolean(target)) {

            return String(target)
        }

        if (_.isNumber(target)) {

            return target + 'px'
        }

        if (_.isArray(target)) {

            return _.map(target, value => {

                if (_.isObject(value)) {

                    return '(' + parse(value) + ')'
                }

                return value
            })
        }

        if (_.isObject(target)) {

            return _.reduce(
                target,
                (acc, value, key) => {

                    if (_.isObject(value)) {

                        return acc.concat([key + ': (' + parse(value) + ')'])
                    }

                    return acc.concat([key + ': ' + parse(value)])
                },
                []
            )
        }

        return ''
    }

    return '$' + parse(raw).join(';\n$') + ';'
}

module.exports = function(content) {

    this.addDependency(this.options.jsToSass.path)

    this.cacheable(true)

    const config = require(this.options.jsToSass.path)

    return jsToSass(config) + '\n' + content
}
