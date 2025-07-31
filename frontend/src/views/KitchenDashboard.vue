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

