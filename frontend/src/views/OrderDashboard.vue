<template>
  {{ customersOrder }}
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { store } from '@/stores'

export default defineComponent({
  components: { },
  name: 'OrderDashboard',
  setup() {

    const customersOrder = computed(() => store.app.getCustomerOrderItems);
    onMounted(() => {
      store.app.getCustomerOrders();
      // showToast('Your order has been created!', true )
      // if(Object.keys(menuItems.value).length === 0) {}
    })

    return {
      customersOrder
    }
  }
})
</script>

<!-- function getOrderStatus(itemStatuses) {
  if (itemStatuses.every(s => s === 'ready' || s === 'served')) return 'completed';
  if (itemStatuses.every(s => s === 'queued')) return 'queued';
  if (itemStatuses.some(s => s === 'preparing')) return 'preparing';
  return 'in_progress';
} -->
