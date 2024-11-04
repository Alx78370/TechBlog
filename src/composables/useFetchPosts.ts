import { onMounted, ref } from "vue"
import { supabase } from '@/lib/supabaseClient'
import type { Post } from "@/types/Post"

export function useFetchPosts() {

  const posts = ref<Post[]>([])
  const error = ref<string | null>(null)

  async function getPosts() {
    try {
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
      if (fetchError) {
        error.value = fetchError.message
        return console.error(fetchError)
      }
      posts.value = data || [];
    }
    catch (error: any) {
      console.error('Error fetching posts:', error.message)
    }
  }

  onMounted(() => {
    getPosts()
  })

  return { posts, error };
}
