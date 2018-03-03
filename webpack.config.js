import path from 'path';

module.exports = {
	entry: [ path.resolve(__dirname, 'js', 'app.js') ],
	output: {
		path: '/js/',
		publicPath: 'http://mycdn.com/', // This is used to generate URLs to e.g. images
		filename: 'app.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			// use ! to chain loaders
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			// inline base64 URLs for <=8k images, direct URLs for the rest
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
			{ test: /\.gif$/, loader: 'url-loader?mimetype=image/png' },
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=[name].[ext]' },
		]
	},
	resolve: {
		// you can now require('file') instead of require('file.js')
		extensions: ['', '.js', '.json']
	}
}

