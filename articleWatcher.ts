import { PluginOption, ViteDevServer, WebSocketServer } from "vite";

import fs from "fs";
import { readdir } from 'fs/promises'
import path from 'path'

import matter from 'front-matter';

import chokidar, { FSWatcher } from "chokidar";

const config = {
    watchDirectory: 'articles',

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

    function run() {
        const watchDirFullPath = path.join(rootDir, config.watchDirectory)
        const files = fs.readdirSync(watchDirFullPath);

        const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    
        // regenerate
        const manifest: any[] = []
        files.forEach(fileName => {
            const fileFullPath = path.join(watchDirFullPath, fileName)

            const { birthtime } = fs.statSync(fileFullPath)
            const fileContents = fs.readFileSync(fileFullPath).toString()
            
            const frontMatter = matter(fileContents)

            const fileRelativePath = path.relative(publicDir, fileFullPath);

            const fileInfo = JSON.parse(JSON.stringify(frontMatter)) as MatterOutputType<any>;
            fileInfo.path = fileRelativePath
            fileInfo.filename = fileName
            fileInfo.filenameNoExt = fileName.substring(0, fileName.lastIndexOf('.'));
            fileInfo.frontmatter = ''
            fileInfo.created = birthtime.getUTCDate();
            
            manifest.push(fileInfo);
        });

        const outputString = JSON.stringify(manifest, null, 2);
        fs.writeFileSync(config.output, outputString, { encoding: 'utf8', flag: 'w' })

        ws?.send({ type: 'full-reload', path: '*' })
    }

    return {
        name: 'generate-files-manifest',
        configureServer(server: ViteDevServer) {
            ws = server.ws
        },
        configResolved(resolvedConfig) {
            publicDir = resolvedConfig.publicDir
            rootDir = resolvedConfig.root
            command = resolvedConfig.command
        },

        buildStart(options) {
            run();

            if (command === 'serve') {
                const fullPath = path.join(rootDir, config.watchDirectory)
                const newWatcher = chokidar.watch(fullPath, { ignoreInitial: true });

                newWatcher
                    .on('add', function (path) {
                        run();
                    })
                    .on('change', function (path) {
                        run();
                    })
                    .on('unlink', function (path) {
                        run();
                    });

                watcher = newWatcher;
            }
        },

        buildEnd(err?: Error) {
            console.log('build end')
            watcher?.close();
        }
    }
}