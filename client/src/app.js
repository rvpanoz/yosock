//imports
import Config from './app-config';
import Router from './router';

//connect to server
var socket = io(Config.baseUrl);

//header module
import HeaderView from 'app-views/common/header';

module.exports = Backbone.View.extend({

  start() {

    //application's router
    this.AppRouter = new Router();

    //header view
    var headerView = new HeaderView();

    //attach header view
    $('nav').html(headerView.$el);

    //start backbone history
    Backbone.history.start();
  }
});
