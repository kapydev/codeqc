import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.ts", "src/cli.ts", "src/test/**/*"], // change 'src/index.ts' to your main TypeScript file
    outdir: "dist",
    bundle: false,
    platform: "node",
    target: "node14", // specify your Node.js target version
    minify: false,
    sourcemap: true,
  })
  .catch(() => process.exit(1));
