const path = require("path");

module.exports = {
  content: [
    path.join(__dirname, "./index.html"),
    path.join(__dirname, "./src/**/*.{js,jsx,ts,tsx,html,svelte,vue}"),
  ],
  theme: { extend: { fontFamily: { poppins: "Poppins" } } },
  plugins: [],
  mode: "jit",
};
