<template>
  <NavBarComponent />
  
  <!-- Hero Section - Image pleine largeur avec contenu superposé -->
  <div v-if="publication" class="relative w-full h-screen max-h-[90vh] overflow-hidden">
    <!-- Image de fond -->
    <div class="absolute inset-0">
      <img
        :src="publication.image"
        :alt="publication.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
    </div>
    <div class="absolute inset-0 flex flex-col justify-end z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 text-white">
        <!-- Titre -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
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
      <!-- Section: Author & abstract -->
      <section class="mb-12 pb-12 border-b border-gray-200 fade-in-up" data-animate>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <i class="fas fa-user-circle mr-3 text-blue-500"></i>
          Author & abstract
        </h2>
        
        <!-- Authors -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">Author</h3>
          <div class="space-y-2">
            <div class="flex items-center space-x-4">
              <span class="text-sm font-medium text-gray-600">Listed:</span>
              <div class="flex flex-wrap gap-3">
                <span 
                  v-for="author in publication.authors" 
                  :key="author.id"
                  class="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {{ author.name }}
                </span>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm font-medium text-gray-600">Registered:</span>
              <span class="text-sm text-gray-500">-</span>
            </div>
          </div>
        </div>

        <!-- Abstract -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">Abstract</h3>
          <p class="text-gray-700 leading-relaxed text-base sm:text-lg">
            {{ publication.abstract }}
          </p>
        </div>
      </section>

      <!-- Section: Download -->
      <section class="mb-12 pb-12 border-b border-gray-200 fade-in-up" data-animate>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <i class="fas fa-download mr-3 text-green-500"></i>
          Download
        </h2>
        <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p class="text-gray-600 mb-4">Téléchargez le document complet au format PDF</p>
          <button class="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg">
            <i class="fas fa-file-pdf"></i>
            <span>Télécharger PDF</span>
          </button>
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
    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
        <p class="text-gray-600">Chargement de la publication...</p>
      </div>
    </div>
  </main>

  <FooterComponent />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Publication } from '@/models'

//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'

const route = useRoute()
const router = useRouter()
const publication = ref<Publication | null>(null)
let observer: IntersectionObserver | null = null

// Données simulées - correspond à la publication unique
const allPublications: Publication[] = [
  {
    id: 1,
    title: "Tester les conditions de lancement d'une plateforme de crowdfunding en République Démocratique du Congo (RDC)",
    abstract: "La recherche disponible sur le crowdfunding s'intéresse essentiellement aux sociétés qui font appel à ce mode de financement et suppose l'existence préalable de plateformes pour l'organiser. Malheureusement, elle ne s'intéresse que rarement aux conditions d'exploitation des plateformes et accorde peu de place au contexte local notamment dans les pays dont le système financier et légal est moins développé.L'ambition de cet article est double. En adoptant une approche de recherche qualitative à travers 47 entretiens semi-structurés, nous souhaitons analyser l'opportunité de lancement d'une plateforme de crowdfunding en République Démocratique du Congo (RDC) en utilisant le modèle de la Banque Mondiale (2013). Ce modèle distingue deux familles de conditions de succès :d'un côté, l'offre et la demande de financement et, de l'autre côté, l'état de l'infrastructure. Parallèlement, nous profitons de l'exercice pour tester l'exhaustivité du modèle. Les résultats de l'étude sur le terrain montrent que, sur le plan de la faisabilité d'une plateforme de crowdfunding en RDC, les conditions d'offre et de demande de financement sont plus satisfaisantes et montrent l'intérêt d'une telle initiative. Par contre, les conditions d'infrastructure sont moins satisfaisantes pour assurer le développement d'une plateforme notamment au niveau de cadre réglementaire, du fonctionnement des services financiers et du climat des affaires. Au niveau du modèle, il semble souhaitable de le compléter avec des conditions tant sur le plan de l'analyse de 'infrastructure que sur le plan de l'offre et de demande de financement. Il semble également souhaitable d'accorder une attention plus particulière aux conditions de mise en œuvre. Ces résultats ouvrent des pistes de recherche futures tant sur le terrain afin de faire émerger une première plateforme en RDC que sur le plan académique au niveau de l'analyse des conditions d'exploitation des plateformes.",
    content: "La recherche disponible sur le crowdfunding s'intéresse essentiellement aux sociétés qui font appel à ce mode de financement et suppose l'existence préalable de plateformes pour l'organiser. Malheureusement, elle ne s'intéresse que rarement aux conditions d'exploitation des plateformes et accorde peu de place au contexte local notamment dans les pays dont le système financier et légal est moins développé.L'ambition de cet article est double. En adoptant une approche de recherche qualitative à travers 47 entretiens semi-structurés, nous souhaitons analyser l'opportunité de lancement d'une plateforme de crowdfunding en République Démocratique du Congo (RDC) en utilisant le modèle de la Banque Mondiale (2013). Ce modèle distingue deux familles de conditions de succès :d'un côté, l'offre et la demande de financement et, de l'autre côté, l'état de l'infrastructure. Parallèlement, nous profitons de l'exercice pour tester l'exhaustivité du modèle. Les résultats de l'étude sur le terrain montrent que, sur le plan de la faisabilité d'une plateforme de crowdfunding en RDC, les conditions d'offre et de demande de financement sont plus satisfaisantes et montrent l'intérêt d'une telle initiative. Par contre, les conditions d'infrastructure sont moins satisfaisantes pour assurer le développement d'une plateforme notamment au niveau de cadre réglementaire, du fonctionnement des services financiers et du climat des affaires. Au niveau du modèle, il semble souhaitable de le compléter avec des conditions tant sur le plan de l'analyse de 'infrastructure que sur le plan de l'offre et de demande de financement. Il semble également souhaitable d'accorder une attention plus particulière aux conditions de mise en œuvre. Ces résultats ouvrent des pistes de recherche futures tant sur le terrain afin de faire émerger une première plateforme en RDC que sur le plan académique au niveau de l'analyse des conditions d'exploitation des plateformes.",
    authors: [
      { id: 1, name: "Jean Nsonsumuna" },
      { id: 2, name: "Olivier Witmeur" }
    ],
    journal: "Research Paper",
    publicationDate: "2024-01-01",
    type: "research-paper",
    domains: ["Crowdfunding", "Financement", "RDC", "PME"],
    citations: 0,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    doi: ""
  }
]

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
  const publicationId = parseInt(route.params.id as string)
  publication.value = allPublications.find(p => p.id === publicationId) || null
  
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
</style>
