<template>
  <Modal :isVisible="show" @cancel="close()">
    <template #title>
      <h3 class="text-lg font-semibold capitilize">Confirm Detail</h3>
      <p class="text-xs">to place order</p>
    </template>
    <template #body>
      <div class="mx-auto">
        <form class="rounded-md">
          <div class="mb-5">
            <label for="name" class="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Customer Name</label>
            <input
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Customer Name"
              required
            />
          </div>
          <div class="mb-5">
            <label for="mobile_number" class="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Mobile Number</label>
            <input
              type="number"
              id="mobile_number"
              placeholder="Mobile Number"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </form>
      </div>
    </template>
    <template #footer>
      <button @click="confirm" class="bg-gray-800 hover:bg-gray-900 focus:outline-none text-white text-sm font-medium py-3 px-4 rounded-md">Confirm</button>
      <!-- <button @click="close" class="bg-gray-10 hover:bg-gray-100 text-black text-sm font-medium py-2 px-4 rounded-sm border border-gray-400 focus:outline-none">Close</button> -->
    </template>
  </Modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Modal from '@/components/global/modal.vue'
export default defineComponent({
  name: 'UserDetail',
  components: {
    Modal,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const close = () => {
      emit('close', false)
    }
    const confirm = () => {
      // emit('confirm')
      close()
    }
    return {
      close,
      confirm,
    }
  },
})
</script>
<style scoped></style>
