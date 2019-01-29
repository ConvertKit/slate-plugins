module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
        modules: false
      }
    ],
    "@babel/preset-react"
  ],
  plugins: ["@babel/plugin-proposal-class-properties"],
  env: {
    test: {
      presets: ["@babel/preset-env", "@babel/preset-react"]
    }
  }
};
