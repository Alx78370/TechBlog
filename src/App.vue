<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { createClient } from '@supabase/supabase-js'
import DarkMode from './features/DarkMode.vue'
import { useAuth } from './composables/useAuth'

const { logout, supaBaseData, token } = useAuth()
console.log('token:', token)
</script>

<template>
  <div class="flex h-screen flex-col justify-between">
    <header>
      <nav
        class="flex items-center justify-between border-b-2 border-slate-500 p-4 font-mono text-xl font-bold text-black dark:text-white"
      >
        <ul class="flex">
          <li>
            <RouterLink
              to="/"
              class="hover:text-cyan-800 hover:underline dark:hover:text-cyan-200"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/about"
              class="word-spacing-tight ml-12 hover:text-cyan-800 hover:underline dark:hover:text-cyan-200"
              >About me</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/posts"
              class="ml-12 hover:text-cyan-800 hover:underline dark:hover:text-cyan-200"
              >Posts</RouterLink
            >
          </li>
        </ul>
        <div class="flex items-center gap-5">
          <p
            class="text-slate-900 hover:text-cyan-800 hover:underline dark:text-white dark:hover:text-cyan-200"
            @click="logout()"
          >
            logout
          </p>
          <DarkMode />
        </div>
      </nav>
    </header>

    <main class="mb-auto">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer>
      <div
        class="flex h-16 items-center justify-center border-t-2 border-slate-500 font-mono text-slate-700 dark:text-slate-300"
      >
        <p>© Alexis Vachet 2024 - All rights reserved</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
template {
  background-color: azure;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
