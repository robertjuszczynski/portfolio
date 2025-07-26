export function sleep(ms: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const smoothScrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth'
  })
}