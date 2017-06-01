'use strict';

//imports
import Bootstrap from 'bootstrap/dist/js/bootstrap.min';
import App from './app.js';

//css and scss
import 'bootstrap/dist/css/bootstrap.min.css';
import 'codemirror/lib/codemirror.css';

import 'animate.css/animate.min.css';
import './assets/sass/app.scss';

//make app a global object (singleton)
window.app = new App();

$(document).ready(function() {
  app.start();
});
