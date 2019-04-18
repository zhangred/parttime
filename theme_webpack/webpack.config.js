var webpack = require('webpack');
var path = require('path');
// var MiniCssExtractPlugin = require("mini-css-extract-plugin")
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var optimizeCss = require('optimize-css-assets-webpack-plugin');
// var CopyWebpackPlugin = require("copy-webpack-plugin");

// console.log(process.env)
module.exports = {
    devtool: 'eval-source-map',
    mode:'development',
    entry:  __dirname + "/entry.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist",//打包后的文件存放的地方
        filename: "tools .js"//打包后输出文件的文件名
    }
}

