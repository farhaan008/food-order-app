<template>
  <div class="flex justify-center items-center p-3 border-b border-gray-200">
    <div class="flex w-full flex-col gap-4">
      <div class="flex justify-between items-center">
        <h3 class="text-md text-black-700 font-semibold">{{ item.name }}</h3>
        <span class="text-lg text-black-500 font-semibold relative top-0.5">₹ {{ item.price }}</span>
      </div>
      <div class="w-full">
        <img :src="`/menu/${item.imageUrl}.jpg`" class="w-full h-[200px] object-cover rounded-sm" />
      </div>
      <div class="w-full">
        <p class="text-sm text-description mb-2">{{ item.description }}</p>
        <div class="flex flex-inline space-x-4 justify-start mb-3">
          <div v-for="size in item.sizes" :key="size.sizeId" class="flex flex-inline items-center space-x-1">
            <input type="radio" :name="'size-' + item.id" :id="'size-' + size.sizeId" :value="size.sizeId" v-model="item.sizeId" @change="onSizeChange(item, size.sizeId)" class="h-4 w-4 text-blue-600 border-gray-300"/>
            <label :for="'size-' + size.sizeId" class="text-sm text-gray-700">{{ size.size }}</label>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <button v-if="!quantity" @click="addToCart(item)" type="button"
            :class="!quantity ? 'px-8' : 'px-4'"
            class="flex items-center gap-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-full text-md px-4 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer">
            Add
          </button>
          <button v-else
            type="button"
            :class="!quantity ? 'px-8' : 'px-4'"
            class="flex items-center gap-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-full text-md px-4 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer"
          >
            <span v-if="quantity" @click="removeFromCart(item)" class="inline-block">
              <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </span>
            <span>{{ quantity }}</span>
            <span v-if="quantity" @click="addToCart(item)" class="inline-block">
              <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import type { MenuItem } from '@/types/fos'
import { store } from '@/stores'

export default defineComponent({
  name: 'MenuItem',
  props: {
    item: {
      type: Object as PropType<MenuItem>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const quantity = computed(() => store.app.getItemQuantity(props.item.id))
    const menuItems = computed(() => store.app.getMenuItems)

    const addToCart = (item: any) => {
      console.log(item);
      store.app.addToCart(item)
    }
    const removeFromCart = (item: { id: string | number; sizeId?: number }) => {
      if (item.sizeId !== undefined) {
        store.app.removeFromCart(item.id, item.sizeId)
      } else {
        store.app.removeFromCart(item.id)
      }
    }

    const onSizeChange = (item: MenuItem, sizeId: number) => {
      const price = item.prices?.find((f) => f.sizeId === sizeId)?.price || 0;
      item.price = price;
      store.app.getCartTotal;
    }

    return {
      menuItems,
      quantity,
      addToCart,
      removeFromCart,
      onSizeChange
    }
  },
})
</script>
<style scoped>
.text-description {
  font-size: 0.875rem;
  color: #696f76;
}
</style>




<!-- <template>
  <div class="p-6">
    <div v-for="(items, category) in groupedProducts" :key="category" class="mb-10">
      <h2 class="text-2xl font-bold mb-4">{{ category }}</h2>
      <div v-for="(group, productId) in groupByName(items)" :key="productId" class="border p-4 rounded-md shadow mb-6">
        <h3 class="text-xl font-semibold">{{ group[0].name }}</h3>
        <p class="text-gray-600">{{ group[0].description }}</p>
        <div v-if="group.length > 1" class="mt-3 space-x-4">
          <label v-for="variant in group" :key="variant.sizeId" class="inline-flex items-center space-x-2">
            <input
              type="radio"
              :name="`size-${group[0].id}`"
              :value="variant.sizeId"
              v-model="selectedSizes[group[0].id]"
              class="form-checkbox"
            />
            <span>{{ variant.size }} (₹{{ variant.price }})</span>
          </label>
        </div>
        <div class="mt-4 text-lg font-medium">
          Price: ₹{{ getSelectedPrice(group) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
const rawData = {
  "Beverages": [/* ... truncated for brevity ... */],
  "Burgers": [/* ... */],
  "Fries": [/* ... */],
  "Others": [/* ... */],
  "Pizza": [/* ... */]
}

const groupedProducts = rawData
const selectedSizes = reactive({})
function groupByName(items) {
  const groups = {}
  for (const item of items) {
    if (!groups[item.id]) {
      groups[item.id] = []
    }
    groups[item.id].push(item)
    if (!selectedSizes[item.id]) {
      selectedSizes[item.id] = item.sizeId || null
    }
  }
  return groups
}
function getSelectedPrice(group) {
  const selected = selectedSizes[group[0].id]
  const variant = group.find(i => i.sizeId === selected)
  return variant ? variant.price : group[0].price
}
</script> -->

