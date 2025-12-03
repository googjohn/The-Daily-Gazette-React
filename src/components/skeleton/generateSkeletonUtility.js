import { cloneElement } from "react"

export function generateSkeletonElements(len, html) {
  const elements = []
  for (let i = 0; i < len; i++) {
    elements.push(cloneElement(html, { key: i }))
  }
  return elements
}