module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          "react-compiler": {
            sources: (filename) => {
              // Match file names to include in the React Compiler.
              return filename.includes("src/path/to/dir");
            },
            compilationMode: "strict",
            panicThreshold: "all_errors",
          },
        },
      ],
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@Components": "./src/components",
            "@Navigation": "./src/navigation",
            "@Screens": "./src/screens",
            "@Types": "./src/types",
            "@GlobalStyle": "./src/styles",
            "@Assets": "./assets",
            "@Utils": "./src/utils",
            "@Src": "./src",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel", "transform-remove-console"],
      },
    },
  };
};
