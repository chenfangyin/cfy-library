import type { UserConfig } from 'vite'
import path from 'node:path'

import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig((): UserConfig => {
  return {

    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/element/index.scss" as *;`,
          api: 'modern-compiler',
        },
      },
    },

    plugins: [
      Vue(),

      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        extensions: ['.vue', '.md'],
        dts: 'src/types/typed-router.d.ts',
      }),

      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        dts: 'src/types/components.d.ts',
      }),

      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      Unocss(),
    ],

    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ['element-plus'],
    },

    build: {
      lib: {
        entry: './src/index.ts',
        name: 'frontend',
        fileName: format => `frontend.${format}.js`,
      },
      rollupOptions: {
        external: [
          'vue',
          'lodash-es',
          'element-plus',
          '@element-plus/icons-vue',
          'vue-json-pretty',
        ], // 排除不需要打包的依赖
        output: {
          globals: {
            'vue': 'Vue',
            'vue-i18n': 'VueI18n',
            'lodash-es': 'lodash',
            'element-plus': 'ElementPlus',
            '@element-plus/icons-vue': 'ElementPlusIconsVue',
            'vue-json-pretty': 'VueJsonPretty',
          },
        },
      },
    },
  }
})
