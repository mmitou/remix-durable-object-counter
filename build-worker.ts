import { build } from "esbuild";

build({
  entryPoints: ["./worker/index.ts"],
  bundle: true,
  sourcemap: true,
  format: "esm",
  outfile: "dist/index.mjs",
  minify: true,
  external: ["__STATIC_CONTENT_MANIFEST"],
}).catch(() => process.exit(1));
