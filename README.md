pin
===

This allows you to generate short numbers (pins) to create a peer connection between two browsers.

## running the server

### Locally

The server can be run locally with

    node lib/server.js

### Heroku

Once you're [all set up](https://devcenter.heroku.com/articles/quickstart) with heroku, you should be able to deploy the app with

```bash
heroku create
git push heroku
```


### Client

```js
// first - get set up with PeerJS
var peer = new Peer({key: 'my-peer-key'});

// now hook up the pin generator
var pin = new Pin(peer, 'http://my-pin-generator.herokuapp.com');


// ... now, pin can be used in two ways, 
// 1. Generate a pin

pin(function(digits){
	alert("PIN: " + digits.join(', '))
})

.on('connect', function(dataConnection){
	// user is connected
	dataConnection.on('data', function(message){
		alert(message)
	})
	dataConnection.send('hello from pin enterer')
})


// 2. Use a pin to connect to another client

pin('1234')

.on('connect', function(dataConnection){
	// user is connected
	dataConnection.on('data', function(message){
		alert(message)
	})
	dataConnection.send('hello from pin enterer')
})
```
