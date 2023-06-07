import { Springs, Story } from '@/types/story'
import { fadeIn, fadeOut } from '@/util/audio'

export default {
  id: 1,
  title: 'Unveiling the Veiled',
  steps: [
    {
      text: 'Looking back, I never imagined that it would come to this.',
    },
    {
      text: 'The Sethrakk that stood by at the time, made their efforts to redeem themselves in the colors they wore.',
    },
    {
      text: 'For the most part, they were successful. The Sethrakk were able to integrate into the Horde, and the Vulpera were able to live in relative peace.',
    },
    {
      text: "Atleast, that's what I kept telling myself. It's not like the dunes have been in anyone's spotlight recently, anyway.",
      effects: (springs: Springs) => {
        springs.bgSpring.start({ opacity: 0 })

        if (springs.audio && !springs.audio.paused) {
          fadeOut(springs.audio)
        }
      },
    },
    {
      text: 'The wind whispered through what had been familiar to me for as long as I could remember.',
      effects: (springs: Springs) => {
        springs.bgSpring.start({
          opacity: 0.8,
          config: {
            // slow physics
            mass: 10,
            tension: 100,
            friction: 100,
          },
        })

        if (springs.audio && springs.audio.paused) {
          fadeIn(springs.audio)
        }
      },
    },
    {
      text: 'Some specks swirled around me, as if the sands were welcoming me into what was otherwise a barren wasteland.',
      effects: (springs: Springs) => {
        springs.bgSpring.start({ scale: 1 })
      },
    },
    {
      text: 'I adjusted my glasses, their lenses reflecting the dim moonlight and peered into the vast expanse of the desert.',
      effects: (springs: Springs) => {
        springs.bgSpring.start({
          scale: 1.2,
          config: {
            // slow physics
            mass: 10,
            tension: 100,
            friction: 100,
          },
        })
      },
    },
    {
      text: 'It was late, far later than any sane Vulpera would venture out into the unforgiving night, but there was something drawing me forward.',
    },
    {
      text: 'I felt a sense of connection to the land, to the ancient secrets that hid within its shifting sands.',
    },
    {
      text: 'And, with each step, my pawpads sank into the soft sand, leaving a trail of shallow footprints behind me.',
    },
    {
      text: "I remember being very alert. It's as if something had been telling me to be on my guard, but I couldn't quite place my paw on it.",
    },
  ],
} as Story
