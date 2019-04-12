"use strict";

module.exports = pluginContext => {
    const toast = pluginContext.toast;
    const logger = pluginContext.logger;
    const indexer = pluginContext.indexer;

    function startup() {
        logger.log("doing preparation");
    }

    function execute(id, payload) {
        if (id === "1") {
            toast.enqueue(`${payload} was entered`);
        }
    }

    function renderPreview(id, payload, render) {
        render("<html><body>Something</body></html>");
    }

    return { startup, execute, renderPreview };
};
