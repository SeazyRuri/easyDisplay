const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob-all');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports={
    entry:{
        index:"./src/index.js",
        "../view/snippets/html":"./src/lib/ace/src-noconflict/snippets/html.js",
        "../view/snippets/css":"./src/lib/ace/src-noconflict/snippets/css.js",
    },
    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,'dist/javascripts'),
        publicPath:"../javascripts/",
    },
    // mode: 'production',
    mode:'development',
    devtool: '#source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.min.js',
            'jquery$': 'jquery/dist/jquery.min.js',
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }]
            })
        },
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            },
            include: path.resolve(__dirname, "src"),
            exclude: path.resolve(__dirname, "src/lib"),
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            'Vue': 'vue',
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery",
        }),
        new HtmlWebpackPlugin({
            title: 'easyDisplay',
            filename: '../view/index.html', //基于output的路径
            template: './src/view/index.html', //基于配置的路径
            chunks: ['index',],
            chunksSortMode: 'manual', //按照上面的chunks顺序
        }),
        new ExtractTextPlugin("../stylesheets/[name].css"), //基于output的路径
        new PurgecssPlugin({
            paths: glob.sync([
                path.join(__dirname, `./src/view/*.html`),
                path.join(__dirname, `./src/vue/*.vue`),
                path.join(__dirname, `./src/*.js`)
            ])
        }),
    ],
}