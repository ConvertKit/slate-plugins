import pkg from "./package.json";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default [
  {
    external: ["react", "react-dom", "immutable", "slate", "slate-react"],
    plugins: [babel(), resolve(), commonjs()],
    output: [{ file: pkg.module, format: "es" }]
  }
];
