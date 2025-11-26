<template>
  <LoaderComponent />
  <router-view />
</template>

<script setup lang="ts">
//@ts-ignore
import LoaderComponent from './components/LoaderComponent.vue'
</script>

<style>
body {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
