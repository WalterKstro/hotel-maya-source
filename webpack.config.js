const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const tinypngCompress = require("webpack-tinypng-compress");

module.exports = {
   entry: {
      js: "./src/index.js"
   },
   output: {
      filename: "js/[name].[chunkhash].js"
   },
   devtool: "source-map",
   module: {
      rules: [{
            test: /\.(js)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: "babel-loader"
            }
         },
         {
            test: /\.(html)$/,
            use: {
               loader: "html-loader",
               options: {
                  minimize: true,
                  removeComments: false,
                  collapseWhitespace: false
               }
            }
         },
         {
            test: /\.(css|scss)$/,
            use: [
               "style-loader",
               MiniCssExtractPlugin.loader,
               "css-loader?sourceMap",
               {
                  loader: "postcss-loader",
                  options: {
                     autoprefixer: {
                        browser: ["last 2 versions"]
                     },
                     sourceMap: true,
                     plugins: () => [autoprefixer]
                  }
               },
               {
                  loader: "resolve-url-loader",
                  options: {
                     sourceMap: true
                  }
               },
               "sass-loader?outputStyle=compressed&sourceMap"
            ]
         },
         {
            test: /\.(png|jpe?g|gif|svg|webp)$/i,
            use: [{
                  loader: "file-loader",
                  options: {
                     name: "[name].[ext]",
                     outputPath: "images/"
                  }
               },
               {
                  loader: "image-webpack-loader",
                  options: {
                     bypassOnDebug: false,
                     disable: true
                  }
               }
            ]
         },
         {
            test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
            use: [{
               loader: "file-loader",
               options: {
                  name: "[path][name].[ext]",
                  outputPath: "media/"
               }
            }]
         }
      ]
   },
   plugins: [
      new CleanWebpackPlugin(["dist/**/*.*"]),
      new tinypngCompress({
         key: "YZ5hpRQCwYhg4GyRKpw2dvyMCXLS4RLV"
      }),
      new MiniCssExtractPlugin({
         filename: "css/[name].[chunkhash].css",
         chunkFilename: "[id].css"
      }),
      new HtmlWebpackPlugin({
         filename: "index.html",
         template: "./src/index.html",
         chunks: ['js'],
         meta: {
            viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
         },
         inject: true
      })
   ]
};