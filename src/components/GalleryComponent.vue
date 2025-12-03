<template>
  <div class="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- En-tête avec animations -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-6 fade-in-up" data-delay="0">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900">{{ $t('gallery.title') }}</h1>
        </div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed fade-in-up" data-delay="100">
          {{ $t('gallery.description') }}
        </p>
        
        <!-- Filtres avec animations -->
        <div class="flex flex-wrap justify-center gap-3 mb-8">
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


      <!-- Loading State -->
      <div v-if="loading && photos.length === 0" class="text-center py-12">
        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
        <p class="text-gray-600">Chargement de la galerie...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error && photos.length === 0" class="text-center py-12">
        <i class="fas fa-exclamation-triangle text-4xl text-red-600 mb-4"></i>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Erreur</h3>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button
          @click="loadPhotos(true)"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Réessayer
        </button>
      </div>

      <!-- Grille de photos avec animations en cascade -->
      <div v-else-if="!loading && filteredPhotos.length > 0" class="grid grid-cols-1 lg:px-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        <div
          v-for="(photo, index) in filteredPhotos"
          :key="photo.id"
          class="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100 stagger-item"
          :class="`delay-${300 + index * 50}`"
          @click="() => openLightbox(index)"
        >
          <div class="relative overflow-hidden aspect-square">
            <img
              :src="getImageUrl(photo.image)"
              :alt="photo.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              @error="(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }"
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

      <!-- Empty State -->
      <div v-else-if="!loading && photos.length === 0 && !error" class="text-center py-12">
        <i class="fas fa-images text-4xl text-gray-300 mb-4"></i>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Aucune photo disponible</h3>
        <p class="text-gray-600 mb-4">La galerie sera bientôt mise à jour avec de nouvelles photos.</p>
        <button
          @click="loadPhotos(true)"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Actualiser
        </button>
      </div>

      <!-- Bouton Load More avec animation -->
      <div v-else-if="(filteredPhotos.length < totalFilteredPhotos || hasMore) && !loading" class="text-center fade-in-up" data-delay="500">
        <button
          @click="loadMore"
          :disabled="loadingMore"
          class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          <span v-if="loadingMore" class="flex items-center">
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
import type { GalleryPhoto, GalleryCategory } from '@/models'
import galleryService from '@/services/gallery.service'

const { t } = useI18n()

// États réactifs
const activeFilter = ref('all')
const lightboxOpen = ref(false)
const currentLightboxIndex = ref(0)
const loading = ref(false)
const loadingMore = ref(false)
const displayedCount = ref(12)
const error = ref<string | null>(null)

// Données des photos depuis le backend
const photos = ref<GalleryPhoto[]>([])
const categories = ref<GalleryCategory[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const hasMore = ref(true)

// Filtres dynamiques basés sur les catégories du backend
const filters = computed(() => {
  const baseFilters = [
    { id: 'all', name: t('gallery.allPhotos') }
  ]
  
  // Créer un Set pour éviter les doublons
  const uniqueCategoryMap = new Map<string, string>()
  
  // Ajouter les catégories du backend
  categories.value.forEach(cat => {
    const categoryName = cat.name || cat.id
    if (categoryName && !uniqueCategoryMap.has(categoryName)) {
      uniqueCategoryMap.set(categoryName, categoryName)
    }
  })
  
  // Si aucune catégorie du backend, extraire les catégories uniques des photos
  if (uniqueCategoryMap.size === 0 && photos.value.length > 0) {
    const uniqueCategories = [...new Set(photos.value.map(p => p.category).filter(Boolean))]
    uniqueCategories.forEach(cat => {
      if (cat && !uniqueCategoryMap.has(cat)) {
        uniqueCategoryMap.set(cat, cat)
      }
    })
  }
  
  // Convertir le Map en tableau de filtres
  const categoryFilters = Array.from(uniqueCategoryMap.entries()).map(([id, name]) => ({
    id,
    name
  }))
  
  return [...baseFilters, ...categoryFilters]
})

// Charger les photos depuis le backend
const loadPhotos = async (reset: boolean = false) => {
  console.log('🔄 loadPhotos appelé - reset:', reset, 'activeFilter:', activeFilter.value)
  
  if (reset) {
    currentPage.value = 1
    displayedCount.value = 12
    photos.value = []
    hasMore.value = true
  }
  
  loading.value = true
  error.value = null
  
  try {
    console.log('🔄 Appel à galleryService.getPhotos avec:', {
      category: activeFilter.value === 'all' ? undefined : activeFilter.value,
      page: currentPage.value,
      limit: 100
    })
    
    const result = await galleryService.getPhotos({
      category: activeFilter.value === 'all' ? undefined : activeFilter.value,
      page: currentPage.value,
      limit: 100, // Charger plus de photos pour le pagination côté client
      sortBy: 'date',
      sortOrder: 'desc'
    })
    
    console.log('✅ GalleryComponent - Résultat du service:', result)
    console.log('✅ GalleryComponent - Photos reçues du service:', result.data?.length || 0)
    console.log('✅ GalleryComponent - Données brutes:', result.data)
    
    if (result && result.data && Array.isArray(result.data)) {
      if (reset) {
        photos.value = result.data
      } else {
        photos.value = [...photos.value, ...result.data]
      }
      
      console.log('📊 GalleryComponent - Photos assignées:', photos.value.length)
      console.log('📊 GalleryComponent - Détails des photos:', photos.value.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        image: p.image
      })))
    } else {
      console.error('❌ GalleryComponent - Format de réponse invalide:', result)
      photos.value = []
      error.value = 'Format de réponse invalide du serveur'
    }
    
    totalPages.value = result.pagination?.totalPages || 1
    hasMore.value = currentPage.value < totalPages.value && result.data?.length > 0
    
    // Si aucune photo mais pas d'erreur, c'est peut-être un problème de format
    if (result.data?.length === 0 && !error.value) {
      console.warn('⚠️ Aucune photo reçue du service, mais pas d\'erreur')
    }
  } catch (err: any) {
    console.error('❌ Erreur lors du chargement des photos:', err)
    console.error('❌ Stack trace:', err.stack)
    error.value = err.message || 'Erreur lors du chargement de la galerie'
    photos.value = []
  } finally {
    loading.value = false
    console.log('✅ loadPhotos terminé - photos.value.length:', photos.value.length)
  }
}

