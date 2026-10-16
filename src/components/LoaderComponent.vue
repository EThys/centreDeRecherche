<template>
  <Transition name="boot">
    <div
      v-if="isLoading"
      class="boot"
      role="status"
      aria-live="polite"
      aria-label="Chargement"
    >
      <div class="boot-mark">
        <img :src="logoImage" alt="" />
      </div>
      <div class="boot-track" aria-hidden="true">
        <span class="boot-bar"></span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import logoImage from '@/assets/logoCreff-PME.jpeg'

const router = useRouter()
const isLoading = ref(true)
const minVisible = 1400
let started = 0
let hideTimer = 0
let capTimer = 0
let removeBefore: (() => void) | null = null
let removeAfter: (() => void) | null = null
let routeLoader = false

const hide = () => {
  isLoading.value = false
  routeLoader = false
}

const show = () => {
  window.clearTimeout(hideTimer)
  window.clearTimeout(capTimer)
  started = performance.now()
  isLoading.value = true
  capTimer = window.setTimeout(hide, 2400)
}

const scheduleHide = () => {
  const wait = Math.max(0, minVisible - (performance.now() - started))
  window.clearTimeout(hideTimer)
  hideTimer = window.setTimeout(hide, wait)
}

onMounted(() => {
  show()

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleHide, { once: true })
  } else {
    scheduleHide()
  }

  removeBefore = router.beforeEach((to, from) => {
    if (to.path === from.path || from.matched.length === 0) return
    routeLoader = true
    show()
  })

  removeAfter = router.afterEach(() => {
    if (!routeLoader) return
    scheduleHide()
  })
})

onUnmounted(() => {
  window.clearTimeout(hideTimer)
  window.clearTimeout(capTimer)
  removeBefore?.()
  removeAfter?.()
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

.boot-enter-active,
.boot-leave-active {
  transition: opacity 0.55s ease;
}

.boot-enter-from,
.boot-leave-to {
  opacity: 0;
}
</style>
