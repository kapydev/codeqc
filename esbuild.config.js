import esbuild from "esbuild";

const ctx = await esbuild.context({
  entryPoints: ["src/index.ts", "src/cli.ts", "src/test/**/*"], // change 'src/index.ts' to your main TypeScript file
  outdir: "dist",
  bundle: false,
  platform: "node",
  target: "node14", // specify your Node.js target version
  minify: false,
  sourcemap: true,
  plugins: [
    {
      name: "rebuild-log",
      setup({ onStart, onEnd }) {
        var t;
        onStart(() => {
          console.log("⌛ Rebuilding");
          t = Date.now();
        });
        onEnd(() => {
          console.log("⚡ build finished in", Date.now() - t, "ms");
        });
      },
    },
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
