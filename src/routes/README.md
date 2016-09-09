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