<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useFetchPostsByPage } from '@/composables/useFetchPostsByPage'
import { useFetchPosts } from '@/composables/useFetchPosts'
import { formatDate } from '@/utils/dateUtils'
import { Button } from '@/components/ui/button'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'

import {
  Pagination,
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
const currentPage = ref<number>(Number(route.query.page) || 1)
const totalPages = computed(() => {
  const length = posts.value.length
  return length > 0 ? Math.ceil(length / 5) : 1
})

watchEffect(() => {
  console.log('totalPages:', totalPages.value)
})

function navigateToPost(id: number) {
  router.push(`/posts/${id}`)
}

function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

function firstPage() {
  currentPage.value = 1
}

function lastPage() {
  currentPage.value = totalPages.value
}

watch(currentPage, newPage => {
  getPostsByPage(newPage)
  router.replace({
    path: route.path,
    query: { ...route.query, page: newPage.toString() },
  })
})

onMounted(() => {
  if (!route.query.page) {
    router.replace({ path: route.path, query: { ...route.query, page: '1' } })
  }
  getPostsByPage(currentPage.value)
})
</script>

<template>
  <section>
    <div class="md:mx-22 mx-5 mt-10 lg:mx-32">
      <Pagination
        v-slot="{ page }"
        :total="totalPages"
        :sibling-count="1"
        show-edges
        :default-page="1"
      >
        <PaginationList
          v-slot="{ items }"
          class="mb-5 flex items-center justify-center gap-1"
        >
          <PaginationFirst @click="firstPage()" />
          <PaginationPrev @click="prevPage()" />

          <div v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="h-10 w-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
                @click="changePage(item.value)"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </div>

          <PaginationNext @click="nextPage()" />
          <PaginationLast @click="lastPage()" />
        </PaginationList>
      </Pagination>

      <article
        v-for="pagePost in pagePosts"
        class="group cursor-pointer p-4"
        :key="pagePost.id"
        @click="navigateToPost(pagePost.id)"
      >
        <div
          class="mb-10 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-slate-500 p-2 font-mono text-cyan-500 group-hover:bg-slate-100 dark:text-cyan-200 dark:group-hover:bg-slate-900 md:mx-10 lg:mx-32"
          v-if="posts"
        >
          <img class="rounded-lg" :src="pagePost.image" :alt="pagePost.title" />
          <div
            class="flex w-full flex-col items-start md:flex-row md:justify-between"
          >
            <h1
              class="text-center text-xl font-bold group-hover:text-yellow-700 dark:group-hover:text-yellow-500 md:text-start"
            >
              {{ pagePost.title }}
            </h1>
            <p class="text-end text-sm dark:text-slate-500">
              {{ formatDate(pagePost.created_at) }}
            </p>
          </div>
          <p
            class="line-clamp-2 text-justify text-gray-950 group-hover:text-yellow-500 dark:text-white dark:group-hover:text-yellow-200"
          >
            {{ pagePost.content }}
          </p>
        </div>
        <p v-else>{{ error }}</p>
      </article>

      <Pagination
        v-slot="{ page }"
        :total="totalPages + 100"
        :sibling-count="1"
        show-edges
        :default-page="1"
      >
        <PaginationList
          v-slot="{ items }"
          class="mb-16 flex items-center justify-center gap-1"
        >
          <PaginationFirst @click="firstPage()" />
          <PaginationPrev @click="prevPage()" />
          <div v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="h-10 w-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
                @click="changePage(item.value)"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </div>

          <PaginationNext @click="nextPage()" />
          <PaginationLast @click="lastPage()" />
        </PaginationList>
      </Pagination>
    </div>
  </section>
</template>
