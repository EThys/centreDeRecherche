<template>
  <div class="min-h-screen bg-white">
    <!-- Navbar -->
    <NavBarComponent />

    <!-- Hero Section avec image de fond -->
    <section class="relative pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-24 min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden">
      <!-- Image de fond -->
      <div class="absolute inset-0 z-0">
        <img 
          src="../assets/carousel-1.jpg" 
          alt="CReFF-Entrepreneurs Background"
          class="w-full h-full object-cover"
        />
        <!-- Overlay sombre pour la lisibilité -->
        <div class="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/80"></div>
        <!-- Overlay bleu subtil -->
        <div class="absolute inset-0 bg-blue-900/30"></div>
      </div>
      
      <!-- Contenu -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="text-center fade-in-up" data-animate>
          <h1 class="text-lg sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
            {{ $t('entrepreneurs.hero.title') }}<br class="hidden sm:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-blue-400">{{ $t('entrepreneurs.hero.subtitle') }}</span>
          </h1>
          <p class="text-[10px] sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light px-2 sm:px-0">
            {{ $t('entrepreneurs.hero.description') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Section Mission -->
    <section class="py-10 sm:py-14 lg:py-20 bg-white relative">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Contenu -->
          <div class="fade-in-up" data-animate>
            <div class="mb-6">
              <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">{{ $t('entrepreneurs.mission.header') }}</span>
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              {{ $t('entrepreneurs.mission.title') }} <span class="text-blue-600">{{ $t('entrepreneurs.mission.titleHighlight') }}</span>
            </h2>
            <div class="space-y-5 text-gray-700 leading-relaxed text-base sm:text-lg">
              <p class="font-light">
                {{ $t('entrepreneurs.mission.paragraph1') }}
              </p>
              <p class="font-light">
                {{ $t('entrepreneurs.mission.paragraph2') }}
              </p>
            </div>
          </div>

          <!-- Image décorative -->
          <div class="fade-in-right" data-animate>
            <div class="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="../assets/carousel-3.jpg" 
                alt="Formation entrepreneurs"
                class="w-full h-full object-cover aspect-[4/3]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Activités de Formation -->
    <section class="py-10 sm:py-14 lg:py-20 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-20 left-20 w-32 h-32 bg-blue-200/10 rounded-full blur-2xl"></div>
        <div class="absolute bottom-20 right-20 w-40 h-40 bg-indigo-200/10 rounded-full blur-2xl"></div>
      </div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-12 sm:mb-16 lg:mb-20 fade-in-up" data-animate>
          <div class="mb-6">
            <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">{{ $t('entrepreneurs.activities.header') }}</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {{ $t('entrepreneurs.activities.title') }}<span class="text-blue-600">{{ $t('entrepreneurs.activities.titleHighlight') }}</span>
          </h2>
          <p class="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto font-light">
            {{ $t('entrepreneurs.activities.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          <!-- Formation 1 -->
          <div class="bg-white rounded-lg p-8 sm:p-10 lg:p-12 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 fade-in-up stagger-item" data-animate>
            <div class="mb-8">
              <div class="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <i class="fas fa-chalkboard-teacher text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{{ $t('entrepreneurs.activities.training1.title') }}</h3>
              <p class="text-gray-600 text-base">{{ $t('entrepreneurs.activities.training1.subtitle') }}</p>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start">
                <div class="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-blue-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('entrepreneurs.activities.training1.item1') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-blue-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('entrepreneurs.activities.training1.item2') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-blue-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('entrepreneurs.activities.training1.item3') }}</span>
              </li>
            </ul>
          </div>

          <!-- Formation 2 -->
          <div class="bg-white rounded-lg p-8 sm:p-10 lg:p-12 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 fade-in-up stagger-item" :style="{ animationDelay: '150ms' }" data-animate>
            <div class="mb-8">
              <div class="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <i class="fas fa-handshake text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{{ $t('entrepreneurs.activities.training2.title') }}</h3>
              <p class="text-gray-600 text-base">{{ $t('entrepreneurs.activities.training2.subtitle') }}</p>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start">
                <div class="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-indigo-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('entrepreneurs.activities.training2.item1') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-indigo-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('entrepreneurs.activities.training2.item2') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-indigo-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('entrepreneurs.activities.training2.item3') }}</span>
              </li>
            </ul>
          </div>

          <!-- Formation 3 -->
          <div class="bg-white rounded-lg p-8 sm:p-10 lg:p-12 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 fade-in-up stagger-item" :style="{ animationDelay: '300ms' }" data-animate>
            <div class="mb-8">
              <div class="w-16 h-16 bg-cyan-600 rounded-lg flex items-center justify-center mb-6">
                <i class="fas fa-lightbulb text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{{ $t('entrepreneurs.activities.training3.title') }}</h3>
              <p class="text-gray-600 text-base">{{ $t('entrepreneurs.activities.training3.subtitle') }}</p>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start">
                <div class="w-6 h-6 bg-cyan-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-cyan-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('entrepreneurs.activities.training3.item1') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-cyan-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-cyan-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('entrepreneurs.activities.training3.item2') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-cyan-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-cyan-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('entrepreneurs.activities.training3.item3') }}</span>
              </li>
            </ul>
          </div>

          <!-- Formation 4 -->
          <div class="bg-white rounded-lg p-8 sm:p-10 lg:p-12 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 fade-in-up stagger-item" :style="{ animationDelay: '450ms' }" data-animate>
            <div class="mb-8">
              <div class="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <i class="fas fa-network-wired text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{{ $t('entrepreneurs.activities.training4.title') }}</h3>
              <p class="text-gray-600 text-base">{{ $t('entrepreneurs.activities.training4.subtitle') }}</p>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start">
                <div class="w-6 h-6 bg-purple-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-purple-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('entrepreneurs.activities.training4.item1') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-purple-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-purple-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('entrepreneurs.activities.training4.item2') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-purple-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-purple-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('entrepreneurs.activities.training4.item3') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'

const { t } = useI18n()

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

  // Observer tous les éléments avec data-animate
  document.querySelectorAll('[data-animate]').forEach(el => {
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
/* Animations d'apparition */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.fade-in-right {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-right.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.stagger-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.stagger-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .fade-in-right,
  .stagger-item {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
  
  .fade-in-up.animate-in,
  .fade-in-right.animate-in,
  .stagger-item.animate-in {
    opacity: 1;
    transform: none;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .fade-in-up,
  .fade-in-right,
  .stagger-item {
    transform: translateY(20px);
    transition-duration: 0.6s;
  }
}
</style>

