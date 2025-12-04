<template>
  <NavBarComponent />
  
  <!-- Loading State -->
  <DetailLoader 
    v-if="loading" 
    title="Chargement de l'actualité"
  />
  
  <!-- Hero Section - Image pleine largeur avec contenu superposé -->
  <div v-if="article && !loading" class="relative w-full h-screen max-h-[90vh] overflow-hidden detail-fade-in">
    <!-- Image de fond -->
    <div class="absolute inset-0">
      <img
        :src="getArticleImage(article.image)"
        :alt="article.title"
        class="w-full h-full object-cover"
        @error="(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80' }"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
    </div>

    <!-- Contenu superposé -->
    <div class="absolute inset-0 flex flex-col justify-end z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 text-white">
        <!-- Badges et métadonnées -->
        <div class="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
          <span class="bg-blue-500/90 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg">
            {{ formatDate(article.publishDate) }}
          </span>
          <span class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30">
            {{ article.category }}
          </span>
          <span class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30 flex items-center">
            <i class="far fa-clock mr-2"></i>
            {{ article.readTime || 5 }} min de lecture
          </span>
          <span v-if="article.views" class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30 flex items-center">
            <i class="far fa-eye mr-2"></i>
            {{ article.views }} vues
          </span>
        </div>

        <!-- Titre -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
          {{ article.title }}
        </h1>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-3 sm:gap-4">
            <router-link 
            to="/actualites" 
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg sm:rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg group"
          >
            <i class="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            <span class="text-sm sm:text-base">Retour</span>
          </router-link>
          <button 
            @click="toggleBookmark"
            :class="[
              'flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 backdrop-blur-sm shadow-lg',
              isBookmarked 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
            ]"
          >
            <i :class="isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'"></i>
            <span class="text-sm sm:text-base">{{ isBookmarked ? 'Sauvegardé' : 'Sauvegarder' }}</span>
          </button>
          <button 
            @click="shareArticle"
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg sm:rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg"
          >
            <i class="fas fa-share-alt"></i>
            <span class="text-sm sm:text-base">Partager</span>
          </button>
          <button 
            @click="shareOnFacebook"
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            <i class="fab fa-facebook-f"></i>
            <span class="text-sm sm:text-base hidden sm:inline">Facebook</span>
          </button>
          <button 
            @click="shareOnTwitter"
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-400 text-white rounded-lg sm:rounded-xl font-medium hover:bg-blue-500 transition-all duration-300 shadow-lg"
          >
            <i class="fab fa-twitter"></i>
            <span class="text-sm sm:text-base hidden sm:inline">Twitter</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
      <i class="fas fa-chevron-down text-white/80 text-2xl"></i>
    </div>
  </div>

  <!-- Contenu principal -->
  <main v-if="article && !loading && !error" class="min-h-screen bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 detail-fade-in-delay">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="space-y-6 sticky top-24">
            <!-- Catégorie -->
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-200 fade-in-right" data-animate>
              <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <i class="fas fa-tag mr-2 text-blue-500"></i>
                Catégorie
              </h3>
              <span class="inline-block bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                {{ article.category }}
              </span>
            </div>

            <!-- Partage -->
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-200 fade-in-right" data-animate>
              <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <i class="fas fa-share-alt mr-2 text-blue-500"></i>
                Partager
              </h3>
              <div class="space-y-2">
                <button 
                  @click="shareOnFacebook"
                  class="w-full py-2 px-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <i class="fab fa-facebook-f mr-2"></i>
                  Facebook
                </button>
                <button 
                  @click="shareOnTwitter"
                  class="w-full py-2 px-3 bg-blue-400 text-white rounded-lg text-sm hover:bg-blue-500 transition-colors flex items-center justify-center"
                >
                  <i class="fab fa-twitter mr-2"></i>
                  Twitter
                </button>
              </div>
            </div>

            <!-- Articles similaires -->
            <div v-if="relatedArticles.length > 0" class="bg-gray-50 rounded-xl p-6 border border-gray-200 fade-in-right" data-animate>
              <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <i class="fas fa-newspaper mr-2 text-blue-500"></i>
                Articles similaires
              </h3>
              <div class="space-y-3">
                <article
                  v-for="related in relatedArticles"
                  :key="related.id"
                  @click="related.id && openArticle(related.id)"
                  class="cursor-pointer group"
                >
                  <div class="flex items-start space-x-3">
                    <img
                      :src="getArticleImage(related.image)"
                      :alt="related.title"
                      class="w-16 h-16 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                      @error="(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }"
                    />
                    <div class="flex-1 min-w-0">
                      <h4 class="text-xs font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {{ related.title }}
                      </h4>
                      <p class="text-xs text-gray-500 mt-1">{{ formatDate(related.publishDate) }}</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenu principal -->
        <div class="lg:col-span-3">
          <div class="prose prose-lg max-w-none">
            <!-- Résumé -->
            <section class="mb-10 pb-10 border-b border-gray-200 fade-in-up" data-animate>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-file-alt mr-3 text-blue-500"></i>
                Résumé
              </h2>
              <p class="text-gray-700 leading-relaxed text-base sm:text-lg">
                {{ article.summary }}
              </p>
            </section>

            <!-- Contenu détaillé -->
            <section class="mb-10 pb-10 border-b border-gray-200 fade-in-up" data-animate>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-align-left mr-3 text-blue-500"></i>
                Contenu détaillé
              </h2>
              <div class="text-gray-700 leading-relaxed text-base">
                <div class="mb-4 prose max-w-none" v-html="formatContent(article.content)"></div>

                <!-- Ce que vous apprendrez -->
                <div v-if="article.learningPoints && article.learningPoints.length > 0" class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mt-6 border-l-4 border-blue-500 fade-in-up" data-animate>
                  <h3 class="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                    <i class="fas fa-graduation-cap mr-2 text-blue-600"></i>
                    Ce que vous apprendrez :
                  </h3>
                  <ul class="list-disc list-inside space-y-2">
                    <li 
                      v-for="(point, index) in article.learningPoints" 
                      :key="index"
                      class="fade-in-up stagger-item text-gray-700" 
                      :style="{ animationDelay: `${(index + 1) * 100}ms` }" 
                      data-animate
                    >
                      {{ point }}
                    </li>
                  </ul>
                </div>

                <!-- Points clés à retenir -->
                <div v-if="article.keyPoints && article.keyPoints.length > 0" class="mt-6 fade-in-up" data-animate>
                  <h3 class="text-xl font-semibold mb-3 text-gray-900">Points clés à retenir :</h3>
                  <ul class="list-disc list-inside space-y-2 mb-6">
                    <li 
                      v-for="(point, index) in article.keyPoints" 
                      :key="index"
                      class="fade-in-up stagger-item text-gray-700" 
                      :style="{ animationDelay: `${(index + 1) * 100}ms` }" 
                      data-animate
                    >
                      {{ point }}
                    </li>
                  </ul>
                </div>

                <div class="bg-blue-50 rounded-xl p-6 mt-6 border-l-4 border-blue-500 fade-in-up" data-animate>
                  <h4 class="font-semibold text-blue-900 mb-2 flex items-center">
                    <i class="fas fa-lightbulb mr-2"></i>
                    Conseil pratique
                  </h4>
                  <p class="text-blue-800 text-sm">
                    N'hésitez pas à consulter nos experts pour obtenir des conseils personnalisés 
                    sur le financement de votre PME. Le CReFF-PME propose des services d'accompagnement 
                    adaptés à vos besoins spécifiques.
                  </p>
                </div>
              </div>
            </section>

            <!-- Tags -->
            <section class="fade-in-up" data-animate>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-tags mr-3 text-blue-500"></i>
                Mots-clés
              </h2>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in (article.tags && article.tags.length > 0 ? article.tags : [])"
                  :key="tag"
                  class="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  #{{ tag }}
                </span>
                <span v-if="!article.tags || article.tags.length === 0" class="text-gray-500 text-sm italic">
                  Aucun mot-clé défini
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>

      <!-- Articles similaires (section complète) -->
      <section v-if="relatedArticles.length > 0" class="mt-12 fade-in-up" data-animate>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <i class="fas fa-newspaper mr-3 text-blue-500"></i>
          Articles similaires
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="(related, index) in relatedArticles"
            :key="related.id"
            @click="related.id && openArticle(related.id)"
            class="bg-white rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group fade-in-up stagger-item"
            :style="{ animationDelay: `${index * 100}ms` }"
            data-animate
          >
              <div class="h-40 relative overflow-hidden">
              <img
                :src="getArticleImage(related.image)"
                :alt="related.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                @error="(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }"
              />
              <div class="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                {{ formatDate(related.publishDate) }}
              </div>
            </div>
            <div class="p-4">
              <span class="text-xs text-blue-600 font-medium mb-2 block">{{ related.category }}</span>
              <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors leading-tight">
                {{ related.title }}
              </h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                {{ related.summary }}
              </p>
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span>{{ related.readTime || 5 }} min</span>
                <span class="text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Lire la suite
                  <i class="fas fa-arrow-right ml-1"></i>
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>

  </main>

  <!-- Error State -->
  <div v-if="error && !loading && !article" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="bg-white rounded-2xl shadow-lg border border-red-200 p-8 text-center">
      <i class="fas fa-exclamation-triangle text-4xl text-red-600 mb-4"></i>
      <h3 class="text-xl font-bold text-gray-900 mb-2">Erreur</h3>
      <p class="text-gray-600 mb-6">{{ error }}</p>
      <button
        @click="loadArticle"
        class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        Réessayer
      </button>
      <router-link
        to="/actualites"
        class="ml-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors inline-block"
      >
        Retour aux actualités
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Actuality } from '@/models'
import actualityService from '@/services/actuality.service'

