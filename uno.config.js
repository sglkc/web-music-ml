import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ],
  theme: {
    fontFamily: {
      sans: '"DM Sans", system-ui, sans-serif',
      serif: '"DM Serif Text", serif',
    },
  },
})

