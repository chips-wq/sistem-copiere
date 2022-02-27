export interface Category {
  id: number
  name: string
  description: string
}

export interface Lesson {
  id: number
  title: string
  description: string
  markdown: string | null
  categoryId: number
}
