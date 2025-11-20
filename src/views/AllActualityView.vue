<template>
    <NavBarComponent/>
    <header class="relative overflow-hidden bg-gradient-to-br pt-40 pb-16 from-blue-800/90 to-indigo-600/90 py-24 w-full">
      <!-- Image de fond -->
      <div class="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Centre de Recherche et de Formation sur le Financement des PME"
          class="w-full h-full object-cover opacity-20"
        />
        <!-- Overlay et effets -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-indigo-500/30"></div>
        <!-- Blobs animés -->
        <div class="absolute top-10 left-20 w-64 h-64 bg-cyan-400/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-slow"></div>
        <div class="absolute top-20 right-32 w-72 h-72 bg-blue-300/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-fast"></div>
      </div>

      <!-- Contenu principal -->
      <div class="max-w-6xl mx-auto px-4 text-center relative z-10">

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
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">


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
              @click="toggleCategory(category)"
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
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
        <article
          v-for="(article, index) in filteredArticles"
          :key="article.id"
          class="group bg-white rounded-2xl border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer fade-in-up"
          :style="`animation-delay: ${index * 100}ms;`"
          @click="openArticle(article.id)"
        >
          <!-- Article Image -->
          <div class="relative h-48 sm:h-56 overflow-hidden">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute top-3 sm:top-4 left-3 sm:left-4 bg-blue-500 text-white text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-lg">
              {{ formatDate(article.date) }}
            </div>
            <div class="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
              {{ article.category }}
            </div>
            <div class="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {{ article.readTime }}
            </div>
          </div>
          
          <!-- Article Content -->
          <div class="p-4 sm:p-6">
            <div class="flex items-center justify-between mb-3">
              <span class="text-blue-500 text-xs sm:text-sm font-medium flex items-center">
                <i class="far fa-calendar-alt mr-2"></i>
                {{ formatDate(article.date) }}
              </span>
              <span class="text-gray-400 text-xs sm:text-sm flex items-center">
                <i class="far fa-eye mr-1"></i>
                {{ article.views }}
              </span>
            </div>
            
            <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
              {{ article.title }}
            </h3>
            
            <p class="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3 leading-relaxed">
              {{ article.excerpt }}
            </p>
            
            <!-- Author Info -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div class="flex items-center space-x-2 sm:space-x-3">
                <img
                  :src="article.author.avatar"
                  :alt="article.author.name"
                  class="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                />
                <div>
                  <p class="text-xs sm:text-sm font-medium text-gray-900">{{ article.author.name }}</p>
                  <p class="text-xs text-gray-500">{{ article.author.role }}</p>
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

      <!-- Load More Button -->
      <div v-if="showLoadMore" class="text-center mb-12 fade-in-up">
        <button
          @click="loadMoreArticles"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
        >
          Load More Articles
        </button>
      </div>

      <!-- No Results -->
      <div
        v-if="filteredArticles.length === 0"
        class="text-center py-12 sm:py-16 bg-white rounded-2xl shadow-sm border border-gray-200 fade-in-up"
      >
        <i class="fas fa-search text-4xl sm:text-6xl text-gray-300 mb-4"></i>
        <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
        <p class="text-gray-600 mb-6 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
        <button
          @click="clearFilters"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
        >
          Clear All Filters
        </button>
      </div>

      <!-- Newsletter Section -->
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-12 fade-in-up">
        <div class="max-w-4xl mx-auto text-center">
          <h3 class="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Stay Updated</h3>
          <p class="text-blue-100 mb-6 text-base sm:text-lg">
            Subscribe to our newsletter and never miss the latest news and insights.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none text-sm sm:text-base"
            >
            <button class="bg-white text-blue-600 font-semibold px-5 sm:px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent/>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Reactive data
const searchQuery = ref('')
const selectedCategories = ref([])
const sortBy = ref('newest')
const currentPage = ref(1)
const articlesPerPage = 9
const scrollObserver = ref(null)
//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'


