<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import type { Credentials } from '@/types/Credentials'

const submitted = ref(false)
const formData = ref({
  email: '',
  password: '',
})

const { login, supaBaseData } = useAuth()

const submitHandler = async (data: Credentials) => {
  submitted.value = true
  await login(data)
}
const handleIconClick = (node: any, e: Event) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>

<template>
  <div class="flex h-screenNav flex-col items-center justify-center font-mono">
    <h1
      class="mb-10 text-center font-mono text-5xl text-cyan-800 dark:text-cyan-200"
    >
      Admin
    </h1>
    <div class="border-grey-200 w-4/5 rounded-lg border-2 p-10 lg:w-1/3">
      <FormKit
        type="form"
        id="loginForm"
        :value="formData"
        :form-class="submitted ? 'hide' : 'show'"
        submit-label="Log in"
        @submit="submitHandler"
        :actions="false"
        #default="{ value }"
      >
        <FormKit
          type="email"
          label="Email"
          name="email"
          validation="required|email"
          validation-visibility="live"
          placeholder="email@example.com"
        />
        <FormKit
          type="password"
          label="Password"
          name="password"
          validation="required|length:4|matches:/[^a-zA-Z]/"
          :validation-messages="{
            matches: 'Please include at least one symbol',
          }"
          prefix-icon="password"
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick"
          suffix-icon-class="hover:text-blue-500"
        />
        <FormKit type="submit" label="Log in" />
      </FormKit>
      <div v-if="submitted">
        <h2 class="text-xl text-green-500">Submission successful!</h2>
      </div>
    </div>
  </div>
</template>
