let release = () => {}

export const introDone = new Promise<void>((resolve) => {
  release = resolve
})

export const finishIntro = () => release()
