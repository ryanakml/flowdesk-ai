const nodeMajor = Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10);

if (nodeMajor !== 22) {
  console.error(`Wabrix requires Node.js 22; found ${process.versions.node}.`);
  process.exit(1);
}
