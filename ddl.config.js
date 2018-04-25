const webpack = require('webpack');
 
const vendors = [
 'react',
 'react-dom',
];
 
module.exports = {
 output: {
  path:  __dirname + '/common/page',
  filename: '[name].js',
  library: '[name]',
 },
 entry: {
  "lib": vendors,
 },
 plugins: [
  new webpack.DllPlugin({
   path: 'manifest.json',
   name: '[name]',
   context: __dirname,
  }),
 ],
};