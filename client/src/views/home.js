'use strict';

//imports
import Config from '../app-config';
import template from 'app-templates/home.html';

//comment view
import CommentView from 'app-views/common/comment';

//comment model
import Schema from 'app-models/comment';

const CodeMirror = require('codemirror');

//connect to server
var socket = io(Config.baseUrl);

var HomeView = Backbone.View.extend({
	template: template,

	events: {
		'click button.btn-add-comment': '_onAddComment',
		'keypress input': '_onKeypress'
	},
	_onKeypress(e) {
		if(e.which === 13) {
			this._onAddComment(e);
			return false;
		}
	},
	_onDOMReady() {
		$(document).ready(_.bind(function () {

			var container_live = this.$('.code-area')[0];
			var container_preview = this.$('.code-preview')[0];

			var appCodeMirror_live = CodeMirror(container_live, {
				mode: "javascript",
				lineNumbers: true,
				hightLight: true
			});

			var appCodeMirror_preview = CodeMirror(container_preview, {
				readOnly: true,
				nocursor: true,
				mode: "javascript"
			});

			//codemirror events
			appCodeMirror_live.on("change", function(inst, channges) {
				socket.emit('code:updated', {
					code: appCodeMirror_live.getValue()
				});
			});

			socket.on('code:updated:all', _.bind(function(data) {
				var code = data.code;
				appCodeMirror_preview.setValue(code);
			}, this));

			socket.on('user:joined:all', _.bind(function(data) {
				var message = data.message;
				var cip = data.cip;

				this._addComment(message, cip);
			}, this));

		}, this));
	},

	_addComment(comment, cip) {
		var commentModel = new Schema.Model({
			comment: comment,
			cip: cip
		});

		var commentViewInst = new CommentView({
			model: commentModel
		});

		this.$('section.comments').append(commentViewInst.$el);
		return false;
	},

	_onAddComment(e) {
    e.preventDefault();
    var comment = $.trim(this.$('input#user-comment').val());

		var isValid = $.trim(comment);
		if(!isValid.length) {
				var comment = '<span class="alert alert-danger">Please add comment!</span>';
				this._addComment(comment, 'SERVER:');
				return false;
		}

		socket.emit('comment:add', {
			comment: comment
		});

		this.$('input#user-comment').val('');
    return false;
  },

	/**
	 * View initialization
	 * @param  {[type]} params [description]
	 * @return
	 */
	initialize(params) {

		this.comments = new Schema.Collection();

		// register socket.io events
		socket.emit('user:joined', _.bind(function (data) {

		}, this));

		socket.on('comment:add:all', _.bind(function(data) {
			var comment = data.comment;
			var cip = data.cip;
			this._addComment(comment, cip);
		}, this));

		//render the view
		this.render();

		//on document ready
		this._onDOMReady();
	},

	/**
	 * render the template
	 * @return [type] [description]
	 */
	render() {
		this.$el.html(this.template);
	},

	onDisconnect(e) {
		e.preventDefault();
	}
});

module.exports = HomeView;
