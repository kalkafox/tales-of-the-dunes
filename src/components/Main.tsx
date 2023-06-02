import { animated, useSpring } from '@react-spring/web'

import appData from '@/data/vd'
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
import { roboto } from '@/util/font'

import { storyData } from '@/util/stories'

// todo: use jotai to get localStorage data

export default function Main() {
  const router = useRouter()

  const [gameActive, setGameActive] = useAtom(gameActiveAtom)

  const [currentStory, setCurrentStory] = useAtom(currentStoryAtom)

  const [storyStep, setStoryStep] = useAtom(storyStepAtom)

  const [messageContent, setMessageContent] = useState('')

  const [textSpeed, setTextSpeed] = useState(25)

  const [savedStep, setSavedStep] = useState(0)

  // determines if the user backtracked in the story with the middle mouse wheel
  const [traceback, setTraceback] = useState(false)

  const [skipText, setSkipText] = useAtom(skipTextAtom)

  const [font, setFont] = useState(roboto.className)

  const [bgSpring, setBgSpring] = useSpring(() => ({
    opacity: 0,
    scale: 1,
    x: 0,
    y: 0,
    display: 'block',
  }))

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
    x: 0,
  }))

  const [arrowOpacitySpring, setArrowOpacitySpring] = useSpring(() => ({
    opacity: 0,
  }))

  const [arrowSpring, setArrowSpring] = useSpring(() => ({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    loop: {
      reverse: true,
    },
    config: {
      // fast physics
      mass: 1,
      tension: 500,
      friction: 50,
    },
  }))

  const [storySelectionSpring, setStorySelectionSpring] = useSpring(() => ({
    display: 'none',
    opacity: 0,
  }))

  const [settingsSpring, setSettingsSpring] = useSpring(() => ({
    display: 'none',
    opacity: 0,
  }))

  const [firstSpriteSpring, setFirstSpriteSpring] = useSpring(() => ({
    display: 'none',
    opacity: 0,
    x: 0,
    y: 0,
  }))

  const [secondSpriteSpring, setSecondSpriteSpring] = useSpring(() => ({
    display: 'none',
    opacity: 0,
    x: 0,
    y: 0,
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

    if (storyStep === savedStep) {
      setTraceback(false)
    }

    const step = currentStory.steps[storyStep]

    setTextSpring.set({
      x: skipText ? 0 : -10,
      opacity: skipText ? 1 : 0,
    })

    setTextSpring.start({
      opacity: 1,
      x: 0,
    })

    if (typeof step.effects === 'function') {
      step.effects({
        bgSpring: setBgSpring,
        firstSpriteSpring: setFirstSpriteSpring,
        secondSpriteSpring: setSecondSpriteSpring,
      })
    }

    let timeouts: NodeJS.Timeout[] = []

    if (skipText) {
      setMessageContent(step.text)
    } else {
      let i = 0
      let baseTime = textSpeed
      let inc = 0
      for (const c of step.text) {
        let o = step.text.at(i - 1)

        if (i !== 0 && o) {
          switch (o) {
            case '.': {
              inc += 350
              break
            }
            case ',': {
              inc += 300
              break
            }
            case '!': {
              inc += 550
              break
            }
            case '?': {
              inc += 500
              break
            }
          }
        }

        const t = setTimeout(() => {
          setMessageContent((prev) => prev + c)
        }, inc + baseTime * i++)
        timeouts.push(t)
      }
    }

    return () => {
      setMessageContent('')
      timeouts.forEach((t) => clearTimeout(t))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyStep, skipText, textSpeed])

  useEffect(() => {
    if (
      gameActive &&
      currentStory.steps[storyStep] &&
      messageContent === currentStory.steps[storyStep].text
    ) {
      setArrowOpacitySpring.start({
        opacity: 1,
      })
      if (!traceback) {
        setTraceback(false)

        localStorage.setItem('saved-session', storyStep.toString())
        localStorage.setItem('current-story', currentStory.id.toString())

        setSavedStep(storyStep)
      }
    }
  }, [messageContent, storyStep, traceback, gameActive])

  useEffect(() => {
    if (gameActive) {
      setMessageBoxSpring.start({
        opacity: 1,
        display: 'block',
        scale: 1,
      })
      setMenuSpring.start({
        opacity: 0,
        scale: 1.1,
        display: 'none',
      })
    }
  }, [savedStep, gameActive])

  useEffect(() => {
    switch (router.pathname) {
      case '/story': {
        setSettingsSpring.start({
          opacity: 0,
          onRest: (_, ctrl) => {
            ctrl.start({
              display: 'none',
            })
          },
        })
        setMenuSpring.start({
          opacity: 0,
          scale: 1.1,
        })
        break
      }
      case '/settings': {
        setMenuSpring.start({
          opacity: 1,
          scale: 1,
        })
        break
      }
    }
  }, [router.pathname])

  return (
    <div className="fixed h-screen w-screen">
      <animated.video
        preload="auto"
        style={bgSpring}
        loop
        autoPlay
        muted
        className="fixed h-full w-full object-cover"
      >
        {/* source is .ts */}
        <source src="/scene2.m3u8" type="application/x-mpegURL" />
        <source src="/scene2.mp4" type="video/mp4" />
      </animated.video>
      <animated.button
        style={optionSpring}
        onClick={() => {
          router.push('/settings')
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
        onWheel={(e) => {
          if (e.deltaY > 0) {
            setStoryStep((prev) => {
              if (prev - 1 < 0) {
                return prev
              }
              return prev - 1
            })
            if (storyStep === 0) {
              return
            }
            setSkipText(true)
            setTraceback(true)
          }

          if (e.deltaY < 0) {
            if (storyStep === savedStep - 1) {
              setTraceback(false)
            }

            if (storyStep >= savedStep) {
              return
            }

            setStoryStep((prev) => {
              if (prev + 1 >= currentStory.steps.length) {
                return prev
              }
              return prev + 1
            })
          }
        }}
        onClick={() => {
          if (gameActive) {
            if (!traceback) {
              setSavedStep(storyStep)

              localStorage.setItem('saved-session', storyStep.toString())
              localStorage.setItem('current-story', currentStory.id.toString())
            }

            if (messageContent < currentStory.steps[storyStep].text) {
              setSkipText(true)
              return
            }

            setArrowOpacitySpring.start({
              opacity: 0,
            })

            setTextSpring.start({
              opacity: 0,
              x: 10,
              onRest: (_, ctrl) => {
                setSkipText(false)
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
        className="fixed bottom-0 left-0 right-0 m-auto my-2 h-36 w-[700px] cursor-pointer select-none rounded-md bg-zinc-800/75 backdrop-blur-lg"
      >
        <animated.p
          style={textSpring}
          className={`m-2 ${font} transition-colors ${
            traceback && 'text-zinc-500'
          }`}
        >
          {messageContent}
        </animated.p>
        <animated.div style={arrowOpacitySpring}>
          <animated.div
            style={arrowSpring}
            className="absolute bottom-1 left-0 right-0 m-auto text-center"
          >
            <Icon
              icon="maki:arrow"
              width={12}
              height={12}
              className="mx-1 inline"
            />
          </animated.div>
        </animated.div>
      </animated.div>

      <animated.div
        style={menuSpring}
        className="fixed h-full w-full bg-zinc-900/25 backdrop-blur-sm"
      >
        {gameActive && (
          <span className="fixed right-0 m-2">
            <button
              onClick={() => {
                router.push('/story')
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
        <nav className="fixed bottom-0 grid w-auto grid-cols-1 items-center justify-center">
          <button
            onClick={() => {
              if (gameActive) {
                setConfirmationSpring.start({
                  opacity: 1,
                  display: 'block',
                })
                return
              }

              setStorySelectionSpring.start({
                opacity: 1,
                display: 'block',
              })
            }}
            className="rounded-r-md p-2 transition-colors hover:bg-zinc-700"
          >
            <Icon
              icon="tabler:book"
              width={24}
              height={24}
              className="absolute left-0 inline"
            />
            <span className="mx-6 select-none">New Story</span>
          </button>
          <button
            disabled={true}
            className="rounded-r-md p-2 text-zinc-400 transition-colors hover:bg-zinc-700"
          >
            <Icon
              icon="mdi:floppy"
              width={24}
              height={24}
              className="absolute left-0 inline"
            />
            <span className="select-none">Load Story</span>
          </button>
          {gameActive && (
            <button
              onClick={() => {
                setSettingsSpring.start({
                  opacity: 1,
                  display: 'block',
                })

                setMenuSpring.start({
                  opacity: 0,
                })
              }}
              className="rounded-r-md p-2 transition-colors hover:bg-zinc-700"
            >
              <Icon
                icon="mdi:gear"
                width={24}
                height={24}
                className="absolute left-0 inline"
              />
              <span className="select-none">Settings</span>
            </button>
          )}
        </nav>
        <span className="fixed bottom-0 right-0 p-2">
          <animated.h1 style={titleSpring} className="select-none text-6xl">
            Tales of the Dunes
          </animated.h1>
          <animated.h2 style={versionSpring} className="select-none">
            <Icon icon="carbon:version" className="mx-1 inline" />
            <span className="absolute my-[2px]">{appData.version}</span>
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
        style={storySelectionSpring}
        className="fixed grid h-full w-full items-center justify-center"
      >
        <div className="left-0 right-0 m-auto my-4 w-72 rounded-sm bg-zinc-900/80 p-2">
          <p className="text-center">Select a story.</p>
          <div className="my-5 grid grid-cols-2 space-x-2">
            <button
              onClick={() => {
                setCurrentStory(storyData[1])

                setStorySelectionSpring.start({
                  opacity: 0,
                  onRest: (_, ctrl) => {
                    ctrl.start({
                      display: 'none',
                    })
                  },
                })

                setMenuSpring.start({
                  opacity: 0,
                  scale: 1.1,
                  onRest: (_, ctrl) => {
                    ctrl.start({
                      display: 'none',
                    })
                    setStoryStep(0)
                    router.push('/story')
                    setMessageContent('')
                    setGameActive(true)
                  },
                })
              }}
              className="bg-zinc-800 p-1 text-center transition-colors hover:bg-zinc-700"
            >
              Unveiling the Veiled (demo)
            </button>
            <button
              onClick={() => {
                setCurrentStory(storyData[0])

                setStorySelectionSpring.start({
                  opacity: 0,
                  onRest: (_, ctrl) => {
                    ctrl.start({
                      display: 'none',
                    })
                  },
                })

                setMenuSpring.start({
                  opacity: 0,
                  scale: 1.1,
                  onRest: (_, ctrl) => {
                    ctrl.start({
                      display: 'none',
                    })
                    setStoryStep(0)
                    router.push('/story')
                    setMessageContent('')
                    setGameActive(true)
                  },
                })
              }}
              className="bg-zinc-800 p-1 text-center transition-colors hover:bg-zinc-700"
            >
              Test (debug purposes)
            </button>
          </div>
        </div>
      </animated.div>

      <animated.div
        style={settingsSpring}
        className="fixed h-full w-full bg-zinc-900/25"
      >
        <span className="fixed right-0 m-2">
          <button
            onClick={() => {
              setMenuSpring.start({
                opacity: 1,
              })

              setSettingsSpring.start({
                opacity: 0,
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
        <div className="left-0 right-0 m-auto my-2 w-32">
          <label
            htmlFor="font"
            className="mb-2 block select-none text-sm font-medium text-gray-900 dark:text-white"
          >
            Font
          </label>
          <select
            id="font"
            onChange={(e) => {
              setFont(e.target.value)
              console.log(e.target.value)
            }}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            {appData.fonts.map((font) => (
              <option key={font[0]} value={font[1]}>
                {font[0]}
              </option>
            ))}
          </select>
        </div>
        <div className="left-0 right-0 m-auto my-2 w-32">
          <label
            htmlFor="text-speed-range"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Text Speed
          </label>
          <input
            id="text-speed-range"
            type="range"
            min="0"
            max="50"
            onChange={(e) => {
              setTextSpeed(parseInt(e.target.value))
            }}
            value={textSpeed}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
          ></input>
        </div>
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
