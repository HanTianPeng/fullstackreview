const path = require('path');
const webpack = require('webpack');
// 1. 自动在内存中根据指定页面生成一个内存中的页面
// 2.自动把打包好的bundle.js追加到内存的页面中
const  htmlWebpackPlugin = require('html-webpack-plugin');
// 这个配置文件，其实就是一个js文件，通过Node中的模块操作，向外配置了一个配置对象
module.exports = {
    // 入口文件：表示要webpack打包哪个文件
    entry: path.join(__dirname, './src/main.js'),
    //出口：
    output: {
        // 指定打包好的文件，输出到哪个目录中去
        path: path.join(__dirname, './dist'),
        // 指定输出文件的名称
        filename: 'bundle.js'
    },
    // 
    devServer: {
        open: true,  // 自动打开浏览器
        port: 3000,  // 设置启动时候的运行端口
        contentBase: 'src',  //指定托管的根目录
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),  // 

        // 在内存中生成html页面
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
    ],
    module: {  // 这个节点，用于配置所有的第三方加载器
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],  // 注意，这个数组顺序不能更换
            },  // 配置处理css文件类型的loader
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpg|png|gif|jpeg|bmp)$/,
                use: 'url-loader?limit=16256&name=[hash:8][name].[ext]',
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader',
            },  // 处理字体文件配置项
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/',
            },  // 处理js高级语法，比如es7等
        ]
    }
}