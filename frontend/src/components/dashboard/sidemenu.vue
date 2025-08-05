<template>
  <div class="flex flex-col items-center cursor-pointer">
    <h1 class="text-xl font-bold text-gray-800 dark:text-white">RR Cafe</h1>
  </div>
  <nav>
    <ul class="list-none flex flex-col gap-y-1">
      <li v-for="(_, category) in menuItems" @click="categoryClick(category)" class="flex flex-col gap-x-2">
        <a class="flex justify-start px-3 py-1 items-center text-gray-800 cursor-pointer">
          <span class="text-md">{{ category }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { store } from '@/stores'

export default defineComponent({
  name: 'SideMenu',

  setup() {
    const menuItems = computed(() => store.app.getMenuItems)

    const categoryClick = (category:string|number|null) => {
      store.app.triggerScroll(category);
    }

    return {
      menuItems,
      categoryClick
    }
  },
})
</script>
<style scoped>
  .active { border-left: 3px solid #000; }
</style>

<!-- <ul class="list-none flex flex-col gap-y-1 overflow-hidden transition-all duration-300 ease-in-out max-h-0">
  <li class="flex flex-col gap-x-2">
    <RouterLink to="/" :class="navExpand ? 'justify-start' : 'justify-center'" class="flex items-center py-1 cursor-pointer rounded-md text-gray-500 hover:text-gray-700">
      <span v-if="navExpand" class="text-xs">List 1</span>
    </RouterLink>
  </li>
</ul> -->
