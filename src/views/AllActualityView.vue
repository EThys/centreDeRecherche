<template>
    <NavBarComponent/>
    <header class="relative overflow-hidden bg-gradient-to-br pt-40 pb-16 from-blue-800/90 to-indigo-600/90 py-24 w-full">
      <!-- Image de fond -->
      <div class="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-14505499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Centre de Recherche et de Formation sur le Financement des PME en Afrique centrale"
          class="w-full h-full object-cover opacity-20"
        />
        <!-- Overlay et effets -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-indigo-500/30"></div>
        <!-- Blobs animés -->
        <div class="absolute top-10 left-20 w-64 h-64 bg-cyan-400/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-slow"></div>
        <div class="absolute top-20 right-32 w-72 h-72 bg-blue-300/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-fast"></div>
      </div>

      <!-- Contenu principal -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        <!-- Titre principal avec effet de dégradé animé -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 animate-gradient-text fade-in-up">
          <span class="block">Actualités & Recherches</span>
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mt-2">
            Financement des PME en RDC
          </span>
        </h1>

        <!-- Sous-titre avec animation -->
        <p class="text-lg sm:text-xl text-blue-50 max-w-3xl mx-auto mb-10 animate-fade-in fade-in-up delay-200">
          Découvrez les dernières recherches, formations et développements en matière de 
          <strong class="text-white">financement des petites et moyennes entreprises</strong> 
          en République Démocratique du Congo.
        </p>

        <!-- Statistiques -->
        <div class="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8 fade-in-up delay-400">
          <div class="text-center">
            <div class="text-2xl sm:text-3xl font-bold text-white">{{ totalArticles }}</div>
            <div class="text-blue-200 text-sm">Articles de Recherche</div>
          </div>
          <div class="text-center">
            <div class="text-2xl sm:text-3xl font-bold text-white">{{ categories.length }}</div>
            <div class="text-blue-200 text-sm">Domaines d'Expertise</div>
          </div>
          <div class="text-center">
            <div class="text-2xl sm:text-3xl font-bold text-white">{{ currentYear }}</div>
            <div class="text-blue-200 text-sm">Dernières Publications</div>
          </div>
        </div>
      </div>

      <!-- Forme décorative en bas -->
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-white/5 transform -skew-y-3 origin-bottom-left animate-wave"></div>
    </header>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
    <!-- Header Section -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">

      <!-- Filters and Search -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8 fade-in-up delay-600">
        <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <!-- Search Bar -->
          <div class="flex-1 w-full lg:max-w-md">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search articles..."
                @input="resetPagination"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <!-- Category Filter -->
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              v-for="category in categories"
              :key="category"
              @click="toggleCategory(category); resetPagination()"
              :class="[
                'px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300',
                selectedCategories.includes(category)
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- Sort Options -->
          <select
            v-model="sortBy"
            @change="resetPagination"
            class="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white w-full lg:w-auto mt-4 lg:mt-0"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Error State -->
      <div
        v-if="error"
        class="text-center py-12 sm:py-16 bg-white rounded-2xl shadow-sm border border-gray-200 mb-8"
      >
        <i class="fas fa-exclamation-triangle text-4xl sm:text-6xl text-red-500 mb-4"></i>
        <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Erreur</h3>
        <p class="text-gray-600 mb-6 text-sm sm:text-base">{{ error }}</p>
        <button
          @click="loadArticles"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
        >
          Réessayer
        </button>
      </div>

      <!-- Loading State with Shimmer -->
      <div
        v-else-if="loading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12"
      >
        <ShimmerCard v-for="n in 6" :key="n" />
      </div>

      <!-- Articles Grid -->
      <div v-else-if="paginatedArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
        <article
          v-for="(article, index) in paginatedArticles"
          :key="article.id"
          class="group bg-white rounded-2xl border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
          @click="article.id && openArticle(article.id)"
        >
          <!-- Article Image -->
          <div class="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-100">
            <img
              :src="getImageUrl(article.image)"
              :alt="article.title"
              class="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out block"
              @error="handleImageError"
            />
            <div class="absolute top-3 sm:top-4 left-3 sm:left-4 bg-blue-500 text-white text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-lg">
              {{ formatDate(article.publishDate) }}
            </div>
            <div v-if="article.category" class="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
              {{ article.category }}
            </div>
            
          </div>
          
          <!-- Article Content -->
          <div class="p-4 sm:p-6">
            <div class="flex items-center justify-between mb-3">
              <span class="text-blue-500 text-xs sm:text-sm font-medium flex items-center">
                <i class="far fa-calendar-alt mr-2"></i>
                {{ formatDate(article.publishDate) }}
              </span>
              <span v-if="article.views" class="text-gray-400 text-xs sm:text-sm flex items-center">
                <i class="far fa-eye mr-1"></i>
                {{ article.views }}
              </span>
            </div>
            
            <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
              {{ article.title }}
            </h3>
            
            <p class="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3 leading-relaxed">
              {{ article.summary }}
            </p>
            
            <!-- Author Info -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div class="flex items-center space-x-2 sm:space-x-3">
                <img
                  :src="getAuthorAvatar(article.authorPhoto)"
                  :alt="article.author"
                  class="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                />
                <div>
                  <p class="text-xs sm:text-sm font-medium text-gray-900">{{ article.author || 'Admin' }}</p>
                  <p class="text-xs text-gray-500">Auteur</p>
                </div>
              </div>
              <div class="text-blue-600 font-semibold text-xs sm:text-sm group-hover:translate-x-2 transition-transform flex items-center">
                Read More
                <i class="fas fa-arrow-right ml-1 sm:ml-2"></i>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div v-if="!loading && filteredArticles.length > 0" class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <!-- Informations sur la pagination -->
        <div class="text-sm text-gray-600">
          Affichage de <span class="font-semibold">{{ startIndex + 1 }}</span> à 
          <span class="font-semibold">{{ endIndex }}</span> sur 
          <span class="font-semibold">{{ filteredArticles.length }}</span> articles
        </div>

        <!-- Contrôles de pagination -->
        <div class="flex items-center space-x-2">
          <!-- Bouton précédent -->
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            :class="[
              'px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm font-medium transition-all',
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            ]"
          >
            <i class="fas fa-chevron-left mr-1 sm:mr-2"></i>
            <span class="hidden sm:inline">Précédent</span>
          </button>

          <!-- Numéros de page -->
          <div class="flex items-center space-x-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-all',
                page === currentPage
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              ]"
            >
              {{ page }}
            </button>
            
            <!-- Points de suspension pour les pages cachées -->
            <span v-if="showLeftEllipsis" class="px-1 sm:px-2 text-gray-400 text-xs">...</span>
            <span v-if="showRightEllipsis" class="px-1 sm:px-2 text-gray-400 text-xs">...</span>
          </div>

          <!-- Bouton suivant -->
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            :class="[
              'px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm font-medium transition-all',
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            ]"
          >
            <span class="hidden sm:inline">Suivant</span>
            <i class="fas fa-chevron-right ml-1 sm:ml-2"></i>
          </button>
        </div>

        <!-- Sélecteur d'éléments par page -->
        <div class="flex items-center space-x-2">
          <label class="text-xs sm:text-sm text-gray-600">Par page:</label>
          <select
            v-model="articlesPerPage"
            @change="resetPagination"
            class="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-xs sm:text-sm"
          >
            <option :value="6">6</option>
            <option :value="9">9</option>
            <option :value="12">12</option>
            <option :value="18">18</option>
          </select>
        </div>
      </div>

      <!-- No Results -->
      <div
        v-else-if="!loading && filteredArticles.length === 0"
        class="text-center py-12 sm:py-16 bg-white rounded-2xl shadow-sm border border-gray-200"
      >
        <i class="fas fa-search text-4xl sm:text-6xl text-gray-300 mb-4"></i>
        <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Aucun article trouvé</h3>
        <p class="text-gray-600 mb-6 text-sm sm:text-base">Essayez d'ajuster vos critères de recherche ou de filtrage</p>
        <button
          @click="clearFilters"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
        >
          Effacer tous les filtres
        </button>
      </div>

    </div>
  </div>
  <FooterComponent/>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import actualityService from '@/services/actuality.service'
