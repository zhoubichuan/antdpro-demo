export default {
  dev: {
    '/api/': {
      target: '//localhost:7001',
      changeOrigin: true,
      pathRewrite: { '^/': '/' },
    },
  },
  sit: {
    '/api/': {
      target: '//zhoubichuan.com/antdpro-express',
      changeOrigin: true,
      pathRewrite: { '^/': '/' },
    },
  },
  uat: {
    '/api/': {
      target: '//zhoubichuan.com/antdpro-express',
      changeOrigin: true,
      pathRewrite: { '^/': '/' },
    },
  },
};
