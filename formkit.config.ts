import { fr } from '@formkit/i18n'
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'
import { genesisIcons } from '@formkit/icons'
import { createAutoHeightTextareaPlugin } from '@formkit/addons'

export default defaultConfig({
  locales: { fr },
  locale: 'fr',
  config: {
    rootClasses,
  },
  plugins: [createAutoHeightTextareaPlugin()],
  icons: {
    ...genesisIcons,
  },
})
