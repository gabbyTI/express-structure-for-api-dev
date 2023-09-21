# Express structure for api development

This is the folder structure i have devised for my API development journey with NodeJS. It has a working error handling system out-of-the-box. I will accept pull request if you have more things to add. Lets make something awesome!!. Star this repo if you like it.

## How to use

Download the repo and exptract files to your project directory.

Run >>npm update, on the project directory.

```
npm update
```

Run >>cp config.env.example config.env, on the project directory.

```
cp config.env.example config.env
```

Update your config.env file.

Start the application. Run >>npm start, on the project directory.

```
npm start
```

TBrowse the following url on a browser or postman: [http://127.0.0.1:7575/api/v1/helloWorld](http://127.0.0.1:7575/api/v1/helloWorld).

## Connecting the Database

In the ./server.js file, uncomment the DB connection method you would like to use. Remember to get your connection string from atlas cloud, if you are using ATas.
