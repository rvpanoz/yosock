/**
 * Backbone router
 */

module.exports = Backbone.Router.extend({
  routes: {
    '*actions': 'do_action'
  },
  do_action: function (view, params) {

    //set default view
    if(!view || view === null) {
      view = "home";
    }

    //require view
    var View = require('app-views/' + view);

    //Instatiate the view
    var page = new View(params);

    //load the view into the DOM
    $('#app-content').html(page.$el);

  }
});
