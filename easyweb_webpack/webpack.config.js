var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin');
var optimizeCss = require('optimize-css-assets-webpack-plugin');
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry:{
        index:'./src/entry/index.js',
        article:'./src/entry/article.js'
    },
	output: {
		path: path.resolve(__dirname, 'dist/'),
        // filename: 'javascripts/[name].[chunkhash:8].js'
        filename: 'javascripts/[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // 只对入口文件处理
            name:'vendor',
            cacheGroups: {
                vendor: {
                    test: /node_modules\//,
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    performance: {
        hints:false     
    },        
	module:{
		rules:[
            {
                test: /\.(jpe?g|png|gif||svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=5&name=images/[name].[ext]&publicPath=../'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader?compact=false"
                }
            }
		]
	},
	plugins: [
        new CopyWebpackPlugin([{
            from: './src/images',
            to:'images'
        }]),
        new CopyWebpackPlugin([{
            from: './src/lib',
            to:'lib'
        }]),
//         new CopyWebpackPlugin([{
//             from: './src/api',
//             to:'api'
//         }]),
        new CopyWebpackPlugin([{
            from: './src/font',
            to:'font'
        }]),
        // new CopyWebpackPlugin([{
        //     from: './src/img',
        //     to:'img'
        // }]),
        new CopyWebpackPlugin([{
            from: './src/css',
            to: 'css'
        }]),
        new HtmlWebpackPlugin({
            hashkey:new Date().getTime(),
            filename: "index.html",
            template: "./src/pages/index.html",
            inject: false,
            hash: true,
            cache: true,
            showErrors: true,
            xhtml: false
        }),
        new HtmlWebpackPlugin({
            hashkey:new Date().getTime(),
            filename: "pages/article.html",
            template: "./src/pages/article.html",
            inject: false,
            hash: true,
            cache: true,
            showErrors: true,
            xhtml: false
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        host:'localhost',
        port:8777
    },
    mode: 'development'
}

// if (process.env.NODE_ENV === 'production') {
//     var hashkey = new Date().getTime();
//     module.exports.mode =  'development';
//     module.exports.plugins = (module.exports.plugins || []).concat([
//         new webpack.LoaderOptionsPlugin({
//             minimize: true
//         }),
//         new optimizeCss(),
//         new HtmlWebpackPlugin({
//             hashkey:hashkey,
//             title:"hello",
//             filename: "index.html",
//             template: "./index.html",
//             inject: true,
//             hash: true,
//             cache: true,
//             showErrors: true,
//             chunks: "",
//             chunksSortMode: "auto",
//             excludeChunks: "",
//             xhtml: false
//         })
//     ])
// }
