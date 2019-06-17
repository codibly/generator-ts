const HtmlPlugin = require('html-webpack-plugin');

module.exports = ({ config: storybookConfig, mode }) => {
  const appConfig = require('../webpack.config')({}, { mode });
  const storybookResolve = storybookConfig.resolve || {};
  const storybookModule = storybookConfig.module || {};

  return {
    ...storybookConfig,
    context: appConfig.context,
    devtool: appConfig.devtool,
    output: appConfig.output,
    resolve: {
      ...storybookResolve,
      extensions: [...appConfig.resolve.extensions, ...(storybookResolve.extensions || [])],
      plugins: [...appConfig.resolve.plugins, ...(storybookResolve.plugins || [])]
    },
    plugins: [
      ...appConfig.plugins.filter((plugin) => !(plugin instanceof HtmlPlugin)),
      ...(storybookConfig.plugins || [])
    ],
    module: {
      ...appConfig.module,
      rules: [
        ...appConfig.module.rules
        // there is a conflict in svg loading rule
        //...(storybookModule.rules || [])
      ]
    }
  };
};
