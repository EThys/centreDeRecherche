<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 flex items-center justify-center px-4">
    <div class="max-w-2xl mx-auto text-center">
      <!-- Illustration animée -->
      <div class="mb-8 fade-in-up" data-animate>
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div class="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full w-48 h-48 flex items-center justify-center mx-auto shadow-2xl">
            <i class="fas fa-exclamation-triangle text-6xl text-blue-600"></i>
          </div>
        </div>
      </div>

      <!-- Titre -->
      <h1 class="text-8xl font-bold text-gray-900 mb-4 fade-in-up" data-animate style="animation-delay: 100ms">
        404
      </h1>
      
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 fade-in-up" data-animate style="animation-delay: 200ms">
        Page non trouvée
      </h2>
      
      <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto fade-in-up" data-animate style="animation-delay: 300ms">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up" data-animate style="animation-delay: 400ms">
        <button
          @click="goHome"
          class="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <i class="fas fa-home"></i>
          <span>Retour à l'accueil</span>
        </button>
        
        <button
          @click="goBack"
          class="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <i class="fas fa-arrow-left"></i>
          <span>Page précédente</span>
        </button>
      </div>

      <!-- Liens utiles -->
      <div class="mt-12 pt-8 border-t border-gray-200 fade-in-up" data-animate style="animation-delay: 500ms">
        <p class="text-sm text-gray-500 mb-4">Pages utiles :</p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/"
            class="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            Accueil
          </router-link>
          <router-link
            to="/actualites"
            class="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            Actualités
          </router-link>
          <router-link
            to="/evenements"
            class="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            Événements
          </router-link>
          <router-link
            to="/publications"
            class="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            Publications
          </router-link>
          <router-link
            to="/contact"
            class="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            Contact
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el)
  })
}

onMounted(() => {
  setTimeout(() => {
    initScrollAnimations()
  }, 100)
})
</script>

<style scoped>
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}
</style>

