import fs from "fs";
import nodePath from "path";

const mybb_root = nodePath.resolve("src/Linker/__tests__/links");
const cwd = "src/Linker/__tests__/originals";

/**
 * @param   {string}  path - Path to file
 * @returns {boolean}
 */
export const fileExists = path => {
    try {
        fs.accessSync(path);
    } catch (err) {
        return false;
    }

    return true;
};

/**
 * @param   {string}  path - Path to file
 * @returns {boolean} Whether file was successfully removed
 */
export const removeFile = path => {
    try {
        fs.unlinkSync(path);
    } catch (error) {
        console.warn(`Could not remove ${path}.`);
        return false;
    }

    return true;
};

/**
 * @param  {string} originalPath - Path to target file
 * @param  {string} linkPath     - Path to output file
 * @throws {Error}  If file could not be created
 */
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

/**
 * Empties a directory.
 *
 * @param {string} [dir=mybb_root] - Path to directory
 */
export const removeLinks = (dir = mybb_root) => {
    const resolved = nodePath.resolve(dir);
    const files = fs.readdirSync(resolved);

    files.forEach(file => {
        removeFile(nodePath.resolve(resolved, file));
    });
};

/**
 * Creates symbolic links.
 *
 * @param {string[]} paths - Relative paths of files
 */
export const createLinks = paths => {
    paths.forEach(path => {
        const { originalPath, linkPath } = resolvePaths(path);
        createFile(originalPath, linkPath);
    });
};

/**
 * Gets files in a directory.
 *
 * @param   {string}   dir - Path to directory
 * @returns {string[]} List of filenames
 */
export const getLinks = (dir = mybb_root) => {
    const resolved = nodePath.resolve(dir);
    return fs.readdirSync(resolved);
};

/**
 * Removes a file if it exists.
 *
 * @param  {string} path - Path to file
 * @throws {Error}  If file exists and could not be removed
 */
export const checkForFile = path => {
    if (fileExists(path)) {
        console.error(`File already exists. Attempting to remove ${path}.`);

        if (!removeFile(path)) {
            throw Error(`File already exists and could not be removed.`);
        }
    }
};

/**
 * Resolves file against current working directory and MyBB root.
 *
 * @param   {string} [path=""] - Path to file
 * @returns {{ originalPath: string, linkPath: string }}
 */
export const resolvePaths = (path = "") => {
    return {
        originalPath: nodePath.resolve(cwd, path),
        linkPath: nodePath.resolve(mybb_root, path)
    };
};