//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import DetailLoader from '../components/DetailLoader.vue'

const route = useRoute()
const router = useRouter()
const articleId = route.params.id as string

const article = ref<Actuality | null>(null)
const relatedArticles = ref<Actuality[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const isBookmarked = ref(false)
let observer: IntersectionObserver | null = null

// Charger l'actualité depuis le backend
const loadArticle = async () => {
  loading.value = true
  error.value = null
  try {
    const loadedArticle = await actualityService.getActualityById(articleId)
    article.value = loadedArticle
    
    // Incrémenter les vues
    if (loadedArticle.id) {
      await actualityService.incrementViews(loadedArticle.id)
    }
    
    // Charger les articles similaires
    await loadRelatedArticles(loadedArticle)
  } catch (err: any) {
    console.error('Erreur lors du chargement de l\'actualité:', err)
    error.value = err.message || 'Erreur lors du chargement de l\'article'
  } finally {
    loading.value = false
  }
}

// Charger les articles similaires
const loadRelatedArticles = async (currentArticle: Actuality) => {
  try {
    const result = await actualityService.getActualities({
      category: currentArticle.category,
      status: 'published',
      limit: 4
    })
    
    // Filtrer pour exclure l'article actuel et limiter à 3
    relatedArticles.value = result.data
      .filter(a => a.id !== currentArticle.id)
      .slice(0, 3)
  } catch (err) {
    console.error('Erreur lors du chargement des articles similaires:', err)
    relatedArticles.value = []
  }
}

// Obtenir l'URL de l'image de l'article
const getArticleImage = (image?: string | null): string => {
  if (!image) {
    return 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
  }
  return actualityService.getImageUrl(image) || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
}

// Obtenir l'avatar de l'auteur
const getAuthorAvatar = (authorPhoto?: string | null): string => {
  if (!authorPhoto) {
    return 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  }
  return actualityService.getImageUrl(authorPhoto) || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return dateString
  }
}

