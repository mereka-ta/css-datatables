const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let theme = parseInt( process.env.npm_config_theme );
theme = (theme>=1 && theme<=5) ? theme : 1;
module.exports = { 

    entry: [
      './src/theme-'+theme+'/style.css',
      'jquery',
      'datatables.net',
      'datatables.net-autofill',
      'datatables.net-bs4',
      'datatables.net-buttons',
      'datatables.net-responsive',
      './src/theme-'+theme+'/main.js',
    ],
    output: {
      path: path.resolve(__dirname, 'dist/theme-'+theme),
      filename: 'jquery.dataTables.min.js'
    },
    node: {
      child_process: 'empty',
      module: 'empty',
      fs: 'empty'
    },

    module: {
      rules: [
        {
          test: require.resolve('jquery'),
          use: [{
            loader: 'expose-loader',
            options: 'jQuery'
          },
          {
            loader: 'expose-loader',
            options: '$'
          }]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(gif|svg|jpg|jpeg|png)$/,
          loader: 'file-loader',
          options: {
            publicPath: 'src/img',
            outputPath: 'img',
          },
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'src/theme-'+theme+'/index.html',
          minify: true,
      })
    ],

}
