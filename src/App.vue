<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { createClient } from '@supabase/supabase-js';
</script>

<template>
  <nav class="bg-blue-500 p-4">
    <RouterLink to="/" class="text-white">Home</RouterLink>
    <RouterLink to="/about" class="text-white ml-4">About</RouterLink>
    <RouterLink to="/authors" class="text-white ml-4">Authors</RouterLink>
    <RouterLink to="/posts" class="text-white ml-4">Posts</RouterLink>
  </nav>
  <RouterView />
</template>

