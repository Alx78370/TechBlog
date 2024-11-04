<script setup lang="ts">
import { useRoute } from 'vue-router'

const authors = [
  { id: 1, name: 'John Doe', color: 'text-red-600' },
  { id: 2, name: 'Jane Doe', color: 'text-blue-600' },
  { id: 3, name: 'Alice', color: 'text-green-600' },
  { id: 4, name: 'Bob', color: 'text-yellow-600' },
  { id: 5, name: 'Charlie', color: 'text-purple-600' },
  { id: 6, name: 'David', color: 'text-pink-600' },
  { id: 7, name: 'Eve', color: 'text-orange-600' },
  { id: 8, name: 'Frank', color: 'text-cyan-600' },
  { id: 9, name: 'Grace', color: 'text-magenta-600' },
  { id: 10, name: 'Hank', color: 'text-teal-600' },
]
const route = useRoute()
</script>

<template>
  <h1  class="text-yellow-600 text-5xl font-mono bg-yellow-200 text-center">{{ authors[route.params.id].name }}</h1>
  <RouterLink class="text-xl hover:underline" to="/user">< Back</RouterLink>
</template>
