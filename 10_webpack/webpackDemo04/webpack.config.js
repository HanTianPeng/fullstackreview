const webpack = require('webpack');
const path = require('path');

module.exports = {
    // 单个entry打包其实是没有用的,可以采用其他方法
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        'vendor': ['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './dist/',  // 现网是cdn
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        // 异步加载模块
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'async-common',
        //     children: true,
        //     minChunks: 2,
        // }),
        // 提取pageA,pageB公共的代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
            chunks: ['pageA', 'pageB']  // 指定范围提取公共代码
        }),
        // webpack生成的代码, 第三方库代码分别提取出来
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            minChunks: Infinity
        }),
    ]
}