// Charger les catégories depuis le backend
const loadCategories = async () => {
  try {
    const cats = await galleryService.getCategories()
    console.log('📂 Catégories reçues du backend:', cats)
    
    // Catégories par défaut suggérées (plus de types)
    const defaultCategories = [
      { id: 'evenements', name: 'Événements' },
      { id: 'equipe', name: 'Équipe' },
      { id: 'installations', name: 'Installations' },
      { id: 'collaborations', name: 'Collaborations' },
      { id: 'formations', name: 'Formations' },
      { id: 'conferences', name: 'Conférences' },
      { id: 'ateliers', name: 'Ateliers' },
      { id: 'reunions', name: 'Réunions' },
      { id: 'ceremonies', name: 'Cérémonies' },
      { id: 'activites', name: 'Activités' },
      { id: 'projets', name: 'Projets' },
      { id: 'partenariats', name: 'Partenariats' }
    ]
    
    // Combiner les catégories du backend avec les catégories par défaut
    const categoryMap = new Map<string, GalleryCategory>()
    
    // Ajouter les catégories par défaut
    defaultCategories.forEach(cat => {
      categoryMap.set(cat.name.toLowerCase(), cat)
    })
    
    // Ajouter les catégories du backend (elles écraseront les catégories par défaut si même nom)
    cats.forEach(cat => {
      const catName = cat.name || cat.id
      categoryMap.set(catName.toLowerCase(), { id: cat.id, name: catName })
    })
    
    // Extraire les catégories uniques des photos si nécessaire
    if (photos.value.length > 0) {
      const uniqueCategories = [...new Set(photos.value.map(p => p.category).filter(Boolean))]
      uniqueCategories.forEach(cat => {
        if (cat && !categoryMap.has(cat.toLowerCase())) {
          categoryMap.set(cat.toLowerCase(), { id: cat, name: cat })
        }
      })
    }
    
    categories.value = Array.from(categoryMap.values())
    console.log('📂 Catégories finales:', categories.value)
  } catch (err) {
    console.error('Erreur lors du chargement des catégories:', err)
    // Si aucune catégorie du backend et qu'on a des photos, extraire des photos
    if (photos.value.length > 0) {
      const uniqueCategories = [...new Set(photos.value.map(p => p.category).filter(Boolean))]
      console.log('📂 Catégories extraites des photos (fallback):', uniqueCategories)
      categories.value = uniqueCategories.map(cat => ({ id: cat, name: cat }))
    } else {
      // Utiliser des catégories par défaut en cas d'erreur
      categories.value = [
        { id: 'evenements', name: 'Événements' },
        { id: 'equipe', name: 'Équipe' },
        { id: 'installations', name: 'Installations' },
        { id: 'collaborations', name: 'Collaborations' },
        { id: 'formations', name: 'Formations' },
        { id: 'conferences', name: 'Conférences' },
        { id: 'ateliers', name: 'Ateliers' },
        { id: 'reunions', name: 'Réunions' },
        { id: 'ceremonies', name: 'Cérémonies' },
        { id: 'activites', name: 'Activités' },
        { id: 'projets', name: 'Projets' },
        { id: 'partenariats', name: 'Partenariats' }
      ]
    }
  }
}

