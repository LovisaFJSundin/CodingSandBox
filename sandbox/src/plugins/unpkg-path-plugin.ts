import * as esbuild from 'esbuild-wasm'


export const unpkgPathPlugin = () => {
    return {
      name: 'unpkg-path-plugin',
      setup(build: esbuild.PluginBuild) {

        /*  Resolve means to intercept ANY import paths to prevent esbuild from mapping
            it to file system location.
            Tag them with a specific namespace ('a') to reserve it for
            this plugin.
        */

        // If the path is index.js, simply return it
        // i.e. root entry file
          build.onResolve( {filter: /(^index\.js$)/ }, () => {
              return { path: 'index.js', namespace: 'a'}
          })
        // If it is a relative path with one or more dots within  a module
        build.onResolve({filter: /^\.+\//}, (args: any)=> {
            return {
                namespace: 'a',
                path: new URL(args.path, 
                  'https://unpkg.com' + args.resolveDir + '/').href
            };
        })
        // Handle main file of a module
        build.onResolve({ filter: /.*/ }, async (args: any) => {
            return {
                namespace: 'a',
                path: `https://unpkg.com/${args.path}`
            }  
        });


      },
    };
  };