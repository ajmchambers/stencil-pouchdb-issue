import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import resolvePlugin from '@rollup/plugin-node-resolve';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://myapp.local/'
    }
  ],
  rollupPlugins: {
    before: [
      resolvePlugin({ browser: true })
    ],
    after: [
      nodePolyfills(),
    ]
  }
};