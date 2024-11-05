<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useFetchRecentPosts } from '@/composables/useFetchRecentPosts';
import { useRouter } from 'vue-router';


const router = useRouter()

const { recentPosts, error } = useFetchRecentPosts()
function navigateToPost(id: number) {
  router.push(`/posts/${id}`)
}
console.log(recentPosts)

</script>

<template>
  <h1 class="text-cyan-200 text-5xl font-mono text-center">Un blog pas comme les autres...</h1>
  <Carousel>
    <CarouselContent>
      <CarouselItem v-for="recentPost in recentPosts" :key="recentPost.id"> <img :src="recentPost.image" :alt=" recentPost.title" @click="navigateToPost(recentPost.id)"></CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
