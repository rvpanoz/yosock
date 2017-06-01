'use strict';

//imports
import template from '../../templates/common/header.html';

var HeaderView = Backbone.View.extend({
	template: template,

  events: {
    'click a.app-settings': '_onAppSettings'
  },

  _onAppSettings(e) {
    e.preventDefault();

		app.AppRouter.navigate('app-settings', {
			trigger: true
		});

    return false;
  },

	/**
	 * View initialization
	 * @param  {[type]} params [description]
	 * @return
	 */
	initialize(params) {

    //render the view
		this.render();
	},

	/**
	 * render the template
	 * @return [type] [description]
	 */
	render() {
		this.$el.html(this.template);
	}

});

module.exports = HeaderView;
