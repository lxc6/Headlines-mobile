// 处理postcss插件
module.exports = {
  // 所有用到的的postcss插件
  plugins: {
    autoprefixer: {}, // 前缀
    'postcss-pxtorem': {
      rootValue: 37.5, // 基准值
      propList: ['*'] // 包括那些文件 *表示所有
    }
  }
}
