const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let theme = parseInt( process.env.npm_config_theme );
theme = (theme>=1 && theme<=5) ? theme : 1;

module.exports = { 

    entry: [
      './src/theme-'+theme+'/style.css',
      'jquery',
      'datatables.net',
      'datatables.net-bs4',
      'datatables.net-responsive',
      './src/theme-'+theme+'/extend.js',
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
        // global jquery
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
        // css
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        // images
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
      // minify html
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'src/theme-'+theme+'/index.html',
          minify: true,
          inject: false
      })
    ],

}
