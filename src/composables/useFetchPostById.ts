import { onMounted, ref  } from "vue";
import { supabase } from '@/lib/supabaseClient'
import type { Post } from "@/types/Post";

export function useFetchPostById(id: number) {

  const post = ref<Post | null>(null)
  const error = ref<string | null>(null)

  async function getPostById(postId: number) {
    try {
      const { data, error: fetchError } = await supabase
      .from('posts')
      .select()
      .eq('id', postId)
      .single();
      if (fetchError) {
        error.value = fetchError.message
        return console.error(fetchError)
      }
      post.value = data || [];
    }
    catch (error: any) {
      console.error('Error fetching posts:', error.message)
    }
  }

  onMounted(() => {
    getPostById(id)
  })

  return { post, error }
}
