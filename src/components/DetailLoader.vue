<template>
  <div class="boot" role="status" aria-live="polite" aria-label="Chargement">
    <div class="boot-mark">
      <img :src="logoImage" alt="" />
    </div>
    <div class="boot-track" aria-hidden="true">
      <span class="boot-bar"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoImage from '@/assets/logoCreff-PME.jpeg'

withDefaults(defineProps<{
  title?: string
  message?: string
}>(), {
  title: 'Chargement en cours...',
  message: 'Veuillez patienter'
})
</script>

<style scoped>
.boot {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
  background: #fff;
}

.boot-mark {
  position: relative;
  width: min(31rem, 82vw);
  aspect-ratio: 1444 / 508;
  overflow: hidden;
}

.boot-mark img {
  position: absolute;
  width: 110.8%;
  height: auto;
  left: -6.65%;
  top: -85.8%;
}

.boot-track {
  width: 7.25rem;
  height: 2px;
  overflow: hidden;
  border-radius: 999px;
  background: #e8eaed;
}

.boot-bar {
  display: block;
  width: 42%;
  height: 100%;
  border-radius: inherit;
  background: #1a56db;
  animation: boot-slide 1.45s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes boot-slide {
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(280%);
  }
}
</style>
