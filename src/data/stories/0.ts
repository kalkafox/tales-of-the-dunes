import { Springs, Story } from '@/types/story'
import { SpringRef } from '@react-spring/web'

export default {
  id: 0,
  title: 'The First Story',
  steps: [
    {
      text: 'This is the first step of the first story.',
    },
    {
      text: 'This is the second step of the first story.',
    },
    {
      text: 'Now, what happens if we add just a little bit of spice? Do we, say, perhaps, try to see if the commas make some... sort of delay?',
    },
    {
      text: 'This is the third step of the first story.',
      effects: (springs: Springs) => {
        springs.bgSpring.start({ opacity: 0 })
      },
    },
    {
      text: 'This is the fourth step of the first story.',
      effects: (springs: Springs) => {
        springs.bgSpring.start({ opacity: 0 })
      },
    },
    {
      text: "Hey, look, the background changed! Let's see if we can, say, make it change back! That'd be pretty cool, right?",
      effects: (springs: Springs) => {
        springs.bgSpring.start({ opacity: 0 })
      },
    },
    {
      text: "And now, we're going to fade into oblivion. Goodbye!",
      effects: (springs: Springs) => {
        springs.bgSpring.start({ opacity: 0 })
      },
    },
  ],
} as Story
