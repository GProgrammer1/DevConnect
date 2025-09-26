module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",       // 👈 lets you write `import { API_URL } from "@env"`
          path: ".env",             // 👈 where your env file lives
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ]
  };
};