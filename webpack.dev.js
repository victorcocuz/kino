const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Client' // All js is accessible through client library - can be any name.
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader', 
                    {
                        loader: 'sass-loader',
                        options: {
                          implementation: require('sass')
                        }
                    }
                ]            
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
        // new NunjucksWebpackPlugin({
        //     templates: [
        //       {
        //         from: "./src/client/templates/test.njk",
        //         to: "index.html"
        //       }
        //     ]
        // })
    ]
}