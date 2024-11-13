<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { supabase } from '@/lib/supabaseClient'
import type { Post } from '@/types/Post'
import { sub } from 'date-fns'
import { ref } from 'vue'

const submitted = ref(false)
const { logout, supaBaseData } = useAuth()

function sanitizeFileName(fileName: string) {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase()
}

const submitHandler = async (formData: Post) => {
  const { title, content, image } = formData

  if (!image || !Array.isArray(image) || image.length === 0) {
    console.error('Aucun fichier image sélectionné.')
    return
  }

  const imageFile = image[0].file
  console.log('imageFile:', imageFile)

  if (!imageFile) {
    console.error('Le fichier image est invalide.')
    return
  }

  const sanitizedFileName = sanitizeFileName(imageFile.name)

  const { data, error: uploadError } = await supabase.storage
    .from('images')
    .upload(`images/${Date.now()}-${sanitizedFileName}`, imageFile)

  if (uploadError) {
    console.error(
      "Erreur lors du téléchargement de l'image :",
      uploadError.message,
    )
    return
  }
  console.log('data:', data)
  const imageUrl = `https://lnwqglgpmyykxfgixurf.supabase.co/storage/v1/object/public/images/${data.path}`

  const { error } = await supabase
    .from('posts')
    .insert({ title, content, image: imageUrl })

  if (error) {
    console.error('Error adding new post:', error.message)
  } else {
    console.log('Post added successfully:', { title, content, image: imageUrl })
  }

  submitted.value = true
}
</script>

<template>
  <section>
    <div
      class="mx-10 flex h-screenNav flex-col items-center justify-center font-mono md:mx-24 lg:mx-96"
    >
      <h1 class="my-5 text-4xl font-bold">Add a post</h1>
      <div class="border-grey-200 w-full rounded-lg border-2 p-10">
        <FormKit
          type="form"
          id="addPostForm"
          :form-class="submitted ? 'hide' : 'show'"
          submit-label="Log in"
          @submit="submitHandler"
          :actions="false"
          #default="{ value }"
        >
          <FormKit
            type="text"
            label="Title"
            name="title"
            placeholder="Title"
            validation="required"
            validation-visibility="live"
          />
          <FormKit
            type="textarea"
            label="Content"
            name="content"
            placeholder="Post content"
            validation="required"
            :help="`${typeof value?.content === 'string' ? value.content.length : 0} / 10000`"
            validation-visibility="live"
            :validation-messages="{
              length: 'Content cannot be more than 1000 characters.',
            }"
          />
          <FormKit
            type="file"
            label="Image"
            name="image"
            validation="required"
            validation-visibility="live"
          />
          <FormKit type="submit" label="Submit" />
        </FormKit>
        <div v-if="submitted">
          <h2 class="text-xl text-green-500">Submission successful!</h2>
        </div>
      </div>
    </div>

    <button @click="logout()">logout</button>
  </section>
</template>
