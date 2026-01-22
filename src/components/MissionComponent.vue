<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Image de fond avec effet parallax -->
    <div class="parallax-bg absolute inset-0 z-0">
      <img 
        src="../assets/about-1.jpg" 
        alt="Centre de recherche CReFF-PME"
        class="w-full h-full object-cover transform scale-105"
      />
      <!-- Overlay pour améliorer la lisibilité -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-800/70"></div>
      
      <!-- Éléments décoratifs animés -->
      <div class="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-float-medium"></div>
      <div class="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-200/5 rounded-full blur-3xl animate-float-fast -translate-x-1/2 -translate-y-1/2"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
      <!-- En-tête de section -->
      <div class="text-center mb-16 fade-in-up" data-delay="0">
        <div class="inline-flex items-center gap-3 text-white mb-6">
          <div class="w-12 h-0.5 bg-blue-400 expand-width" data-delay="200"></div>
          <span class="text-sm font-semibold tracking-wider uppercase text-blue-200 slide-in-up" data-delay="300">{{ $t('mission.header') }}</span>
          <div class="w-12 h-0.5 bg-blue-400 expand-width" data-delay="200"></div>
        </div>
        <h2 class="text-4xl lg:text-6xl font-bold text-white mb-6 fade-in-up" data-delay="400">
          {{ $t('mission.title') }} <span class="text-blue-400 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{{ $t('mission.titleHighlight') }}</span>
        </h2>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed fade-in-up" data-delay="600">
          {{ $t('mission.description') }}
        </p>
      </div>

      <!-- Cartes Mission Principale -->
      <div class="grid lg:grid-cols-3 gap-8">
        <div 
          v-for="(mission, index) in mainMissions"
          :key="index"
          class="group relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 transition-all duration-700 overflow-hidden cursor-pointer stagger-item"
          :class="`delay-${index * 200}`"
        >
          <!-- Fond animé au survol -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-600/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:via-blue-600/15 group-hover:to-cyan-500/10 transition-all duration-700 transform group-hover:scale-110"></div>
          
          <!-- Effet de lumière au survol -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <!-- Bordure animée -->
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
            <div class="w-full h-full rounded-2xl bg-gray-900/80"></div>
          </div>

          <!-- Contenu de la carte -->
          <div class="relative z-10">
            <!-- Icône -->
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/25">
              <component :is="mission.icon" class="w-10 h-10 text-white transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            <!-- Contenu texte -->
            <h3 class="text-2xl font-bold text-white text-center mb-4 group-hover:text-blue-300 transition-colors duration-300 transform group-hover:translate-y-1">
              {{ mission.title }}
            </h3>
            <p class="text-blue-100 text-center leading-relaxed text-lg transform group-hover:translate-y-1 transition-transform duration-300">
              {{ mission.description }}
            </p>

            <!-- Indicateur de survol -->
            <div class="flex justify-center mt-6 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-500">
              <div class="w-8 h-0.5 bg-blue-400 rounded-full"></div>
            </div>
          </div>

          <!-- Points décoratifs -->
          <div class="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
          <div class="absolute bottom-4 left-4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"></div>
        </div>
      </div>

      <!-- Section supplémentaire avec statistiques -->
      <div class="mt-20 grid md:grid-cols-4 gap-6 text-center">
        <div 
          v-for="(stat, index) in stats"
          :key="index"
          class="fade-in-up"
          :data-delay="800 + index * 100"
        >
          <div class="text-3xl lg:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {{ stat.value }}
          </div>
          <div class="text-blue-200 text-sm font-medium">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { MagnifyingGlassIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/vue/24/outline'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const mainMissions = computed(() => [
  {
    title: t('mission.appliedResearch.title'),
    description: t('mission.appliedResearch.description'),
    icon: MagnifyingGlassIcon
  },
  {
    title: t('mission.excellenceTraining.title'),
    description: t('mission.excellenceTraining.description'),
    icon: AcademicCapIcon
  },
  {
    title: t('mission.strategicSupport.title'),
    description: t('mission.strategicSupport.description'),
    icon: ChartBarIcon
  }
])

const stats = computed(() => [
  { value: "50+", label: t('mission.stats.researchProjects') },
  { value: "200+", label: t('mission.stats.publications') },
  { value: "30+", label: t('mission.stats.partnerCountries') },
  { value: "1000+", label: t('mission.stats.trainedProfessionals') }
])

// Système d'animation
let observer = null

const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observer tous les éléments avec des classes d'animation
  document.querySelectorAll('.fade-in-up, .slide-in-up, .scale-in, .stagger-item, .expand-width').forEach(el => {
    observer.observe(el)
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
  }
})
</script>

<style scoped>
.parallax-bg {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

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

.slide-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
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
    transform: translateY(-20px);
  }
}

@keyframes float-medium {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes float-fast {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0px);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-10px);
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
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
[data-delay="100"] { transition-delay: 100ms; }
[data-delay="200"] { transition-delay: 200ms; }
[data-delay="300"] { transition-delay: 300ms; }
[data-delay="400"] { transition-delay: 400ms; }
[data-delay="500"] { transition-delay: 500ms; }
[data-delay="600"] { transition-delay: 600ms; }
[data-delay="700"] { transition-delay: 700ms; }
[data-delay="800"] { transition-delay: 800ms; }
[data-delay="900"] { transition-delay: 900ms; }

.delay-0 { transition-delay: 0ms; }
.delay-200 { transition-delay: 200ms; }
.delay-400 { transition-delay: 400ms; }

/* Améliorations des cartes au survol */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:rotate-3 {
  transform: rotate(3deg);
}

.group:hover .group-hover\:translate-y-1 {
  transform: translateY(-0.25rem);
}

/* Optimisations pour mobile */
@media (max-width: 768px) {
  .parallax-bg {
    background-attachment: scroll;
  }
  
  .fade-in-up,
  .slide-in-up,
  .stagger-item {
    transform: translateY(20px);
    transition-duration: 0.6s;
  }
  
  .text-4xl {
    font-size: 2.25rem;
  }
  
  .text-6xl {
    font-size: 3rem;
  }
}

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .slide-in-up,
  .scale-in,
  .stagger-item,
  .expand-width,
  .animate-float-slow,
  .animate-float-medium,
  .animate-float-fast,
  .group-hover\:scale-110,
  .group-hover\:rotate-3,
  .group-hover\:translate-y-1 {
    animation: none;
    transition: none;
    transform: none;
  }
  
  .fade-in-up.animate-in,
  .slide-in-up.animate-in,
  .scale-in.animate-in,
  .stagger-item.animate-in,
  .expand-width.animate-in {
    opacity: 1;
    transform: none;
  }
}

/* Amélioration des performances */
.transform {
  will-change: transform;
}

.backdrop-blur-md {
  will-change: backdrop-filter;
}

/* Effets de brillance améliorés */
.shadow-2xl {
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.group:hover .group-hover\:shadow-2xl {
  box-shadow: 
    0 35px 60px -12px rgba(59, 130, 246, 0.3),
    0 0 0 1px rgba(59, 130, 246, 0.2);
}

.group:hover .group-hover\:shadow-blue-500\/25 {
  box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
}
</style>