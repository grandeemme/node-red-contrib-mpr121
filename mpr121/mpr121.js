

module.exports = function(RED) {
	var Mpr121 = require('mpr121.js');
	
	
	function Mpr121InterruptNode(config) {
		RED.nodes.createNode(this, config);
		var node = this;

		// Address, I2c Bus, Gipio interrupt
		var mod = new Mpr121(0x5A, 1);

		mod.notifyTouch = function(pin) {
			var msg = {
				payload : pin
			}
			node.send(msg);
		}

		mod.notifyRelease = function(pin) {
			var msg = {
				payload : pin
			}
			node.send(msg);
		}

		mod.startInterrupt(4);
	}
	RED.nodes.registerType("mpr121-interrupt", Mpr121InterruptNode);
}