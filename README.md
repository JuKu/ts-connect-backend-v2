# ts-connect-backend-v2

[![CircleCI](https://circleci.com/gh/JuKu/ts-connect-backend-v2/tree/master.svg?style=svg)](https://circleci.com/gh/JuKu/ts-connect-backend-v2/tree/master)
[![Known Vulnerabilities](https://snyk.io/test/github/JuKu/ts-connect-backend-v2/badge.svg)](https://snyk.io/test/github/JuKu/ts-connect-backend-v2)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=JuKu_ts-connect-backend-v2&metric=ncloc)](https://sonarcloud.io/dashboard/index/JuKu_ts-connect-backend-v2)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=JuKu_ts-connect-backend-v2&metric=alert_status)](https://sonarcloud.io/dashboard/index/JuKu_ts-connect-backend-v2)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=JuKu_ts-connect-backend-v2&metric=coverage)](https://sonarcloud.io/dashboard/index/JuKu_ts-connect-backend-v2)
[![Technical Debt Rating](https://sonarcloud.io/api/project_badges/measure?project=JuKu_ts-connect-backend-v2&metric=sqale_index)](https://sonarcloud.io/dashboard/index/JuKu_ts-connect-backend-v2)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=JuKu_ts-connect-backend-v2&metric=code_smells)](https://sonarcloud.io/dashboard/index/JuKu_ts-connect-backend-v2)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=JuKu_ts-connect-backend-v2&metric=bugs)](https://sonarcloud.io/dashboard/index/JuKu_ts-connect-backend-v2)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=JuKu_ts-connect-backend-v2&metric=vulnerabilities)](https://sonarcloud.io/dashboard/index/JuKu_ts-connect-backend-v2)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=JuKu_ts-connect-backend-v2&metric=security_rating)](https://sonarcloud.io/dashboard/index/JuKu_ts-connect-backend-v2)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=JuKu_ts-connect-backend-v2&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=JuKu_ts-connect-backend-v2)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=JuKu_ts-connect-backend-v2&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=JuKu_ts-connect-backend-v2)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=JuKu_ts-connect-backend-v2&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=JuKu_ts-connect-backend-v2)

[![Sonarcloud](https://sonarcloud.io/api/project_badges/quality_gate?project=JuKu_ts-connect-backend-v2)](https://sonarcloud.io/dashboard?id=JuKu_ts-connect-backend-v2)


A second attempt to build the backend for the TenSing Connect App - with NestJS instead of plain express

Old version: https://github.com/JuKu/ts-connect-backend

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Count lines of code

```bash
cloc src
```

## Look into the Docker image

```bash
sudo docker run -it jukusoft/ts-connect-webapi:deploy-latest sh
```

## License

Nest is [Apache 2.0 licensed](LICENSE).
