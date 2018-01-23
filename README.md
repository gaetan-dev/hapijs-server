# Hapi.js Starter
---

## Folder and file structure

To begin with, the important parts of the structure for now are:

```
├──  db/
│
├──  node_modules/
│
├──  src/
│   ├──  components/
│   │   ├──  user/
│   │   │   ├── user-controller.js
│   │   │   ├── user-dao.js
│   │   │   ├── user-model.js
│   │   │   ├── user-route.js
│   │   │   └── user-validate.js
│   │   └──  reply-helper.js
│   │
│   ├──  config/
│   │   └──  constants.js
│   │
│   ├──  middleware/
│   │   └──  db.js
│   │
│   ├──  config/
│   │   └──  constants.js
│   │
│   ├──  models/
│   │   └──  index.js
│   │
│   ├──  routes/
│   │   └──  index.js
│   │
│   ├──  utils/
│   │   ├──  mixins.js
│   │   └──  pagination-links.js
│   │
├──  test/
│   ├──  acceptance/
│   │   └──  user/
│   │       └── get.js
│   │   
├──  .gitignore
├──  gruntfile.js
├──  index.js
├──  package.json
└──  README.md

```

* **db/**: Our database scripts.
* **node_modules/**: All modules described in `package.json` will be automatically placed here using `npm`commands such as `npm install mysql --save`.
* **src/**: Our source code base folder.
* **src/components/**: Component files of our entities (controller, dao, model, route, validate).
* **src/config/**: Application level configuration files.
* **src/config/constants.js**: Application level configuration constants.
* **src/middleware/**: Holds modules/files that deals with different code environments.
* **src/middleware/basic-auth.js**: Our Basic Authentication strategy module. We'll see it latter.
* **src/middleware/db.js**: Abstracts our database initialization and manipulation.
* **src/models/**: Modules/files abstraction of our database schema.
* **src/routes/**: Modules/files that know which controllers should handle the incoming requests.
* **src/util/**: Help us with mixins methods.
* **index.js**: The starting point for the API.
* **package.json**: Holds project configuration.

## Server
```javascript
const Hapi = require('hapi')

// Creates server instance.
const server = new Hapi.Server(options)
// Configure server.
server.connection({ host, port })

// Dynamically adds all the routes (end-points) to the server instance.
for (var route in routes) {
	server.route(routes[route])
}

server.start()
```

## Component
### Controller

The controller modules are used to mediate the communication between requests and data manipulation. Open the `src/components/user/user-controller.js` file. See that we've implemented a method to handle each type of request routed by the `src/components/user/user-route.js` route. Every controller module will use a helper module called `ReplyHelper` (src/components/reply-helper.js). Here is nothing much about hapi.js.

#### Server Plugins

Reopen the file `src/components/user/user-controller.js` and look at the part:

```javascript
findByID: function findByID(request, reply) {

	var helper = new ReplyHelper(request, reply);
	var params = request.plugins.createControllerParams(request.params);

	userDAO.findByID(params, function (err, data) {
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

### DAO

There is a very good [module](https://github.com/felixge/node-mysql) created by [Felix Geisendörfer](https://github.com/felixge) to manipulate `MySQL` databases. It's called `node-mysql` and we use it in our project.

If you take a look at `src/components/user/user-dao.js`, you'll see that we have a corresponding method for every end-point a client can request. There is nothing about `hapi.js` in here :)

### Model

As we are building an API to consume a MySQL Database, we need a place to store the same schema as defined in the database tables. The place for that are the `Model` modules. Open up `src/components/user/user-model.js` and take a look, we'll see how to make sure our Task objects have the right values in its properties.

### Route

The routing with hapi.js is pretty practical. Take a look at the file `src/components/user/user-route.js`. You'll see that we've configured all the routes (end-points) our task module needs with a list of JSON objects. Taking the first route as an example:

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

### Validation

If you haven't read the previous section, open the `src/components/user/user-validate.js` file: 

```javascript
"use strict";

var _ = require('underscore');
var Joi = require('joi');

function UserModel(){
	this.schema = {
		id: Joi.number().integer(),
		username: Joi.string().max(255)
	};
};

module.exports = UserModel;
```

We are using `Joi` module. As described in [its repository](https://github.com/spumko/joi), `Joi` is:

> Object schema description language and validator for JavaScript objects.

Every request we receive in our end-points is validated using `Joi`. So every resource have a `ResourceValidate` module (look at `src/components/user/user-validate.js` which describes a validation schema for every route/method/end-point.

## Logs

[**good**](https://github.com/hapijs/good) is a hapi plugin to monitor and report on a variety of hapi server events as well as ops information from the host machine. It listens for events emitted by hapi server instances and pushes standardized events to a collection of streams.

We distinguish three type of logs; ops logs, debug logs and error logs wich are archived in `/log`. 

To cath the log errors issued by Hapi:

```javascript
server.on('request-internal', (req, event, tags) => {
    if (tags.error)
        server.log(['error'], event.data)
});
```

## Plugins


## References
* https://gist.github.com/agendor/9922151
* https://github.com/agendor/sample-hapi-rest-api
