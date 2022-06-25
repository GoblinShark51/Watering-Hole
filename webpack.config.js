const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: path.resolve(__dirname, './client/index.js'),
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },
    
    devServer: {
        static: {
          directory: path.join(__dirname, 'client'),
        },
        compress: true,
        port: 8080,
      },
      plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, './client/index.html'),
    })],
    //Loaders
    module: {
        rules: [
            {
                test: /\.scss$/i,
                exclude: /(node_modules)/,
                use: ["style-loader", "sass-loader", "css-loader"],
            },

            {
                test: /\.css$/i,
                exclude: /(node_modules)/,
                use: ["style-loader", "css-loader"],
            },

            {
                test: /\.jsx?/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                },
            },
        ],
      },
  };