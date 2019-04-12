'use strict';

const copyModule = require('copy-paste-win32fix');
const fileIndexer = require('./fileIndexer');
const pathList = require('./setting/target.json');

module.exports = pluginContext => {
    const app = pluginContext.app;
    const shell = pluginContext.shell;
    const logger = pluginContext.logger;
    const indexer = pluginContext.indexer;

    function startup() {
        logger.log('doing preparation');
        pathList.forEach(path => {
            logger.log(path);
            fileIndexer(path).then(fileList => {
                indexer.set(path, fileList);
            });
        });
    }

    function execute(filePath, payload, extra) {
        copyModule.copy(filePath, () => {
            if (extra.keys.metaKey) {
                shell.showItemInFolder(filePath);
            } else if (extra.keys.shiftKey) {
                shell.openItem(filePath);
            }
            app.close();
        });
        logger.log(extra);
    }

    return { startup, execute };
};
