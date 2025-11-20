<template>
  <!-- Section About -->
  <section class="py-16 lg:py-24 px-4 sm:px-6 bg-white overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        <!-- Section Gauche - Contenu -->
        <div class="w-full lg:w-1/2">
          <div class="space-y-8">
            <!-- En-tête discrète -->
            <div 
              class="flex items-center mb-4 fade-in-up"
              :class="{ 'animate-enter': isVisible }"
            >
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
              <p class="text-blue-600 text-sm font-semibold tracking-wider uppercase">
                À PROPOS DU CENTRE
              </p>
            </div>
            
            <!-- Titre principal -->
            <h2 
              class="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight fade-in-up delay-100"
              :class="{ 'animate-enter': isVisible }"
            >
              Centre de Recherche et de Formation sur le 
              <span class="text-blue-500 relative">
                <span class="relative z-10">Financement des PME</span>
                <span 
                  class="absolute bottom-0 left-0 w-0 h-2 bg-blue-200 rounded-full transition-all duration-1000 ease-out"
                  :class="{ 'w-full': isVisible }"
                ></span>
              </span>
            </h2>
            
            <!-- Description -->
            <p 
              class="text-lg text-gray-600 leading-relaxed fade-in-up delay-200"
              :class="{ 'animate-enter': isVisible }"
            >
              Le Centre de Recherche et de Formation sur le Financement des PME (CReFF-PME) est une institution académique dédiée à la production de connaissances, au renforcement des capacités et à l'accompagnement innovant des entrepreneurs africains. Nous œuvrons pour une meilleure compréhension des défis du financement des petites et moyennes entreprises, tout en contribuant au développement des solutions adaptées au contexte local.
            </p>

            <div class="flex items-center space-x-8 fade-in-up delay-300" :class="{ 'animate-enter': isVisible }">

              <!-- Item 1 -->
              <div class="flex items-center space-x-3 group">
                <div class="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                  <svg class="w-3.5 h-3.5 text-blue-500 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 01 011.414-1.414L8 12.586l7.293-7.293a1 1 01 1.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700 font-semibold text-base group-hover:text-blue-600 transition-colors duration-300">
                  🔬 Recherche Appliquée
                </span>
              </div>

              <!-- Item 2 -->
              <div class="flex items-center space-x-3 group">
                <div class="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                  <svg class="w-3.5 h-3.5 text-blue-500 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 01 011.414-1.414L8 12.586l7.293-7.293a1 1 01 1.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700 font-semibold text-base group-hover:text-blue-600 transition-colors duration-300">
                  👥 Équipe Pluridisciplinaire
                </span>
              </div>

            </div>

          </div>
        </div>

        <!-- Section Droite - Images avec statistiques superposées -->
        <div class="w-full lg:w-1/2">
          <div class="relative">
            <!-- Image principale avec statistiques superposées -->
            <div 
              class="relative rounded-2xl overflow-hidden shadow-xl image-container-main fade-in-up delay-400"
              :class="{ 'animate-enter': isVisible }"
            >
              <img
                src="../assets/carousel-2.jpg"
                alt="Équipe du CReFF-PME en réunion de recherche"
                class="w-full h-80 lg:h-96 object-cover transform transition-transform duration-700 image-main"
              />
              
              <!-- Superposition semi-transparente pour améliorer la lisibilité -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              <!-- Statistiques superposées -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div class="grid grid-cols-3 gap-4 stats-container">
                  <div 
                    v-for="(stat, index) in stats"
                    :key="index"
                    class="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 stat-item"
                    :style="{ animationDelay: `${index * 200 + 600}ms` }"
                    :class="{ 'stat-enter': isVisible }"
                  >
                    <p class="text-2xl lg:text-3xl font-bold count-up" :data-target="stat.value">
                      {{ isVisible ? 0 : '' }}
                    </p>
                    <p class="text-sm opacity-90 mt-1">{{ stat.label }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Image secondaire -->
            <div 
              class="absolute -top-8 -right-8 w-48 h-36 lg:w-64 lg:h-48 rounded-2xl overflow-hidden shadow-lg border-4 border-white transform transition-transform duration-500 image-secondary fade-in-up delay-500"
              :class="{ 'animate-enter': isVisible }"
            >
              <img
                src="../assets/carousel-4.jpg"
                alt="Formation et atelier du CReFF-PME"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Élément décoratif flottant -->
            <div class="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-50 animate-float"></div>
            <div class="absolute top-1/2 -right-4 w-12 h-12 bg-blue-200 rounded-full opacity-30 animate-float-delayed"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const stats = ref([
  { value: 50, label: 'Études Réalisées' },
  { value: 100, label: 'Experts Associés' },
  { value: 15, label: 'Pays Couverts' }
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
    threshold: 0.3,
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

/* Responsive adjustments */
@media (max-width: 1024px) {
  .image-secondary {
    position: relative;
    top: 0;
    right: 0;
    margin-top: -4rem;
    margin-left: auto;
    margin-right: 2rem;
    width: 200px;
    height: 150px;
  }
  
  .animate-float,
  .animate-float-delayed {
    display: none;
  }
}

@media (max-width: 768px) {
  .fade-in-up {
    transform: translateY(20px);
  }
  
  .stats-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-item {
    margin-bottom: 0.5rem;
  }
  
  .image-secondary {
    width: 160px;
    height: 120px;
    margin-right: 1rem;
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
    animation: none;
    transition: none;
    transform: none;
  }
  
  .fade-in-up.animate-enter {
    opacity: 1;
    transform: none;
  }
}
</style>