<script setup="ts">
const users = [
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
</script>

<template>
  <div>
    <h1 class="text-green-600 text-5xl font-mono bg-green-200 text-center">Users</h1>
    <ul>
      <li v-for="user in users" :key="user">
        <RouterLink :to="`/user/${user.id}?color=${user.color}`" :class="`${user.color}`">{{ user.name }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
