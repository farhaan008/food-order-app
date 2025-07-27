<template>
  <Modal :isVisible="show" @cancel="close()" :width="'100'">
    <template #title>
      <h3 class="text-lg font-semibold capitilize">My Cart</h3>
    </template>
    <template #body>
      <div class="custom-width">
        <cart-item></cart-item>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-4">
        <router-link to="/checkout" custom v-slot="{ navigate }">
          <button @click="navigate" class="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium py-2 px-4 rounded-full focus:outline-none">Checkout</button>
        </router-link>
        <button @click="close" class="bg-gray-10 hover:bg-gray-100 text-black text-sm font-medium py-2 px-4 rounded-full border border-gray-400 focus:outline-none">Close</button>
      </div>
    </template>
  </Modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Modal from '@/components/global/modal.vue'
import CartItem from '@/components/cart/cart-item.vue'

export default defineComponent({
  name: 'ViewCart',
  components: {
    Modal,
    CartItem
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
/* .custom-width {
  width: 768px;
} */
</style>
