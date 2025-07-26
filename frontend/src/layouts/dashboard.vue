<template>
  <!--
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  -->

  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
defineComponent({
  name: 'DashboardLayout',
})
</script>
