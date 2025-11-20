<template>
  <NavBarComponent />
  
  <!-- Header avec navigation -->
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-4 py-4">
      <nav class="flex items-center space-x-2 text-sm text-gray-600">
        <router-link 
          to="/publications" 
          class="hover:text-blue-600 transition-colors flex items-center"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Retour aux publications
        </router-link>
        <span class="text-gray-300">/</span>
        <span class="text-gray-900 font-medium">Lecture de l'article</span>
      </nav>
    </div>
  </header>

  <!-- Contenu principal -->
  <main class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
    <div class="max-w-4xl mx-auto px-4" v-if="publication">
      
      <!-- En-tête de l'article -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
        <!-- Badge et métadonnées -->
        <div class="flex flex-wrap items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <span :class="[
              'text-sm font-semibold px-3 py-1 rounded-full',
              publication.type === 'article' ? 'bg-green-500 text-white' :
              publication.type === 'thesis' ? 'bg-purple-500 text-white' :
              publication.type === 'conference' ? 'bg-orange-500 text-white' :
              'bg-blue-500 text-white'
            ]">
              {{ getTypeLabel(publication.type) }}
            </span>
            <span class="text-gray-500 text-sm flex items-center">
              <i class="far fa-calendar-alt mr-1"></i>
              {{ formatDate(publication.publicationDate) }}
            </span>
            <span class="text-gray-500 text-sm flex items-center">
              <i class="fas fa-quote-right mr-1"></i>
              {{ publication.citations }} citations
            </span>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center space-x-3">
            <button class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <i class="far fa-bookmark"></i>
              <span class="text-sm">Sauvegarder</span>
            </button>
            <button class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <i class="fas fa-share-alt"></i>
              <span class="text-sm">Partager</span>
            </button>
          </div>
        </div>

        <!-- Titre -->
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {{ publication.title }}
        </h1>

        <!-- Auteurs -->
        <div class="mb-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Auteurs :</h3>
          <div class="flex flex-wrap gap-3">
            <span 
              v-for="author in publication.authors" 
              :key="author"
              class="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <i class="fas fa-user-circle mr-2"></i>
              {{ author }}
            </span>
          </div>
        </div>

        <!-- Journal et DOI -->
        <div class="flex flex-wrap items-center justify-between pt-6 border-t border-gray-200">
          <div>
            <span class="text-lg font-semibold text-gray-900">
              {{ publication.journal }}
            </span>
            <p class="text-gray-600 text-sm mt-1">
              DOI: <span class="font-mono text-blue-600">{{ publication.doi }}</span>
            </p>
          </div>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
            <i class="fas fa-download"></i>
            <span>Télécharger le PDF</span>
          </button>
        </div>
      </div>

      <!-- Image de couverture -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
        <img
          :src="publication.coverImage"
          :alt="publication.title"
          class="w-full h-64 md:h-80 object-cover"
        />
      </div>

      <!-- Contenu de l'article -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
            <!-- Domaines -->
            <div class="mb-6">
              <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <i class="fas fa-tags mr-2 text-blue-500"></i>
                Domaines
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="domain in publication.domains"
                  :key="domain"
                  class="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs font-medium"
                >
                  {{ domain }}
                </span>
              </div>
            </div>

            <!-- Métriques -->
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span class="text-sm text-gray-700">Citations</span>
                <span class="font-semibold text-blue-600">{{ publication.citations }}</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span class="text-sm text-gray-700">Pages</span>
                <span class="font-semibold text-green-600">15</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span class="text-sm text-gray-700">Mots-clés</span>
                <span class="font-semibold text-purple-600">{{ publication.domains.length }}</span>
              </div>
            </div>

            <!-- Références rapides -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <h3 class="text-sm font-semibold text-gray-700 mb-3">Référence</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                {{ publication.authors.join(', ') }} ({{ new Date(publication.publicationDate).getFullYear() }}). 
                "{{ publication.title }}". <em>{{ publication.journal }}</em>.
              </p>
            </div>
          </div>
        </div>

        <!-- Contenu principal -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <!-- Résumé -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-file-alt mr-3 text-blue-500"></i>
                Résumé
              </h2>
              <p class="text-gray-700 leading-relaxed text-lg">
                {{ publication.abstract }}
              </p>
            </section>

            <!-- Introduction -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-play-circle mr-3 text-green-500"></i>
                Introduction
              </h2>
              <div class="prose prose-lg max-w-none text-gray-700">
                <p>
                  Cette recherche s'inscrit dans le contexte du financement des PME en République Démocratique du Congo, 
                  un enjeu crucial pour le développement économique du pays. Malgré leur importance dans l'économie nationale, 
                  les PME congolaises font face à des défis persistants dans l'accès au financement.
                </p>
                <p class="mt-4">
                  L'étude vise à identifier les principaux obstacles structurels et institutionnels qui entravent 
                  l'accès des PME aux services financiers formels, et à proposer des solutions adaptées au contexte local.
                </p>
              </div>
            </section>

            <!-- Méthodologie -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-flask mr-3 text-purple-500"></i>
                Méthodologie
              </h2>
              <div class="prose prose-lg max-w-none text-gray-700">
                <p>
                  Notre approche méthodologique combine des méthodes quantitatives et qualitatives pour offrir 
                  une analyse complète du paysage financier des PME en RDC.
                </p>
                
                <h3 class="text-xl font-semibold mt-6 mb-3">Échantillon et Collecte de Données</h3>
                <ul class="list-disc list-inside space-y-2">
                  <li>Enquête quantitative auprès de 500 PME réparties dans 5 provinces</li>
                  <li>Entretiens approfondis avec 30 dirigeants de PME</li>
                  <li>Analyse documentaire des politiques financières</li>
                  <li>Revue de la littérature scientifique internationale</li>
                </ul>

                <h3 class="text-xl font-semibold mt-6 mb-3">Analyse des Données</h3>
                <p>
                  Les données ont été analysées à l'aide de modèles de régression logistique et d'analyse thématique 
                  pour les données qualitatives.
                </p>
              </div>
            </section>

            <!-- Résultats -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-chart-bar mr-3 text-orange-500"></i>
                Résultats Principaux
              </h2>
              <div class="prose prose-lg max-w-none text-gray-700">
                <p>
                  Les résultats de notre étude révèlent plusieurs tendances significatives concernant 
                  l'accès au financement des PME en RDC.
                </p>

                <div class="bg-gray-50 rounded-xl p-6 mt-6">
                  <h3 class="text-lg font-semibold mb-4">Points Clés :</h3>
                  <ul class="space-y-3">
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span><strong>78% des PME</strong> interrogées rapportent des difficultés d'accès au crédit bancaire</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span><strong>45% des entreprises</strong> dépendent principalement de financement informel</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span>Les taux d'intérêt moyens s'élèvent à <strong>18% annuels</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- Conclusion -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-flag-checkered mr-3 text-red-500"></i>
                Conclusion et Recommandations
              </h2>
              <div class="prose prose-lg max-w-none text-gray-700">
                <p>
                  Cette étude met en lumière la nécessité de réformes structurelles pour améliorer 
                  l'environnement financier des PME en RDC. Nos résultats suggèrent que l'amélioration 
                  de l'accès au financement passe par une approche multidimensionnelle.
                </p>

                <h3 class="text-xl font-semibold mt-6 mb-3">Recommandations :</h3>
                <ol class="list-decimal list-inside space-y-2">
                  <li>Renforcer les capacités des institutions financières locales</li>
                  <li>Développer des produits financiers adaptés aux PME</li>
                  <li>Améliorer l'environnement réglementaire</li>
                  <li>Promouvoir l'éducation financière des entrepreneurs</li>
                </ol>
              </div>
            </section>

            <!-- Références -->
            <section>
              <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-book mr-3 text-indigo-500"></i>
                Références Bibliographiques
              </h2>
              <div class="prose prose-lg max-w-none text-gray-700">
                <ul class="list-disc list-inside space-y-2 text-sm">
                  <li>Banque Centrale du Congo (2023). Rapport sur le Secteur Financier</li>
                  <li>Organisation Mondiale du Commerce (2022). Financement des PME en Afrique</li>
                  <li>PNUD (2023). Développement Entrepreneurial en RDC</li>
                  <li>Ministère des PME (2022). Stratégie Nationale de Financement</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>

      <!-- Articles similaires -->
      <section class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Articles Similaires</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="related in relatedPublications"
            :key="related.id"
            class="bg-white rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
            @click="openPublication(related.id)"
          >
            <div class="h-40 relative overflow-hidden">
              <img
                :src="related.coverImage"
                :alt="related.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-700">
                {{ related.title }}
              </h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                {{ related.abstract }}
              </p>
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span>{{ new Date(related.publicationDate).getFullYear() }}</span>
                <span>{{ related.citations }} citations</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>

    <!-- Loading State -->
    <div v-else class="max-w-4xl mx-auto px-4">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
        <p class="text-gray-600">Chargement de l'article...</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'

