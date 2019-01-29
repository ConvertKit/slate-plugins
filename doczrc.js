export default {
  title: "ConvertKit Slate Plugins",
  menu: ["Development"],
  modifyBundlerConfig: config => {
    config.resolve.extensions.push(".css");
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    });

    return config;
  }
};
