import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        im: () => import('@iconify-json/iconamoon/icons.json').then(i => i.default),
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
      scale: 1.25,
      warn: true,
    }),
    presetUno(),
  ],
  theme: {
    fontFamily: {
      sans: '"DM Sans", system-ui, sans-serif',
    },
  },
})
