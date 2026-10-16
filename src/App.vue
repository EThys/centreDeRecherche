<template>
  <LoaderComponent />
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <div :key="route.fullPath" class="page-root">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
//@ts-ignore
import LoaderComponent from './components/LoaderComponent.vue'

const route = useRoute()
</script>

<style>
body {
  padding: 0 !important;
  margin: 0 !important;
}

.page-enter-active {
  transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.page-leave-active {
  transition: opacity 0.38s ease, transform 0.38s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(14px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>
