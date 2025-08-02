
<template>
  <div class="flex justify-between space-x-4 gap-4 p-4">
    <div @click="toggleNavbar" class="flex lg:hidden md:hidden sm:block">
      <svg class="w-8 h-8 text-gray-800 dark:text-white" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import ViewCart from '@/components/modal/view-cart.vue'
// import { store } from '@/stores'

export default defineComponent({
  name: 'MenuHeader',
  components: { ViewCart },
  // props: {
  //   navExpand: {
  //     type: Boolean,
  //     required: false,
  //     default: true,
  //   },
  // },
  emits: ['toggleNavbar'],
  setup(_, { emit }) {

    const Obj = reactive({
    })

    const toggleNavbar = () => {
      emit('toggleNavbar')
    }


    return {
      ...toRefs(Obj),
      toggleNavbar,
    }
  }

})
</script>
