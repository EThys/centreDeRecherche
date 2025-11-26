<template>
  <div class="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- En-tête avec animations -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center mb-6 fade-in-up" data-delay="0">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900">{{ $t('gallery.title') }}</h1>
        </div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed fade-in-up" data-delay="100">
          {{ $t('gallery.description') }}
        </p>
        
        <!-- Filtres avec animations -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="(filter, index) in filters"
            :key="filter.id"
            @click="setActiveFilter(filter.id)"
            :class="[
              'px-6 py-3 rounded-xl font-medium cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 fade-in-up',
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border-blue-500'
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
            ]"
            :data-delay="200 + index * 50"
          >
            {{ filter.name }}
          </button>
        </div>
      </div>

      <!-- Grille de photos avec animations en cascade -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        <div
          v-for="(photo, index) in filteredPhotos"
          :key="photo.id"
          class="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100 stagger-item"
          :class="`delay-${300 + index * 50}`"
          @click="() => openLightbox(index)"
        >
          <div class="relative overflow-hidden aspect-square">
            <img
              :src="photo.image"
              :alt="photo.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            <!-- Overlay au survol -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <h3 class="text-lg font-bold mb-2 slide-in-up" data-delay="50">{{ photo.title }}</h3>
                <p class="text-sm text-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  {{ photo.description }}
                </p>
              </div>
            </div>

            <!-- Bouton expand -->
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-500">
              <div class="bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                <i class="fas fa-expand-arrows-alt text-blue-700 text-sm"></i>
              </div>
            </div>

            <!-- Badge de catégorie -->
            <div class="absolute top-4 left-4 scale-in" data-delay="100">
              <span class="bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold px-3 py-2 rounded-full shadow-lg">
                {{ photo.category }}
              </span>
            </div>
          </div>

          <!-- Effet de bordure subtile -->
          <div class="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-300 transition-all duration-500 pointer-events-none"></div>

          <!-- Points décoratifs animés -->
          <div class="absolute top-3 left-3 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
          <div class="absolute bottom-3 right-3 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"></div>
        </div>
      </div>

      <!-- Bouton Load More avec animation -->
      <div v-if="filteredPhotos.length < totalFilteredPhotos" class="text-center fade-in-up" data-delay="500">
        <button
          @click="loadMore"
          :disabled="loading"
          class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          <span v-if="loading" class="flex items-center">
            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
            Chargement...
          </span>
          <span v-else class="flex items-center">
            <i class="fas fa-plus mr-2"></i>
            Voir plus de photos
          </span>
        </button>
      </div>
    </div>

    <!-- Lightbox avec vue-easy-lightbox -->
    <vue-easy-lightbox
      :visible="lightboxOpen"
      :imgs="lightboxImages"
      :index="currentLightboxIndex"
      @hide="closeLightbox"
      @switch="handleLightboxSwitch"
      :scrollDisabled="true"
    ></vue-easy-lightbox>

    <!-- Éléments décoratifs animés en arrière-plan -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-float-slow"></div>
      <div class="absolute bottom-20 right-10 w-24 h-24 bg-blue-300/20 rounded-full blur-xl animate-float-medium"></div>
      <div class="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-100/40 rounded-full blur-lg animate-float-fast"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import VueEasyLightbox from 'vue-easy-lightbox'
import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css'
import type { GalleryPhoto } from '@/models'

const { t } = useI18n()

// États réactifs
const activeFilter = ref('all')
const lightboxOpen = ref(false)
const currentLightboxIndex = ref(0)
const loading = ref(false)
const displayedCount = ref(12)

// Filtres
const filters = computed(() => [
  { id: 'all', name: t('gallery.allPhotos') },
  { id: 'evenements', name: t('gallery.events') },
  { id: 'equipe', name: t('gallery.team') },
  { id: 'installations', name: t('gallery.installations') },
  { id: 'collaborations', name: t('gallery.collaborations') }
])

// Données des photos
const photos = ref<GalleryPhoto[]>([
  {
    id: 1,
    title: "Conférence Internationale 2024",
    description: "Moments forts de notre conférence annuelle réunissant experts et partenaires",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "evenements",
    date: "15 Nov 2024",
    author: "Photographie CReFF"
  },
  {
    id: 2,
    title: "Équipe de Recherche",
    description: "Notre équipe dévouée travaillant sur des projets innovants",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "equipe",
    date: "10 Nov 2024",
    author: "Studio Pro"
  },
  {
    id: 3,
    title: "Laboratoires Modernes",
    description: "Nos installations de recherche dernière génération",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "installations",
    date: "08 Nov 2024",
    author: "Architecture Vision"
  },
  {
    id: 4,
    title: "Signature de Partenariat",
    description: "Cérémonie officielle de collaboration stratégique",
    image: "https://images.unsplash.com/photo-1515168833906-d2d02d9820b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "collaborations",
    date: "05 Nov 2024",
    author: "CReFF Presse"
  },
  {
    id: 5,
    title: "Atelier Innovation",
    description: "Session créative de développement de solutions",
    image: "https://images.unsplash.com/photo-1551836026-d5c8c1a6cb64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "evenements",
    date: "02 Nov 2024",
    author: "Creative Studio"
  },
  {
    id: 6,
    title: "Rencontre Internationale",
    description: "Échanges fructueux avec nos partenaires mondiaux",
    image: "https://images.unsplash.com/photo-1552664688-cf412ec27db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "collaborations",
    date: "28 Oct 2024",
    author: "Global Vision"
  },
  {
    id: 7,
    title: "Centre de Recherche",
    description: "Vue aérienne de notre campus de recherche",
    image: "https://images.unsplash.com/photo-1586220742613-b731f66f7743?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "installations",
    date: "25 Oct 2024",
    author: "Aerial Pro"
  },
  {
    id: 8,
    title: "Équipe en Action",
    description: "Collaboration et innovation au quotidien",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "equipe",
    date: "20 Oct 2024",
    author: "Action Photo"
  },
  {
    id: 9,
    title: "Séminaire Expert",
    description: "Présentation de recherches avancées",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "evenements",
    date: "18 Oct 2024",
    author: "Event Capture"
  },
  {
    id: 10,
    title: "Innovation Technologique",
    description: "Démonstration de nos dernières avancées",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "installations",
    date: "15 Oct 2024",
    author: "Tech Vision"
  },
  {
    id: 11,
    title: "Réseautage Professionnel",
    description: "Échanges lors de notre événement annuel",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "evenements",
    date: "12 Oct 2024",
    author: "Network Pro"
  },
  {
    id: 12,
    title: "Visite Officielle",
    description: "Accueil de délégation internationale",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "collaborations",
    date: "10 Oct 2024",
    author: "Diplomatic Photo"
  }
])

