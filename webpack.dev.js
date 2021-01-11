const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv').config()

module.exports = {
    mode: 'development',
    entry: {
        polyfill: 'babel-polyfill',
        app: './src/client/index.js'
    },
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
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            }
        ]
    },
    stats: {
        warningsFilter: [/Failed to parse source map/],
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
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(dotenv.parsed)
        }),
        // new NunjucksWebpackPlugin({
        //     templates: [
        //       {
        //         from: "./src/client/templates/test.njk",
        //         to: "index.html"
        //       }
        //     ]
        // })
    ],
    // proxy: {
    //     "/getMovies": "http://localhost:3000"
    //   }
}