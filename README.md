# node-red-contrib-mpr121
Nodes for interacting with MPR121

The package provide two different node:
- mpr121-i: Interrupt driven node
- mpr121-p: Polling driven node

##Install
```
npm install node-red-contrib-mpr121
```

##Interrupt
The interrupt node provide a 12 different output, one per pin.

The output send two different message, one for touch, one for release.

The payload contains two values:
- type: the type of event [**touch**, **release**]
- pin: the number of the pin [**0..11**]

Message for touch event
```javascript
var msg = {
	payload : 1 ,
	action : "touch",
	pin : pin,
	address : parseInt(config.address),
	i2cbus : parseInt(config.i2cbus)
}
```

Message for release event
```javascript
var msg = {
	payload : 0 ,
	action : "release",
	pin : pin,
	address : parseInt(config.address),
	i2cbus : parseInt(config.i2cbus)
}
```

###Usage
Add the node like this

![mpr121-i](https://raw.githubusercontent.com/grandeemme/node-red-contrib-mpr121/master/readme/mpr121-i.png)

##Polling
The polling node provide a 12 different output, one per pin.

The output send three different message, one for touch, one for release and one for value.

The payload contains two values:
- type: the type of event [**touch**, **release**, **value**]
- pin: the number of the pin [**0..11**]

Message for touch event
```javascript
var msg = {
	payload : 1 ,
	action : "touch",
	pin : pin,
	address : parseInt(config.address),
	i2cbus : parseInt(config.i2cbus)
}
```

Message for release event
```javascript
var msg = {
	payload : 0 ,
	action : "release",
	pin : pin,
	address : parseInt(config.address),
	i2cbus : parseInt(config.i2cbus)
}
```

###Usage
Add the node like this

![mpr121-i](https://raw.githubusercontent.com/grandeemme/node-red-contrib-mpr121/master/readme/mpr121-p.png)
