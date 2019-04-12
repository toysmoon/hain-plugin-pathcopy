"use strict";

const fileIndexer = require("./fileIndexer");

module.exports = pluginContext => {
    const toast = pluginContext.toast;
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

    function execute(id, payload, extra) {
        logger.log(extra);
        toast.enqueue(`${payload}, ${id} and ${extra} was excute`);
    }

    return { startup, execute };
};
