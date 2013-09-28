function defaults(what, to){
	return what === undefined ? to : what;
}

module.exports  = function(digits, retain_size){
 	digits = digits || 4;
 	retain_size = retain_size || Math.pow(10,digits) * 0.25;

 	var n = Math.pow(10,digits),
 			window = n - retain_size,

 	// will be persistent
 			data = {},
 			i = 0;

 	return function generator(){

 		// transaction ---

 		// increment and wrap
 		i = (i + 1) % n;
 		var j = (Math.floor(Math.random()*window) + i) % n;
 		
 		// swap
 		var tmp = defaults(data[j], j);
 		data[j] = defaults(data[i], i);
 		data[i] = tmp;

 		// end transaction ---

 		// convert the value to digits
 		var pin = [];
 		for(var digit = 0; digit < digits; digit ++){
 			pin[digit] = Math.floor(tmp / Math.pow(10,digit) % 10)
 		}

 		pin.reverse() // just to make debugging easier

 		return pin;
 	}
}
