<template>
  <div class="bg-gray-900 w-full h-screen p-3">
    <div class="rounded-md py-3 px-4">
      <div class="flex flex-col">
        <div class="flex flex-col mb-3 text-white">
          <h3 class="text-lg">Order Dashboard</h3>
          <p class="text-xs">A list of customers order</p>
        </div>
      </div>
      <div class="relative overflow-x-auto">
          <table class="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-lg text-white border-b border-white rounded-md shadow-md uppercase">
                <tr>
                  <th scope="col" class="px-6 py-3">Order ID</th>
                  <th scope="col" class="px-6 py-3">Customer Name</th>
                  <th scope="col" class="px-6 py-3">Order Status</th>
                  <th scope="col" class="px-6 py-3">Created Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="customersOrder.length" v-for="(item, index) in customersOrder"
                  :class="index !== customersOrder.length-1 ? 'border-b': ''"
                  class="text-lg text-white font-medium bg-gray-900 dark:border-white border-white">
                  <th scope="row" class="whitespace-nowrap px-6 py-4 ">{{ item.order_id }}</th>
                  <td class="px-6 py-4">{{ item.customer_name}}</td>
                  <td class="px-6 py-4 capitalize">{{ item.order_status }}</td>
                  <td class="px-6 py-4">{{ item.created_at }}</td>
                </tr>
                <tr v-else>
                  <td colspan="4" class="py-3 text-center text-white">There are no orders today</td>
                </tr>
              </tbody>
          </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { store } from '@/stores'
import { io } from 'socket.io-client'
const socket = io(import.meta.env.VITE_API_URL)

export default defineComponent({
  components: { },
  name: 'OrderDashboard',
  setup() {

    const customersOrder = computed(() => store.app.getCustomerOrderItems);
    onMounted(() => {
      store.app.getCustomerOrders();
      // showToast('Your order has been created!', true )
      // if(Object.keys(menuItems.value).length === 0) {}
      socket.on('order_update', (updatedOrder) => {
        console.log(updatedOrder);
        store.app.getCustomerOrders();
        // const index = orders.value.findIndex(o => o.orderId === updatedOrder.orderId)
        // if (index !== -1) orders.value[index] = updatedOrder
        // else orders.value.push(updatedOrder)
      })
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
