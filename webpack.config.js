'use strict'

const fs = require('fs')
const path = require('path')
const glob = require("glob")
const webpack = require("webpack")

module.exports = {
    mode: 'production',
    entry: {
      filename: 'js/main.js'
    },
    output: {
        filename: 'build/index.js'
    },
    module: {
      rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules//*,
            query: { presets: [ 'es2015' ] }*/
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
        alias: {
            'js': path.join(__dirname, 'js'),
            'css': path.join(__dirname, 'css'),
            'img': path.join(__dirname, 'images'),
            'json': path.join(__dirname, 'json'),
            'build': path.join(__dirname, 'build')
        }
    }
}
