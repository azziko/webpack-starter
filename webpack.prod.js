const path = require('path')
const common = require('./webpack.config')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExctarctPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExctarctPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExctarctPlugin({ filename: "[name].css"}),
    ],
    optimization: {
        minimizer: [
            new HtmlWebpackPlugin({
                title: 'Webpack template',
                filename: 'index.html',
                template: path.resolve(__dirname, 'src/template.html'),
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                },
            }),
        ]
    }
})