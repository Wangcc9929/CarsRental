const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '' : './',
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  lintOnSave: false,

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
          return `@import "./src/style/main.scss";${content}`
        },
      },
    },
  },
  devServer: {
    open: false, // 编译完成是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: 'only', // 开启热加载
    proxy: {
    [process.env.VUE_APP_DEV_TARGET]: {
      target: process.env.VUE_APP_DEV_TARGET_H, //API服务器的地址
      ws:false,
      changeOrigin: true,
      pathRewrite: {
        [`^${process.env.VUE_APP_DEV_TARGET}`]: `${process.env.VUE_APP_DEV_TARGET}` 
      }
    },
  //   [process.env.VUE_APP_API_OLD]: {
  //     target: process.env.VUE_API_DEV_TARGET_OLD, //API服务器的地址
  //     changeOrigin: true,
  //     pathRewrite: {
  //         [`^${process.env.VUE_APP_API_OLD}`]: ''
  //     }
  // }
    
    }
  }
});