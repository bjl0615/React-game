// node에서 제공하는 path 조작 방법
const path = require('path');

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

    module : {
        // rules는 여러개의 규칙들
        rules : [{
            // js파일과 jsx파일에 babel loader을 적용해서 최신이나 t실험적인 문법을 옛날 브라우저에서도 돌아 갈 수 있는 문법으로 바꿔 주겠다.
            test : /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets : ['@babel/preset-env', '@babel/preset-react'],
                plugins : ['@babel/plugin-proposal-class-properties']
            }
        }],
    },

    output : {
        // path.join 하면 폴더를 알아서 합쳐준다 __dirname: 현제 폴더
        path : path.join(__dirname , 'dist'),
        filename : 'app.js'
    } // 출력
};