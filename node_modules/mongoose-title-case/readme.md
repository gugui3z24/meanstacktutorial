## mongoose-title-case
A mongoose.js plugin for titlizing & trimming schemas.

### Installation
```
$ npm install mongoose-title-case --save
```

### Usage
Mongoose plugin style.

```javascript
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    titlize = require('mongoose-title-case'),

var userSchema = new Schema({
  name: {
    first: String,
    last:  String
  }
});

// Attach some mongoose hooks
userSchema.plugin(titlize, {
  paths: [ 'name.first', { path: 'name.last', trim: false } ], // Array of paths
  trim: true
});

module.exports = mongoose.model('User', userSchema);
```

And watch it work

```javascript

var User   = require('path/to/model');

var document = new User({
  name: {
    first: ' bob ',
    last:  'ross '
  }
});

document.save().then(record => {
  console.log(record.name.first); // 'Bob'
  console.log(record.name.last); // 'Ross '
});
```

### Options

There are only two options used in mongoose-title-case

+ **options.paths** {Array} (*Required*) Array of paths to title case & trim
+ **options.trim** {Boolean} Trim all paths. `true` by default
