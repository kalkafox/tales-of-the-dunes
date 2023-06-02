import { creteRound, inter, roboto } from '@/util/font'
import { AppData } from '@/types/story'

export default {
  version: '0.0.2b',
  fonts: [
    ['Roboto', roboto.className],
    ['Inter', inter.className],
    ['Crete Round', creteRound.className],
  ],
} as AppData
