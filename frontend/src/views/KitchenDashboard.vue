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



<!-- SELECT
    o.id AS order_id,
    o.created_at,
    oi.id AS order_item_id,
    oi.quantity,
    oi.kitchen_status,
    m.name AS item_name,
    u.name AS customer_name
FROM
    orders o
JOIN
    order_items oi ON o.id = oi.order_id
JOIN
    menu_items m ON oi.item_id = m.id
JOIN
    users u ON o.user_id = u.id
WHERE
    o.status IN ('confirmed', 'in_progress')
    AND oi.kitchen_status IN ('queued', 'preparing', 'ready')
ORDER BY
    o.created_at ASC, oi.kitchen_status ASC; -->


