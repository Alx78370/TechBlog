<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useFetchPostById } from '@/composables/useFetchPostById';
import { formatDate } from '@/utils/dateUtils';

const route = useRoute()
const postId = route.params.id
const { post, error } = useFetchPostById(postId)
</script>

<template>

  <div class="relative">
    <img class="w-full h-72 object-cover blur-sm" :src="post?.image" :alt="post?.title">
    <h1 class="absolute inset-0 flex items-center justify-center text-cyan-200 text-5xl font-mono text-center text-shadow-lg shadow-black">{{ post?.title }}</h1>
  </div>

    <article class="mx-10 sm:mx-22 lg:mx-32 mt-5 mb-10">
        <p class="dark:text-slate-500 text-lg mb-5 font-mono font-bold">{{ formatDate(post?.created_at) }}</p>
      <p v-html="post?.content" class="text-cyan-500 dark:text-white text-xl font-mono text-justify"></p>
    </article>

</template>
