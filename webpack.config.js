//Konfiguracja Webpack
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    devtool: 'eval-source-map',
    watch: true,
    mode: 'development',
    entry: {
        main: path.join(__dirname, 'js', 'app.js'),
    },
    output: {
        path: path.join(__dirname, 'dist')
    },
    devServer: {
        host: "192.168.1.14",
        port: 5000,
        disableHostCheck: true,
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', '@babel/preset-react'
                        ],
                        "plugins": [
                            [
                                "@babel/plugin-proposal-class-properties", {
                                "loose": true
                            }
                            ]
                        ]
                    }
                }
            }, {
                test: /\.(png|jpeg|jpg|svg|gif|woff|otf|mp3|wave|wav|eot|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }
            },
            {
                type: 'javascript/auto',
                test: /\.(json|html)$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            hash: false
        }),
        
    ]
}