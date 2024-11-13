export interface Post {
  id?: number
  title: string
  content: string
  image: File | null
  created_at?: string
}
