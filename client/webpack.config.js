/**
 * webpack configuration file
 */

var path = require('path');
var webpack = require('webpack');
var isProd = (process.env.NODE_ENV === "'production'");

/**
 * Setup plugins based on environment
 * @return [array]
 */
function getPlugins() {

  /*
  * The DefinePlugin allows you to create global constants which can be configured at compile time.
  * expose NODE_ENV to webpack
  */

  var definePlugin = new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  });

  //provide plugin - Automatically loads modules
  var providePlugin = new webpack.ProvidePlugin({
		$: "jquery",
		jquery: "jquery",
		jQuery: "jquery",
    'window.jQuery': "jquery",
    _: "lodash",
    Backbone: "backbone",
    io: 'socket.io-client'
	});

  //hot module (dev only)
  var HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

  //UglifyJsPlugin
  var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin();

  //these plugins is common for prod || development
  var plugins = [providePlugin, definePlugin];

	// Conditionally add plugins for Production builds.
	if (isProd) {
		plugins.push(UglifyJsPlugin);
	}

	// Conditionally add plugins for Development builds.
	else {
		plugins.push(HotModuleReplacementPlugin);
	}

	return plugins;
}

/**
 * `__dirname` is root of project
 * `src` is the source directory
 */

var config = {
	context: path.join(__dirname, 'src'),
	devtool: 'source-map',
	entry: {
		app: './entry.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	devServer: {
		open: false,
		hot: true,
    host: '127.0.0.1',
    port: 3009,
		contentBase: path.join(__dirname, 'src')
	},
	resolve: {
		extensions: ['.js', '.json', '.css', '.scss'],
		modules: [
			path.join(__dirname, './src'), "node_modules"
		],
    alias: {
      config: './src/app-config',
      'app-templates': path.resolve(__dirname, 'src/templates'),
      'app-models': path.resolve(__dirname, 'src/models/'),
      'app-views': path.resolve(__dirname, 'src/views/')
    }
	},
	plugins: getPlugins(),
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}]
		}, {
			test: /\.html$/,
			use: [{
				loader: 'html-loader',
				options: {
					minimize: true
				}
			}],
		}, {
			test: /\.css$/,
			use: [
				"style-loader", "css-loader"
			]
		}, {
			test: /\.(sass|scss)$/, //Check for sass or scss file names
			use: [
				'style-loader',
				'css-loader',
				'sass-loader',
			]
		}, {
			test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
			loader: 'file-loader?name=[name].[ext]'
		}, {
			test: /\.(jpe?g|png|gif)$/i,
			use: [
				'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
				'image-webpack-loader?bypassOnDebug'
			]
		}]
	}
};

module.exports = config;
