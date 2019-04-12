const fs = require('./fsWithPromise');
const icon = require('./setting/icon.json');

async function getFileList(directoryPath) {
    // blacklist
    const blackList = {
        '.git': true
    };

    const fileList = await fs.readdir(directoryPath);
    let enableFileList = [];
    let disableFileList = [];

    const isDirectoryList = fileList.map(async file => {
        const fileStat = await fs.stat(directoryPath + '/' + file);
        return fileStat.isDirectory();
    });

    for (let i = 0; i < isDirectoryList.length; i++) {
        const isDirectory = await isDirectoryList[i];
        const file = fileList[i];
        const splitFile = file.split('.');
        const path = directoryPath + '/' + file;
        if (blackList[file]) {
            continue;
        }

        isDirectory
            ? disableFileList.push(file)
            : enableFileList.push({
                  id: path,
                  primaryText: file,
                  secondaryText: path,
                  group: 'File Path Copy',
                  icon:
                      icon[splitFile[splitFile.length - 1]] ||
                      '#fas fa-file-code'
              });
    }

    // find all the Directory in parallel
    const directoryPromises = disableFileList.map(async path => {
        return await getFileList(directoryPath + '/' + path);
    });

    // log them in sequence
    for (const directoryPromise of directoryPromises) {
        const enableList = await directoryPromise;
        enableList.forEach(file => enableFileList.push(file));
    }

    return enableFileList;
}

module.exports = getFileList;
