import { animated, useSpring } from '@react-spring/web'

import { version } from '@/data/vd.json'
import {
  currentStoryAtom,
  gameActiveAtom,
  skipTextAtom,
  storyStepAtom,
} from '@/util/atoms'
import { useAtom } from 'jotai'

import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import story0 from '@/data/stories/0.json'

const storyData = [story0]

export default function Main() {
  const router = useRouter()

  const [gameActive, setGameActive] = useAtom(gameActiveAtom)

  const [currentStory, setCurrentStory] = useAtom(currentStoryAtom)

  const [storyStep, setStoryStep] = useAtom(storyStepAtom)

  const [messageContent, setMessageContent] = useState('')

  const [savedStep, setSavedStep] = useState(0)

  const [skipText, setSkipText] = useAtom(skipTextAtom)

  const [titleSpring, setTitleSpring] = useSpring(() => ({
    display: 'none',
    opacity: 0,
    x: 90,
    from: {
      display: 'none',
      opacity: 0,
      x: 90,
    },
    to: {
      display: 'block',
      opacity: 1,
      x: 0,
    },
  }))

  const [versionSpring, setVersionSpring] = useSpring(() => ({
    display: 'none',
    opacity: 0,
    from: {
      display: 'none',
      opacity: 0,
    },
    to: {
      opacity: 1,
      display: 'block',
    },
  }))

  const [menuSpring, setMenuSpring] = useSpring(() => ({
    display: 'none',
    opacity: 0,
    scale: router.pathname === '/' ? 1 : 1.1,
    from: {
      display: 'none',
      opacity: 0,
      scale: router.pathname === '/' ? 1 : 1.1,
    },
    to: {
      display: 'block',
      opacity: 1,
      scale: 1,
    },
  }))

  const [confirmationSpring, setConfirmationSpring] = useSpring(() => ({
    display: 'none',
    opacity: 0,
    scale: 1,
  }))

  const [optionSpring, setOptionSpring] = useSpring(() => ({
    display: 'none',
    opacity: 0,
    scale: 1,
  }))

  const [messageBoxSpring, setMessageBoxSpring] = useSpring(() => ({
    display: 'none',
    opacity: 0,
    scale: 0.9,
  }))

  const [textSpring, setTextSpring] = useSpring(() => ({
    opacity: 1,
  }))

  useEffect(() => {
    setOptionSpring.start({
      display: gameActive ? 'block' : 'none',
      opacity: gameActive ? 1 : 0,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameActive])

  useEffect(() => {
    if (storyStep < 0) return

    setTextSpring.start({
      opacity: 1,
    })

    if (skipText) {
      setMessageContent(currentStory.steps[storyStep].text)
      return () => {
        setMessageContent('')
      }
    }

    let i = 0
    let timeouts: NodeJS.Timeout[] = []
    for (const c of currentStory.steps[storyStep].text) {
      const t = setTimeout(() => {
        setMessageContent((prev) => prev + c)
      }, 35 * i++)
      timeouts.push(t)
    }

    return () => {
      setMessageContent('')
      timeouts.forEach((t) => clearTimeout(t))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyStep, skipText])

  return (
    <div
      onWheel={(e) => {
        setStoryStep((prev) => {
          if (prev >= savedStep) {
            return savedStep
          }

          // TODO: fix this

          if (prev + (e.deltaY > 0 ? 1 : -1) < 0) return 0
          if (prev + (e.deltaY > 0 ? 1 : -1) >= currentStory.steps.length)
            return currentStory.steps.length - 1
          return prev + (e.deltaY > 0 ? 1 : -1)
        })
      }}
      className="fixed h-screen w-screen"
    >
      <animated.button
        style={optionSpring}
        onClick={() => {
          setMenuSpring.start({
            opacity: 1,
            scale: 1,
            display: 'block',
          })
        }}
        className="fixed bottom-0 right-0 m-2 rounded bg-zinc-900/50 px-1 py-1 font-bold text-white transition-colors hover:bg-zinc-900/75"
      >
        <Icon
          icon="ion:options-sharp"
          width={24}
          height={24}
          className="mx-1 inline"
        />
      </animated.button>
      <animated.div
        onClick={() => {
          if (gameActive) {
            setSavedStep(storyStep)
            setTextSpring.start({
              opacity: 0,
              onRest: (_, ctrl) => {
                setStoryStep((prev) => {
                  if (prev + 1 >= currentStory.steps.length) {
                    router.push('/')
                    setMessageBoxSpring.start({
                      opacity: 0,
                      scale: 0.9,
                      onRest: (_, ctrl) => {
                        ctrl.start({
                          display: 'none',
                        })
                        setGameActive(false)

                        setMenuSpring.start({
                          opacity: 1,
                          scale: 1,
                          display: 'block',
                        })
                      },
                    })
                    return -1
                  }
                  return prev + 1
                })
              },
            })
          }
        }}
        style={messageBoxSpring}
        className="fixed bottom-0 left-0 right-0 m-auto my-2 h-32 w-[700px] select-none rounded-md bg-zinc-200/10"
      >
        <animated.p style={textSpring} className="m-2">
          {messageContent}
        </animated.p>
      </animated.div>

      <animated.div
        style={menuSpring}
        className="fixed h-full w-full bg-zinc-900/25 backdrop-blur-sm"
      >
        {gameActive && (
          <span className="fixed right-0 m-2">
            <button
              onClick={() => {
                setMenuSpring.start({
                  opacity: 0,
                  scale: 1.1,
                  onRest: (_, ctrl) => {
                    ctrl.start({
                      display: 'none',
                    })
                  },
                })
              }}
              className="rounded bg-zinc-900/50 px-1 py-1 font-bold text-white transition-colors hover:bg-zinc-900/75"
            >
              <Icon
                icon="material-symbols:close"
                width={24}
                height={24}
                className="mx-1 inline"
              />
            </button>
          </span>
        )}
        <nav className="fixed bottom-0 grid w-auto items-center justify-center">
          <button
            onClick={() => {
              if (gameActive) {
                setConfirmationSpring.start({
                  opacity: 1,
                  display: 'block',
                })
                return
              }

              setMenuSpring.start({
                opacity: 0,
                scale: 1.1,
                onRest: (_, ctrl) => {
                  ctrl.start({
                    display: 'none',
                  })
                  setMessageContent('')
                  setGameActive(true)
                  router.push('/story')
                  setMessageBoxSpring.start({
                    opacity: 1,
                    display: 'block',
                    scale: 1,
                    onRest: () => {
                      setStoryStep(0)
                    },
                  })
                },
              })
            }}
            className="rounded-r-md p-2 transition-colors hover:bg-zinc-700"
          >
            <Icon
              icon="tabler:book"
              width={24}
              height={24}
              className="mx-1 inline"
            />
            <span className="select-none text-right">New Story</span>
          </button>
          <button className="rounded-r-md p-2 transition-colors hover:bg-zinc-700">
            <Icon
              icon="mdi:floppy"
              width={24}
              height={24}
              className="mx-1 inline"
            />
            <span className="select-none text-right">Load Story</span>
          </button>
        </nav>
        <span className="fixed bottom-0 right-0 p-2">
          <animated.h1 style={titleSpring} className="select-none text-6xl">
            Tales of the Dunes
          </animated.h1>
          <animated.h2 style={versionSpring} className="select-none">
            <Icon icon="carbon:version" className="mx-1 inline" />
            <span className="absolute my-[2px]">{version}</span>
          </animated.h2>
          <h3 className="select-none text-right text-xs italic text-zinc-600">
            Whispering dunes sing,
            <br />
            Ancient tales in shifting sand,
            <br />
            Legends never end.
          </h3>
        </span>
      </animated.div>
      <animated.div
        style={confirmationSpring}
        className="fixed h-full w-full bg-zinc-900/50"
      >
        <div className="fixed left-0 right-0 m-auto grid w-[400px] grid-cols-1 gap-2">
          <h1 className="rounded-sm bg-zinc-900 p-2">
            Are you sure you want to start a new story?
            <br />
            You currently have a session open, your progress will be lost.
          </h1>
          <button
            onClick={() => {
              setMenuSpring.start({
                opacity: 0,
                scale: 1.1,
                onRest: (_, ctrl) => {
                  ctrl.start({
                    display: 'none',
                  })
                },
              })

              setConfirmationSpring.start({
                opacity: 0,
                onRest: (_, ctrl) => {
                  ctrl.start({
                    display: 'none',
                  })
                },
              })
            }}
            className="rounded-sm bg-zinc-900 p-2 transition-colors hover:bg-zinc-700"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setConfirmationSpring.start({
                opacity: 0,
                onRest: (_, ctrl) => {
                  ctrl.start({
                    display: 'none',
                  })
                },
              })
            }}
            className="rounded-sm bg-zinc-900 p-2 transition-colors hover:bg-zinc-700"
          >
            No
          </button>
        </div>
      </animated.div>
    </div>
  )
}
