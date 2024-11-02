<script setup lang="ts">
import { useRoute } from 'vue-router'
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Alice' },
  { id: 4, name: 'Bob' },
  { id: 5, name: 'Charlie' },
  { id: 6, name: 'David' },
  { id: 7, name: 'Eve' },
  { id: 8, name: 'Frank' },
  { id: 9, name: 'Grace' },
  { id: 10, name: 'Hank' },
]
const route = useRoute()
console.log(route.params?.id)
</script>

<template>
  <h1 class="text-green-600 text-5xl font-mono bg-green-200 text-center">{{ users[route.params?.id].name }}</h1>
</template>
