# motogp_rest_api

1. Before we get started

Make sure that you have NodeJS installed on your machine. After that, you have to install TypeScript and TypeScript Node.

> npm install -g typescript ts-node

In order to test HTTP request, we can use Postman to send sample requests.

------------------

> npm install --save @types/express express body-parser request cheerio
> npm install --save-dev nodemon

2. Configure the TypeScript configuration file

The idea is to put all the TypeScript files in the lib folder for development purpose, then for the production, we will save all the Javascript files in the dist folder. And of course, we will take advantage of the ES2015 in the project.

// tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "moduleResolution": "node",
        "pretty": true,
        "sourceMap": true,
        "target": "es6",
        "outDir": "./dist",
        "baseUrl": "./lib"
    },
    "include": [
        "lib/**/*.ts"
    ],
    "exclude": [
        "node_modules"
    ]
}

3. Edit the running scripts in package.json

"scripts": {
    "build": "tsc",
    "dev": "ts-node ./lib/server.ts",        
    "start": "nodemon ./dist/server.js",
    "prod": "npm run build && npm run start"
}
So, for the development, we can run a test server by running

> npm run dev

For production

> npm run prod