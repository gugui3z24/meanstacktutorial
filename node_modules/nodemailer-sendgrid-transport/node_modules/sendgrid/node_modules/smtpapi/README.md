# smtpapi-nodejs

This node module allows you to quickly and more easily generate SendGrid X-SMTPAPI headers.

[![BuildStatus](https://travis-ci.org/sendgrid/smtpapi-nodejs.png?branch=master)](https://travis-ci.org/sendgrid/smtpapi-nodejs)
[![NPM version](https://badge.fury.io/js/smtpapi.png)](http://badge.fury.io/js/smtpapi)

```javascript
var smtpapi   = require('smtpapi');
var header    = new smtpapi();
header.addTo('you@youremail.com');
header.setUniqueArgs({cow: 'chicken'});

var smtpapi_header_string = header.jsonString();
```

See [this](http://sendgrid.com/docs/API_Reference/SMTP_API/) for more information on the available X-SMTPAPI custom handling instructions.

## Installation

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x therefore you likely already have it.

Add the following to your `package.json` file:

```json
{
  ...
  "dependencies": {
    ...
    "smtpapi": "1.2.0"
  }
}
```

Install smtpapi-nodejs and its dependencies:

```bash
npm install
```

## Usage

### Initializing

```javascript
var smtpapi   = require('smtpapi');
var header    = new smtpapi();
```

### jsonString

This gives you back the stringified json formatted X-SMTPAPI header. Use this with your [smtp client](https://github.com/andris9/simplesmtp) of choice.

```javascript
var smtpapi   = require('smtpapi');
var header    = new smtpapi();
header.jsonString();
```

### addTo

```javascript
var header     = new smtpapi();
header.addTo('you@youremail.com');
header.addTo('other@otheremail.com');
```

### setTos

```javascript
var header     = new smtpapi();
header.setTos(['you@youremail.com', 'other@otheremail.com');
```

### addSubstitution

```javascript
var header     = new smtpapi();
header.addSubstitution('keep', ['secret']);
header.addSubstitution('other', ['one', 'two']);
```

### setSubstitutions

```javascript
var header     = new smtpapi();
header.setSubstitutions({'keep': ['secret'], 'other': ['one', 'two']});
```

### addUniqueArg

```javascript
var header     = new smtpapi();
header.addUniqueArg('cat', 'dogs');
```

### setUniqueArgs

```javascript
var header     = new smtpapi();
header.setUniqueArgs({cow: 'chicken'});
header.setUniqueArgs({dad: 'proud'});
```

### addCategory

```javascript
var header     = new smtpapi();
header.addCategory('tactics');
header.addCategory('advanced');
```

### setCategories

```javascript
var header     = new smtpapi();
header.setCategories(['tactics', 'advanced']);
```

### addSection

```javascript
var header     = new smtpapi();
header.addSection('-charge-', 'This ship is useless.');
```

### setSections

```javascript
var header     = new smtpapi();
header.setSections({'-charge-': 'This ship is useless.', '-other': 'Another section here'});
```

### addFilter

You can add filter settings one at a time.

```javascript
var header     = new smtpapi();
header.addFilter('footer', 'enable', 1);
header.addFilter('footer', 'text/html', '<strong>boo</strong>');
```

### setFilters

You can set a filter using an object literal.

```javascript
var header     = new smtpapi();
header.setFilters({
  'footer': {
    'setting': {
      'enable': 1,
      'text/plain': 'You can haz footers!'
    }
  }
});
```

### setSendAt

You can set the send_at scheduling param using an UNIX timestamp.

```javascript
var header     = new smtpapi();
header.setSendAt(1409348513);
```

### setSendEachAt

You can set the send_each_at scheduling param using a list of UNIX timestamps.

```javascript
var header     = new smtpapi();
header.setSendEachAt([1409348513, 14093485134]);
```

### addSendEachAt

You can append one or more send_each_at scheduling param(s) to the existing ones using an UNIX timestamp.

```javascript
var header     = new smtpapi();
header.setSendEachAt([1409348511, 14093485132]);
header.addSendEachAt(1409348513]);
header.addSendEachAt(14093485134);
```

### setASMGroupID

You can set the ASM Group ID.

```javascript
var header     = new smtpapi();
header.setASMGroupID(123);
```

### [IP Pools](https://sendgrid.com/docs/API_Reference/Web_API_v3/IP_Management/ip_pools.html)

```javascript
header.setIpPool("testPool");
```

## SendGrid SMTP Example

The following example builds the X-SMTPAPI headers and adds them to nodemailer. Nodemailer then sends the email through SendGrid. You can use this same code in your application or optionally you can use [sendgrid-nodejs](http://github.com/sendgrid/sendgrid-nodejs).

```javascript
var nodemailer = require('nodemailer');
var smtpapi    = require('smtpapi');

// Build the smtpapi header
var header = new smtpapi();
header.addTo('you@youremail.com');
header.setUniqueArgs({cow: 'chicken'});

// Add the smtpapi header to the general headers
var headers    = { 'x-smtpapi': header.jsonString() };

// Use nodemailer to send the email
var settings  = {
  host: "smtp.sendgrid.net",
  port: parseInt(587, 10),
  requiresAuth: true,
  auth: {
    user: "sendgrid_username",
    pass: "sendgrid_password"
  }
};
var smtpTransport = nodemailer.createTransport(settings);

var mailOptions = {
  from:     "Fred Foo <foo@blurdybloop.com>",
  to:       "bar@blurdybloop.com",
  subject:  "Hello",
  text:     "Hello world",
  html:     "<b>Hello world</b>",
  headers:  headers
}

smtpTransport.sendMail(mailOptions, function(error, response) {
  smtpTransport.close();

  if (error) {
    console.log(error);
  } else {
    console.log("Message sent: " + response.message);
  }
});
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Running Tests

````bash
npm test
```
