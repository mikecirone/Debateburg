var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    //load before app.jsx, as they are app.jsx dependencies
    './client/app.jsx'
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
    filename: './client/public/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: __dirname,
    alias: {
      applicationStyle: 'client/styles/app.scss',
      Login: 'client/components/Login.jsx',
      loginReducer: 'client/reducers/loginReducer.jsx',
      Register: 'client/components/Register.jsx',
      RegisterContainer: 'client/containers/RegisterContainer.jsx',
      registerActions: 'client/actions/registerActions.jsx',
      registerReducer: 'client/reducers/registerReducer.jsx',
      Home: 'client/components/Home.jsx',
      Gameroom: 'client/components/Gameroom.jsx',
      ChatLog: 'client/components/ChatLog.jsx',
      ChatLogContainer: 'client/containers/ChatLogContainer',
      ChatMsg: 'client/components/ChatMsg.jsx',
      ChatMsgMaker: 'client/components/ChatMsgMaker.jsx',
      ChatMsgMakerContainer: 'client/containers/ChatMsgMakerContainer.jsx',
      ChatMsgMakerContainer_Debate: 'client/containers/ChatMsgMakerContainer_Debate.jsx',
      Chat: 'client/components/Chat.jsx',
      ChatContainer: 'client/containers/ChatContainer.jsx',
      chatActions: 'client/actions/chatActions.jsx',
      chatReducer: 'client/reducers/chatReducer.jsx',
      Main: 'client/components/Main.jsx',
      ErrorModal: 'client/components/ErrorModal.jsx',
      ErrorModalContainer: 'client/containers/ErrorModalContainer.jsx',
      errorActions: 'client/actions/errorActions.jsx',
      errorReducer: 'client/reducers/errorReducer.jsx',
      actionTypes: 'client/actions/actionTypes.jsx',
      configureStore: 'client/store/configureStore.jsx',
      stateDefaults: 'client/store/stateDefaults.jsx',
      seed: 'client/tests/seed.jsx',
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
  devtool: 'cheap-module-eval-source-map'
};
