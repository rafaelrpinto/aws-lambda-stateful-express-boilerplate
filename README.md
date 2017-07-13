### Overview

Boilerplate for a stateful Express.js application running on AWS Lambda using:

- Claudia.js to deploy/manage AWS assets
- Babel to transpile code from es2017
- Webpack to bundle static files
- AirBnb eslint rules for code styling
- DynamoDB for session synchronization
- csurf for protection against CSRF
- Helmet.js to prevent several attack vectors
- Handlebars for server-side templating
- Local development with dynamodb_local

### Running locally

Start a local DynamoDB as [described here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) and run:

`npm start`

Then access the app on [https://localhost:8443](https://localhost:8443).

### Deploying to AWS

Setup AWS cli as [described here](https://docs.aws.amazon.com/lambda/latest/dg/setup.html).

Replace 'eu-west-2' by the desired region on package.json and policies/access-dynamodb.json. If the aws cli local profile is different than 'default' you must change the 'deploy' script on package.json to inform the desired profile to claudia.js. Then run:

`npm run deploy`

Don't forget to add a trailing '/' on the lambda URL if you are not using a custom domain, otherwise relative paths won't work.

### Updating a deployed app

`npm run update`

### Destroying/undeploying the app

`npm run update`
