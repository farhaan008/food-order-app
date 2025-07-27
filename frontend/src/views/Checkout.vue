<template>
  <div class="bg-white py-1 border-b border-gray-300 w-full">
    <div class="w-full lg:w-[80%] px-4 lg:px-0 mx-auto">
      <div class="flex gap-2 p-4">
        <span class="-ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </span>
        My Order
      </div>
    </div>
  </div>

  <!-- min-h-[calc(100vh-100px)] -->
  <div class="w-full lg:w-[80%] px-4 lg:px-0 mx-auto">
    <div class="flex flex-col gap-6 mt-4 md:flex-row min-h-[calc(100vh-100px)]">
      <div class="w-full md:w-[65%] border border-gray-100 rounded-lg">
        <div class="p-4 border-b border-gray-100">
          <h3 class="font-semibold">Customer</h3>
          <div class="flex justify-between items-center mt-2 text-gray-600 text-sm">
            <span>Mohammad Farhan</span>
            <span>9650705593</span>
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-md font-semibold pb-4">Items in cart</h3>
          <div class="flex gap-4 justify-between items-center border-t border-gray-100 py-4">
            <div class="text-sm font-normal">
              <p>Paneer Burger</p>
              <p class="text-gray-600 font-normal">₹ 150</p>
            </div>
            <div>
              <button type="button" class="flex items-center gap-2 px-2 py-1.5 text-black bg-gray-10 hover:bg-gray-50 focus:outline-none font-medium rounded-md border border-gray-300 cursor-pointer">
                <span class="inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </span>
                <span class="font-semibold">&nbsp; 1 &nbsp;</span>
                <span class="inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-[35%] border border-gray-100 rounded-lg flex flex-col sm:relative sm:mb-0 sm:pb-0 justify-between" style="margin-bottom: 100px">
        <div class="p-4 border-b border-gray-100">
          <div class="border-b border-gray-200 pb-4">
            <h3 class="font-semibold">Bill Details</h3>
            <div class="flex justify-between items-center mt-2 text-gray-600 text-sm">
              <span>Item Total</span>
              <span>₹ 650</span>
            </div>
          </div>
          <div class="flex justify-between items-center mt-2 text-gray-600 text-md font-semibold">
            <span>To Pay</span>
            <span>₹ 650</span>
          </div>
        </div>
        <div class="fixed bottom-0 left-0 w-full sm:static sm:w-auto bg-white border-t border-gray-200 p-4">
          <button @click="show = !show" class="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium py-3 px-4 rounded-full focus:outline-none cursor-pointer w-full uppercase">
            Make Payment
          </button>
        </div>
      </div>
    </div>
  </div>
  <payment-qr :show="show" @close="show = false" :showFooter="true"></payment-qr>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import PaymentQr from '@/components/modal/payment-qr.vue'
// import { store } from '@/stores'

export default defineComponent({
  components: { PaymentQr },
  name: 'Checkout',
  setup() {
    const Obj = reactive({
      show: false,
    })
    const makePayment = () => {
      Obj.show = !Obj.show
    }

    return {
      ...toRefs(Obj),
      makePayment,
    }
  },
})
</script>

<style></style>
