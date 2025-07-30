<template>
  <div class="flex flex-col gap-y-6">
    <transition name="slide">
      <div class="flex flex-col items-center cursor-pointer">
        <!-- <img src="@/assets/BS_logo.png" alt="Logo" width="80" /> -->
        <h1 class="text-xl font-bold text-gray-800 dark:text-white">RR Cafe</h1>
        <!-- <img class="h-4 w-4" :class="{ 'transform rotate-180 relative': navExpand }" src="@/assets/icons/arrow-down.svg" alt="Toggle Navbar" /> -->
      </div>
    </transition>
    <SideMenu></SideMenu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideMenu from '@/layouts/sidemenu.vue'
export default defineComponent({
  name: 'SideBar',
  components: {
    SideMenu,
  },

  setup(_, { emit }) {
    return {}
  },
})
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: width 0.3s ease-in-out;
}
.slide-enter,
.slide-leave-to {
  width: 0;
}
</style>
