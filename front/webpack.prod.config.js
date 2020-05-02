/* eslint-disable */
const path = require("path");
const webpack = require("webpack");
require("core-js");
require("regenerator-runtime");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const envKeys = Object.keys(process.env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});

let config = {
	mode: 'production',
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
		new webpack.DefinePlugin(envKeys)
	],
	devtool: "",
}

module.exports = config;

