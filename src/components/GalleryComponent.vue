<template>
  <div class="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <div class="flex items-center justify-center mb-6">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900">Galerie Photo</h1>
        </div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          Captures d'exception de nos événements, installations et moments mémorables
        </p>
        
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="filter in filters"
            :key="filter.id"
            @click="setActiveFilter(filter.id)"
            :class="[
              'px-6 py-3 rounded-xl font-medium cursor-pointer transition-all duration-300 transform hover:scale-105 border-2',
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border-blue-500'
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
            ]"
          >
            {{ filter.name }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        <div
          v-for="(photo, index) in filteredPhotos"
          :key="photo.id"
          class="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
          @click="openLightbox(index)"
        >
          <div class="relative overflow-hidden aspect-square">
            <img
              :src="photo.image"
              :alt="photo.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            

            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <h3 class="text-lg font-bold mb-2">{{ photo.title }}</h3>
                <p class="text-sm text-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  {{ photo.description }}
                </p>
              </div>
            </div>

            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-500">
              <div class="bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                <i class="fas fa-expand-arrows-alt text-blue-700 text-sm"></i>
              </div>
            </div>

            <!-- Badge de catégorie -->
            <div class="absolute top-4 left-4">
              <span class="bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold px-3 py-2 rounded-full shadow-lg">
                {{ photo.category }}
              </span>
            </div>
          </div>

          

          <!-- Effet de bordure subtile -->
          <div class="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-300 transition-all duration-500 pointer-events-none"></div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal Élégant -->
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
      @click="closeLightbox"
    >
      <div class="relative max-w-6xl max-h-full" @click.stop>
        <!-- Bouton fermer -->
        <button
          @click="closeLightbox"
          class="absolute -top-16 right-0 text-white hover:text-blue-300 text-2xl z-10 transition-colors duration-300 bg-white/10 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center"
        >
          <i class="fas fa-times"></i>
        </button>

        <!-- Navigation -->
        <button
          @click="prevImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <button
          @click="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <i class="fas fa-chevron-right"></i>
        </button>

        <!-- Container image lightbox -->
        <div class="relative bg-white rounded-sm overflow-hidden shadow-3xl">
          <img
            :src="currentLightboxImage.image"
            :alt="currentLightboxImage.title"
            class="max-w-full max-h-[70vh] object-contain"
          />
          
          <!-- Infos lightbox -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <div class="flex flex-wrap items-center gap-4 mb-4">
              <span class="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                {{ currentLightboxImage.category }}
              </span>
              <span class="flex items-center text-blue-100">
                <i class="far fa-calendar mr-2"></i>
                {{ currentLightboxImage.date }}
              </span>
              <span class="flex items-center text-blue-100">
                <i class="fas fa-user mr-2"></i>
                {{ currentLightboxImage.author }}
              </span>
            </div>
            
            <h3 class="text-3xl font-bold mb-4">{{ currentLightboxImage.title }}</h3>
            <p class="text-lg text-blue-100 leading-relaxed mb-6">{{ currentLightboxImage.description }}</p>

          </div>
        </div>

        <!-- Compteur -->
        <div class="absolute -bottom-16 left-0 text-white text-center w-full">
          <p class="text-lg bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
            {{ currentLightboxIndex + 1 }} / {{ photos.length }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// États réactifs
const activeFilter = ref('all')
const lightboxOpen = ref(false)
const currentLightboxIndex = ref(0)
const loading = ref(false)
const displayedCount = ref(12)

// Filtres
const filters = ref([
  { id: 'all', name: 'Toutes les photos' },
  { id: 'evenements', name: 'Événements' },
  { id: 'equipe', name: 'Notre équipe' },
  { id: 'installations', name: 'Installations' },
  { id: 'collaborations', name: 'Collaborations' }
])

// Données des photos
const photos = ref([
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

const currentLightboxImage = computed(() => {
  return photos.value[currentLightboxIndex.value]
})

// Méthodes
const setActiveFilter = (filterId) => {
  activeFilter.value = filterId
  displayedCount.value = 12
}

const openLightbox = (index) => {
  currentLightboxIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const nextImage = () => {
  currentLightboxIndex.value = (currentLightboxIndex.value + 1) % photos.value.length
}

const prevImage = () => {
  currentLightboxIndex.value = currentLightboxIndex.value === 0 
    ? photos.value.length - 1 
    : currentLightboxIndex.value - 1
}

const loadMore = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  displayedCount.value += 8
  loading.value = false
}

// Gestion des touches clavier
const handleKeydown = (event) => {
  if (!lightboxOpen.value) return
  
  switch(event.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowRight':
      nextImage()
      break
    case 'ArrowLeft':
      prevImage()
      break
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Animations fluides */
.gallery-item {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effets de glassmorphisme */
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

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .gallery-item,
  .group-hover\:scale-110,
  .hover\:scale-105 {
    animation: none;
    transition: none;
    transform: none;
  }
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