<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20 flex items-center justify-center px-4">
    <div class="max-w-2xl mx-auto text-center">
      <!-- Illustration animée -->
      <div class="mb-8 fade-in-up" data-animate>
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-red-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div class="relative bg-gradient-to-br from-red-100 to-orange-100 rounded-full w-48 h-48 flex items-center justify-center mx-auto shadow-2xl">
            <i class="fas fa-lock text-6xl text-red-600"></i>
          </div>
        </div>
      </div>

      <!-- Titre -->
      <h1 class="text-8xl font-bold text-gray-900 mb-4 fade-in-up" data-animate style="animation-delay: 100ms">
        403
      </h1>
      
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 fade-in-up" data-animate style="animation-delay: 200ms">
        Accès non autorisé
      </h2>
      
      <p class="text-lg text-gray-600 mb-2 max-w-md mx-auto fade-in-up" data-animate style="animation-delay: 300ms">
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      
      <p class="text-base text-gray-500 mb-8 max-w-md mx-auto fade-in-up" data-animate style="animation-delay: 300ms">
        Cette page nécessite une authentification. Veuillez vous connecter pour continuer.
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up" data-animate style="animation-delay: 400ms">
        <button
          @click="goToLogin"
          class="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <i class="fas fa-sign-in-alt"></i>
          <span>Se connecter</span>
        </button>
        
        <button
          @click="goHome"
          class="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <i class="fas fa-home"></i>
          <span>Retour à l'accueil</span>
        </button>
      </div>

      <!-- Message d'aide -->
      <div class="mt-12 pt-8 border-t border-gray-200 fade-in-up" data-animate style="animation-delay: 500ms">
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-md mx-auto">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
              <i class="fas fa-info-circle text-blue-600 text-xl"></i>
            </div>
            <div class="text-left">
              <h3 class="font-semibold text-blue-900 mb-2">Besoin d'aide ?</h3>
              <p class="text-sm text-blue-700">
                Si vous pensez que c'est une erreur, veuillez contacter l'administrateur du site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

const goToLogin = () => {
  // Sauvegarder la route demandée pour redirection après login
  const redirectPath = route.query.redirect as string || '/dashboard'
  router.push({
    name: 'authentification',
    query: { redirect: redirectPath }
  })
}

const goHome = () => {
  router.push('/')
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

