import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const bundle = async (rawCode : string) => {
    try { 
        await esbuild.initialize({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm'
        })
    } catch(err){
        console.error(err);
    }

    await esbuild.transform(rawCode, {
        loader: 'jsx',
        target: 'es2015'
    })
    
    const result = await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin(rawCode)
            ],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            }
        })
    return result.outputFiles[0].text;
}

export default bundle;