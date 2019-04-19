const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const NamedModulesPlugin = require("webpack/lib/NamedModulesPlugin");
const HotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const path = require("path");

module.exports = (env, options) => {
  const config = {
    context: __dirname,
    entry: {
      client: "./src/App/index.tsx"
    },
    mode: options.mode,
    devtool: "source-map",
    watchOptions: {
      poll: true
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000,
      host: "0.0.0.0",
      historyApiFallback: true,
      overlay: true,
      progress: true,
      disableHostCheck: true
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      plugins: [new TsconfigPathsPlugin()]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/,
          loader: "file-loader",
          options: {
            limit: 8192,
            name: "asset/[name]-[hash].[ext]"
          }
        }
      ]
    },
    output: {
      filename: "[name].[hash].js",
      chunkFilename: "[name].[hash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/"
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all"
      }
    },
    plugins: [
      new ForkTsCheckerPlugin({
        memoryLimit: 4086,
        formatter: "codeframe"
      }),
      new HtmlPlugin({
        template: "./src/App/index.html",
        filename: "index.html",
        inject: "body"
      }),
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV || "development")
      }),
      new NamedModulesPlugin(),
      new HotModuleReplacementPlugin()
    ]
  };

  if (options.mode === "production") {
    config.plugins.push(
      new CleanPlugin(["dist"]),
      new RobotstxtPlugin({
        policy: [
          {
            userAgent: "*",
            allow: "/"
          }
        ]
      })
    );
  }

  return config;
};