const formatContent = (content: string | undefined) => {
  if (!content) return ''
  // Convertir les retours à la ligne en paragraphes HTML
  return content
    .split('\n')
    .filter(line => line.trim())
    .map(line => `<p>${line.trim()}</p>`)
    .join('')
}

const toggleBookmark = () => {
  if (!article.value) return
  isBookmarked.value = !isBookmarked.value
  const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]')
  if (isBookmarked.value) {
    if (!bookmarks.includes(articleId)) {
      bookmarks.push(articleId)
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks))
    }
  } else {
    const index = bookmarks.indexOf(articleId)
    if (index > -1) {
      bookmarks.splice(index, 1)
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks))
    }
  }
}

const shareArticle = () => {
  if (!article.value) return
  if (navigator.share) {
    navigator.share({
      title: article.value.title,
      text: article.value.summary,
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Lien copié dans le presse-papiers!')
  }
}

const shareOnFacebook = () => {
  if (!article.value) return
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(article.value.title)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank')
}

const shareOnTwitter = () => {
  if (!article.value) return
  const text = encodeURIComponent(`"${article.value.title}" - ${article.value.summary}`)
  const url = encodeURIComponent(window.location.href)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
}

const openArticle = (articleId: number | string) => {
  router.push(`/actualites/${articleId}`)
}

const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        if (observer) {
          observer.unobserve(entry.target)
        }
      }
    })
  }, observerOptions)

  // Observer tous les éléments avec data-animate
  document.querySelectorAll('[data-animate]').forEach(el => {
    if (observer) {
      observer.observe(el)
    }
  })
}

onMounted(() => {
  // Charger l'article depuis le backend
  loadArticle()
  
  // Vérifier le statut de bookmark
  const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]')
  isBookmarked.value = bookmarks.includes(articleId)
  
  // Initialiser les animations au scroll
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sticky {
  position: sticky;
}

.prose {
  line-height: 1.75;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translate(-50%, 0);
  }
  40% {
    transform: translate(-50%, -10px);
  }
  60% {
    transform: translate(-50%, -5px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Animations d'apparition */
.fade-in-up {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.fade-in-right {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-right.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.stagger-item {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.stagger-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Effet d'apparition après le loader */
.detail-fade-in {
  opacity: 1;
  animation: detailFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.detail-fade-in-delay {
  opacity: 1;
  animation: detailFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
}

@keyframes detailFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .fade-in-right,
  .stagger-item,
  .detail-fade-in,
  .detail-fade-in-delay {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
</style>
