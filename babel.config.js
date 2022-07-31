module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@Components": "./src/components",
            "@Navigation": "./src/navigation",
            "@Screens": "./src/screens",
            "@Navigation": ["./src/navigation/*"],
            "@Types": ["./src/types/*"],
            "@GlobalStyle": ["./src/styles/*"],
            "@Assets": ["./assets/*"],
          },
        },
      ],
    ],
  };
};
