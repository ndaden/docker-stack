/* eslint-disable */
require("core-js");
require("regenerator-runtime");
const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const envKeys = Object.keys(process.env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});

let config = {
	mode: "development",
	entry: ["core-js/stable","regenerator-runtime/runtime","./src/index.js"],
	output: {
		path: path.resolve(__dirname, "./public"),
		filename: "./bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				resolve: { extensions: [".js", ".jsx"] }
			},
			{
				test: /\.(ttf|woff|woff2|eot|svg)$/,
				loader: "file-loader",
				options: {
					name: '[name].[ext]',
					outputPath: "assets/fonts",
					publicPath: "assets/fonts"
				}
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: "file-loader",
				options: {
					name: '[name].[ext]',
					outputPath: "assets/images",
					publicPath: "assets/images"
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			}]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
			publicPath: 'assets/css',
		}),
		new webpack.DefinePlugin(envKeys),
		//new BundleAnalyzerPlugin()
	],
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	},
	devServer: {
		public: "http://testsite.fr",
		contentBase: path.resolve(__dirname, "./public"),
		historyApiFallback: true,
		inline: true,
		open: true,
		hot: true,
		host: "0.0.0.0",
		disableHostCheck: true,
		port: 9090
	},
	devtool: ""
}

module.exports = config;
