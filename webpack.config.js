const path = require('path');
module.exports = {
 "mode": "none",
 "entry": ["regenerator-runtime/runtime.js", "./src/index.js"],
 "output": {
   "path": __dirname + '/dist',
   "filename": "bundle.js"
 },
 devtool: 'eval-cheap-module-source-map',
 devServer: {
   historyApiFallback: true,
   static: {
     directory: path.join(__dirname, 'dist'),
     watch: true,
   },
 },
 "module": {
   "rules": [
     {
       "test": /\.css$/,
       "use": [
         "style-loader",
         "css-loader"
       ]
     },
     {
       "test": /\.js$/,
       "exclude": /node_modules/,
       "use": {
         "loader": "babel-loader",
         "options": {
           "presets": [
             "@babel/preset-env",
           ]
         }
       }
     },
   ],
 },
};