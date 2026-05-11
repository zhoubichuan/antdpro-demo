export default {
  dev: {
    '/api/': {
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/api/' },
    },
  },
  sit: {
    '/api/': {
      target: 'http://zhoubichuan.com',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/api/' },
    },
  },
  uat: {
    '/api/': {
      target: 'http://zhoubichuan.com',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/api/' },
    },
  },
};
