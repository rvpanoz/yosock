'use strict';

import template from 'app-templates/common/comment.html';

var CommentView = Backbone.View.extend({
  template: template,

  initialize(params) {
    this.render();
  },

  render() {
    var tpl = _.template(this.template);
    this.$el.html(tpl(this.model.toJSON()));
  }
});

module.exports = CommentView;
