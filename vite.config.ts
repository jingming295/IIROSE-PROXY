import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    preact(),
    tailwindcss(),
    cssInjectedByJsPlugin()
  ],
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'IIROSEPROXY',
      fileName: () => `iirose-proxy.umd.js`, // 只生成 UMD 文件
      formats: ['umd'] // 仅输出 UMD 格式
    },
    cssCodeSplit: false, // 不拆分 CSS
    rollupOptions: {
      output: {
        globals: {
          preact: 'Preact'
        }
      }
    }
  }
});
