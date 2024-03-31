export function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
