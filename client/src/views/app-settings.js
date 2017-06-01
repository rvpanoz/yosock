'use strict';

import template from 'app-templates/common/app-settings.html';

var AppModal = Backbone.View.extend({
  template: template,

  initialize(params) {
    this.render();
  },

  render() {
    this.$el.html(this.template);
  }
});

module.exports = AppModal;
