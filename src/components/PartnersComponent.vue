<template>
  <section class="py-10 sm:py-14 lg:py-20 bg-white relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10 sm:mb-12 fade-in-up" data-animate>
        <div class="mb-4">
          <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">{{ $t('partners.header') }}</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {{ $t('partners.title') }} <span class="text-blue-600">{{ $t('partners.titleHighlight') }}</span>
        </h2>
        <p class="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          {{ $t('partners.description') }}
        </p>
      </div>

      <!-- Carousel simple et élégant -->
      <div class="relative fade-in-up" data-animate>
        <div 
          class="relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-lg"
          @mouseenter="stopAutoPlay"
          @mouseleave="startAutoPlay"
        >
          <!-- Conteneur du carousel -->
          <div class="relative h-64 sm:h-80 lg:h-96">
            <div 
              class="flex transition-transform duration-500 ease-in-out h-full"
              :style="{ transform: `translateX(-${currentPartnerIndex * 100}%)` }"
            >
              <div 
                v-for="(partner, index) in partners"
                :key="partner.id"
                class="min-w-full flex items-center justify-center p-8 sm:p-12 lg:p-16"
              >
                <div class="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 max-w-4xl w-full">
                  <!-- Logo -->
                  <div class="flex-shrink-0">
                    <div class="bg-gray-50 p-6 sm:p-8 rounded-lg border border-gray-200">
                      <img 
                        :src="partner.logo" 
                        :alt="partner.name"
                        class="h-20 sm:h-28 lg:h-32 w-auto object-contain"
                      />
                    </div>
                  </div>
                  
                  <!-- Contenu -->
                  <div class="flex-1 text-center sm:text-left">
                    <h3 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                      {{ partner.name }}
                    </h3>
                    <p class="text-gray-600 text-base sm:text-lg leading-relaxed">
                      {{ partner.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Boutons de navigation -->
          <button 
            @click="prevPartner"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 z-10 border border-gray-200 hover:border-blue-300"
            aria-label="Précédent"
          >
            <i class="fas fa-chevron-left text-gray-600 hover:text-blue-600"></i>
          </button>
          <button 
            @click="nextPartner"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 z-10 border border-gray-200 hover:border-blue-300"
            aria-label="Suivant"
          >
            <i class="fas fa-chevron-right text-gray-600 hover:text-blue-600"></i>
          </button>

          <!-- Indicateurs -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <button
              v-for="(partner, index) in partners"
              :key="partner.id"
              @click="goToPartner(index)"
              :class="[
                'h-2 rounded-full transition-all duration-300',
                index === currentPartnerIndex 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              ]"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Partner } from '@/models'
import solvayLogo from '../assets/solvay.jpeg'
import aresLogo from '../assets/ares.jpeg'
import kongoLogo from '../assets/kongo.jpeg'

const { t } = useI18n()

const partners = ref<Partner[]>([
  {
    id: 1,
    name: 'Solvay Brussels School',
    description: 'Economics & Management (ULB)',
    logo: solvayLogo,
    type: 'academic',
    active: true,
    website: 'https://www.solvay.edu',
    email: 'contact@solvay.edu'
  },
  {
    id: 2,
    name: 'ARES',
    description: 'Académie de Recherche et d\'Enseignement Supérieur (Belgique)',
    logo: aresLogo,
    type: 'institutional',
    active: true,
    website: 'https://www.ares-ac.be',
    email: 'info@ares-ac.be'
  },
  {
    id: 3,
    name: 'Université Kongo',
    description: 'Partenariat académique',
    logo: kongoLogo,
    type: 'academic',
    active: true,
    website: 'https://www.universite-kongo.org',
    email: 'contact@universite-kongo.org'
  }
])

const currentPartnerIndex = ref(0)
let autoPlayInterval: ReturnType<typeof setInterval> | null = null

const nextPartner = () => {
  currentPartnerIndex.value = (currentPartnerIndex.value + 1) % partners.value.length
}

const prevPartner = () => {
  currentPartnerIndex.value = (currentPartnerIndex.value - 1 + partners.value.length) % partners.value.length
}

const goToPartner = (index: number) => {
  currentPartnerIndex.value = index
  stopAutoPlay()
  startAutoPlay()
}

const startAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
  autoPlayInterval = setInterval(() => {
    nextPartner()
  }, 4000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

let observer: IntersectionObserver | null = null

const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && observer) {
        entry.target.classList.add('animate-in')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document.querySelectorAll('[data-animate]').forEach(el => {
    if (observer) {
      observer.observe(el)
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    initScrollAnimations()
  }, 100)
  startAutoPlay()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  stopAutoPlay()
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

@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
  
  .fade-in-up.animate-in {
    opacity: 1;
    transform: none;
  }
}
</style>
