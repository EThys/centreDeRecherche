<template>
  <NavBarComponent />
  
  <!-- Hero Section - Image pleine largeur avec contenu superposé -->
  <div v-if="publication" class="relative w-full h-screen max-h-[90vh] overflow-hidden">
    <!-- Image de fond -->
    <div class="absolute inset-0">
      <img
        :src="publication.image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'"
        :alt="publication.title"
        class="w-full h-full object-cover"
        @error="(e: any) => e.target.src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
    </div>
    <div class="absolute inset-0 flex flex-col justify-end z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 text-white">
        <!-- Titre -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl line-clamp-3">
          {{ publication.title }}
        </h1>

        <div class="flex flex-wrap items-center gap-3 sm:gap-4">
          <router-link 
            to="/publications" 
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg sm:rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg group"
          >
            <i class="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            <span class="text-sm sm:text-base">Retour</span>
          </router-link>
          <button 
            @click="sharePublication"
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg sm:rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg"
          >
            <i class="fas fa-share-alt"></i>
            <span class="text-sm sm:text-base">Partager</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Contenu principal -->
  <main class="min-h-screen bg-white">
    <div v-if="publication" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <!-- Section: Informations générales -->
      <section class="mb-12 pb-12 border-b border-gray-200 fade-in-up" data-animate>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <i class="fas fa-info-circle mr-3 text-blue-500"></i>
          Informations générales
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Auteurs -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Auteurs</h3>
              <div class="flex flex-wrap gap-3">
                <span 
                  v-for="author in publication.authors" 
                  :key="author.id"
                  class="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {{ author.name }}
                </span>
              </div>
            <p v-if="(publication as any).coAuthors" class="mt-3 text-sm text-gray-600">
              <strong>Co-auteurs:</strong> {{ (publication as any).coAuthors }}
            </p>
            </div>

          <!-- Informations de l'auteur principal -->
          <div v-if="(publication as any).name || (publication as any).email">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Auteur principal</h3>
            <div class="space-y-2">
              <p v-if="(publication as any).name" class="text-gray-700">
                <i class="fas fa-user mr-2 text-blue-500"></i>
                <strong>Nom:</strong> {{ (publication as any).name }}
              </p>
              <p v-if="(publication as any).email" class="text-gray-700">
                <i class="fas fa-envelope mr-2 text-blue-500"></i>
                <strong>Email:</strong> {{ (publication as any).email }}
              </p>
              <p v-if="(publication as any).phone" class="text-gray-700">
                <i class="fas fa-phone mr-2 text-blue-500"></i>
                <strong>Téléphone:</strong> {{ (publication as any).phone }}
              </p>
              <p v-if="(publication as any).institution" class="text-gray-700">
                <i class="fas fa-university mr-2 text-blue-500"></i>
                <strong>Institution:</strong> {{ (publication as any).institution }}
              </p>
              <p v-if="(publication as any).position" class="text-gray-700">
                <i class="fas fa-briefcase mr-2 text-blue-500"></i>
                <strong>Poste:</strong> {{ (publication as any).position }}
              </p>
            </div>
          </div>
        </div>

        <!-- Abstract -->
        <div class="mt-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">Résumé</h3>
          <p class="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
            {{ publication.abstract }}
          </p>
        </div>

        <!-- Domaines et mots-clés -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-if="publication.domains && publication.domains.length > 0">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Domaines de recherche</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="domain in publication.domains"
                :key="domain"
                class="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm"
              >
                {{ domain }}
              </span>
            </div>
          </div>
          <div v-if="(publication as any).keywords">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Mots-clés</h3>
            <p class="text-gray-700">{{ (publication as any).keywords }}</p>
          </div>
        </div>

        <!-- Message complémentaire -->
        <div v-if="(publication as any).message" class="mt-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">Message complémentaire</h3>
          <p class="text-gray-700 whitespace-pre-wrap">{{ (publication as any).message }}</p>
        </div>
      </section>

      <!-- Section: Fichiers -->
      <section class="mb-12 pb-12 border-b border-gray-200 fade-in-up" data-animate>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <i class="fas fa-download mr-3 text-green-500"></i>
          Fichiers du document
        </h2>
        <div class="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
          <!-- Fichier PDF/Word -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Document (PDF/Word)</h3>
            <a
              v-if="publication.pdfUrl || (publication as any).documentFile || (publication as any).document_file_url"
              :href="publication.pdfUrl || (publication as any).documentFile || (publication as any).document_file_url"
              target="_blank"
              class="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg"
            >
            <i class="fas fa-file-pdf"></i>
              <span>Télécharger le document</span>
              <i class="fas fa-external-link-alt text-sm"></i>
            </a>
            <p v-else class="text-gray-500 text-sm">Aucun document disponible</p>
          </div>
          
          <!-- Image du document -->
          <div v-if="(publication as any).documentImage || (publication as any).document_image_url">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Image du document</h3>
            <div class="space-y-3">
              <img
                :src="(publication as any).documentImage || (publication as any).document_image_url"
                :alt="publication.title"
                class="max-w-full h-auto rounded-lg shadow-lg border border-gray-200"
                @error="(e: any) => e.target.style.display = 'none'"
              />
              <a
                :href="(publication as any).documentImage || (publication as any).document_image_url"
                target="_blank"
                class="inline-flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300"
              >
                <i class="fas fa-download"></i>
                <span>Télécharger l'image</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Related works & more -->
      <section class="mb-12 pb-12 border-b border-gray-200 fade-in-up" data-animate>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <i class="fas fa-book mr-3 text-purple-500"></i>
          Related works & more
        </h2>
        <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p class="text-gray-600 mb-4">Publications et travaux connexes</p>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
              <span class="text-sm text-gray-700">Aucune publication connexe disponible</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Corrections -->
      <section class="mb-12 fade-in-up" data-animate>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <i class="fas fa-edit mr-3 text-orange-500"></i>
          Corrections
        </h2>
        <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p class="text-gray-600 mb-4">Aucune correction disponible pour cette publication.</p>
        </div>
      </section>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
        <p class="text-gray-600">Chargement de la publication...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-red-50 rounded-2xl shadow-lg border border-red-200 p-8 text-center">
        <i class="fas fa-exclamation-circle text-4xl text-red-600 mb-4"></i>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="loadPublication"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  </main>

  <FooterComponent />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Publication } from '@/models'
