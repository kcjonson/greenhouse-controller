const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: paths.clientIndexJs,
	output: {
		filename: process.env.NODE_ENV !== 'production'  ? '[name].js' : '[name].[chunkhash].js',
		path: paths.clientBuild,
		publicPath: paths.publicPath,
	},
	mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				include: paths.clientSrc,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.jsx$/,
				include: paths.clientSrc,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.web.js', '.js', '.web.jsx', '.jsx'],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.clientIndexHtml,
		}),
		new MiniCssExtractPlugin({
			filename: process.env.NODE_ENV !== 'production'  ? '[name].css' : '[name].[chunkhash].css',
			chunkFilename: process.env.NODE_ENV !== 'production'  ? '[id].css' : '[id].[chunkhash].css',
		}),
	],
};