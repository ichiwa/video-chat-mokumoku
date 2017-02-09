var path = require('path');

module.exports = {
	entry: './src/main.js',

	output: {
		path: path.join(__dirname, 'www'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
				}
			}
		]
	}
};
