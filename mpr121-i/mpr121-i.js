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

		// Address, I2c Bus, Gipio interrupt
		this.mod = new Mpr121(config.address, config.i2cbus);

		this.mod.onTouch = function(pin) {
			var msg = {
				payload : {
					type : "touch",
					pin : pin
				}
			}
			var msgs = new Array(12);
			msgs[pin] = msg;

			node.send(msgs);
		}

		this.mod.onRelease = function(pin) {
			var msg = {
				payload : {
					type : "release",
					pin : pin
				}
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