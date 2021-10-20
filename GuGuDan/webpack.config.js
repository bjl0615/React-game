const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode : 'development', //개발시 production
    devtool : 'eval', // production일땐 hidden-source-map
    resolve : {
        extensions : ['.jsx', '.js']
    },

    entry : {
        app : './client',
    },
    //Loders
    module : {
        rules : [{
            test : /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                //plugin들의 모음이 preset이다.
                presets : [
                    ['@babel/preset-env', {
                        targets : {
                            // 한국에서 1% 가진 브라우저
                            browsers : ['> 1% in KR'], //browserlist
                        },
                        debug: true,
                    }], 
                    '@babel/preset-react'
                ],
                plugins : [],
            },
        }],
    },
    plugins : [
        // LoaderOptionsPlugin란 Loder의 options의 debug가 모두 트루이다.
        new webpack.LoaderOptionsPlugin({ debug : true}),
    ],
    output : {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
    },
};