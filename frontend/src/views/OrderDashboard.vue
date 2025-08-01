<template>
  <div class="w-full p-3">
    <div class="border border-gray-200 rounded-md py-3 px-4">
      <div class="flex flex-col">
        <div class="mb-3">
          <h3 class="text-lg text-gray-800 pt-2 pb-1">Order Dashboard</h3>
          <p class="text-xs pb-3">A list of customers order</p>
        </div>
      </div>
      <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs border-b border-gray-300 rounded-md shadow-md text-gray-700 uppercase  dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">Order ID</th>
                  <th scope="col" class="px-6 py-3">Customer Name</th>
                  <th scope="col" class="px-6 py-3">Order Status</th>
                  <th scope="col" class="px-6 py-3">Created Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in customersOrder" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.order_id }}</th>
                  <td class="px-6 py-4">{{ item.customer_name}}</td>
                  <td class="px-6 py-4">{{ item.order_status }}</td>
                  <td class="px-6 py-4">{{ item.created_at }}</td>
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
const socket = io('http://localhost:3000')

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
        console.log('call api on kitchen order item status update...');
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
