<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="item in menuItems" :key="item.id" class="flex justify-center items-center p-3 border-b border-gray-200">
      <div class="flex w-full flex-col gap-4">
        <div class="flex justify-between items-center">
          <h3 class="text-md text-black-700 font-semibold">{{ item.name }}</h3>
          <span class="text-lg text-black-500 font-semibold relative top-0.5">₹ {{ item.price }}</span>
        </div>
        <div class="w-full">
          <img src="@/assets/menu/boiled_egg.jpg" class="w-full h-[200px] object-cover rounded-sm" />
        </div>
        <div class="w-full">
          <p class="text-sm text-description mb-3">{{ item.description }}</p>
          <div class="flex items-center justify-center">
            <button
              type="button"
              class="flex items-center gap-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-full text-md px-4 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer"
            >
              <span class="inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
              Add
              <span class="inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { COREAPI } from '@/services'
import { store } from '@/stores'
export default defineComponent({
  name: 'Home',
  setup() {
    // const menuItems = computed(() => store.getters['app/getMenuItems'])
    // const menuItems = computed(() => store.getters['app/getMenuItems'])
    const menuItems: Array<{ id: number; name: string; price: number; description: string }> = []
    const getMenu = () => {
      COREAPI.getMenu()
        .then((response) => {
          // store.commit('MENU_ITEMS', response);
          // store.dispatch('app/menuItems', response)

          console.log('Menu Data:', response)
        })
        .catch((error) => {
          console.error('Error fetching menu:', error)
        })
    }
    getMenu()

    return {
      menuItems,
    }
  },
})
</script>
<style scoped>
.bg-aqua {
  background-color: #00aecf;
}
.border-aqua {
  border-color: #00aecf;
}

.text-gray {
  color: #696f76;
}
.text-description {
  font-size: 0.875rem;
  color: #696f76; /* Tailwind's gray-500 */
}
</style>
