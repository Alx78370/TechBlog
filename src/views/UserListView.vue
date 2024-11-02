<script setup="ts">
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
</script>

<template>
  <div>
    <h1 class="text-green-600 text-5xl font-mono bg-green-200 text-center">Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <router-link :to="`/user/${user.id}`" class="text-blue-600">{{ user.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
