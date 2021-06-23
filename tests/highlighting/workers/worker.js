const workerpool = require("workerpool");
const {renderScreenshot} = require("terminal-screenshot");
const {writeFile} = require("fs-extra");

workerpool.worker({
  renderScreenshot: async (options, destination) => {
    const buffer = await renderScreenshot(options);
    await writeFile(destination, buffer);
  },
});
