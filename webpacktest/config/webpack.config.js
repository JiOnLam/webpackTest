const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js",
        product: "./src/product.js",
        tpl2:"./src/tpl2.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // {loader:"style-loader"},
                    { loader: miniCssExtractPlugin.loader },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // {loader:'style-loader'},
                    { loader: miniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    { loader: "url-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    // {loader:'style-loader'},
                    { loader: miniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({//构造函数传参
            //在模板html里面通过<%=htmlWebpackPlugin.options.title %> 调用title
            title: "网页标题",//网页标题
            template: './src/tpl.html',//处理html模板路径
            inject: 'head',//自动写入js的位置[head body false]
            minify: {//html压缩规则
                removeComments: false, //是否移除注释
                removeAttributeQuotes: false,//是否移除属性的引号
                collapseWhitespace: false//是否移除空白
            },
            filename: 'tpl.html'//输出模板名称
        }),
        new HtmlWebpackPlugin({//构造函数传参
            //在模板html里面通过<%=htmlWebpackPlugin.options.title %> 调用title
            title: "网页标题",//网页标题
            template: './src/tpl2.html',//处理html模板路径
            inject: 'head',//自动写入js的位置[head body false]
            minify: {//html压缩规则
                removeComments: false, //是否移除注释
                removeAttributeQuotes: false,//是否移除属性的引号
                collapseWhitespace: false//是否移除空白
            },
            filename: 'tpl2.html'//输出模板名称
        }),

        new miniCssExtractPlugin({//初始化插件
            filename: '[name].[hash].css'
        }),
        new CleanWebpackPlugin()
    ]
}