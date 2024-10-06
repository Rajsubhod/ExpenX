module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@app': './src/app',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@context': './src/context',
          '@utils': './src/utils',
        },
        
      },
    ],
  ],
};
