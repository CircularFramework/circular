var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './example/app/app.js',
	output: {
		filename: './example/index.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				use: [
					{ loader: 'babel-loader' },
					{ loader: 'circular-loader' }
				],
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						minimize: true
					}
				}
			},
			{
				test: /\.scss$/,
				use:[
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				test: /\.css$/,
				use:[
					{ loader: 'css-loader' }
				]
			}
		]
	},
	resolveLoader: {
		alias: {
			'circular-loader': path.join(__dirname, 'src/webpack', 'circular-loader.js')
		}
	},
	resolve: {
		extensions: ['.js']
	}
};