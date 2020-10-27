# API - File Upload

## Description

File upload API to aws S3

API - Stack:

- [TypeScript](https://www.typescriptlang.org/).
- [Node.js](https://nodejs.org/).
- [MySQL](https://www.mysql.com/).
- [Sequelize](https://sequelize.org/).
- [Hapi](https://hapi.dev/).
- [Hapi-swagger](https://github.com/glennjones/hapi-swagger).
- [XHelpers-api](https://www.npmjs.com/package/xhelpers-api).
- [Docker](https://www.docker.com/).

## State

|            |           |
| ---------- | --------- |
| Develop    | [pending] |
| Homolog    | [pending] |
| Production | [pending] |

## Installation

```bash
$ npm install
# windowsenv
$ npm install -g cross-env
```

## Configuration

API configuration on .env file.

DEVS: Create .env file on root folder.

```bash
HOST=localhost
PORT=3020
SSL=false


JWT_SECRET=teste
JWT_ISSUER=lucashamaguchi
JWT_EXPIRE=12h

# AWS S3
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=textractpipeline-documentsbucket9ec9deb9-382h7lq1xrh
AWS_S3_TMP_BUCKET=bucket-tmp
```

## Running the app

```bash
# build tsc
$ npm run build

# development
$ npm run dev

# production
$ npm run start
```

#### Routes

```code
Starting Xhelpers Hapi server API
Settings API: Mongoose enabled;
🆙  Connected to mongodb: 5.8.11/mongodb+srv://admin:.........
Settings API: Sequelize disabled;
Settings API: SSL disabled;
Settings API: SSO disabled;
====================================================================================================
🆙  Server running at: http://localhost:3020/api/
🆙  Server docs running at: http://localhost:3020/api/documentation
====================================================================================================
Routing table:
        🔎  get -         /api/documentation
        🔎  get - 🔑      /api/files
        🔎  get -         /api/documentation/swagger.json
        📄  post - 🔑     /api/files/upload
====================================================================================================
```

## AWS

```
$ Pending
```

## Test

[Pending]

## Support

[Pending]
