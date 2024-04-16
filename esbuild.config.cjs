const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");
const fs = require("fs");
const path = require("path");

const buildTimePlugin = {
  name: "rebuild-log",
  setup({ onStart, onEnd }) {
    var t;
    onStart(() => {
      console.log("⌛ Change detected - Rebuilding");
      t = Date.now();
    });
    onEnd(() => {
      console.log("⚡ Build finished in", Date.now() - t, "ms");
    });
  },
};

const run = async () => {
  const ctx = await esbuild.context({
    entryPoints: ["src/index.ts", "src/cli.ts", "src/test/**/*"], // change 'src/index.ts' to your main TypeScript file
    outdir: "dist",
    bundle: true,
    platform: "node",
    minify: false,
    sourcemap: true,
    banner: {
      js: fs.readFileSync(
        path.join(__dirname, "./esbuild/cjs.shim.js"),
        "utf-8"
      ),
    },
    plugins: [nodeExternalsPlugin(), buildTimePlugin],
  });

  // Process command line arguments
  const args = process.argv.slice(2);
  const watchMode = args.includes("--watch");

  if (watchMode) {
    ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }
};

run();
