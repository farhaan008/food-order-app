<template>
  <div v-for="(item, index) in cartItems" :key="index" :class="index === cartItems.length - 1 ? '' : 'border-b border-gray-200'" class="flex gap-4 justify-between items-center py-4">
    <div class="text-sm font-normal">
      <p>{{ item.name }}</p>
      <p class="text-gray-600 font-normal">₹ {{ item.price }}</p>
    </div>
    <div>
      <button type="button" class="flex items-center gap-2 px-2 py-1.5 text-black bg-gray-10 hover:bg-gray-50 focus:outline-none font-medium rounded-md border border-gray-300 cursor-pointer">
        <span @click="removeFromCart(item.id)" class="inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </span>
        <span class="font-semibold">&nbsp; {{ item.quantity }} &nbsp;</span>
        <span @click="addToCart(item)" class="inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import type { MenuItem } from '@/types/fos'
import { store } from '@/stores'

export default defineComponent({
  name: 'CartItem',
  components: {
  },
  props: {
    item: {
      type: Object as PropType<MenuItem>,
      required: false,
    },
  },
  setup(props, { emit }) {

    const cartItems = computed(() => store.app.getCartItems)
    const addToCart = (item: any) => {
      store.app.addToCart(item)
    }
    const removeFromCart = (id: any) => {
      store.app.removeFromCart(id)
    }

    return {
      cartItems,
      addToCart,
      removeFromCart,
    }
  },
})
</script>
<style scoped>

</style>

