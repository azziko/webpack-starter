const path = require('path')
const common = require('./webpack.config')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        host: 'localhost',
        port: 9000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack template',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/template.html'),
        })
    ],
});