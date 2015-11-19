UsersOnline
--------

List the most recent 100 users visiting your site and display the date, time, IP address, user agent, landing page, referring url.

This module tracks each new user that first visits your site, by activating upon the start of a new session. When a new session is activated, the user's referring url information is added to a queue. You can output the queue in your view, such as on an administrator page, to get a quick view of the users accessing your site.

For example:
```
1. 4/23/2013 11:42:07 AM - 127.0.0.1
Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31
landing: http://www.primaryobjects.com/users
referer: http://www.google.com/search?q=software+design&aq=0&oq=software+design
```

## Usage

Install the node.js module.
```bash
$ npm install usersonline
```

## app.js
```
var usersonline = require('usersonline');

app.configure(function(){
  ...    
  app.use(express.cookieParser('mycookie')); // Enable session in Express.
  app.use(express.session()); // Enable session in Express.
  app.use(usersonline.logger); // Enable UsersOnline.  
  app.use(app.router);  
  ...
});
```

Note, if you are using express.static() for static files, the line `app.use(usersonline.logger)` must come before it.

In your view route, you can display the UsersOnline list as follows:

## index.js
```
var usersonline = require('usersonline');

exports.index = function(req, res) {
  res.render('index', { visitorList: usersonline.visitorList });
};
```

## index.jade
```
each visitor, i in visitorList
	p
		div
			| #{i + 1}. #{visitor.date} - #{visitor.ip}
		div
			| #{visitor.userAgent}
		div
			| landing:
			a(href='#{visitor.url}', target='_blank') #{visitor.url}
		div
			if (visitor.referer != undefined)
				| referer:
				a(href='#{visitor.referer}', target='_blank') #{visitor.referer}						
```

## index.ejs
```
<%
var content = '';

for (var i=0; i<visitorList.length; i++) {
	content += '<p><b>' + (i + 1) + '.</b> ' + visitorList[i].date + ' - ' + visitorList[i].ip + '<br/>';
	content += visitorList[i].userAgent + '<br/>landing: <a href="' + visitorList[i].url + '" target="_blank">http://www.primaryobjects.com' + visitorList[i].url + '</a>';
	content += (visitorList[i].referer == undefined ? '' : '<br/>referer: <a href="' + visitorList[i].referer + '" target="_blank">' + visitorList[i].referer + '</a>');
	content += '</p>';
	
	myTemplateBlock = content;
}
%>
```

## Source

https://github.com/primaryobjects/usersonline

## Author

Kory Becker
http://www.primaryobjects.com
