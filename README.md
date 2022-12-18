<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Nest project integrated with the following technologies:

- DynamoDB.
- Serverless Framework.

## Installation

```bash
$ npm install
$ npm install -g serverless
$ serverless plugin install -n serverless-plugin-optimize 
$ serverless plugin install -n serverless-dynamodb-local 
$ serverless plugin install -n serverless-offline
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`API_KEY` = 12345

`IS_OFFLINE` = 'true'

`DYNAMODB_ENDPOINT` = 'http://localhost:6000/shell'

## Running the app

```bash
# build
$ npm run build

# local
$ serverless offline start -noPrependStageInUrl

# aws
$ serverless deploy
```

## Test

```bash
# unit tests
$ npm run test
```

## Stay in touch

- Author - [Elvis Calero](https://www.linkedin.com/in/elvis-calero-manueles/)
