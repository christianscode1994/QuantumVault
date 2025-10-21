import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.ts",
    output: [
      { file: "dist/index.esm.js", format: "es", sourcemap: false },
      { file: "dist/index.cjs.js", format: "cjs", sourcemap: false }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", declaration: true, rootDir: "src", outDir: "dist" }),
      terser()
    ]
  }
];
