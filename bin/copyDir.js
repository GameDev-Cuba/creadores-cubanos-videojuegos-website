"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDir = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function copyDir(srcDir, dstDir) {
    for (const name of (0, fs_1.readdirSync)(srcDir)) {
        const src2 = (0, path_1.join)(srcDir, name);
        if ((0, fs_1.statSync)(src2).isDirectory()) {
            const dst2 = (0, path_1.join)(dstDir, name);
            (0, fs_1.mkdirSync)(dst2, { recursive: true });
            copyDir(src2, dst2);
        }
        else {
            (0, fs_1.copyFileSync)(src2, (0, path_1.join)(dstDir, name));
        }
    }
}
exports.copyDir = copyDir;
