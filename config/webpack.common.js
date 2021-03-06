const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function webpackCommonConfigCreator(options) {
  return {
    mode: options.mode,
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      filename: 'js/bundle.js',
      path: path.resolve(__dirname, '../build')
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, '../src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          ]
        },
        {
          test: /\.(css|scss)$/,
          include: path.resolve(__dirname, '../src'),
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    mode: 'local',
                    localIdentName: '[path][name]_[local]--[hash:base64:5]'
                  },
                  localsConvention: 'camelCase'
                }
              },
              'sass-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: loader => [
                    require('postcss-import')({
                      root: loader.resourcePath
                    }),
                    require('autoprefixer')()
                  ]
                }
              }
            ]
          })
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        },
        {
          test: /\.(jpg|png|svg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                name: 'images/[hash].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html')
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.resolve(process.cwd(), 'build/'),
          path.resolve(process.cwd(), 'dist/')
        ]
      }),
      new ExtractTextPlugin({
        filename: 'css/[name][hash].css'
      })
    ]
  }
}

module.exports = webpackCommonConfigCreator
