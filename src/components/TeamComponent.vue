<template>
  <section class="py-20 bg-gradient-to-br from-blue-50 to-blue-100/50 relative overflow-hidden">
    <!-- Éléments décoratifs animés -->
    <div class="absolute top-10 left-10 w-20 h-20 bg-blue-300/30 rounded-full blur-xl animate-float-slow"></div>
    <div class="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-float-medium"></div>
    <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200/40 rounded-full blur-lg animate-float-fast"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- En-tête -->
      <div class="text-center mb-16 fade-in-up" data-delay="0">
        <div class="inline-flex items-center gap-2 text-blue-700 mb-4 slide-in-expand" data-delay="100">
          <div class="w-8 h-0.5 bg-blue-600 expand-width" data-delay="150"></div>
          <span class="text-sm font-semibold tracking-wider">NOTRE ÉQUIPE</span>
          <div class="w-8 h-0.5 bg-blue-600 expand-width" data-delay="150"></div>
        </div>
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 fade-in-up" data-delay="200">
          Rencontrez <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">notre équipe</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed fade-in-up" data-delay="300">
          Une équipe multiculturelle de chercheurs passionnés, unis par l'innovation et l'excellence scientifique
        </p>
      </div>

      <!-- Grille des membres -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        <!-- Carte membre -->
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 stagger-item"
          :class="`delay-${400 + index * 100}`"
        >
          <!-- Overlay au survol -->
          <div class="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          
          <!-- Photo -->
          <div class="relative overflow-hidden">
            <img
              :src="member.photo"
              :alt="member.name"
              class="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <!-- Badge de rôle -->
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full scale-in" data-delay="100">
              <span class="text-xs font-semibold text-blue-600">{{ member.role }}</span>
            </div>
          </div>

          <!-- Contenu -->
          <div class="p-6 relative z-20">
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors duration-300 fade-in-up" data-delay="50">
              {{ member.name }}
            </h3>
            <p class="text-blue-600 font-medium mb-3 group-hover:text-blue-200 transition-colors duration-300 fade-in-up" data-delay="100">
              {{ member.position }}
            </p>
            <p class="text-gray-600 text-sm leading-relaxed group-hover:text-blue-100 transition-colors duration-300 fade-in-up" data-delay="150">
              {{ member.expertise }}
            </p>
          </div>

          <!-- Bordure animée -->
          <div class="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-padding opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
            <div class="absolute inset-[2px] rounded-2xl bg-white z-0"></div>
          </div>

          <!-- Points décoratifs -->
          <div class="absolute top-3 left-3 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
          <div class="absolute bottom-3 right-3 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"></div>
        </div>
      </div>

      <!-- Section CTA -->
      <div class="text-center mt-16 fade-in-up" data-delay="800">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200/50 shadow-lg">
          <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Rejoignez notre équipe de recherche
          </h3>
          <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
            Participez à des projets innovants et contribuez au développement du financement des PME en Afrique
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Postuler maintenant
            </button>
            <button class="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
              Voir les offres
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import researchImage1 from '../../src/assets/jean.jpeg'

// Icônes sociales comme composants
const TwitterIcon = {
  template: `
    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
    </svg>
  `
}

const LinkedInIcon = {
  template: `
    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  `
}

const GithubIcon = {
  template: `
    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  `
}

const socialIcons = [
  { name: 'Twitter', icon: TwitterIcon },
  { name: 'LinkedIn', icon: LinkedInIcon },
  { name: 'GitHub', icon: GithubIcon }
]

const teamMembers = [
  {
    name: "Prof. Jean Nsonsumuna",
    position: "Directeur du Centre",
    expertise: "Financement des PME, Économie du développement",
    photo: researchImage1,
    role: "Direction"
  },
  {
    name: "Pr. Sophie Lambert",
    position: "Co-directrice (ULB)",
    expertise: "Systèmes financiers, Analyse économique",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
    role: "Co-direction"
  },
  {
    name: "Dr. Alain Kabamba",
    position: "Chercheur principal",
    expertise: "Innovation financière, Technologies FinTech",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
    role: "Recherche"
  },
  {
    name: "Dr. Marie Ndongala",
    position: "Chercheuse associée",
    expertise: "Entrepreneuriat, Croissance des PME",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
    role: "Recherche"
  }
]

// Système d'animation - Correction des types
let observer: IntersectionObserver | null = null

const initScrollAnimations = () => {
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        if (observer) {
          observer.unobserve(entry.target)
        }
      }
    })
  }, observerOptions)

  // Observer tous les éléments avec des classes d'animation
  document.querySelectorAll('.fade-in-up, .slide-in-expand, .scale-in, .stagger-item, .expand-width').forEach(el => {
    if (observer) {
      observer.observe(el)
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    initScrollAnimations()
  }, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style scoped>
/* Animations d'apparition */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.slide-in-expand {
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-in-expand.animate-in {
  opacity: 1;
  transform: scaleX(1);
}

.scale-in {
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.scale-in.animate-in {
  opacity: 1;
  transform: scale(1);
}

.expand-width {
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.expand-width.animate-in {
  opacity: 1;
  transform: scaleX(1);
}

/* Animations flottantes */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes float-medium {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes float-fast {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 4s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 3s ease-in-out infinite;
}

/* Système de délais pour les animations en cascade */
.stagger-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.stagger-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Délais personnalisés */
[data-delay="0"] { transition-delay: 0ms; }
[data-delay="50"] { transition-delay: 50ms; }
[data-delay="100"] { transition-delay: 100ms; }
[data-delay="150"] { transition-delay: 150ms; }
[data-delay="200"] { transition-delay: 200ms; }
[data-delay="300"] { transition-delay: 300ms; }
[data-delay="400"] { transition-delay: 400ms; }
[data-delay="500"] { transition-delay: 500ms; }
[data-delay="600"] { transition-delay: 600ms; }
[data-delay="700"] { transition-delay: 700ms; }
[data-delay="800"] { transition-delay: 800ms; }

.delay-400 { transition-delay: 400ms; }
.delay-500 { transition-delay: 500ms; }
.delay-600 { transition-delay: 600ms; }
.delay-700 { transition-delay: 700ms; }

/* Amélioration des transitions */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-y-0 {
  transform: translateY(0);
}

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .slide-in-expand,
  .scale-in,
  .stagger-item,
  .expand-width,
  .animate-float-slow,
  .animate-float-medium,
  .animate-float-fast,
  .group-hover\:scale-110,
  .group-hover\:translate-y-0 {
    animation: none;
    transition: none;
    transform: none;
  }
  
  .fade-in-up.animate-in,
  .slide-in-expand.animate-in,
  .scale-in.animate-in,
  .stagger-item.animate-in,
  .expand-width.animate-in {
    opacity: 1;
    transform: none;
  }
}

/* Optimisations pour mobile */
@media (max-width: 768px) {
  .fade-in-up,
  .stagger-item {
    transform: translateY(20px);
    transition-duration: 0.6s;
  }
  
  .slide-in-expand {
    transform: scaleX(0.8);
  }
}

/* Amélioration des performances */
.transform {
  will-change: transform;
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Effets de brillance */
.shadow-2xl {
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.hover\:shadow-2xl:hover {
  box-shadow: 
    0 35px 60px -12px rgba(59, 130, 246, 0.2),
    0 0 0 1px rgba(59, 130, 246, 0.1);
}
</style>