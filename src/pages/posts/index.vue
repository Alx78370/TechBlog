<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useFetchPosts } from '@/composables/useFetchPosts';
import { format } from 'date-fns';

const router = useRouter()
const { posts, error } = useFetchPosts()

function navigateToPost(id: number) {
  router.push(`/posts/${id}`)
}

function formatDate(dateString: string) {
  return format(new Date(dateString), "MMMM d, yyyy h:mm a");
}
</script>

<template>
  <article v-for="post in posts"
    class="group lg:mx-32 md:mx-22 sm:mx-10 p-4 cursor-pointer"
    :key="post.id"
    @click="navigateToPost(post.id)">
    <div class="flex flex-col p-2 gap-2 text-cyan-500 dark:text-cyan-200 font-mono justify-center mb-10 border-2 rounded-lg border-slate-500 group-hover:bg-slate-100 dark:group-hover:bg-slate-900" v-if="posts">
      <img class="rounded-lg" :src="post.image" :alt="post.title">
      <div class="flex flex-col md:flex-row md:justify-between items-start ">
        <h1 class="group-hover:text-yellow-700 dark:group-hover:text-yellow-500 font-bold text-xl text-center">{{ post.title }}</h1>
        <p class="dark:text-slate-500 text-sm">{{ formatDate(post.created_at) }}</p>
      </div>
      <p class="text-gray-950 dark:text-white group-hover:text-yellow-500 dark:group-hover:text-yellow-200 text-justify">{{ post.content }}</p>
    </div>
    <p v-else> {{ error }}</p>
  </article>
</template>
