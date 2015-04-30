'use strict';

/**
 * FileUtils - a library of file-related utilities which are useful
 * in conjunction with building and tests (e.g. gulp).
 */

var fs = require ('fs');
var mkdirp = require ('mkdirp');

var FileUtils = {}

/**
 * If the file at relPath's modified time (mtime) is greater than
 * the same file in destDir (add relPath to this), or if the
 * file in destDir doesn't exist, return true.  If this returns
 * true it indicates the file should be regenerated.
 */
FileUtils.isFileChanged = function (relPath, destDir) {
    var targetFile = destDir + "/" + relPath;
    var orig = fs.statSync (relPath);
    var target;
    
    try {
        target = fs.statSync (targetFile);
    } catch (e) {
        // Assume this is file doesn't exist error, so therefore return true
        return true;
    }
    return target.mtime < orig.mtime;
}

/**
 * Is path an absolute path (i.e. starts with "/")
 */
FileUtils.isAbsolutePath = function (path) {
    var idx = path.indexOf ("/");
    return idx == 0 ? true : false;
}

/**
 * Get the absolute path from path.  If path is relative, use root
 * process.cwd () or if specified optRoot.  If path is absolute,
 * optRoot can't be specified (exception).
 */
FileUtils.getAbsolutePath = function (path, optRoot) {
    if (path.indexOf ("/") == 0) {
        if (optRoot) {
            if (FileUtils.isAbsolutePath (optRoot))
                throw new Exception ("1st arg and 2nd arg are both " +
                    "absolute (only one can be absolute)");
        }
        return path;
    }

    if ( ! optRoot)
        optRoot = process.cwd ();

    return optRoot + "/" + path;
}

/**
 * Gets the absolute directory for the path component (immediate anscestor)
 */
FileUtils.getDirectory = function (path) {
    var dir = path;

    var idx = dir.lastIndexOf ("/");
    if (idx < 0)
        return null;

    return dir.substring (0, idx);
}

/**
 * If the directory path destDir (relative), from optRoot, doesn't exist,
 * then create necessary directories.
 */
FileUtils.createDirectoryPathIfNecessary = function (destDir, optRoot) {
    var dir = FileUtils.getAbsolutePath (destDir, optRoot);

    // TODO - this can fail, what happens when it does?
    mkdirp.sync (dir, {});
}

/**
 *  This will find any part of the directory path and remove it up to
 *  the optRoot (or process.cwd() if not specified.  This is, in a
 *  sense the inverse of createDirectoryPathIfNecessary.  A very safe
 *  alternative to system "rm -r".  This will not remove non-empty dirs.
 */
FileUtils.destroyDirectoryPathIfExists = function (relPath, optRoot) {
    if (FileUtils.isAbsolutePath (relPath))
        throw new Exception ("Arg2 (relPath) should be a relative path");

    if (optRoot) {
        if ( ! FileUtils.isAbsolutePath (optRoot))
            throw new Exception ("Arg3 (optRoot) should be an absolute path");
    }

    var rootDir = optRoot;

    var remainder = relPath;
    while (remainder) {
        var fullpath = rootDir + "/" + remainder;

        // TODO - this can fail
        try {
            fs.rmdirSync (fullpath);
        } catch (e) {
            // Assume error is dir does not exist, but continue up the path.
        }

        var idx = remainder.lastIndexOf ("/");
        if (idx < 0)
            return;

        remainder = remainder.substring (0, idx);
    }
}

/**
 * Test whether file exists at path and if so is it a directory.
 * Doesn't thrown any exceptions.
 */
FileUtils.directoryExists = function (path) {
    try {
        var stat = fs.lstatSync (path);
    } catch (e) {
        // e.g. Error: ENOENT, no such file or directory
        return false;
    }
    return stat.isDirectory ();
}

module.exports = FileUtils;

