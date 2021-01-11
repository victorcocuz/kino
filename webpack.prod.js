const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        polyfill: 'babel-polyfill',
        app: './src/client/index.js'
    },
    output: {
        libraryTarget: 'var',
        library: 'Client' // All js is accessible through client library - can be any name.
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCssAssetsPlugin({})]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: [
                    { 
                        loader: 'source-map-loader',
                        options: {
                            filterSourceMappingUrl: (url, resourcePath) => {
                                if (/.*\/node_modules\/.*/.test(resourcePath)) {
                                    return false
                                }
                                return true
                            }
                        }
                    }],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [ 
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    {
                        loader: 'sass-loader',
                        options: {
                          implementation: require('sass')
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({filename: '[name].css'}),
    ]
}