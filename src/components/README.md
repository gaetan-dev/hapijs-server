##The Controller

The controller modules are used to mediate the communication between requests and data manipulation. Open the `src/controllers/task.js` file. See that we've implemented a method to handle each type of request routed by the `src/routes/task.js` route. Every controller module will use a helper module called `ReplyHelper` (src/controllers/reply-helper.js). Here is nothing much about hapi.js.

###Server Plugins

Reopen the file `src/controllers/task.js` and look at the part:

```javascript
findByID: function findByID(request, reply) {

	var helper = new ReplyHelper(request, reply);
	var params = request.plugins.createControllerParams(request.params);

	taskDAO.findByID(params, function (err, data) {
		helper.replyFindOne(err, data);
	});
}
```

See that we are calling the `createControllerParams` method from the namespace `request.plugins`? 

> Plugins provide an extensibility platform for both general purpose utilities such as batch requests and for application business logic. 

This method was declare in `index.js` as:

```javascript
server.ext('onRequest', function(request, next){
	request.plugins.createControllerParams = function(requestParams){
		var params = _.clone(requestParams);
		params.userId = request.auth.credentials.userId;
		return params;
	};
	next();
});
```

So it's basically a better way to say that every request object should be able to add the ID of the authenticated user to some `requestParams` object and return it to the caller. We'll use this ID to make some queries to MySQL.

##Data manipulation

There is a very good [module](https://github.com/felixge/node-mysql) created by [Felix Geisendörfer](https://github.com/felixge) to manipulate `MySQL` databases. It's called `node-mysql` and we use it in our project.

If you take a look at `src/dao/task.js`, you'll see that we have a corresponding method for every end-point a client can request. There is nothing about `hapi.js` in here :)

##The Model

As we are building an API to consume a MySQL Database, we need a place to store the same schema as defined in the database tables. The place for that are the `Model` modules. Open up `src/models/task.js` and take a look, we'll see how to make sure our Task objects have the right values in its properties.

##Routing

The routing with hapi.js is pretty practical. Take a look at the file `src/routes/task.js`. You'll see that we've configured all the routes (end-points) our task module needs with a list of JSON objects. Taking the first route as an example:

```javascript
method: 'GET',
path: '/tasks/{task_id}',
config : {
	handler: taskController.findByID,
	validate: taskValidate.findByID
}
```

* **method**: the HTTP method. Typically one of 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'. Any HTTP method is allowed, except for 'HEAD'.
* **path**: the absolute path used to match incoming requests (must begin with '/'). Incoming requests are compared to the configured paths based on the server router configuration option. The path can include named parameters enclosed in {} which will be matched against literal values in the request as described in Path parameters.
* **config**: additional route configuration (the config options allows splitting the route information from its implementation).
* **config.handler**: an alternative location for the route handler function. Same as the handler option in the parent level. Can only include one handler per route.
* **config.validate**: is used to validate the incoming requests. We'll go deep later.

##Validation

If you haven't read the previous section, open the `src/models/task.js` file: 

```javascript
"use strict";

var _ = require('underscore');
var Joi = require('joi');

function TaskModel(){
	this.schema = {
		taskId: Joi.number().integer(),
		description: Joi.string().max(255)
	};
};

module.exports = TaskModel;
```

We are using `Joi` module. As described in [its repository](https://github.com/spumko/joi), `Joi` is:

> Object schema description language and validator for JavaScript objects.

Every request we receive in our end-points is validated using `Joi`. So every resource have a `ResourceValidate` module (look at `src/validate/task.js` which describes a validation schema for every route/method/end-point.

##Reply Helper
* **insert** with promise
```javascript
insert: function (request, reply) {
	const helper = new ReplyHelper(request, reply)
	const params = request.plugins.createControllerParams(request.payload)
	
	const insert = Q.denodeify(userDao.insert)			

	insert(params).then(function (data) {
		if (data.exception) {
			reply(Boom.badRequest(data.exception))
			done()
		}

		return data[0]

		// If the db doesn't return entity after creating
		// const findByID = Q.denodeify(userDao.findByID)
		// const result = data
		// params.id = result.insertId
		// return findByID(params)
	}).then(function (data) {
		helper.replyInsert(data)
	}).catch(function (err) {
		reply(Boom.badImplementation(err))
	})
}

```