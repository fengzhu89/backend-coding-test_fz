const { series } = require("nps-utils");
module.exports = {
  scripts: {
    test:
      "mocha tests && ./node_modules/eslint/bin/eslint.js *.js src/* && nyc mocha ./tests/*.test.js",
    start: "node index.js",
    load: series(
      "forever start index.js",
      "artillery run ./artillery/test.yml",
      "forever stop index.js"
    ),
    doc: {
      description: "Documenting the API.",
      generate: {
        description: "Generate Documentation files",
        script: "apidoc -i src",
      },
      deploy: {
        description: "Deploy the docs to surge.",
        script: series("nps doc.generate", "surge ./doc"),
      },
    },
  },
};
