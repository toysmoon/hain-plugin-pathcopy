"use strict";

const copyModule = require("copy-paste-win32fix");
const fileIndexer = require("./fileIndexer");

module.exports = pluginContext => {
    const app = pluginContext.app;
    const logger = pluginContext.logger;
    const indexer = pluginContext.indexer;

    function setIndexerByFiles(fileList) {
        logger.log(fileList);
        indexer.set("/Users/sungjungjo/peoplefund/dev", fileList);
    }

    function startup() {
        logger.log("doing preparation");
        logger.log(typeof fileIndexer);
        fileIndexer("/Users/sungjungjo/peoplefund/dev").then(setIndexerByFiles);
    }

    function execute(filePath, payload, extra) {
        logger.log(filePath);
        copyModule.copy(filePath, () => {
            app.close();
        });
    }

    return { startup, execute };
};
