import { onMounted, ref } from "vue"
import { supabase } from '@/lib/supabaseClient'
import type { Post } from "@/types/Post"

export function useFetchPostsByPage() {

  const pagePosts = ref<Post[]>([]);
  const error = ref<string | null>(null);
  const nbPostsPerPage = 5;

  async function getPostsByPage(page: number = 1) {
    try {
      const from = (page - 1) * nbPostsPerPage
      const to = from + nbPostsPerPage - 1

      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to)

      if (fetchError) {
        error.value = fetchError.message
        return console.error(fetchError)
      }
      pagePosts.value = data || [];
    }
    catch (error: any) {
      console.error('Error fetching posts:', error.message)
    }
  }

  onMounted(() => {
    getPostsByPage()
  })

  return { pagePosts, error, getPostsByPage };
}
