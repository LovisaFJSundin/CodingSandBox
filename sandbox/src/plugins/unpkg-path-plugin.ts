import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localForage from 'localforage'

const fileCache = localForage.createInstance({
    name: 'filecache'
});


export const unpkgPathPlugin = () => {
    return {
      name: 'unpkg-path-plugin',
      setup(build: esbuild.PluginBuild) {

        /* 1. Intercept ANY import paths to prevent esbuild from mapping
            it to file system location.
            Tag them with a specific namespace ('a') to reserve it for
            this plugin.
        */
        build.onResolve({ filter: /.*/ }, async (args: any) => {
          console.log('onResolve', args);
          if (args.path === 'index.js') {
            return { path: args.path, namespace: 'a' };
          }
          if (args.path.includes('./') || args.path.includes('../')) {
              return {
                  namespace: 'a',
                  path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
              };
          }

          return {
              namespace: 'a',
              path: `https://unpkg.com/${args.path}`
          }

        });

        /* 2. Given ANY path with that namespace, attempt to load the file, 
            but not directly from the hard drive file system, rather load it 
            via unpkg, effectively intercepting
        */

        build.onLoad({ filter: /.*/ }, async (args: any) => {
          console.log('onLoad', args);
   
          if (args.path === 'index.js') {
            return {
              loader: 'jsx',
              contents: `
                const message = require('react');
                console.log(message);
              `,
            };
          } 

          // Check if related files are in the cache
          const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
          if (cachedResult){
              return cachedResult;
          }

          // Attempt to fetch the main file of this package
          const { data, request } = await axios.get(args.path);
          // Store response in cache

          const result: esbuild.OnLoadResult = {
              loader: 'jsx',
              contents: data,
              resolveDir: new URL('./', request.responseURL).pathname
          }

          await fileCache.setItem(args.path, result);
          return result;
        });
      },
    };
  };