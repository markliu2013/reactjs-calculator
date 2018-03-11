import path from 'path';

module.exports = {
	mode: 'development',
	entry: [ path.resolve(__dirname, 'js', 'app.js') ],
	output: {
		path: '/js/',
		filename: 'app.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{test: /\.css$/, loader: 'style-loader!css-loader'},
		]
	}
}

