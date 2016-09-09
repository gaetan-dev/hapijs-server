'use strict'

module.exports = function () {
    const env = process.env.NODE_ENV || 'development'
    const appConstants = applicationConfig()
    const dbContants = databaseConfig()

    function applicationConfig () {
		const host = process.env.NODE_HOST || 'localhost'
		const port = process.env.NODE_PORT || 8080

		return {
			'production' : {
				'url' : 'https://' + process.env.NODE_HOST + ':' + process.env.NODE_PORT,
				'host' : process.env.NODE_HOST,
				'port' : process.env.NODE_PORT
			},
			'development' : {
				'url' : 'http://' + host + ':' + port,
				'host' : host,
				'port' : port
			},
			'test' : {
				'url' : 'http://' + process.env.NODE_HOST + ':' + process.env.NODE_PORT,
				'host' : process.env.NODE_HOST,
				'port' : process.env.NODE_PORT
			}
		}
	}

    function databaseConfig () {
		return {
			'production' : {
				'host' : process.env.DB_PRD_HOST,
				'user' : process.env.DB_PRD_USER,
				'password' : process.env.DB_PRD_PASS,
				'database' : 'StarterHapi'
			},
			'development' : {
				'host' : 'localhost',
				'user' : process.env.DB_DEV_USER || 'starter',
				'password' : process.env.DB_DEV_PASS || 'starter',
				'database' : 'StarterHapi'
			},
			'test' : {
				'host' : 'localhost',
				'user' : process.env.DB_TEST_USER,
				'password' : process.env.DB_TEST_PASS,
				'database' : 'StarterHapi-test'
			}
		}
	}

    var constants = {
		env: env,
		application : {
			url : appConstants[env]['url'],
			host : appConstants[env]['host'],
			port : appConstants[env]['port'],
		},
		database : {
			host     : dbContants[env]['host'],
			user     : dbContants[env]['user'],
			password : dbContants[env]['password'],
			database : dbContants[env]['database']
		},
		server : {
			defaultHost : 'http://localhost:8080'
		}
	}

    if (!constants.application['host']) {
		throw new Error('Missing constant application.host. ' + 'Check your environment variables NODE_HOST.')
	} else if (!constants.application['port']) {
		throw new Error('Missing constant application.port. ' + 'Check your environment variable NODE_PORT.')
	} else if (!constants.database['host']) {
		throw new Error('Missing constant database.host. ' + 'Check your environment variables.')
	} else if (!constants.database['user']) {
		throw new Error('Missing constant database.user. ' + 'Check your environment variables.')
	} else if (!constants.database['password']) {
		throw new Error('Missing constant database.password. ' + 'Check your environment variables.')
	} else if (!constants.database['database']) {
		throw new Error('Missing constant database.database. ' + 'Check your environment variables.')
	}

	return constants
}()