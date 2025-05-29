const tags = [
  {
    value: "javascript",
    color: "#AFE19F",
  },
  {
    value: "regex",
    color: "#FF8B0D",
  },
  {
    value: "react",
    color: "#7DC9E7",
  },
  {
    value: "css",
    color: "#FDB35D",
  },
  {
    value: "vscode",
    color: "#78DBF3⁣",
  },
  {
    value: "mix",
    color: "#E8DDCD",
  },
  {
    value: "node",
    color: "#816AD6",
  },
  {
    value: "git",
    color: "#C9AFA5",
  },
  {
    value: "SASS",
    color: "#FBBC58",
  },
  {
    value: "es6+",
    color: "#AAF0D1",
  },
];

const tagColors = tags.reduce(
  (acc, { value, color }) => ({ ...acc, [value]: color }),
  {}
);

export { tags, tagColors };
