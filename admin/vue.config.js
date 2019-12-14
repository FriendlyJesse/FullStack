module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/',
  outputDir: '../server/public/admin'
}