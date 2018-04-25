// import webpack from 'webpack';
// import { resolve } from 'path';
var resolve = require('path').resolve;
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //让css文件单独打包出来
var OpenBrowserWebpackPlugin = require("open-browser-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin'); 
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
var isPro = process.env.NODE_ENV === 'production';
module.exports = {
    entry,
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        // publicPath: '/',       //如果你require了一些资源或直接引用了网络上的资源，这些资源里包含uri属性（如css中设置img：url('./1.jpg')），就要使用就这个属性，否则会找不到文件。（如果没有使用uri资源,那么这个属性没什么用）。
    },
    // devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,  
                use: isPro ? ExtractTextPlugin.extract({
                    use: [
                        {
                        loader: 'css-loader',
                        },
                    ],
                    // fallback: 'style-loader',
                }) : ['style-loader','css-loader'],
            },
            {
                test: /\.scss$/,  
                use: isPro ? ExtractTextPlugin.extract({
                    use: [
                        {
                        loader: 'css-loader',
                        },
                        "sass-loader"
                    ],
                    // fallback: 'style-loader',
                }) : [ 'style-loader','css-loader','sass-loader'],
                // use: [ 'style-loader','css-loader','sass-loader']
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
        publicPath: '/dist',           //在开启服务后怎么去访问打包的文件
        hot: true,
        port: 8090,
        contentBase: [resolve(__dirname, './page/')]        //开启服务时，webpack会将contentBase包含文件背的所有url带有（../;./等）替换为localhost:8090
    },
    plugins: [
        new ExtractTextPlugin('./css/[name].css'),
        new webpack.HotModuleReplacementPlugin(),
        // new BundleAnalyzerPlugin({     //分析打包后每个文件体积
        //     analyzerMode: 'static',
        //     logLevel: 'error',
        // }),
        new webpack.DefinePlugin({
            isPro,
        }),
        new OpenBrowserWebpackPlugin({
            url: 'http://localhost:8090'
        }),
        new CleanWebpackPlugin(['dist/'], {  //清除dist文件夹中重复的文件
            root: resolve(__dirname, '.'),
          }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
        }),
    ]
}
console.log("process.env.NODE_ENV 的值是(webpack.config.prod.js)："+ process.env.NODE_ENV)