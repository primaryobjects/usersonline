var remoteip = require('remoteip');

exports.visitorList = [];

exports.logger = function(req, res, next) {
	var _private = {};
	
	_private.addZero = function(num) {
		return (num >= 0 && num < 10) ? "0" + num : num + "";
	}
	
	if (req.session == null) {
		console.log("**** ERROR: The module 'usersonline' requires sesson to be enabled. Please add the following two lines to your app.config, inside app.configure(), just before app.use(usersonline.logger):");
		console.log("****   app.use(express.cookieParser('mycookie'));");
		console.log("****   app.use(express.session());");
	}	
	else if (req.session.start == null) {
		req.session.start = 1;

		var now = new Date();
		var hours = now.getHours();
		if (hours > 12) {
			hours = hours - 12;
		}
		
		var strDateTime = [[now.getMonth() + 1, now.getDate(), now.getFullYear()].join("/"), [hours, _private.addZero(now.getMinutes()), _private.addZero(now.getSeconds())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");

		var visitor = {
			date: strDateTime,
			url: req.url,
			userAgent: req.headers['user-agent'],
			ip: remoteip.get(req),
			referer: req.headers['referer']
		};
		
		exports.visitorList.push(visitor);

		// Keep the list at 100.
		if (exports.visitorList.length > 100) {
			exports.visitorList.splice(0, exports.visitorList.length - 100);
		}
	}

	next();
}
