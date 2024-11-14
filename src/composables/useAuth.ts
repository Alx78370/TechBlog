import { supabase } from '@/lib/supabaseClient'
import { ref, watch } from 'vue'
import type { Credentials } from '@/types/Credentials'
import router from '@/router'

const supaBaseData = ref<any>({
  data: null,
  error: null,
})
const token = ref<string | null>(null)

export function useAuth() {
  async function login({ email, password }: Credentials) {
    try {
      const { data: supaData, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) throw error
      supaBaseData.value.data = supaData
      token.value = supaBaseData.value.data.session?.access_token
    } catch (error) {
      supaBaseData.value.error = error
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
  }

  watch(
    token,
    token => {
      if (!token) {
        router.push('/login')
      } else {
        router.push('/admin')
      }
    },
    { deep: true },
  )
  return { login, supaBaseData, token, logout }
}
