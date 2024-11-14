<script setup lang="ts">
import { useFetchRecentPosts } from '@/composables/useFetchRecentPosts'
import { useRouter } from 'vue-router'
import Autoplay from 'embla-carousel-autoplay'
import emblaCarouselVue from 'embla-carousel-vue'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const [emblaRef] = emblaCarouselVue({ loop: true })
const router = useRouter()
const { recentPosts, error } = useFetchRecentPosts()

function navigateToPost(id: number) {
  router.push(`/posts/${id}`)
}
</script>

<template>
  <div class="md:20 mx-14 mt-10">
    <h1
      class="mb-20 text-center font-mono text-5xl text-cyan-800 dark:text-cyan-200"
    >
      A blog like no others...
    </h1>
    <h2 class="text-center font-mono text-3xl text-cyan-800 dark:text-cyan-200">
      Last articles
    </h2>
    <Carousel
      :opts="{
        loop: true,
      }"
      :plugins="[
        Autoplay({
          delay: 3000,
        }),
      ]"
    >
      <CarouselContent>
        <CarouselItem
          v-for="recentPost in recentPosts"
          :key="recentPost.id"
          class="lg:basis-1/2"
        >
          <article class="p-1">
            <div
              class="flex-column group cursor-pointer items-center justify-center p-4"
            >
              <img
                class="border-grey-500 dark:border-grey-200 rounded border-2 group-hover:border-cyan-800 dark:group-hover:border-cyan-200"
                :src="recentPost.image"
                :alt="recentPost.title"
                @click="navigateToPost(recentPost.id)"
              />
              <h3
                class="truncate text-center font-mono font-bold text-black group-hover:text-cyan-800 dark:text-white dark:group-hover:text-cyan-200"
              >
                {{ recentPost.title }}
              </h3>
            </div>
          </article>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</template>
