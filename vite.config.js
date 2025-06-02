import { defineConfig } from 'vite'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    base: '',
    build: {
        rollupOptions: {
            output: {
                entryFileNames: '[name].js', // Puts scripts at root
                chunkFileNames: '[name].js', // Puts chunks at root
                assetFileNames: (assetInfo) => {
                    const extType = path.extname(assetInfo.name);
                    if (extType === '.css') return '[name][extname]'; // Puts CSS at root
                    return 'assets/[name][extname]'; // Other assets (e.g., fonts, images)
                },
            },
        },
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'assets/**/*',      // Copies everything from root-level assets
                    dest: 'assets'           // To dist/assets
                }
            ]
        })
    ]
})