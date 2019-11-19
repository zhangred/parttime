const path = require('path');

const configArgv = JSON.parse(process.env.npm_config_argv);

const original = configArgv.original.slice(1);
console.log(99,original)
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
            args[0]["process.env"].THEME = JSON.stringify("sdfsdf");
            args[0]["process.env"].URL = JSON.stringify({b:59});
            return args;
        });
    }
}
