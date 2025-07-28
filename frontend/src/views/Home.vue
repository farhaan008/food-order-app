<template>
  <div v-for="(items, category) in menuItems" :key="category" class="w-full">
    <h3 class="text-lg text-black-700 font-semibold p-3">{{ category }}</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <menu-item v-for="item in items" :key="item.id" :item="item"></menu-item>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import MenuItem from '@/components/menu/menu-item.vue'
import { COREAPI } from '@/services'
import { store } from '@/stores'
export default defineComponent({
  name: 'Home',
  components: {
    MenuItem,
  },
  setup() {
    const menuItems = computed(() => store.app.getMenuItems)

    if(Object.keys(menuItems.value).length === 0) {
      store.app.fetchMenuItems();
    }

    const addToCart = (item: any) => {
      console.log('Adding to cart:', item)
      store.app.addToCart(item)
    }
    const removeFromCart = (id: any) => {
      store.app.removeFromCart(id)
    }

    return {
      menuItems,
      addToCart,
      removeFromCart,
    }
  },
})
</script>
<style scoped></style>

<!-- const menuItems = computed(() => store.getters['app/getMenuItems'])
const menuItems = computed(() => store.getters['app/getMenuItems'])
store.commit('MENU_ITEMS', response);
store.dispatch('app/menuItems', response)
const menuItems: Array<{ id: number; name: string; price: number; description: string }> = [] -->
