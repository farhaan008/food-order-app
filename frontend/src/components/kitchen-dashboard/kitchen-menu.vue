<template>
  <nav>
    <ul class="list-none flex flex-col gap-y-1">
      <li v-for="item in category" @click="onFilterClick(item.val)" class="flex flex-col gap-x-2">
        <a class="flex justify-start px-3 py-1 items-center text-gray-800 cursor-pointer">
          <span class="text-md">{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { store } from '@/stores'

export default defineComponent({
  name: 'SideMenu',

  setup() {
    const Obj = reactive({
      category: [
        { name: 'New Orders', val: 'new'},
        { name: 'Preparing', val: 'preparing'},
        { name: 'Ready', val: 'ready'},
        { name: 'All', val: 'all'},
      ]
    });

    const onFilterClick = (val:string|number|null) => {
      console.log(val);
      store.app.setKitchenFilterVal(val);

    }

    return {
      ...toRefs(Obj),
      onFilterClick
    }
  },
})
</script>
<style scoped>
  .active { border-left: 3px solid #000; }
</style>
