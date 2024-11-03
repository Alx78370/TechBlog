<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
</script>

<template>
  <nav class="bg-blue-500 p-4">
    <RouterLink to="/" class="text-white">Home</RouterLink>
    <RouterLink to="/about" class="text-white ml-4">About</RouterLink>
    <RouterLink to="/user" class="text-white ml-4">User</RouterLink>
  </nav>
  <RouterView />
</template>