// Computed
const filteredPhotos = computed(() => {
  const items = activeFilter.value === 'all' 
    ? photos.value 
    : photos.value.filter(photo => photo.category === activeFilter.value)
  
  return items.slice(0, displayedCount.value)
})

const totalFilteredPhotos = computed(() => {
  return activeFilter.value === 'all' 
    ? photos.value.length 
    : photos.value.filter(photo => photo.category === activeFilter.value).length
})

const currentLightboxImage = computed(() => {
  return photos.value[currentLightboxIndex.value]
})

const lightboxImages = computed(() => {
  return filteredPhotos.value.map(photo => photo.image)
})

const handleLightboxSwitch = (index: number) => {
  currentLightboxIndex.value = index
}

// Méthodes
const setActiveFilter = (filterId: string) => {
  activeFilter.value = filterId
  displayedCount.value = 12
  // Réinitialiser les animations pour les nouveaux éléments
  setTimeout(() => {
    initScrollAnimations()
  }, 100)
}

const openLightbox = (index: number) => {
  currentLightboxIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const loadMore = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  displayedCount.value += 8
  loading.value = false
  // Réinitialiser les animations pour les nouveaux éléments
  setTimeout(() => {
    initScrollAnimations()
  }, 100)
}

// Système d'animation
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

  // Observer tous les éléments avec des classes d'animation
  document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up, .scale-in, .stagger-item').forEach(el => {
    if (observer) {
      observer.observe(el)
    }
  })
}

// Gestion des touches clavier
const handleKeydown = (event: KeyboardEvent) => {
  if (!lightboxOpen.value) return
  
  switch(event.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowRight':
      if (currentLightboxIndex.value < lightboxImages.value.length - 1) {
        currentLightboxIndex.value++
      }
      break
    case 'ArrowLeft':
      if (currentLightboxIndex.value > 0) {
        currentLightboxIndex.value--
      }
      break
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  setTimeout(() => {
    initScrollAnimations()
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
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
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.slide-in-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-in-left.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.slide-in-right {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-in-right.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.slide-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
[data-delay="200"] { transition-delay: 200ms; }
[data-delay="300"] { transition-delay: 300ms; }
[data-delay="400"] { transition-delay: 400ms; }
[data-delay="500"] { transition-delay: 500ms; }
[data-delay="550"] { transition-delay: 550ms; }
[data-delay="600"] { transition-delay: 600ms; }
[data-delay="650"] { transition-delay: 650ms; }
[data-delay="700"] { transition-delay: 700ms; }
[data-delay="800"] { transition-delay: 800ms; }

.delay-300 { transition-delay: 300ms; }
.delay-350 { transition-delay: 350ms; }
.delay-400 { transition-delay: 400ms; }
.delay-450 { transition-delay: 450ms; }
.delay-500 { transition-delay: 500ms; }
.delay-550 { transition-delay: 550ms; }
.delay-600 { transition-delay: 600ms; }
.delay-650 { transition-delay: 650ms; }

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

/* Animation de spin pour le loading */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Animation d'entrée du lightbox */
.lightbox-fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.lightbox-fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .slide-in-left,
  .slide-in-right,
  .slide-in-up,
  .scale-in,
  .stagger-item,
  .animate-float-slow,
  .animate-float-medium,
  .animate-float-fast,
  .animate-spin,
  .lightbox-enter,
  .group-hover\:scale-110,
  .hover\:scale-105 {
    animation: none;
    transition: none;
    transform: none;
  }
  
  .fade-in-up.animate-in,
  .slide-in-left.animate-in,
  .slide-in-right.animate-in,
  .slide-in-up.animate-in,
  .scale-in.animate-in,
  .stagger-item.animate-in {
    opacity: 1;
    transform: none;
  }
}

/* Optimisations pour mobile */
@media (max-width: 768px) {
  .fade-in-up,
  .slide-in-left,
  .slide-in-right,
  .stagger-item {
    transform: translateY(20px);
    transition-duration: 0.6s;
  }
  
  .slide-in-left { transform: translateX(-20px); }
  .slide-in-right { transform: translateX(20px); }
}

/* Amélioration des performances */
.transform {
  will-change: transform;
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

/* Ombres élégantes */
.shadow-3xl {
  box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Amélioration des transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>