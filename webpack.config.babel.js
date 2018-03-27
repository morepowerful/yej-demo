// import webpack from 'webpack';
// import { resolve } from 'path';
var resolve = require('path').resolve;
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //让css文件单独打包出来
var OpenBrowserWebpackPlugin = require("open-browser-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin'); 
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
console.log(BundleAnalyzerPlugin);
// import { readdirSync, existsSync } from 'fs';
var readdirSync = require('fs').readdirSync;
var existsSync = require('fs').existsSync;
// import glob from 'glob';
var glob = require('glob');
var entry = (function() {     //第一种获取多文件入口
    var entryObj = {};
    readdirSync(resolve(__dirname, './src/js')).forEach(function(val) {
        if (val.split('')[0] === '.') return;
        var dirPath = resolve(__dirname, './src/js/' + val);
        var jsxPath = resolve(dirPath, 'index.jsx');
        var jsPath = resolve(dirPath, 'index.js');
        entryObj[val] = existsSync(jsxPath) ? jsxPath : jsPath;
    })
    return entryObj;
})()
// var entry = function(path) {  //第二种获取多文件入口
//     // path = './src/js/*/index.js?(x)'
//     var entryObj = {};
//     glob.sync(path).forEach(function(val) {
//         var objName = /.*\/js\/(.*)\/index.js/.exec(val);
//         entryObj[objName[1]] = val;
//     })
//     return entryObj;
// }
module.exports = {
    entry,
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        // publicPath: '/dist',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,  
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                        loader: 'css-loader',
                        },
                    ],
                    // fallback: 'style-loader',
                }),
            },
            {
                test: /\.scss$/,  
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                        loader: 'css-loader',
                        },
                        "sass-loader"
                    ],
                    // fallback: 'style-loader',
                }),
            },
            {
                test: /\.jsx?$/,
                include: resolve(__dirname, './src'),
                use: 'babel-loader',
            },
            {
                test: /\.png$/,  
                use: 'url-loader?outputPath=image/'
            }
        ]
    },
    devServer: {
        publicPath: '/dist',              //让index.html里同过../dist/xxx能访问到
        hot: true,
        port: 8090,
        contentBase: [resolve(__dirname, './page/')]
    },
    plugins: [
        new ExtractTextPlugin('./css/[name].css'),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin({     //分析打包后每个文件体积
            analyzerMode: 'static',
            logLevel: 'error',
        }),
        new webpack.DefinePlugin({
            devport: true,
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new OpenBrowserWebpackPlugin({
            url: 'http://localhost:8090'
        }),
        new CleanWebpackPlugin(['dist/'], {  //清除dist文件夹中重复的文件
            root: resolve(__dirname, '.'),
          }),
    ]
}
console.log("process.env.NODE_ENV 的值是(webpack.config.prod.js)："+ process.env.NODE_ENV)