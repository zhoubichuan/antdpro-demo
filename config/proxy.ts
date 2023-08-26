export default {
  dev: {
    '/api/': {
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: { '': '' },
    },
  },
  sit: {
    '/api/': {
      target: 'http://zhoubichuan.com/antdpro-express',
      changeOrigin: true,
      pathRewrite: { '^/': '/' },
    },
  },
  uat: {
    '/api/': {
      target: 'http://zhoubichuan.com/antdpro-express',
      changeOrigin: true,
      pathRewrite: { '^/': '/' },
    },
  },
};
