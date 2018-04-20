var path = require('path')
var webpack = require('webpack')

module.exports = {
	entry:'./app/main.js',
	output:{
		path:path.resolve(__dirname, './dist'),
		filename:'build.js'
	},
	module:{
		rules:[
		{
			test:/\.vue$/,
			loader:'vue-loader'
		},
		{
			test:/\.js$/,
			loader:'babel-loader',
			exclude:/node_modules/
		},
		{ 	test: /\.css$/,
			loader: 'css-loader'
		}
		]
	},
	plugins:[
	new webpack.ExternalsPlugin('commonjs', [
		'electron'
		]),
	new webpack.LoaderOptionsPlugin({
		options: {
			babel: {
				"presets":["es2015"],
				"plugins":["transform-runtime"]
			}
		}
	})
	],
	resolve:{
		alias:{
			vue: 'vue/dist/vue.js'
		}
	}
}
