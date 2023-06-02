import { Springs, Story } from '@/types/story'

export default {
  id: 1,
  title: 'Unveiling the Veiled',
  steps: [
    {
      text: "Despite everything that happened, I'll be honest, I'm sort of glad I lived to tell the tale.",
    },
    {
      text: "Does that make me selfish, though? That question lingered in my mind for a while... but I eventually came to the conclusion that perhaps it didn't.",
    },
    {
      text: 'Maybe.. it was the way I perceived others that made me feel that way.',
    },
    {
      text: "Atleast, that's what I keep telling myself. It's not like the dunes have been in anyone's spotlight recently, anyway.",
      effects: (springs: Springs) => {
        springs.bgSpring.start({ opacity: 0 })
      },
    },
    {
      text: 'The wind whispered through what had been familiar to me for as long as I could remember.',
      effects: (springs: Springs) => {
        springs.bgSpring.start({ opacity: 0.8 })
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
        springs.bgSpring.start({ scale: 1.1 })
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
  ],
} as Story
