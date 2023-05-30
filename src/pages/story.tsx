import { gameActiveAtom } from '@/util/atoms'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Story() {
  const router = useRouter()

  const gameActive = useAtomValue(gameActiveAtom)

  useEffect(() => {
    if (!gameActive && !localStorage.getItem('saved-session')) {
      window.location.href = '/'
    }
  }, [gameActive])

  return <></>
}

export default Story
