import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Post } from '@/types/Post'

export function useFetchRecentPosts() {
  const recentPosts = ref<Post[]>([])
  const error = ref<string | null>(null)

  async function getRecentPosts() {
    try {
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      if (fetchError) {
        error.value = fetchError.message
        return console.error(fetchError)
      }
      recentPosts.value = data || []
    } catch (error: any) {
      console.error('Error fetching posts:', error.message)
    }
  }

  onMounted(() => {
    getRecentPosts()
  })

  return { recentPosts, error }
}
