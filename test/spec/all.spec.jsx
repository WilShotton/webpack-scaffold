var testsContext = require.context(".", true, /\.spec$/);
testsContext.keys().forEach(testsContext);

var coverageContext = require.context('../../src', true , /(.*)\.jsx/)

coverageContext.keys().forEach(function(fileName) {

    if(!/\/main.jsx$/.test(fileName)) {
        coverageContext.apply(null, arguments)
    }
})
