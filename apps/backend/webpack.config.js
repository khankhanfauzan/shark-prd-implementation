const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const path = require('path');

module.exports = (env, argv) => {
  const config = {
    // 📌 1. Memberitahu Webpack bahwa ini adalah aplikasi Node.js (bukan browser)
    target: 'node',

    output: {
      path: path.join(__dirname, '../../dist/apps/backend'),
      clean: true,
      ...(process.env.NODE_ENV !== 'production' && {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      }),
    },

    // 📌 2. Kecualikan runtime Prisma & node_modules dari bundling Webpack
    externalsPresets: { node: true },
    externals: [], // will be handled by MyCustomExternalsPlugin

    plugins: [
      new NxAppWebpackPlugin({
        target: 'node',
        compiler: 'tsc',
        main: './src/main.ts',
        tsConfig: './tsconfig.app.json',
        assets: ['./src/assets'],
        optimization: false,
        outputHashing: 'none',
        generatePackageJson: true,
        sourceMap: true,
      }),
      {
        apply(compiler) {
          compiler.hooks.afterPlugins.tap('MyCustomExternalsPlugin', () => {
            if (!Array.isArray(compiler.options.externals)) {
              compiler.options.externals = compiler.options.externals ? [compiler.options.externals] : [];
            }
            compiler.options.externals.push(function ({ context, request }, callback) {
              if (request) {
                if (request.includes('generated/prisma')) {
                  const absolutePrismaPath = path.resolve(__dirname, '../../libs/database/generated/prisma');
                  return callback(null, 'commonjs ' + absolutePrismaPath);
                }
                if (request.includes('@prisma')) {
                  return callback(null, 'commonjs ' + request);
                }
              }
              callback();
            });
          });
        }
      }
    ],
  };

  return config;
};
