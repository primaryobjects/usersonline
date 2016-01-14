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
var session = require('express-session'),
    usersonline = require('usersonline');

var app = express();

app.use(session({ secret: 'secret-session-key', resave: false, saveUninitialized: false })); // Enable session.
app.use(usersonline.logger); // Enable usersonline.

app.get('/users', function(req, res, next) {
    res.json(usersonline.visitorList);
});
```

Note, if you are using express.static() for static files, the line `app.use(usersonline.logger)` must come before it.

To display the users online in a static HTML page, simply make a request to /users and display the resulting JSON, as follows:

## users.html

```
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script>
function getUsers() {
    $.get('/users', function(data) {
        for (var i in data) {
            var visitor = data[i];
            var status = $('#status');

            status.append((parseInt(i) + 1) + '. ' + visitor.date + ' - ' + visitor.ip + '<br>');
            status.append(visitor.userAgent + '<br>');
            status.append('landing: ');
            status.append("<a href='" + visitor.url + "', target='_blank'>" + visitor.url + "</a><br>");
            if (visitor.referer != undefined) {
                status.append('referer: ');
                status.append("<a href='" + visitor.referer + "', target='_blank'>" + visitor.referer + "</a><br>");
            }
            status.append('<br>');
        }
    });
}
$(document).ready(function() { getUsers(); });
</script>
</head>
<body>
    <h2>Users Online</h2>
    <div id="status"></div>
</body>
</html>
```

If you are using express routing, you can display the UsersOnline list in your view route, as follows:

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
