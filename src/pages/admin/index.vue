<script setup lang="ts">
const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>

<template>
  <div class="w-screen">
    <div class="flex flex-col items-center justify-center w-1/2 h-1/2 border-2 border-grey-200 rounded mx-auto my-auto fixed inset-0">
      <h1 class="text-xl font bold">Admin</h1>
      <FormKit type="form">
        <FormKit
          type="email"
          label="Email"
          validation="required|email"
          validation-visibility="live"
          placeholder="email@example.com"
        />
        <FormKit
          type="password"
          label="Password"
          prefix-icon="password"
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick"
          suffix-icon-class="hover:text-blue-500"
        />
      </FormKit>

    </div>
  </div>
</template>
