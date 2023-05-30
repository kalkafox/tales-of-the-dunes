import { atom } from 'jotai'

import story0 from '@/data/stories/0.json'

export const gameActiveAtom = atom(false)

export const storyStepAtom = atom(-1)

export const currentStoryAtom = atom(story0)
