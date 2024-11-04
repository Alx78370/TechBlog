<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useFetchPosts } from '@/composables/useFetchPosts';

const router = useRouter()

const { posts, error } = useFetchPosts()

function navigateToPost(id: number) {
  router.push(`/posts/${id}`)
}

</script>

<template>
  <div>
    <h1 class="text-amber-600 text-5xl font-mono bg-amber-200 text-center">Posts</h1>
    <ul>
      <li class="hover:underline text-blue-400 cursor-pointer" v-for="post in posts" :key="post.id" @click="navigateToPost(post.id)">
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>
