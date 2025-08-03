<template>
    <div class="w-full">
      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div v-for="item in kitchenOrders" :key="item.order_id" class="flex justify-center items-center p-3 border-b border-gray-200">
          <div class="flex justify-between w-full flex-col gap-4 h-full">
            <h3 class="text-lg text-black-700 font-semibold">Order: {{ item.order_id }}</h3>
            <ul class="list-none border border-gray-200 rounded-md p-3">
              <li v-for="i in item.items" :key="i.id" class="w-full border-gray-200 dark:border-gray-600">
                <div class="flex items-center space-x-4">
                  <label :for="i.id" class="flex justify-between w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    <span>{{ i.item_name}}</span>
                    <div class="flex flex-inline space-x-3">
                      <span v-if="i.item_size">{{ i.item_size }}</span>
                      <span>{{ i.quantity }}</span>
                    </div>
                  </label>
                  <input :id="i.id" v-model="i._isReady"
                  :disabled="i.kitchen_status === 'queued' || i.kitchen_status === 'ready' || i.kitchen_status === 'served'"
                  type="checkbox" value="" class="w-6 h-6 ms-3">
                </div>
              </li>
            </ul>
            <div class="flex justify-between space-x-6">
              <button class="bg-red-300 hover:bg-red-400 text-black text-sm font-medium py-2 px-4 rounded-md border border-gray-600 focus:outline-none"
                :disabled="checkOrderItemStatus(item.items) !== 'queued'"
                :class="checkOrderItemStatus(item.items) !== 'queued'? 'cursor-not-allowed':''">
                Cancel
              </button>

              <button class="bg-green-700 hover:bg-green-800 text-white text-sm font-medium py-2 px-6 rounded-md border border-gray-900 focus:outline-none"
                @click="updateOrderItemAndOrderStatus(item.order_id, item.items)"
                :disabled="isActionButtonDisabled(item.items)"
                :class="{'opacity-80 cursor-not-allowed': isActionButtonDisabled(item.items) }">
                {{ getBtnStatusText(item.items) }}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { store } from '@/stores'
import type { KitchenStatus, OrderItem, ApiResponse, KitchenDashboard } from '@/types/fos';
import { COREAPI } from '@/services';

export default defineComponent({
  components: { },
  name: 'KitchenDashboard',
  setup() {

    const kitchenOrders = computed(() => store.app.getKitchenOrderItems);
    onMounted(() => {
      store.app.getKitchenOrders();
    })

    const updateOrderItemKitchenStatus = (orderId:string, orderItem:OrderItem) => {
      console.log(orderId, orderItem);
      if(orderItem.kitchen_status === 'preparing'){
        let params = { kitchen_status: 'ready' } as KitchenStatus
        COREAPI.updateOrderItemKitchenStatus(orderId, orderItem.id, params).then((response:ApiResponse) => {
          console.log(response);
          if(response && response.statusCode){
            console.log(response.message)
          }
        }).catch((e) => { console.log(e) } );
        store.app.getKitchenOrders();
      }
    }

    const updateOrderItemAndOrderStatus = (orderId:string, items:OrderItem[]) => {
      let kitchen_status = checkOrderItemStatus(items) as 'queued' | 'preparing' | 'ready' | 'served';
      let params = { kitchen_status: kitchen_status }
      if(kitchen_status === 'queued'){
        params.kitchen_status = 'preparing';
      }
      if(kitchen_status === 'preparing'){
        params.kitchen_status = 'ready';
      }
      if(kitchen_status === 'ready'){
        params.kitchen_status = 'served';
      }
      console.log(orderId, params);
      COREAPI.updateOrderItemAndOrderStatus(orderId, params).then((response:ApiResponse) => {
        console.log(response);
        if(response && response.statusCode){
          console.log(response.message)
        }
        store.app.getKitchenOrders();
      }).catch((e) => { console.log(e) } );

    }


    const checkOrderItemStatus = (items:OrderItem[]) => {
      if(items.every(e=> e.kitchen_status === 'queued')){
        return 'queued';
      }
      if(items.every(e=> e.kitchen_status === 'ready')){
        return 'ready';
      }
      if(items.every(e=> e.kitchen_status === 'served')){
        return 'served';
      }
      if(items.some(e=> e.kitchen_status === 'preparing')){
        return 'preparing';
      }
      return 'queued';
    }

    const getBtnStatusText = (items:OrderItem[]) => {
      if(items && items.length){
        const status =  checkOrderItemStatus(items);
        switch (status) {
          case 'queued': return 'Start';
          case 'preparing': return 'Ready';
          case 'ready': return 'Complete';
          case 'served': return 'Served';
          default: return 'Queued';
        }
      }
    }

    const isActionButtonDisabled = (items: OrderItem[]): boolean => {
      const status = checkOrderItemStatus(items);
      if(status === 'served'){
        return true;
      }
      if(status === 'preparing' && !isAllItemChecked(items)){
        return true;
      }
      return false;
    }

    const isAllItemChecked = (items:OrderItem[]): boolean => {
      return items.every((e)=> e._isReady === true )
    }

    // function getOrderStatus(itemStatuses) {
    //   if (itemStatuses.every(s => s === 'ready' || s === 'served')) return 'completed';
    //   if (itemStatuses.every(s => s === 'queued')) return 'queued';
    //   if (itemStatuses.some(s => s === 'preparing')) return 'preparing';
    //   return 'in_progress';
    // }

    return {
      kitchenOrders,
      getBtnStatusText,
      isAllItemChecked,
      checkOrderItemStatus,
      isActionButtonDisabled,
      updateOrderItemKitchenStatus,
      updateOrderItemAndOrderStatus
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
