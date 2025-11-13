<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 pt-24 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6">
          <span class="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
          <span class="text-sm font-medium text-green-700 uppercase tracking-wider">Production Scientifique</span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Publications du CReFF-PME</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Découvrez les travaux de recherche, articles scientifiques et études publiés par notre centre de recherche
        </p>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div class="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
          <div class="text-3xl font-bold text-green-600 mb-2">42</div>
          <div class="text-sm text-gray-600 font-medium">Articles Publiés</div>
        </div>
        <div class="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
          <div class="text-3xl font-bold text-blue-600 mb-2">18</div>
          <div class="text-sm text-gray-600 font-medium">Revues Indexées</div>
        </div>
        <div class="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
          <div class="text-3xl font-bold text-purple-600 mb-2">6</div>
          <div class="text-sm text-gray-600 font-medium">Ouvrages</div>
        </div>
        <div class="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
          <div class="text-3xl font-bold text-orange-600 mb-2">156</div>
          <div class="text-sm text-gray-600 font-medium">Citations</div>
        </div>
      </div>

      <!-- Filtres et Recherche -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div class="flex flex-wrap gap-3">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="activeCategory = category.id"
              :class="[
                'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border',
                activeCategory === category.id 
                  ? 'bg-green-600 text-white border-green-600' 
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              ]"
            >
              {{ category.label }}
            </button>
          </div>
          
          <div class="relative w-full lg:w-64">
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Rechercher une publication..."
              class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            >
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Liste des publications -->
      <div class="space-y-6">
        <div 
          v-for="publication in filteredPublications" 
          :key="publication.id"
          class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 group"
        >
          <div class="flex flex-col lg:flex-row lg:items-start gap-6">
            <!-- Badge type -->
            <div class="flex-shrink-0">
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-semibold',
                publication.type === 'Article' ? 'bg-blue-100 text-blue-700' :
                publication.type === 'Ouvrage' ? 'bg-purple-100 text-purple-700' :
                'bg-green-100 text-green-700'
              ]">
                {{ publication.type }}
              </span>
            </div>

            <!-- Contenu -->
            <div class="flex-1 min-w-0">
              <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {{ publication.title }}
              </h3>
              
              <p class="text-gray-600 mb-4 leading-relaxed">
                {{ publication.abstract }}
              </p>

              <div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ publication.year }}
                </div>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  {{ publication.journal }}
                </div>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  {{ publication.citations }} citations
                </div>
              </div>

              <!-- Auteurs -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="author in publication.authors" 
                  :key="author"
                  class="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium"
                >
                  {{ author }}
                </span>
              </div>

              <!-- Mots-clés -->
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="keyword in publication.keywords" 
                  :key="keyword"
                  class="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex lg:flex-col gap-2 flex-shrink-0">
              <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                PDF
              </button>
              <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                </svg>
                Lien
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-12">
        <div class="flex gap-2">
          <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Précédent
          </button>
          <button class="px-4 py-2 bg-green-600 text-white rounded-lg font-medium">
            1
          </button>
          <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            2
          </button>
          <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Suivant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeCategory = ref('all')
const searchQuery = ref('')

const categories = [
  { id: 'all', label: 'Toutes' },
  { id: 'article', label: 'Articles' },
  { id: 'book', label: 'Ouvrages' },
  { id: 'conference', label: 'Conférences' },
  { id: 'thesis', label: 'Thèses' }
]

const publications = [
  {
    id: 1,
    title: "Accès au financement des PME en Afrique subsaharienne : Analyse comparative",
    abstract: "Cette étude examine les déterminants de l'accès au financement des PME dans six pays d'Afrique subsaharienne, en mettant l'accent sur les contraintes institutionnelles et les spécificités régionales.",
    type: "Article",
    year: 2023,
    journal: "Journal of African Business",
    citations: 24,
    authors: ["Dr. Marie Koffi", "Prof. Jean Diallo", "Dr. Sarah Mensah"],
    keywords: ["PME", "Financement", "Afrique", "Institutions"]
  },
  {
    id: 2,
    title: "Innovation financière et développement des PME",
    abstract: "Ouvrage de référence sur les nouvelles formes de financement et leur impact sur le développement des petites et moyennes entreprises dans les économies émergentes.",
    type: "Ouvrage",
    year: 2022,
    journal: "Éditions Universitaires",
    citations: 18,
    authors: ["Prof. Jean Diallo"],
    keywords: ["Innovation", "Fintech", "Développement"]
  }
]

const filteredPublications = computed(() => {
  let filtered = publications

  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(pub => 
      pub.type.toLowerCase() === activeCategory.value
    )
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(pub =>
      pub.title.toLowerCase().includes(query) ||
      pub.abstract.toLowerCase().includes(query) ||
      pub.authors.some(author => author.toLowerCase().includes(query)) ||
      pub.keywords.some(keyword => keyword.toLowerCase().includes(query))
    )
  }

  return filtered
})
</script>