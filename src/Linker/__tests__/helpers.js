import fs from "fs";
import path from "path";

const mybb_root = path.resolve("src/Linker/__tests__/links");
const cwd = "src/Linker/__tests__/originals";

export const fileExists = file => {
    try {
        fs.accessSync(file);
    } catch (err) {
        return false;
    }

    return true;
};

export const removeFile = file => {
    try {
        fs.unlinkSync(file);
    } catch (error) {
        console.warn(`Could not remove ${file}.`);
        return false;
    }

    return true;
};

export const createFile = (originalPath, linkPath) => {
    try {
        fs.symlinkSync(originalPath, linkPath);
    } catch (e) {
        throw Error(`Could not create file ${linkPath}.`);
    }

    if (!fileExists(linkPath)) {
        throw Error(`Could not create file for unknown reasons.`);
    }
};

export const removeLinks = (file = mybb_root) => {
    const resolved = path.resolve(file);
    const files = fs.readdirSync(resolved);

    files.forEach(file => {
        removeFile(path.resolve(resolved, file));
    });
};

export const createLinks = files => {
    files.forEach(file => {
        const { originalPath, linkPath } = resolvePaths(file);
        createFile(originalPath, linkPath);
    });
};

export const getLinks = (dir = mybb_root) => {
    const resolved = path.resolve(dir);
    return fs.readdirSync(resolved);
};

export const checkForFile = file => {
    if (fileExists(file)) {
        console.error(`File already exists. Attempting to remove ${file}.`);

        if (!removeFile(file)) {
            throw Error(`File already exists and could not be removed.`);
        }
    }
};

export const resolvePaths = (file = "") => {
    return {
        originalPath: `${cwd}/${file}`,
        linkPath: path.resolve(mybb_root, file)
    };
};
