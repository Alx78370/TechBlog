<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetchPostById } from '@/composables/useFetchPostById';

const route = useRoute()
const postId = route.params.id
const { post, error } = useFetchPostById(postId)
</script>

<template>
  <div>
    <h1 class="text-cyan-200 text-5xl font-mono text-center">{{ post?.title }}</h1>
  </div>
</template>
