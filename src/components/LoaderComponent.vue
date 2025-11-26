<template>
  <Transition
    enter-active-class="transition-opacity duration-700 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-700 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center overflow-hidden"
    >
      <!-- Fond animé avec particules -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Cercles flottants animés -->
        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-blob-slow"></div>
        <div class="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-blob-medium"></div>
        <div class="absolute bottom-1/4 left-1/3 w-56 h-56 bg-blue-200/30 rounded-full blur-3xl animate-blob-fast"></div>
      </div>

      <!-- Contenu principal -->
      <div class="relative z-10 flex flex-col items-center justify-center">
        <!-- Container du logo avec cercles concentriques -->
        <div class="relative mb-12">
          <!-- Cercles concentriques animés -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-48 h-48 border-2 border-blue-200/50 rounded-full animate-spin-slow"></div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-40 h-40 border-2 border-indigo-300/50 rounded-full animate-spin-reverse"></div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-32 h-32 border-2 border-blue-300/50 rounded-full animate-spin-slow"></div>
          </div>
          
          <!-- Logo avec effet glassmorphism -->
          <div class="relative w-28 h-28 bg-white/90 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl ring-4 ring-blue-100/50 p-5 animate-float">
            <!-- Effet de brillance -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-3xl"></div>
            <!-- Logo -->
            <img
              :src="logoImage"
              alt="CReFF-PME Logo"
              class="relative z-10 w-full h-full object-contain drop-shadow-lg animate-scale-in"
            />
            <!-- Points animés autour du logo -->
            <div class="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
            <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-500 rounded-full animate-ping" style="animation-delay: 0.5s"></div>
            <div class="absolute top-1/2 -left-4 w-2 h-2 bg-blue-500 rounded-full animate-ping" style="animation-delay: 1s"></div>
            <div class="absolute top-1/2 -right-4 w-2 h-2 bg-blue-500 rounded-full animate-ping" style="animation-delay: 1.5s"></div>
          </div>
        </div>
        
        <!-- Texte de chargement avec animation -->
        <div class="text-center space-y-3">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent animate-gradient-text">
            CReFF-PME
          </h2>
          <div class="flex items-center justify-center space-x-2">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0s"></div>
              <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
            <p class="text-sm font-medium text-gray-600 ml-2">Chargement en cours</p>
          </div>
          <p class="text-xs text-gray-500 font-light">Centre de Recherche et de Formation sur le Financement des PME en Afrique centrale</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import logoImage from '@/assets/logoCreff-PME.png'

const isLoading = ref(true)

const hideLoader = () => {
  // Petit délai pour une transition plus fluide
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}

onMounted(() => {
  // Attendre que la page soit complètement chargée
  if (document.readyState === 'complete') {
    hideLoader()
  } else {
    window.addEventListener('load', hideLoader)
  }
})

onUnmounted(() => {
  window.removeEventListener('load', hideLoader)
})
</script>

<style scoped>
/* Animations de blob flottant */
@keyframes blob-slow {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@keyframes blob-medium {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-30px, 30px) scale(1.1);
  }
  66% {
    transform: translate(20px, -20px) scale(0.9);
  }
}

@keyframes blob-fast {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(20px, 30px) scale(1.1);
  }
  66% {
    transform: translate(-30px, -20px) scale(0.9);
  }
}

.animate-blob-slow {
  animation: blob-slow 20s ease-in-out infinite;
}

.animate-blob-medium {
  animation: blob-medium 15s ease-in-out infinite;
}

.animate-blob-fast {
  animation: blob-fast 25s ease-in-out infinite;
}

/* Rotation lente */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 6s linear infinite;
}

/* Flottement du logo */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Scale in du logo */
@keyframes scale-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 1s ease-out;
}

/* Gradient text animé */
@keyframes gradient-text {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-text {
  background-size: 200% auto;
  animation: gradient-text 3s ease infinite;
}

/* Bounce pour les points */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 1.4s ease-in-out infinite;
}

/* Ping pour les points autour du logo */
@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
