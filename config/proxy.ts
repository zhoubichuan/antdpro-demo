export default {
  dev: {
    '/api/': {
      target: 'http://zhoubichuan.com/antdpro-express/api',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  sit: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  uat: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
