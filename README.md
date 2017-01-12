## MEAN Stack Tutorial Application

This is an application demonstrating the basic components needed for a Single Page Application using MongoDB, ExpressJS, AngularJS, and NodeJS.

A working example can be found [here](https://evening-beach-50078.herokuapp.com/). Additionally, a YouTube tutorial series illustrating how create this application from scratch can be found [here](https://www.youtube.com/playlist?list=PL3vQyqzqjZ637sWpKvniMCxdqZhnMJC1d).

## Requirements

This application requires installation of NodeJS and MongoDB prior to running.

## Description

This application was created to highlight common methods used in MEAN Stack. It is meant for beginners or those interested in learning about the MEAN Stack infrastructure. MEAN Stack App is based on a RESTful API and MVC. 

## Installation

- Install all dependencies in package.json file. This can be done by navigating to the root directory in the command prompt/terminal/console (I will refer to it as command prompt) and running the following command:

```
$ npm install
```

- You must enter your own MongoDB configuration settings in the server.js file:

```
mongoose.connect('mongodb://gugui3z24:password@ds055594.mlab.com:55594/diselfuel29', function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err);
    } else {
        console.log('Successfully connected to MongoDB');
    }
});
```

- You must enter your own Facebook, Twitter, and Google passport.js configuration settings in /app/passport/passport.js:

``` 
passport.use(new FacebookStrategy({
        clientID: '', // Replace with your Facebook Developer App client ID
        clientSecret: '', // Replace with your Facebook Developer client secret
        callbackURL: "", // Replace with your Facebook Developer App callback URL
        profileFields: ['id', 'displayName', 'photos', 'email']
    }
```

```
passport.use(new TwitterStrategy({
        consumerKey: '', // Replace with your Twitter Developer App consumer key
        consumerSecret: '', // Replace with your Twitter Developer App consumer secret
        callbackURL: "", // Replace with your Twitter Developer App callback URL
        userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
    }
```

```
passport.use(new GoogleStrategy({
        clientID: '', // Replace with your Google Developer App client ID
        clientSecret: '', // Replace with your Google Developer App client ID
        callbackURL: "" // Replace with your Google Developer App callback URL
    }
```

- Installation is complete. Navigate to folder where server.js file is located and enter the following into command prompt:

```
$ npm start server.js
```

## Contributors

David Acosta.

## License

No license. 