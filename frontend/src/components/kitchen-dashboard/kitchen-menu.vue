<template>
  <nav>
    <ul class="list-none flex flex-col gap-y-1">
      <li v-for="item in category" @click="categoryClick(item.name)" class="flex flex-col gap-x-2">
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
        { id: 1, name: 'New Orders'},
        { id: 2, name: 'Preparing'},
        { id: 3, name: 'Ready'},
        { id: 4, name: 'All'},
      ]
    })

    const categoryClick = (category:string|number|null) => {
      console.log(category);
    }

    return {
      ...toRefs(Obj),
      categoryClick
    }
  },
})
</script>
<style scoped>
  .active { border-left: 3px solid #000; }
</style>
