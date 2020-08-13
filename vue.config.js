module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/'
}