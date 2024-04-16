import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

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
const ctx = await esbuild.context({
  entryPoints: ["src/index.ts", "src/cli.ts", "src/test/**/*"], // change 'src/index.ts' to your main TypeScript file
  outdir: "dist",
  bundle: true,
  platform: "node",
  minify: false,
  sourcemap: true,
  plugins: [
    nodeExternalsPlugin,
    buildTimePlugin,
  ],
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
