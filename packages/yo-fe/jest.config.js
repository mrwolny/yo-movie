module.exports = {
  resetMocks: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFiles: [
    './src/setupTest.js',
  ],
};
