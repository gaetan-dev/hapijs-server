/*
* Good is a hapi plugin to monitor and report on a variety of hapi server events as well as ops information from the
* host machine. It listens for events emitted by hapi server instances and pushes standardized events to a collection
* of streams.
*/

module.exports = (function () {
    return {
        register: require('good'),
        options: {
            reporters: {
                consoleReporter: [
                    {
                        module: 'good-squeeze',
                        name:'Squeeze',
                        args: [{ log: '*', response: '*' }]
                    },
                    {
                        module: 'good-console',
                    }, 'stdout'
                ],
                fileOpsReporter: [
                    {
                        module: 'good-squeeze',
                        name:'Squeeze',
                        args: [{ ops: '*' }]
                    },
                    {
                    module: 'good-squeeze',
                    name: 'SafeJson'
                    },
                    {
                        module: 'good-file',
                        args: ['./log/ops_log']
                    }
                ],
                fileDebugReporter: [
                    {
                        module: 'good-squeeze',
                        name:'Squeeze',
                        args: [{ log: 'debug' }]
                    },
                    {
                    module: 'good-squeeze',
                    name: 'SafeJson'
                    },
                    {
                        module: 'good-file',
                        args: ['./log/debug_log']
                    }
                ],
                fileErrorReporter: [
                    {
                        module: 'good-squeeze',
                        name:'Squeeze',
                        args: [{ log: 'error' }]
                    },
                    {
                    module: 'good-squeeze',
                    name: 'SafeJson'
                    },
                    {
                        module: 'good-file',
                        args: ['./log/error_log']
                    }
                ]
            }
        }
    }
})()