// Obtenir l'URL de l'image (utilise le service)
const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) {
    return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  }
  return galleryService.getImageUrl(imagePath) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
}

// Computed
const filteredPhotos = computed(() => {
  // Si pas de photos, retourner un tableau vide
  if (!photos.value || photos.value.length === 0) {
    console.log('🔍 filteredPhotos: Aucune photo disponible')
    return []
  }
  
  let items: GalleryPhoto[] = []
  
  if (activeFilter.value === 'all') {
    // Pour "Tous", retourner toutes les photos
    items = [...photos.value]
    console.log('🔍 filteredPhotos: Filtre "all" -', items.length, 'photos')
  } else {
    // Pour les autres filtres, filtrer par catégorie
    // Le filtre peut être soit l'ID de la catégorie, soit le nom
    items = photos.value.filter(photo => {
      if (!photo.category) {
        console.log('🔍 Photo sans catégorie:', photo.id, photo.title)
        return false
      }
      
      // Comparaison directe
      if (photo.category === activeFilter.value) {
        console.log('🔍 Photo correspond (directe):', photo.id, photo.title, photo.category, '===', activeFilter.value)
        return true
      }
      
      // Comparaison insensible à la casse et aux accents
      const photoCategory = photo.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const filterCategory = activeFilter.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      
      const matches = photoCategory === filterCategory
      if (matches) {
        console.log('🔍 Photo correspond (normalisée):', photo.id, photo.title, photoCategory, '===', filterCategory)
      }
      
      return matches
    })
    console.log('🔍 filteredPhotos: Filtre "' + activeFilter.value + '" -', items.length, 'photos sur', photos.value.length)
  }
  
  // Limiter le nombre de photos affichées
  const result = items.slice(0, displayedCount.value)
  console.log('🔍 filteredPhotos: Résultat final (limité à', displayedCount.value, '):', result.length)
  return result
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
  return filteredPhotos.value.map(photo => getImageUrl(photo.image))
})

const handleLightboxSwitch = (index: number) => {
  currentLightboxIndex.value = index
}

// Méthodes
const setActiveFilter = (filterId: string) => {
  console.log('🔍 setActiveFilter appelé avec:', filterId)
  console.log('🔍 Photos actuelles:', photos.value.length)
  activeFilter.value = filterId
  displayedCount.value = 12
  
  // Pour tous les filtres, utiliser le computed filteredPhotos qui filtre côté client
  // On a déjà toutes les photos chargées au début, donc pas besoin de recharger
  console.log('🔍 Filtre changé - filteredPhotos devrait se mettre à jour automatiquement')
  console.log('🔍 filteredPhotos après changement:', filteredPhotos.value.length)
  
  // Réinitialiser les animations
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
  if (loadingMore.value || !hasMore.value) return
  
  loadingMore.value = true
  
  // Si on a chargé toutes les photos disponibles, charger la page suivante
  if (displayedCount.value >= photos.value.length && hasMore.value) {
    currentPage.value++
    await loadPhotos(false)
  }
  
  // Afficher plus de photos
  displayedCount.value += 8
  
  loadingMore.value = false
  
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
onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  
  // Charger toutes les photos au début (sans filtre) pour avoir toutes les données
  // Ensuite, le computed filteredPhotos filtrera côté client
  console.log('🔄 onMounted - Début du chargement')
  activeFilter.value = 'all' // S'assurer que le filtre est "all" au début
  
  try {
    await loadPhotos(true) // Charger toutes les photos sans filtre
    console.log('✅ onMounted - Photos chargées:', photos.value.length)
    console.log('✅ onMounted - Détails photos:', photos.value.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      image: p.image
    })))
    
    // Charger les catégories après avoir chargé les photos
    await loadCategories()
    console.log('✅ onMounted - Catégories chargées:', categories.value.length)
    console.log('✅ onMounted - Catégories détails:', categories.value)
    
    // Si le filtre actif n'est pas "all" et qu'il n'existe pas dans les catégories, le réinitialiser
    if (activeFilter.value !== 'all' && !filters.value.find(f => f.id === activeFilter.value)) {
      console.warn('⚠️ Filtre actif non trouvé dans les catégories, réinitialisation à "all"')
      activeFilter.value = 'all'
    }
    
    console.log('✅ onMounted - filteredPhotos:', filteredPhotos.value.length)
    console.log('✅ onMounted - filteredPhotos détails:', filteredPhotos.value.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category
    })))
  } catch (err) {
    console.error('❌ onMounted - Erreur:', err)
  }
  
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