import publicationService from '@/services/publication.service'

//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'

const route = useRoute()
const router = useRouter()
const publication = ref<Publication | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
let observer: IntersectionObserver | null = null

// Charger la publication depuis l'API
const loadPublication = async () => {
  loading.value = true
  error.value = null
  try {
    const publicationId = route.params.id as string
    const pub = await publicationService.getPublicationById(publicationId)
    
    // Transformer les données pour correspondre au format attendu
    publication.value = {
      ...pub,
      publicationDate: pub.publication_date || pub.publicationDate || pub.created_at,
      image: pub.image || pub.document_image || pub.document_image_url || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      authors: Array.isArray(pub.authors) ? pub.authors : (pub.authors ? [{ id: 1, name: pub.authors }] : []),
      domains: Array.isArray(pub.domains) ? pub.domains : [],
      citations: pub.citations || 0,
      downloads: pub.downloads || 0,
      views: pub.views || 0,
      pdfUrl: pub.pdf_url || pub.document_file || pub.document_file_url || null,
      // Inclure toutes les données supplémentaires de la BDD
      documentFile: pub.document_file || pub.document_file_url || null,
      documentImage: pub.document_image || pub.document_image_url || null,
      documentFileUrl: pub.document_file_url || pub.document_file || null,
      documentImageUrl: pub.document_image_url || pub.document_image || null,
      name: pub.name || null,
      email: pub.email || null,
      phone: pub.phone || null,
      institution: pub.institution || null,
      position: pub.position || null,
      coAuthors: pub.co_authors || pub.coAuthors || null,
      keywords: pub.keywords || null,
      message: pub.message || null,
    } as Publication & any
  } catch (err: any) {
    console.error('Erreur lors du chargement de la publication:', err)
    error.value = err.message || 'Erreur lors du chargement de la publication'
  } finally {
    loading.value = false
  }
}

const sharePublication = () => {
  if (navigator.share && publication.value) {
    navigator.share({
      title: publication.value.title,
      text: publication.value.abstract,
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Lien copié dans le presse-papiers!')
  }
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
  loadPublication()
  
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

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}

/* Line clamp pour tronquer le texte */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
