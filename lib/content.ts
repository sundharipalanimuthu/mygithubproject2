import { blogs } from "../.velite"

export function getBlogPosts() {
  return blogs.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
