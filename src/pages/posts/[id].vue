<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useFetchPostById } from '@/composables/useFetchPostById'
import { formatDate } from '@/utils/dateUtils'

const route = useRoute()
const postId = route.params.id
const { post, error } = useFetchPostById(postId)
</script>

<template>
  <section>
    <div class="relative z-10 bg-transparent">
      <img
        class="h-72 w-full bg-transparent object-cover blur-sm"
        :src="post?.image"
        :alt="post?.title"
      />
      <h1
        class="absolute inset-0 flex items-center justify-center text-center font-mono text-5xl font-bold text-white shadow-black text-shadow-lg"
      >
        {{ post?.title }}
      </h1>
    </div>

    <article class="sm:mx-22 mx-10 mb-10 mt-5 lg:mx-32">
      <p
        class="text-md mb-5 font-mono font-bold text-cyan-800 dark:text-cyan-200"
      >
        {{ formatDate(post?.created_at) }}
      </p>
      <p
        v-html="post?.content"
        class="whitespace-pre-wrap text-justify font-mono text-xl text-slate-900 dark:text-white"
      ></p>
    </article>
  </section>
</template>
