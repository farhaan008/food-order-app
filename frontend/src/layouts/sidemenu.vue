<template>
  <nav>
    <ul class="list-none flex flex-col gap-y-0">
      <li v-for="(_, category) in menuItems" class="flex flex-col gap-x-2">
        <a class="flex justify-start px-3 items-center py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">
          <span class="text-sm">{{ category }}</span>
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

    return {
      menuItems
    }
  },
})
</script>

<!-- <ul class="list-none flex flex-col gap-y-1 overflow-hidden transition-all duration-300 ease-in-out max-h-0">
  <li class="flex flex-col gap-x-2">
    <RouterLink to="/" :class="navExpand ? 'justify-start' : 'justify-center'" class="flex items-center py-1 cursor-pointer rounded-md text-gray-500 hover:text-gray-700">
      <span v-if="navExpand" class="text-xs">List 1</span>
    </RouterLink>
  </li>
</ul> -->
