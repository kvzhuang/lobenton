"use strict";

var path = require("path");
var webpack = require("webpack");
var rootPath = path.resolve(__dirname, path.relative(__dirname,''));
var bundle = {
	bundle: [
		'babel-polyfill',
		'webpack-hot-middleware/client',
		'./src/client/index.js'
	],
	en:['./src/client/locales/en/en.js'],
	zhTW: ['./src/client/locales/zhTW/zhTW.js']
};

module.exports = function webpackDevConfigMain(config) {
	return {
		debug: true,
		context: rootPath,
		devtool: 'eval',
		entry: bundle,			
		resolve: {
			root: [ rootPath ],
			extensions: ["", ".js", ".jsx"]
		},
		output: {
			path: path.join(rootPath, '/public/build/'),
			publicPath: '/build',
			filename: config.name + '_[name].js',
			libraryTarget: 'var',
			library: config.name + '_[name]'
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify("dev")
				}
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.OccurenceOrderPlugin()
		],
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules\/(?!lobenton)/,
					include: rootPath,
					query: {
						plugins: [
							[
								'react-transform', 
								{
									'transforms': [{
										'transform': 'react-transform-hmr',
										'imports': ['react'],
										'locals': ['module']
									}]
								}
							]
						],
						compact: false
					}
				},
				{
					test: /\.css$/,
					loader: "style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]",
					include: rootPath
				},
				{
	        test: /\.png$/,
	        loader: 'file'
	      },
				{
          test: /\.jpg$/,
          loader: 'file'
	      },
				{
          test: /\.gif$/,
          loader: 'file'
	      },
	      {
	        test: /\.svg$/,
	        loader: 'file'
	      }
			]
		}
	};
};