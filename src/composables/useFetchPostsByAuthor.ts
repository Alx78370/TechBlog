import { onMounted, ref } from "vue"
import { supabase } from '@/lib/supabaseClient'
import type { Post } from "@/types/Post"
import type { Author } from "@/types/Author"

export function useFetchPostsByAuthor(id: number) {

  const authorPosts = ref<Post[]>([])
  const error = ref<string | null>(null)

  async function getPostsByAuthor(authorId: number) {
    try {
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('author_id', authorId)
      if (fetchError) {
        error.value = fetchError.message
        return console.error(fetchError)
      }
      authorPosts.value = data || [];
    }
    catch (error: any) {
      console.error('Error fetching posts:', error.message)
    }
  }

  onMounted(() => {
    getPostsByAuthor(id)
  })

  return { authorPosts, error };
}
