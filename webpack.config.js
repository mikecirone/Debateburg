var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/foundation.min.js',
    //load before app.jsx, as they are app.jsx dependencies
    './public/app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: __dirname,
    alias: {
      applicationStyle: 'public/app/styles/app.scss',
      Login: 'public/app/components/Login.jsx',
      loginReducer: 'public/app/reducers/loginReducer.jsx',
      Register: 'public/app/components/Register.jsx',
      RegisterContainer: 'public/app/containers/RegisterContainer.jsx',
      registerActions: 'public/app/actions/registerActions.jsx',
      registerReducer: 'public/app/reducers/registerReducer.jsx',
      Home: 'public/app/components/Home.jsx',
      Gameroom: 'public/app/components/Gameroom.jsx',
      Main: 'public/app/components/Main.jsx',
      ErrorModal: 'public/app/components/ErrorModal.jsx',
      ErrorModalContainer: 'public/app/containers/ErrorModalContainer.jsx',
      errorActions: 'public/app/actions/errorActions.jsx',
      errorReducer: 'public/app/reducers/errorReducer.jsx',
      actionTypes: 'public/app/actions/actionTypes.jsx',
      configureStore: 'public/app/store/configureStore.jsx',
      //--------------start:
      //       used this link to resolve many warnings when calling webpack
      //       https://github.com/facebook/react/issues/4566
      react: 'node_modules/react',
      React: 'node_modules/react'
    },
    fallback: 'node_modules'
  },
  resolveLoader: {
      fallback: 'node_modules'
  },
     //---------------end!
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
