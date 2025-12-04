<template>
  <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
    <!-- Image shimmer -->
    <div class="relative h-56 overflow-hidden bg-gray-200">
      <div class="shimmer"></div>
    </div>
    
    <!-- Content shimmer -->
    <div class="p-6">
      <!-- Badge shimmer -->
      <div class="flex items-center justify-between mb-3">
        <div class="h-4 w-24 bg-gray-200 rounded shimmer"></div>
        <div class="h-4 w-16 bg-gray-200 rounded shimmer"></div>
      </div>
      
      <!-- Title shimmer -->
      <div class="mb-3">
        <div class="h-6 w-full bg-gray-200 rounded mb-2 shimmer"></div>
        <div class="h-6 w-3/4 bg-gray-200 rounded shimmer"></div>
      </div>
      
      <!-- Description shimmer -->
      <div class="mb-4 space-y-2">
        <div class="h-4 w-full bg-gray-200 rounded shimmer"></div>
        <div class="h-4 w-full bg-gray-200 rounded shimmer"></div>
        <div class="h-4 w-2/3 bg-gray-200 rounded shimmer"></div>
      </div>
      
      <!-- Footer shimmer -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div class="h-4 w-20 bg-gray-200 rounded shimmer"></div>
        <div class="h-4 w-24 bg-gray-200 rounded shimmer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Composant shimmer simple, pas besoin de logique
</script>

<style scoped>
.shimmer {
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>

