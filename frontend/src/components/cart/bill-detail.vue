<template>
  <div class="p-4 border-b border-gray-100">
    <div class="border-b border-gray-200 pb-4">
      <h3 class="font-semibold">Bill Details</h3>
      <div class="flex justify-between items-center mt-2 text-gray-600 text-sm">
        <span>Item Total</span>
        <span>₹ {{cartTotal}}</span>
      </div>
    </div>
    <div class="flex justify-between items-center mt-2 text-gray-600 text-md font-semibold">
      <span>To Pay</span>
      <span>₹ {{cartTotal}}</span>
    </div>
  </div>
  <div class="fixed bottom-0 left-0 w-full sm:static sm:w-auto bg-white border-t border-gray-200 p-4">
    <button @click="makePayment()" class="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium py-3 px-4 rounded-full focus:outline-none cursor-pointer w-full uppercase">
      Make Payment
    </button>
  </div>
  <payment-qr :qr="qr" :show="show" @close="show = false" :showFooter="false" :modalClass="'max-w-md'"></payment-qr>
</template>
<script lang="ts">
import { defineComponent, type PropType, toRefs, reactive, computed } from 'vue'
import PaymentQr from '@/components/modal/payment-qr.vue'
import type { MenuItem } from '@/types/menu/menu'
import { store } from '@/stores'
import { COREAPI } from '@/services'

export default defineComponent({
  name: 'BillDetail',
  components: { PaymentQr },
  props: {
    item: {
      type: Object as PropType<MenuItem>,
      required: false,
    },
  },
  setup(props, { emit }) {
    const cartTotal = computed(() => store.app.cartTotal)
    const Obj = reactive({
      show: false,
      qr: '' as string
    })

    const getPaymentQr = () => {
      if(cartTotal.value){
        COREAPI.getPaymentQr({amount: cartTotal.value}).then((response) => {
          console.log(response);
          Obj.qr = response.qr;
          Obj.show = !Obj.show
        }).catch((error) => {
          console.error('Error fetching menu:', error)
        })
      }else{
        console.log('Cart is empty...');
      }
    }

    const makePayment = () => {
      getPaymentQr();

    }
    return {
      ...toRefs(Obj),
      makePayment,
      cartTotal
    }
  }

})
</script>
<style scoped>

</style>

