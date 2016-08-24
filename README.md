# #frontendDevelopers
A community for frontend developers on the [Slack](http://slack.com) platform.

## Requirements

  * [Node 6+](http://nodejs.org)
  * [RethinkDB](http://rethinkdb.com)
  * [LibSass](http://libsass.org)

## Getting Started

  * Copy `settings.sample.js` to `settings.js` and populate the fields in it  // TODO: create a CLI tool to handle this
  * `npm run db:setup` will set up the database and table in RethinkDB
  * `npm run server` will start the Node server in development mode
  * `npm run client` will start `webpack-dev-server` for the frontend of the project on port 8050, which will proxy the backend.
  * `npm run build` will build the frontend for production
  * `npm start` will start the server in production mode  // TODO: production mode needs more work and testing
  * `npm run clean` will delete the production files that webpack builds
