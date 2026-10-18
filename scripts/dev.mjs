import { spawn } from "node:child_process";
import { join } from "node:path";

const children = [
  spawn(process.execPath, ["--env-file=.env", "server/index.mjs"], { stdio: "inherit" }),
  spawn(process.execPath, [join("node_modules", "vite", "bin", "vite.js")], { stdio: "inherit" }),
];

let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill();
  process.exitCode = code;
}

for (const child of children) {
  child.on("error", (error) => {
    console.error(error);
    stop(1);
  });
  child.on("exit", (code) => stop(code ?? 1));
}
process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());
