import { PluginOption, ViteDevServer, WebSocketServer } from "vite";
import path from 'path';
import chokidar, { FSWatcher } from "chokidar";
import { updateFiles } from './articleUpdater';

const config = {
    watchDirectory: 'blogData/articles/'
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

    function startWatcher() {
        const fullPath = path.join(rootDir, config.watchDirectory)
        const newWatcher = chokidar.watch(fullPath, { ignoreInitial: true });

        newWatcher
            .on('add', run)
            .on('change', run)
            .on('unlink', run);

        watcher?.close();
        watcher = newWatcher;
    };

    async function run() {
        await watcher?.close();
        const watchDirFullPath = path.join(rootDir, config.watchDirectory);
        updateFiles(watchDirFullPath);
        startWatcher();
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
            run();

            if (command === 'serve') {
                startWatcher();
            }
        },
        buildEnd(err?: Error) {
            return watcher?.close();
        }

    }
}