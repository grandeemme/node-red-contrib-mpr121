
module.exports = function(RED) {
	var Mpr121 = require('mpr121.js');

	function Mpr121InterruptNode(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		
		this.status({fill:"red",shape:"ring",text:"disconnected"});

		// Address, I2c Bus, Gipio interrupt
		this.mod = new Mpr121(0x5A, 1);

		this.mod.notifyTouch = function(pin) {
			var msg = {
				payload : pin
			}
			node.log("notifyTouch " + pin);
			node.send(msg);
		}

		this.mod.notifyRelease = function(pin) {
			var msg = {
				payload : pin
			}
			node.log("notifyRelease " + pin);
			node.send(msg);
		}

		this.mod.startInterrupt(config.gpio);
		
		this.status({fill:"green",shape:"dot",text:"connected"});
	}
	RED.nodes.registerType("mpr121", Mpr121InterruptNode);
}