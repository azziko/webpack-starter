const path = require('path')
const glob = require('glob')
const common = require('./webpack.config')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExctarctPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].bundle.js',
    },
    devtool: 'source-map',
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
        new MiniCssExctarctPlugin({ filename: './css/[name].css', chunkFilename: "[id].css"}),
        new PurgecssPlugin({
            paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,  { nodir: true }),
        }),
    ],
    optimization: {
        usedExports: true,
        minimizer: [
            new HtmlWebpackPlugin({
                title: 'Webpack template',
                filename: 'index.html',
                favicon: path.resolve(__dirname, 'src', 'assets', 'images', 'icon.png'),
                template: path.resolve(__dirname, 'src/template.html'),
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                },
            }),
            new TerserPlugin(),
        ]
    }
})