<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useFetchPostsByPage } from '@/composables/useFetchPostsByPage';
import { useFetchPosts } from '@/composables/useFetchPosts';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button'
import { computed, onMounted, ref, watch } from 'vue';

import { Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

const router = useRouter()
const route = useRoute()
const { posts } = useFetchPosts()
const { pagePosts, error, getPostsByPage } = useFetchPostsByPage()
const currentPage = ref<number>(Number(route.query.page) || 1);
const totalPages = computed(() => Math.ceil(posts.value.length / 5))

function navigateToPost(id: number) {
  router.push(`/posts/${id}`)
}

function formatDate(dateString: string) {
  return format(new Date(dateString), "MMMM d, yyyy h:mm a");
}

function truncatedContent(content: string) {
  return content.split('\n')[0];
}

function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
}

function firstPage() {
  currentPage.value = 1;
}

function lastPage() {
    currentPage.value = totalPages.value;
}

watch(currentPage, (newPage) => {
  getPostsByPage(newPage);
  router.replace({ path: route.path, query: { ...route.query, page: newPage.toString() } });
});

onMounted(() => {
  if (!route.query.page) {
    router.replace({ path: route.path, query: { ...route.query, page: '1' } });
  }
  getPostsByPage(currentPage.value);
});
</script>

<template>

  <Pagination v-slot="{ page }" :total="totalPages + 100" :sibling-count="1" show-edges :default-page="1">
    <PaginationList v-slot="{ items }" class="flex items-center justify-center gap-1 mb-5">
      <PaginationFirst @click="firstPage()"/>
      <PaginationPrev @click="prevPage()" />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button
          class="w-10 h-10 p-0"
          :variant="item.value === page ? 'default' : 'outline'"
          @click="changePage(item.value)">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext @click="nextPage()" />
      <PaginationLast @click="lastPage()"/>
    </PaginationList>
  </Pagination>

  <article v-for="pagePost in pagePosts"
    class="group lg:mx-32 md:mx-22 sm:mx-10 p-4 cursor-pointer"
    :key="pagePost.id"
    @click="navigateToPost(pagePost.id)">
    <div class="flex flex-col p-2 gap-2 text-cyan-500 dark:text-cyan-200 font-mono justify-center mb-10 border-2 rounded-lg border-slate-500 group-hover:bg-slate-100 dark:group-hover:bg-slate-900" v-if="posts">
      <img class="rounded-lg" :src="pagePost.image" :alt="pagePost.title">
      <div class="flex flex-col md:flex-row md:justify-between items-start ">
        <h1 class="group-hover:text-yellow-700 dark:group-hover:text-yellow-500 font-bold text-xl text-center">{{ pagePost.title }}</h1>
        <p class="dark:text-slate-500 text-sm">{{ formatDate(pagePost.created_at) }}</p>
      </div>
      <p class="text-gray-950 dark:text-white group-hover:text-yellow-500 dark:group-hover:text-yellow-200 text-justify">{{ truncatedContent(pagePost.content) }}..</p>
    </div>
    <p v-else> {{ error }}</p>
  </article>

  <Pagination v-slot="{ page }" :total="totalPages + 100" :sibling-count="1" show-edges :default-page="1">
    <PaginationList v-slot="{ items }" class="flex items-center justify-center gap-1 mb-16">
      <PaginationFirst @click="firstPage()"/>
      <PaginationPrev @click="prevPage()" />
      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
            @click="changePage(item.value)">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext @click="nextPage()" />
      <PaginationLast @click="lastPage()"/>
    </PaginationList>
  </Pagination>

</template>
