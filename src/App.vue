<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { createClient } from '@supabase/supabase-js';
import DarkMode from './features/DarkMode.vue';
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <header>
    <nav class="p-4 flex justify-between items-center border-b-2 border-slate-500 font-mono font-bold text-xl text-black dark:text-white">
      <ul class="flex">
        <li>
          <RouterLink to="/" class="hover:underline hover:text-cyan-200">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="hover:underline hover:text-cyan-200 ml-12 word-spacing-tight">About me</RouterLink>
        </li>
        <li>
          <RouterLink to="/posts" class="hover:underline hover:text-cyan-200 ml-12">Posts</RouterLink>
        </li>
      </ul>
      <DarkMode />
    </nav>
  </header>

  <main class="mb-auto">
    <RouterView />
  </main>

  <footer>
    <div class="h-16 border-t-2 text-slate-300 border-slate-500 font-mono flex items-center justify-center">
      <p>© Alexis Vachet 2024 - All rights reserved</p>
    </div>
  </footer>
  </div>

</template>

