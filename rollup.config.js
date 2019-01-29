import pkg from "./package.json";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

export default [
  {
    external: ["react", "react-dom", "immutable", "slate", "slate-react"],
    plugins: [babel(), resolve()],
    output: [{ file: pkg.module, format: "es" }]
  }
];
