import { defineConfig } from 'vitest/config'
import tsconfigspaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigspaths()],
  test: {
    environmentMatchGlobs: [['src/controllers/**', 'prisma']]
  }
})
