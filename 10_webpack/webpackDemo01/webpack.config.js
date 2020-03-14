const path = require('path');
const webpack = require('webpack');
// 1. 自动在内存中根据指定页面生成一个内存中的页面
// 2.自动把打包好的bundle.js追加到内存的页面中
const  htmlWebpackPlugin = require('html-webpack-plugin');
/*
    这个配置文件，其实就是一个js文件，通过Node中的模块操作，向外配置了一个配置对象
    module.exports语法是COMOMONJS语法
*/
module.exports = {
    // 入口文件：表示要webpack打包哪个文件
    entry: path.join(__dirname, './src/main.js'),
    // 多个入口,多页面应用,单页面应用架构和业务代码分离
    // entry: [path.join(__dirname, './src/main.js'), path.join(__dirname, './src/main2.js')],
    // 第三种写法,比较推荐
    // entry: {
    //     index: path.join(__dirname, './src/main.js'),
    //     index2: [path.join(__dirname, './src/main2.js'), path.join(__dirname, './src/main3.js')]
    // }
    
    //出口: 一个或则多个,自定义规则,配置CDN
    output: {
        // 指定打包好的文件，输出到哪个目录中去
        path: path.join(__dirname, './dist'),
        // 指定输出文件的名称
        filename: 'bundle.js'
        // filename: '[name].min.[hash:5].js'  // 多个入口对应多个出口的配置方法
    },

    // 
    devServer: {
        open: true,  // 自动打开浏览器
        port: 3000,  // 设置启动时候的运行端口
        contentBase: 'src',  //指定托管的根目录
        hot: true,
    },

    /*
        参与打包的整个过程,具体有打包的优化和压缩,配置编译时的变量,极其灵活
        常用的plugins:
            优化相关:
                CommonChunkPlugin
                UglifyjsWebpackPlugin
            功能相关:
                ExtractTextWebpackPlugin: css提取出来打包单独文件
                HtmlWebpackPlugin: 生成html
                HotModuleReplacementPlugin: 模块热更新
                CopyWebpackPlugin: 第三方文件打包
    */
    plugins: [
        new webpack.HotModuleReplacementPlugin(),  // 

        // 在内存中生成html页面
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
    ],

    /*
        loaders: 处理文件,转化为模块
        常用loader:
            编译相关:
                babel-loader
                ts-loader
            样式相关:
                style-loader
                css-loader
                less-loader
                postcss-loader
            文件相关:
                file-loader
                url-loader
    */
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