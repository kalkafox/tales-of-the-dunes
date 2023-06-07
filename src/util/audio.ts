export function fadeOut(audio: HTMLAudioElement) {
  audio.volume = 1
  const fadeOutInterval = setInterval(() => {
    if (audio.volume > 0) {
      try {
        audio.volume -= 0.05
      } catch (e) {
        clearInterval(fadeOutInterval)
        audio.pause()
      }
    } else {
      clearInterval(fadeOutInterval)
      audio.pause()
    }
  }, 50)
}

export function fadeIn(audio: HTMLAudioElement) {
  audio.volume = 0
  audio.play()
  const fadeInInterval = setInterval(() => {
    if (audio.volume < 1) {
      try {
        audio.volume += 0.05
      } catch (e) {
        clearInterval(fadeInInterval)
      }
    } else {
      clearInterval(fadeInInterval)
    }
  }, 50)
}
