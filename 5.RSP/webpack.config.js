// node에서 제공하는 path 조작 방법
const path = require('path');
const RefreshWebpackPlugin =require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name : 'wordrelay-setting',
    mode : 'development', // 실서비스 : pruduction
    devtool : 'eval',
    resolve : {
        extensions : ['.js', '.jsx']
    },
    
    // entry에 있는 파일을 읽고 modeule을 적용 한 후 output에 뺀다.
    entry : {
        app : ['./client'],
    }, // 입력

    //Loders
    module : {
        // rules는 여러개의 규칙들
        rules : [{
             // js파일과 jsx파일에 babel loader을 적용해서 최신이나 t실험적인 문법을 옛날 브라우저에서도 돌아 갈 수 있는 문법으로 바꿔 주겠다.
            test : /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                //plugin들의 모음이 preset이다.
                presets : [
                    ['@babel/preset-env', {
                        targets : {
                            // 한국에서 1% 가진 브라우저
                            browsers : ['> 5% in KR'], //browserlist
                        },
                        debug: true,
                    }], 
                    '@babel/preset-react' ],
                plugins : [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            },
        }],
    },
    plugins : [
        new RefreshWebpackPlugin()
    ],
    

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist',
      },
      devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true
      }
    };