const route = useRoute()
const publication = ref(null)
const loading = ref(true)

// Données simulées (en pratique, vous les récupéreriez via une API)
const allPublications = [
  {
    id: 1,
    title: "Analyse des Déterminants du Financement Bancaire des PME en RDC",
    abstract: "Cette étude examine les facteurs influençant l'accès au crédit bancaire pour les PME congolaises...",
    authors: ["Dr. Jean Kabila", "Prof. Marie Lumumba", "Dr. Paul Mobutu"],
    journal: "Journal of African Business Studies",
    publicationDate: "2024-03-15",
    type: "article",
    domains: ["Finance Bancaire", "Accès au Crédit", "PME", "RDC"],
    citations: 24,
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    doi: "10.1234/jabs.2024.12345"
  },
  // ... autres publications (les mêmes que dans votre composant principal)
]

const publicationTypes = [
  { value: 'all', label: 'Tous', icon: 'fas fa-layer-group' },
  { value: 'article', label: 'Articles', icon: 'fas fa-newspaper' },
  { value: 'thesis', label: 'Thèses', icon: 'fas fa-graduation-cap' },
  { value: 'conference', label: 'Conférences', icon: 'fas fa-microphone' },
  { value: 'working-paper', label: 'Documents', icon: 'fas fa-file-contract' }
]

// Propriétés calculées
const relatedPublications = computed(() => {
  if (!publication.value) return []
  return allPublications
    .filter(p => p.id !== publication.value.id)
    .slice(0, 3)
})

// Méthodes
const getTypeLabel = (type) => {
  const typeObj = publicationTypes.find(t => t.value === type)
  return typeObj ? typeObj.label : type
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const openPublication = (publicationId) => {
  // Utiliser le router pour naviguer
  window.location.href = `/publications/${publicationId}`
}

// Cycle de vie
onMounted(() => {
  const publicationId = parseInt(route.params.id)
  publication.value = allPublications.find(p => p.id === publicationId)
  loading.value = false
  
  // Simuler un chargement asynchrone
  setTimeout(() => {
    loading.value = false
  }, 1000)
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
</style>