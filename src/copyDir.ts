import { copyFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { join } from "path";

export function copyDir(srcDir: string, dstDir: string) {

    for (const name of readdirSync(srcDir)) {

        const src2 = join(srcDir, name);

        if (statSync(src2).isDirectory()) {

            const dst2 = join(dstDir, name);

            mkdirSync(dst2, { recursive: true });

            copyDir(src2, dst2);

        } else {

            copyFileSync(src2, join(dstDir, name));
        }
    }
}