// Sample articles data
const allArticles = ref([
  {
    id: 1,
    title: "How to Grow Your Business in 2025",
    excerpt: "Discover innovative strategies and data-driven approaches to scale your business in the evolving market landscape.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "2025-11-18",
    category: "Business",
    readTime: "5 min read",
    views: "1.2K",
    author: {
      name: "Sarah Johnson",
      role: "Business Strategist",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 2,
    title: "The Future of Digital Marketing",
    excerpt: "Explore how AI and emerging technologies are revolutionizing customer engagement and marketing ROI.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "2025-11-17",
    category: "Technology",
    readTime: "4 min read",
    views: "2.4K",
    author: {
      name: "Mike Chen",
      role: "Tech Evangelist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 3,
    title: "Remote Work Best Practices",
    excerpt: "Learn how to build effective remote teams and maintain productivity in distributed work environments.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "2025-11-15",
    category: "Workplace",
    readTime: "6 min read",
    views: "3.1K",
    author: {
      name: "Emma Davis",
      role: "HR Consultant",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 4,
    title: "AI in Healthcare: Revolutionizing Patient Care",
    excerpt: "How artificial intelligence is transforming diagnostics, treatment plans, and patient outcomes.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "2025-11-12",
    category: "Healthcare",
    readTime: "7 min read",
    views: "4.5K",
    author: {
      name: "Dr. James Wilson",
      role: "Medical Researcher",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 5,
    title: "Sustainable Business Models for 2025",
    excerpt: "Exploring eco-friendly and socially responsible business practices that drive long-term success.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "2025-11-10",
    category: "Sustainability",
    readTime: "5 min read",
    views: "2.8K",
    author: {
      name: "Lisa Green",
      role: "Sustainability Expert",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 6,
    title: "The Rise of Quantum Computing",
    excerpt: "Understanding the potential impact of quantum computing on cryptography and complex problem-solving.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "2025-11-08",
    category: "Technology",
    readTime: "8 min read",
    views: "5.2K",
    author: {
      name: "Dr. Alex Rodriguez",
      role: "Quantum Physicist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 7,
    title: "Financial Planning in Uncertain Times",
    excerpt: "Strategies for maintaining financial stability and growth during economic fluctuations.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "2025-11-05",
    category: "Finance",
    readTime: "6 min read",
    views: "3.7K",
    author: {
      name: "Robert Kim",
      role: "Financial Advisor",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 8,
    title: "The Future of E-commerce",
    excerpt: "Emerging trends and technologies shaping the next generation of online shopping experiences.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "2025-11-03",
    category: "Business",
    readTime: "5 min read",
    views: "4.1K",
    author: {
      name: "Maria Garcia",
      role: "E-commerce Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  },
  {
    id: 9,
    title: "Cybersecurity in the Digital Age",
    excerpt: "Essential security practices to protect your business from evolving cyber threats.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "2025-10-30",
    category: "Technology",
    readTime: "7 min read",
    views: "3.9K",
    author: {
      name: "David Park",
      role: "Security Analyst",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  }
])

// Computed properties
const categories = computed(() => {
  return [...new Set(allArticles.value.map(article => article.category))]
})

const totalArticles = computed(() => allArticles.value.length)

const currentYear = computed(() => new Date().getFullYear())

const filteredArticles = computed(() => {
  let filtered = allArticles.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.author.name.toLowerCase().includes(query)
    )
  }

  // Filter by categories
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(article => 
      selectedCategories.value.includes(article.category)
    )
  }

  // Sort articles
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
      break
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
  }

  // Pagination
  const startIndex = (currentPage.value - 1) * articlesPerPage
  return filtered.slice(0, startIndex + articlesPerPage)
})

const showLoadMore = computed(() => {
  const totalFiltered = allArticles.value.filter(article => {
    const matchesSearch = !searchQuery.value || 
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = selectedCategories.value.length === 0 || 
      selectedCategories.value.includes(article.category)
    
    return matchesSearch && matchesCategory
  }).length

  return filteredArticles.value.length < totalFiltered
})

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

const loadMoreArticles = () => {
  currentPage.value++
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  sortBy.value = 'newest'
  currentPage.value = 1
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const openArticle = (articleId) => {
  console.log(`Opening article ${articleId}`)
  // Navigation vers la page de l'article
  // router.push(`/news/${articleId}`)
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
    scrollObserver.value.observe(el)
  })
}

// Lifecycle
onMounted(() => {
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