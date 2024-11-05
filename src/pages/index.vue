<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useFetchRecentPosts } from '@/composables/useFetchRecentPosts';
import { useFetchAuthors } from '@/composables/useFetchAuthors';

import { useRouter } from 'vue-router';
import Autoplay from 'embla-carousel-autoplay'
import emblaCarouselVue from 'embla-carousel-vue'

const [emblaRef] = emblaCarouselVue({ loop: true })
const router = useRouter()
const { recentPosts, error } = useFetchRecentPosts()
const { authors } = useFetchAuthors()

function navigateToPost(id: number) {
  router.push(`/posts/${id}`)
}


</script>

<template>
  <main class="mx-14 md:20 ">
    <h1 class="text-cyan-500 dark:text-cyan-200 text-5xl font-mono text-center mb-20">A blog like no others...</h1>
    <h2 class="text-cyan-500 dark:text-cyan-200 text-3xl font-mono text-center">Last articles</h2>
    <Carousel
      :opts="{
        loop: true,
      }"
      :plugins="[Autoplay({
        delay: 3000,
      })]">
      <CarouselContent>
        <CarouselItem v-for="recentPost in recentPosts" :key="recentPost.id" class="lg:basis-1/2">
          <article class="p-1">
            <div class="group flex-column items-center justify-center p-4 cursor-pointer">
              <img class="rounded border-2 border-grey-500 dark:border-grey-200 group-hover:border-cyan-500 dark:group-hover:border-cyan-200" :src="recentPost.image" :alt=" recentPost.title" @click="navigateToPost(recentPost.id)">
              <h3 class="text-center text-black dark:text-white font-mono font-bold truncate group-hover:text-cyan-500 dark:group-hover:text-cyan-200">{{ recentPost.title }}</h3>
            </div>
          </article>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <!-- <h2 class="text-cyan-500 dark:text-cyan-200 text-3xl font-mono text-center mt-20 mb-5">Authors</h2>
    <div class="grid grid-cols-3 gap-10">
      <div v-for="author in authors" :key="author.id" class="group cursor-pointer">
        <img class="rounded border-2 border-grey-500 dark:border-grey-200 group-hover:border-cyan-500 dark:group-hover:border-cyan-200" :src="author.image" :alt="author.name">
        <p class="text-center text-black dark:text-white font-mono font-bold truncate group-hover:text-cyan-500 dark:group-hover:text-cyan-200">{{ author.name }}</p>
      </div>
    </div> -->
  </main>



</template>