//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'
import ShimmerCard from '../components/ShimmerCard.vue'
import researchImage1 from '../assets/jean.jpeg'

const router = useRouter()

// Reactive data
const searchQuery = ref('')
const selectedCategories = ref([])
const sortBy = ref('newest')
const currentPage = ref(1)
const articlesPerPage = ref(9)
const scrollObserver = ref(null)
const loading = ref(false)
const error = ref(null)

const allArticles = ref([])


// Charger les actualités depuis le backend
const loadArticles = async () => {
  if (loading.value) {
    console.warn('⚠️ loadArticles déjà en cours, ignoré')
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    console.log('🔄 Chargement des actualités...')
    const result = await actualityService.getActualities({
      status: 'published',
      limit: 100
    })
    
    console.log('✅ Résultat reçu:', result)
    console.log('✅ result.data:', result && result.data)
    console.log('✅ Type de result.data:', typeof (result && result.data), Array.isArray(result && result.data))
    
    // Mettre à jour les articles
    if (result && result.data && Array.isArray(result.data)) {
      allArticles.value = result.data
      console.log('✅ Articles assignés:', allArticles.value.length)
    } else {
      console.warn('⚠️ Format de réponse invalide:', result)
      allArticles.value = []
    }
  } catch (err) {
    console.error('❌ Erreur lors du chargement des actualités:', err)
    console.error('❌ Détails de l\'erreur:', {
      message: err && err.message,
      status: err && err.status,
      stack: err && err.stack
    })
    error.value = (err && err.message) || 'Erreur lors du chargement des actualités'
    allArticles.value = []
  } finally {
    loading.value = false
    console.log('✅ Chargement terminé. loading:', loading.value, 'articles:', allArticles.value.length)
  }
}

