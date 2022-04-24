import typescript from '@rollup/plugin-typescript';

function configure(esm) {
  return {
    input: 'src/set-array.ts',
    output: esm
      ? { format: 'es', dir: 'dist', entryFileNames: '[name].mjs', sourcemap: true }
      : {
          format: 'umd',
          name: 'setArray',
          dir: 'dist',
          entryFileNames: '[name].umd.js',
          sourcemap: true,
        },
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        tslib: './throw-when-needed',
      }),
    ],
    watch: {
      include: 'src/**',
    },
  };
}

export default [configure(false), configure(true)];
