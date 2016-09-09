#Hapi.js Starter
---

##Folder and file structure

To begin with, the important parts of the structure for now are:

```
├──  node_modules/
│
├──  db/
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

* **node_modules/**: All modules described in `package.json` will be automatically placed here using `npm`commands such as `npm install mysql --save`.
* **db/**: Our database scripts.
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
