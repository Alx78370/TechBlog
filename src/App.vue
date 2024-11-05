<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { createClient } from '@supabase/supabase-js';
import DarkMode from './features/DarkMode.vue';
</script>

<template>
  <nav class="p-4 mb-10 flex justify-between items-center border-b-2 border-slate-500 font-mono font-bold text-xl text-black dark:text-white">
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
  <RouterView />
</template>

