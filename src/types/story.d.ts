import { SpringRef } from '@react-spring/web'

export type Step = {
  text: string
  effects?: (springs: Springs) => void
}

export type Springs = {
  bgSpring: SpringRef<{
    opacity: number
    scale: number
    x: number
    y: number
    display: string
  }>
  firstSpriteSpring: SpringRef<{
    opacity: number
    x: number
    y: number
    display: string
  }>
  secondSpriteSpring: SpringRef<{
    opacity: number
    x: number
    y: number
    display: string
  }>
  audio: HTMLAudioElement
}

export type Story = {
  id: number
  title: string
  steps: Step[]
}

export type AppData = {
  version: string
  fonts: string[][]
}
