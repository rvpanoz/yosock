/**
 * App Server
 **/
const config = require('./config');
const moment = require('moment');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');

io.on('connection', function (client) {

  /**
   * user:joined
   * @return
   */
	client.on('user:joined', function (data) {
    var cid = client.id;
		var clientIpAddress = client.request.headers['x-forwarded-for'] || client.request.connection.remoteAddress;

		/**
		 * Broadcast message to all users
		 * @type {String}
		 */
		io.emit('user:joined:all', {
			message: 'A new user (' + clientIpAddress + ') has joined',
			cip: clientIpAddress
		});

  });

	client.on('comment:add', function(data) {
		var comment = data.comment;
		var clientIpAddress = client.request.headers['x-forwarded-for'] || client.request.connection.remoteAddress;

		io.emit('comment:add:all', {
			comment: comment,
			cip: clientIpAddress
		});
	})

	client.on('code:updated', function(data) {
		var code = data.code;
		/**
		 * Broadcast code to all users
		 * @type {String}
		 */
		io.emit('code:updated:all', {
			code: code
		});
	});

});

http.listen(config.PORT, config.IP, function () {
	console.log('listening on ' + config.PORT);
});
