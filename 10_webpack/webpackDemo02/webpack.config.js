module.exports = {
    entry: './app.js',

    output: {
        filename: '[name].[hash:8].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: [
                        //     ['@babel/preset-env', {
                        //         targets: {
                        //             browsers: ['>1%', 'last 2 versions']
                        //             // chrome: '52'
                        //         }
                        //     }]
                        // ]
                    }  
                },
                exclude: '/node_modules/'
            }
        ]
    }
}