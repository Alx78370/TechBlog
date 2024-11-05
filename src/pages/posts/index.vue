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
    <h1 class="text-cyan-200 text-5xl font-mono text-center">Posts</h1>
    <ul>
      <li v-if="posts" class="hover:underline text-blue-400 cursor-pointer" v-for="post in posts" :key="post.id" @click="navigateToPost(post.id)">
        {{ post.title }}
      </li>
      <p v-else> {{ error }}</p>
    </ul>
  </div>
</template>
