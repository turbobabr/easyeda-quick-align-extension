const path = require('path');
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;
const Tasks = require('./scripts/tasks');
const EasyEDADevServer = require('./scripts/eeda-dev-server');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },      
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'main.js'
  },
  plugins: [
    new WatchExternalFilesPlugin({
      files: [
        './src/**/*.json',
        './src/**/*.txt'
      ]
    }),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {          
          Tasks.copyManifest();
          Tasks.copyLocale();
          Tasks.copyIcon();
          Tasks.injectMeta();

          setTimeout(() => {
            EasyEDADevServer.installExtension(path.resolve(__dirname,'./build'));          
          },1000);          
        });
      }
    }
  ]
};
