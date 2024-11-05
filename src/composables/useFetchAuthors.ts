import { onMounted, ref } from "vue"
import { supabase } from '@/lib/supabaseClient'
import type { Author } from "@/types/Author"

export function useFetchAuthors() {

  const authors = ref<Author[]>([])
  const error = ref<string | null>(null)

  async function getAuthors() {
    try {
      const { data, error: fetchError } = await supabase
        .from('authors')
        .select('*')
      if (fetchError) {
        error.value = fetchError.message
        return console.error(fetchError)
      }
      authors.value = data || [];
    }
    catch (error: any) {
      console.error('Error fetching posts:', error.message)
    }
  }

  onMounted(() => {
    getAuthors()
  })

  return { authors, error };
}
