'use strict';

//localStorage
import {LocalStorage} from 'backbone.localstorage';

var Model = Backbone.Model.extend({
  defaults: {
    comment: '',
    cip: '',
    created_at: new Date()
  }
});

var Collection = Backbone.Collection.extend({
    model: Model
});

module.exports = {
  Model: Model,
  Collection: Collection
}
