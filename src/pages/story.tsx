import { currentStoryAtom, gameActiveAtom, storyStepAtom } from '@/util/atoms'
import { storyData } from '@/util/stories'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Story() {
  const router = useRouter()

  const [gameActive, setGameActive] = useAtom(gameActiveAtom)
  const [storyStep, setStoryStep] = useAtom(storyStepAtom)
  const [currentStory, setCurrentStory] = useAtom(currentStoryAtom)

  useEffect(() => {
    const step = localStorage.getItem('saved-session')
    const story = localStorage.getItem('current-story')
    if (!gameActive && !step) {
      window.location.href = '/'
    }

    if (story) {
      const s = parseInt(story)
      if (s >= 0) {
        setCurrentStory(storyData[s])
      }
    }

    if (!gameActive && step) {
      const n = parseInt(step)
      if (n >= 0) {
        setGameActive(true)
        setStoryStep(n)
      }
    }
  }, [gameActive])

  return <></>
}

export default Story
