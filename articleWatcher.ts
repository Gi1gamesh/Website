import { PluginOption, ViteDevServer, WebSocketServer } from "vite";

import fs from "fs";
import { readdir } from 'fs/promises'
import path from 'path'

import matter from 'front-matter';

import chokidar, { FSWatcher } from "chokidar";

const config = {
    watchDirectory: 'blogData/articles/',
    output: "blogData/article-manifest.json",
    previewOutput: "blogData/preview-manifest.json"
}


export type MatterOutputType<T> = {
    attributes: T,
    body: string,
    bodyBegin: number,
    frontmatter: string,
    path: string,
    filename: string,
    filenameNoExt: string,
    created: number
}

export default function fileWatcher(): PluginOption {
    let rootDir: string
    let publicDir: string
    let command: string
    let watcher: FSWatcher | undefined = undefined;
    let ws: WebSocketServer | undefined = undefined;

    async function run() {
        const watchDirFullPath = path.join(rootDir, config.watchDirectory)
        const files = fs.readdirSync(watchDirFullPath);
        const fullManifest: any[] = [];

        files.forEach(fileName => {
            const fileFullPath = path.join(watchDirFullPath, fileName)
            const fileContents = fs.readFileSync(fileFullPath).toString()

            const frontMatter = matter(fileContents)

            const fileInfo = {
                ...frontMatter.attributes as any,
                path: fileName.substring(0, fileName.lastIndexOf('.'))
            }

            fullManifest.push(fileInfo);
        });

        fullManifest.sort((a,b) => b.created - a.created);
        const outputString = JSON.stringify(fullManifest, null, 0);
        const previewOutputString = JSON.stringify(fullManifest.slice(0,9), null,0);
        
        fs.writeFileSync(config.output, outputString, { encoding: 'utf8', flag: 'w' });
        fs.writeFileSync(config.previewOutput, previewOutputString, { encoding: 'utf8', flag: 'w' });

        ws?.send({ type: 'full-reload', path: '*' })
    }

    return {
        name: 'generate-file-manifest',
        configureServer(server: ViteDevServer) {
            ws = server.ws
        },
        configResolved(resolvedConfig) {
            publicDir = resolvedConfig.publicDir
            rootDir = resolvedConfig.root
            command = resolvedConfig.command
        },
        buildStart: () => {
            // run();

            // if (command === 'serve') {
            //     const fullPath = path.join(rootDir, config.watchDirectory)
            //     const newWatcher = chokidar.watch(fullPath, { ignoreInitial: true });

            //     newWatcher
            //         .on('add', run)
            //         .on('change', run)
            //         .on('unlink', run);

            //     watcher = newWatcher;
            // }
        },
        buildEnd(err?: Error) {
            watcher?.close();
        }
    }
}