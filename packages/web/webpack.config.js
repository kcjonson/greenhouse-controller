/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const babelOpts = require('./.babelrc.js');

// The /dist/ folder gets hilariously large if we use filenames with the 
// content hash in them for development. We use this to turn that off.
const devMode = process.env.NODE_ENV !== 'production';


module.exports = {
	mode: devMode ? 'development' : 'production',
	devtool: devMode ? 'eval-source-map' : 'source-map',
	entry: {
		'main': './src/client/index.jsx',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		plugins: [
			new DirectoryNamedWebpackPlugin(),
		],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: babelOpts,
			},
			{
				test: /\.less$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 2,  // TODO: Why the hell is this actually needed? -KCJ
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env',
										{
											// TODO: Options? -KCJ
										},
									],
								],
							},
						},
					},
					'less-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
				loader: 'url-loader',
				options: {
					limit: 8192,
				},
			},
			{
				test: /\.svg$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							generator: (content) => svgToMiniDataURI(content.toString()),
						},
					},
				],
			},
		],
	},
	output: {
		filename: devMode ? '[name].js' : '[name].[contenthash].js',
		chunkFilename: devMode ? '[id].js' : '[id].[contenthash].js',
		path: path.resolve(__dirname, 'dist', 'client'),
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					priority: -10,
					reuseExistingChunk: true,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			'PRODUCTION': !devMode,
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[contenthash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
		}),
		new WebpackAssetsManifest({}),
	],
};