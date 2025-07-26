<template>
  <Modal :isVisible="show" @cancel="close()" :width="'100'">
    <template #title>
      <h3 class="text-lg font-semibold capitilize">Confirm Detail</h3>
      <p class="text-xs">to place order</p>
    </template>
    <template #body>
      <div class="custom-width">
        <form class="mx-auto rounded-md">
          <div class="mb-5">
            <label for="name" class="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Customer Name</label>
            <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Customer Name" required />
          </div>
          <div class="mb-5">
            <label for="mobile_number" class="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Mobile Number</label>
            <input type="number" id="mobile_number" placeholder="Mobile Number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <!-- <div class="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Customer Name</label
            >
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="mobile_number"
              id="mobile_number"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="mobile_number"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Mobile Number</label
            >
          </div> -->
        </form>
      </div>
    </template>
    <template #footer>
      <!-- <button @click="confirm" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md shadow-lg">Confirm</button> -->
      <button @click="confirm" class="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium py-2 px-4 rounded-md focus:outline-none">Confirm</button>
      <button @click="close" class="bg-gray-10 hover:bg-gray-100 text-black text-sm font-medium py-2 px-4 rounded-sm border border-gray-400 focus:outline-none">Close</button>
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
<style scoped>
.custom-width {
  width: 480px;
}
</style>
<!-- <Modal-Example :show="show" @close="show=false"></Modal-Example>
import ModalExample from './ModalExample.vue'; -->
