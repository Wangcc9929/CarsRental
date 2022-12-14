const { defineConfig } = require("@vue/cli-service");
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : './',
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  /** vue3.0内置了webpack所有东西，
   * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   **/
  chainWebpack: (config) => {
    // const svgRule = config.module.rule("svg");     
    // svgRule.uses.clear();     
    // svgRule
    // .use("svg-sprite-loader")
    // .loader("svg-sprite-loader")
    // .options({ 
    //   symbolId: "icon-[name]",
    //   include: ["./src/icons"] 
    // });
  },
  // configureWebpack: (config) => {
  //   config.resolve = { // 配置解析别名
  //     extensions: ['.js', '.json', '.vue'],  // 自动添加文件名后缀
  //     alias: {
  //       '@': path.resolve(__dirname, './src'),
  //       '@c': path.resolve(__dirname, './src/components')
  //     }
  //   }
  // },
  // 生产环境是否生成 sourceMap 文件
  // productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        additionalData: (content, loaderContext) => {
          const { resourcePath } = loaderContext
          if (resourcePath.endsWith('main.scss')) return content
          return `@import "./src/styles/main.scss";${content}`
        },
      },
    },
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  // parallel: require('os').cpus().length > 1,
  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 编译完成是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: true, 
    hot: 'only', // 开启热加载
    proxy: {
      [process.env.VUE_APP_DEV_TARGET]: {
        target: process.env.VUE_APP_DEV_TARGET_H, //API服务器的地址
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_DEV_TARGET}`]: `${process.env.VUE_APP_DEV_TARGET}`
        }
      },
      [process.env.VUE_APP_DEV_TARGET_WEB]: {
        target: process.env.VUE_APP_DEV_TARGET_H, //API服务器的地址
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_DEV_TARGET_WEB}`]: `${process.env.VUE_APP_DEV_TARGET_WEB}`
        }
      },
    }
  },
  /**
   * 第三方插件配置
   */
  // pluginOptions: {},
});
