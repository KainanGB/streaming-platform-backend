import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import vitestConfig from './vite.config'

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      exclude: [...configDefaults.exclude, 'src/controllers/**/*']
    }
  })
)
