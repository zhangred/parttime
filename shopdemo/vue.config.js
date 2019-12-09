const path = require('path');

const configArgv = JSON.parse(process.env.npm_config_argv);

const original = configArgv.original.slice(1);
// console.log(99,original,process.env)
const theme = {theme:'all'};
//模版解析
for(var i=0;i<original.length;i++){
    var rs = original[i].match(/--theme-([a-z-]+)/ig);
    if(rs){
        theme.theme = rs[0].split('--theme-')[1]
    }
}

module.exports = {
    publicPath:"./",
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/css/base.less'),
            ]
        }
    },
    runtimeCompiler: true,
    chainWebpack: config => {
        config.plugin("define").tap(args => {        // 讲参数传入项目中，可在main.js或者项目中的config  通过process.env 获取
            args[0]["process.env"].THEME = JSON.stringify(theme);
            return args;
        });
    }
}
