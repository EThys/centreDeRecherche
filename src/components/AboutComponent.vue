<template>
  <!-- Section About -->
  <section class="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
        
        <!-- Section Gauche - Contenu -->
        <div class="w-full lg:w-1/2 order-2 lg:order-1">
          <div class="space-y-5 sm:space-y-6">
            <!-- En-tête discrète -->
            <div 
              class="flex items-center mb-3 sm:mb-4 fade-in-up"
              :class="{ 'animate-enter': isVisible }"
            >
              <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
              <p class="text-blue-600 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                {{ $t('about.header') }}
              </p>
            </div>
            
            <!-- Titre principal -->
            <h2 
              class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight fade-in-up delay-100"
              :class="{ 'animate-enter': isVisible }"
            >
              {{ $t('about.title') }}
              <span class="text-blue-500 relative inline-block">
                <span class="relative z-10">{{ $t('about.titleHighlight') }}</span>
                <span 
                  class="absolute bottom-0 left-0 w-0 h-1.5 sm:h-2 bg-blue-200 rounded-full transition-all duration-1000 ease-out"
                  :class="{ 'w-full': isVisible }"
                ></span>
              </span>
            </h2>
            
            <!-- Description -->
            <p 
              class="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed fade-in-up delay-200"
              :class="{ 'animate-enter': isVisible }"
            >
              {{ $t('about.description') }}
            </p>
          </div>
        </div>

        <!-- Section Droite - Images avec statistiques superposées -->
        <div class="w-full lg:w-1/2 order-1 lg:order-2">
          <div class="relative">
            <!-- Image principale avec statistiques superposées -->
            <div 
              class="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl image-container-main fade-in-up delay-400"
              :class="{ 'animate-enter': isVisible }"
            >
              <img
                src="../assets/carousel-1.jpg"
                alt="Équipe du CReFF-PME en réunion de recherche"
                class="w-full h-56 sm:h-72 lg:h-80 object-cover transform transition-transform duration-700 image-main"
              />
              
              <!-- Superposition semi-transparente pour améliorer la lisibilité -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
              
              <!-- Statistiques superposées -->
              <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <div class="grid grid-cols-3 gap-2 sm:gap-4 stats-container">
                  <div 
                    v-for="(stat, index) in stats"
                    :key="index"
                    class="text-center bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 transform transition-all duration-500 stat-item"
                    :style="{ animationDelay: `${index * 200 + 600}ms` }"
                    :class="{ 'stat-enter': isVisible }"
                  >
                    <p class="text-xl sm:text-2xl lg:text-3xl font-bold count-up" :data-target="stat.value">
                      {{ isVisible ? 0 : '' }}
                    </p>
                    <p class="text-xs sm:text-sm opacity-90 mt-1 leading-tight">{{ stat.label }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Image secondaire -->
            <div 
              class="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 lg:-top-8 lg:-right-8 w-36 h-28 sm:w-44 sm:h-32 lg:w-56 lg:h-40 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border-2 sm:border-4 border-white transform transition-transform duration-500 image-secondary fade-in-up delay-500"
              :class="{ 'animate-enter': isVisible }"
            >
              <img
                src="../assets/carousel-4.jpeg"
                alt="Formation et atelier du CReFF-PME"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Élément décoratif flottant -->
            <div class="hidden sm:block absolute -bottom-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full opacity-50 animate-float"></div>
            <div class="hidden sm:block absolute top-1/2 -right-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-200 rounded-full opacity-30 animate-float-delayed"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isVisible = ref(false)
const stats = computed(() => [
  { value: 50, label: t('about.stats.projects') },
  { value: 100, label: t('about.stats.researchers') },
  { value: 15, label: t('about.stats.publications') }
])

const observer = ref(null)

const startCountUp = () => {
  const countUpElements = document.querySelectorAll('.count-up')
  
  countUpElements.forEach(element => {
    const target = parseInt(element.getAttribute('data-target'))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0
    
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        element.textContent = target + '+'
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current) + '+'
      }
    }, 16)
  })
}

const handleIntersection = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      isVisible.value = true
      setTimeout(startCountUp, 800)
    }
  })
}

onMounted(() => {
  observer.value = new IntersectionObserver(handleIntersection, {
    threshold: 0.2,
    rootMargin: '-50px'
  })

  const section = document.querySelector('section')
  if (section) {
    observer.value.observe(section)
  }
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>

<style scoped>
/* Animations d'entrée principales */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-up.animate-enter {
  opacity: 1;
  transform: translateY(0);
}

/* Délais d'animation pour les éléments */
.delay-100 {
  transition-delay: 100ms;
}

.delay-200 {
  transition-delay: 200ms;
}

.delay-300 {
  transition-delay: 300ms;
}

.delay-400 {
  transition-delay: 400ms;
}

.delay-500 {
  transition-delay: 500ms;
}

/* Animation des statistiques */
.stat-item {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.stat-enter {
  animation: statSlideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes statSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Animation de flottement */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 8s ease-in-out infinite 2s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(120deg);
  }
  66% {
    transform: translateY(5px) rotate(240deg);
  }
}

/* Effets hover améliorés */
.image-container-main:hover .image-main {
  transform: scale(1.05);
}

.image-secondary:hover {
  transform: translateY(-5px) rotate(2deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.stat-item:hover {
  transform: translateY(-5px) scale(1.05);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Animation de soulignement pour le titre */
.text-blue-500 span:last-child {
  transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Amélioration de l'effet de flou pour les cartes de statistiques */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Animation de pulse pour le point bleu */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

/* Responsive adjustments - Mobile First */
@media (max-width: 640px) {
  .fade-in-up {
    transform: translateY(15px);
  }
  
  .stats-container {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .stat-item {
    margin-bottom: 0;
    padding: 0.625rem;
  }

  .stat-item p:first-child {
    font-size: 1.375rem;
  }

  .stat-item p:last-child {
    font-size: 0.65rem;
    line-height: 1.2;
  }
  
  .image-secondary {
    position: relative;
    top: 0;
    right: 0;
    margin-top: -2.5rem;
    margin-left: auto;
    margin-right: 0.75rem;
    width: 120px;
    height: 90px;
    border-width: 2px;
  }
  
  .animate-float,
  .animate-float-delayed {
    display: none;
  }

  .image-container-main {
    margin-bottom: 1.5rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }
  
  .stat-item {
    padding: 0.875rem;
  }
  
  .stat-item p:first-child {
    font-size: 1.75rem;
  }
  
  .image-secondary {
    position: relative;
    top: 0;
    right: 0;
    margin-top: -3.5rem;
    margin-left: auto;
    margin-right: 1.5rem;
    width: 160px;
    height: 120px;
  }
  
  .animate-float,
  .animate-float-delayed {
    display: none;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .image-secondary {
    position: absolute;
    top: -1.5rem;
    right: -1.5rem;
    width: 180px;
    height: 135px;
  }
  
  .stat-item p:first-child {
    font-size: 2rem;
  }
}

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .stat-item,
  .image-main,
  .image-secondary,
  .animate-float,
  .animate-float-delayed,
  .animate-pulse {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
  
  .fade-in-up.animate-enter {
    opacity: 1;
    transform: none;
  }
}
</style>
