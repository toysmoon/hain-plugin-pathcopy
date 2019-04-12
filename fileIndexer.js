const fs = require("fs");

async function getFileList(directoryPath) {
    // blacklist
    const blackList = {
        ".git": true
    };

    // get fileList in current directory
    const fileList = fs.readdirSync(directoryPath);
    let enableFileList = [];
    let disableFileList = [];

    const isDirectoryList = fileList.map(async file => {
        const fileStat = await fs.statSync(directoryPath + "/" + file);
        return fileStat.isDirectory();
    });

    for (let i = 0; i < isDirectoryList.length; i++) {
        const isDirectory = await isDirectoryList[i];
        const file = fileList[i];
        const path = directoryPath + "/" + file;
        if (blackList[file]) {
            continue;
        }

        isDirectory
            ? disableFileList.push(file)
            : enableFileList.push({
                  id: path,
                  primaryText: file,
                  secondaryText: path,
                  group: "File Path Copy"
              });
    }

    // find all the Directory in parallel
    const directoryPromises = disableFileList.map(async path => {
        return await getFileList(directoryPath + "/" + path);
    });

    // log them in sequence
    for (const directoryPromise of directoryPromises) {
        const enableList = await directoryPromise;
        enableList.forEach(file => enableFileList.push(file));
    }

    return enableFileList;
}

module.exports = getFileList;
