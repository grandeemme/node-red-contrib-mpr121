module.exports = function(RED) {
	var Mpr121 = require('mpr121.js');

	function Mpr121InterruptNode(config) {
		RED.nodes.createNode(this, config);
		var node = this;

		this.status({
			fill : "red",
			shape : "ring",
			text : "disconnected"
		});

		// Address, I2c Bus, Gpio interrupt
		this.mod = new Mpr121(parseInt(config.address), config.i2cbus);

		this.mod.onTouch = function(pin) {
			var msg = {
				payload : 1 ,
				action : "touch",
				pin : pin,
				address : parseInt(config.address),
				i2cbus : parseInt(config.i2cbus)
			}
			var msgs = new Array(12);
			msgs[pin] = msg;

			node.send(msgs);
		}

		this.mod.onRelease = function(pin) {
			var msg = {
				payload : 0 ,
				action : "release",
				pin : pin,
				address : parseInt(config.address),
				i2cbus : parseInt(config.i2cbus)
			}
			var msgs = new Array(12);
			msgs[pin] = msg;

			node.send(msgs);
		}

		this.mod.startInterrupt(config.gpio);

		this.status({
			fill : "green",
			shape : "dot",
			text : "connected"
		});
	}
	RED.nodes.registerType("mpr121-i", Mpr121InterruptNode);
}