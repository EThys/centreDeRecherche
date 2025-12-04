<template>
  <div class="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center min-h-screen">
    <div class="text-center px-4">
      <!-- Spinner animé -->
      <div class="relative w-20 h-20 mx-auto mb-6">
        <!-- Cercle externe -->
        <div class="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <!-- Cercle animé -->
        <div class="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
        <!-- Cercle interne -->
        <div class="absolute inset-2 border-2 border-blue-100 rounded-full"></div>
        <!-- Point central -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <!-- Texte de chargement -->
      <div class="space-y-2">
        <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
        <p class="text-gray-600 text-sm">{{ message }}</p>
      </div>
      
      <!-- Barre de progression animée -->
      <div class="mt-6 w-64 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
        <div class="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-full animate-progress"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  message?: string
}>(), {
  title: 'Chargement en cours...',
  message: 'Veuillez patienter'
})
</script>

<style scoped>
@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-progress {
  animation: progress 1.5s ease-in-out infinite;
}

/* Animation de spin personnalisée */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Animation de pulse */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.9);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

