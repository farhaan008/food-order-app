<template>
  <div v-for="(items, category) in menuItems" :key="category" class="w-full">
    <h3 class="text-lg text-black-700 font-semibold p-3">{{ category }}</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <menu-item v-for="item in items" :key="item.id" :item="item"></menu-item>
      <!-- <div v-for="item in items" :key="item.id" class="flex justify-center items-center p-3 border-b border-gray-200">
        <div class="flex w-full flex-col gap-4">
          <div class="flex justify-between items-center">
            <h3 class="text-md text-black-700 font-semibold">{{ item.name }}</h3>
            <span class="text-lg text-black-500 font-semibold relative top-0.5">₹ {{ item.price }}</span>
          </div>
          <div class="w-full">
            <img :src="`/menu/${item.imageUrl}.jpg`" class="w-full h-[200px] object-cover rounded-sm" />
          </div>
          <div class="w-full">
            <p class="text-sm text-description mb-3">{{ item.description }}</p>
            <div class="flex items-center justify-center">
              <button
                type="button"
                class="flex items-center gap-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-full text-md px-4 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer"
              >
                <span @click="removeFromCart(item.id)" class="inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </span>
                {{ item.quantity? item.quantity : 'Add'}}
                <span @click="addToCart(item)" class="inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import MenuItem  from '@/components/menu/menu-item.vue'
import { COREAPI } from '@/services'
import { store } from '@/stores'
export default defineComponent({
  name: 'Home',
  components: {
    MenuItem,
  },
  setup() {

    const quantity = computed(() => store.app.getItemQuantity())
    const menuItems = computed(() => store.app.getMenuItems);
    const getMenu = () => {
      COREAPI.getMenu().then((response) => {
        store.app.setMenuItems(response);
        console.log('Response Data:', response)
      })
      .catch((error) => {
        console.error('Error fetching menu:', error)
      })
    }
    getMenu()
    const addToCart = (item: any) => {
      store.app.addToCart(item);
    }
    const removeFromCart = (id: any) => {
      store.app.removeFromCart(id);
    }

    return {
      menuItems,
      addToCart,
      removeFromCart
    }
  },
})
</script>
<style scoped>
</style>

<!-- const menuItems = computed(() => store.getters['app/getMenuItems'])
const menuItems = computed(() => store.getters['app/getMenuItems'])
store.commit('MENU_ITEMS', response);
store.dispatch('app/menuItems', response)
const menuItems: Array<{ id: number; name: string; price: number; description: string }> = [] -->