// Computed properties
const categories = computed(() => {
  return [...new Set(allArticles.value.map(article => article.category).filter(Boolean))]
})

const totalArticles = computed(() => allArticles.value.length)

const currentYear = computed(() => new Date().getFullYear())

const filteredArticles = computed(() => {
  let filtered = allArticles.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article => 
      (article.title && article.title.toLowerCase().includes(query)) ||
      (article.summary && article.summary.toLowerCase().includes(query)) ||
      (article.author && article.author.toLowerCase().includes(query))
    )
  }

  // Filter by categories
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(article => 
      article.category && selectedCategories.value.includes(article.category)
    )
  }

  // Sort articles
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => {
        const dateA = new Date(a.publishDate || '').getTime()
        const dateB = new Date(b.publishDate || '').getTime()
        return dateB - dateA
      })
      break
    case 'oldest':
      filtered.sort((a, b) => {
        const dateA = new Date(a.publishDate || '').getTime()
        const dateB = new Date(b.publishDate || '').getTime()
        return dateA - dateB
      })
      break
    case 'title':
      filtered.sort((a, b) => {
        const titleA = a.title || ''
        const titleB = b.title || ''
        return titleA.localeCompare(titleB)
      })
      break
  }

  return filtered
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredArticles.value.length / articlesPerPage.value))

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * articlesPerPage.value
  const end = start + articlesPerPage.value
  return filteredArticles.value.slice(start, end)
})

const startIndex = computed(() => (currentPage.value - 1) * articlesPerPage.value)

const endIndex = computed(() => {
  const end = startIndex.value + articlesPerPage.value
  return end > filteredArticles.value.length ? filteredArticles.value.length : end
})

// Pages visibles pour la pagination
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  const delta = 2 // Nombre de pages à afficher de chaque côté de la page courante

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      pages.push(i)
    }
  }
  return pages
})

const showLeftEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[0] > 1
})

const showRightEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[visiblePages.value.length - 1] < totalPages.value
})

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const goToPage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


// Methods
const toggleCategory = (category) => {
  const index = selectedCategories.value.indexOf(category)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(category)
  }
  currentPage.value = 1
}


const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  sortBy.value = 'newest'
  currentPage.value = 1
}

const resetPagination = () => {
  currentPage.value = 1
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'N/A'
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return 'N/A'
  }
}

const getImageUrl = (image) => {
  if (!image) return 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  return actualityService.getImageUrl(image) || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
}

const getAuthorAvatar = (authorPhoto) => {
  if (authorPhoto) {
    return actualityService.getImageUrl(authorPhoto)
  }
  return researchImage1
}

const handleImageError = (event) => {
  const target = event.target
  if (target) {
    target.src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
}

const openArticle = (articleId) => {
  // Navigation vers la page de détail de l'actualité
  router.push(`/actualites/${articleId}`)
}

// Animation on scroll
const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  scrollObserver.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, observerOptions)

  // Observe all elements with fade-in-up class
  document.querySelectorAll('.fade-in-up').forEach(el => {
    if (scrollObserver.value) {
      scrollObserver.value.observe(el)
    }
  })
}

// Lifecycle
onMounted(() => {
  // Charger les actualités
  loadArticles()
  // Initialize scroll animations
  setTimeout(() => {
    initScrollAnimations()
  }, 100)
})

onUnmounted(() => {
  if (scrollObserver.value) {
    scrollObserver.value.disconnect()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-2 {
  transform: translateX(0.5rem);
}

/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Animations d'apparition */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.delay-200 {
  transition-delay: 200ms;
}

.delay-400 {
  transition-delay: 400ms;
}

.delay-600 {
  transition-delay: 600ms;
}

/* Animations pour le header */
@keyframes gradient-text {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient-text {
  background-size: 200% 200%;
  animation: gradient-text 3s ease infinite;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob-slow {
  animation: blob 7s infinite;
}

.animate-blob-fast {
  animation: blob 5s infinite;
}

@keyframes wave {
  0%, 100% {
    transform: -skew-y-3 scaleX(1);
  }
  50% {
    transform: -skew-y-3 scaleX(1.02);
  }
}

.animate-wave {
  animation: wave 8s ease-in-out infinite;
}

/* Responsive improvements */
@media (max-width: 640px) {
  .fade-in-up {
    transform: translateY(20px);
  }
  
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .line-clamp-2 {
    -webkit-line-clamp: 2;
  }
  
  .line-clamp-3 {
    -webkit-line-clamp: 3;
  }
}

/* Performance optimizations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .animate-gradient-text,
  .animate-blob-slow,
  .animate-blob-fast,
  .animate-wave {
    animation: none;
    transition: none;
  }
  
  .fade-in-up {
    opacity: 1;
    transform: none;
  }
}

/* Touch device improvements */
@media (hover: none) {
  .group:hover .group-hover\:scale-110 {
    transform: none;
  }
  
  .group:hover .group-hover\:translate-x-2 {
    transform: none;
  }
}
</style>