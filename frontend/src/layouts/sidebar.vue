<template>
  <div class="flex flex-col gap-y-6">
    <div class="flex flex-col items-center cursor-pointer">
      <h1 class="text-xl font-bold text-gray-800 dark:text-white">RR Cafe</h1>
    </div>
    <component :is="loadComponent" />
    <!-- <SideMenu></SideMenu> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import SideMenu from '@/components/dashboard/sidemenu.vue'
import KitchenMenu from '@/components/kitchen-dashboard/kitchen-menu.vue';

export default defineComponent({
  name: 'SideBar',
  components: {
    SideMenu,
    KitchenMenu
  },
  props: {
    type: {
      type: String,
      default: 'SideMenu',
    }
  },
  setup(_, { emit }) {
    const loadComponent = computed(() => {
      return _.type;
    });
    return {
      loadComponent
    }
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
