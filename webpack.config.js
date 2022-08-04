const path = require('path')

module.exports = {
    mode: 'development',
    entry:{ 
        main: path.resolve(__dirname, 'src/index.js'),
        vendor: path.resolve(__dirname, 'src/vendor.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[name][ext]',
        publicPath: ".",
        clean: true,
    },
    performance : {
        hints : false
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'assets/resource',
                generator: {
                    filename: "./images/[name][ext]",
                },
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                type: 'asset/resource',
                generator: {
                  filename: './compiled/fonts/[hash][ext][query]'
                }
            },
        ]
    },
}