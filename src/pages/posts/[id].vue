<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetchPostById } from '@/composables/useFetchPostById';

const route = useRoute()
const postId = route.params.id
const { post, error } = useFetchPostById(postId)
</script>

<template>
  <div class="relative">
    <img class="w-full h-72 object-cover blur-sm" :src="post?.image" :alt="post?.title">
    <h1 class="absolute inset-0 flex items-center justify-center text-cyan-200 text-5xl font-mono text-center text-shadow-lg shadow-black">{{ post?.title }}</h1>
  </div>
</template>
