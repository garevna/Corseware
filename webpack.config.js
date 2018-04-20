'use strict'

const fs = require('fs')
const path = require('path')
const glob = require("glob")
const webpack = require("webpack")

module.exports = {
    mode: 'production',
    entry: '/js/main.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
      rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: { presets: [ 'es2015' ] }
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
            test: /\.(png|jpe?g|gif|svg|ico)$/,
            loaders: [
                'url-loader?limit=5000&name=images/[name].[ext]',
                'image-webpack-loader'
            ]
        },
        {
            test: /https:\/\/drive\.google\.com\/uc*/,
            loader: 'file-loader',
            options: { name: 'images/[name]' }
        },
        {
            test: /\.styl$/,
            loader: ['style-loader', 'css-loader', 'stylus-loader']
        }
      ]
    },
    resolve: {

    }
}
