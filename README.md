# YO! MovieYo

## Info

1. Project is a monorepo with two packages, both are `serveless` services. Monorepo managed with `lerna`.
2. `yo-api-fe` is an endpoint with configuration from TMDB API (dynamodb used to cache that config [avoid hitting request limitation]).
3. `yo-fe` React Server Side Rendered application served by serverless express application
4. Please use `yarn`
5. I use node 8.10 everywhere in the project - same as AWS Lambda.

## Install

### In order to run project locally you need to have AWS credentials for `serverless` to talk to real DyanamoDB (you can create one by running `sls deploy` in `yo-fe`). This is not ideal but can be fixed by adding e.g. `serverless-dynamodb-local`.

First create .env files for local development in both packages using provided templates
```
mv packages/yo-fe/.env.local.template packages/yo-fe/.env.local
mv packages/yo-api-tmdb/.env.local.template packages/yo-api-tmdb/.env.local
```
Replace `__YOUR_TMDB_API_KEY__` with your key.

```
nvm use
yarn install

yarn start:dev
```

This will start two `serverless offline` processes for both packages resulting in two local endpoints:
 - localhost:4000 - SSR frontend
 - localhost:3000/tmdb/config - endpoint to get tmdb configuration

 ## Development

- Support for livereload when running with `start:dev`.

## Testing

All tests with `jest`. FE uses `Enzyme`.

You can provide `--watch` parameter to `yarn test` in order to enable watch mode.

## Build & Deploy

Project contains basic CircleCi config with deployment to AWS via sls deploy.
