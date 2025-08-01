<template>
  <h1>I am kitchen Dashboard</h1>
  {{ kitchenOrders }}
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { store } from '@/stores'

export default defineComponent({
  components: { },
  name: 'KitchenDashboard',
  setup() {

    const kitchenOrders = computed(() => store.app.getKitchenOrderItems);
    onMounted(() => {
      store.app.getKitchenOrders();


    })

    return {
      kitchenOrders
    }
  }
})
</script>



<!-- <button
  v-for="item in order.items"
  :key="item.id"
  @click="toggleStatus(order.orderId, item.id, item.status)"
  :class="[
    'px-4 py-2 rounded',
    item.status === 'Ready' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
  ]"
>
  {{ item.name }}: {{ item.status }}
</button> -->
<!-- const toggleStatus = async (orderId, itemId, currentStatus) => {
  const newStatus = currentStatus === 'Preparing' ? 'Ready' : 'Preparing'
  await fetch(`http://localhost:3000/orders/${orderId}/items/${itemId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  })
} -->

