<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Publication } from '@/models'

// Données réactives
const searchQuery = ref('')
const selectedDomains = ref<string[]>([])
const selectedType = ref('all')
const selectedYear = ref('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(5)
const scrollObserver = ref(null)

//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const openPublication = (publicationId: number | string | undefined) => {
  if (!publicationId) return
  router.push(`/publications/${publicationId}`)
}

// Données des publications de recherche
const allPublications = ref<Publication[]>([
  {
    id: 1,
    title: "Analyse des Déterminants du Financement Bancaire des PME en RDC",
    abstract: "Cette étude examine les facteurs influençant l'accès au crédit bancaire pour les PME congolaises, avec une analyse quantitative sur un échantillon de 500 entreprises. La recherche identifie les principaux obstacles et propose des solutions pour améliorer l'accès au financement.",
    content: "Cette étude examine les facteurs influençant l'accès au crédit bancaire pour les PME congolaises, avec une analyse quantitative sur un échantillon de 500 entreprises. La recherche identifie les principaux obstacles et propose des solutions pour améliorer l'accès au financement.",
    authors: [
      { id: 1, name: "Dr. Jean Kabila" },
      { id: 2, name: "Prof. Marie Lumumba" },
      { id: 3, name: "Dr. Paul Mobutu" }
    ],
    journal: "Journal of African Business Studies",
    publicationDate: "2024-03-15",
    type: "research-paper",
    domains: ["Finance Bancaire", "Accès au Crédit", "PME", "RDC"],
    citations: 24,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    doi: "10.1234/jabs.2024.12345",
    views: 156,
    downloads: 42
  },
  {
    id: 2,
    title: "Le Rôle des Institutions de Microfinance dans le Développement des PME Urbaines",
    abstract: "Recherche qualitative explorant l'impact des IMF sur la croissance des petites entreprises dans les zones urbaines de la RDC. L'étude couvre 10 institutions de microfinance et 200 PME bénéficiaires.",
    authors: ["Dr. Sophie Kengo", "Dr. Marc Tshisekedi"],
    journal: "African Development Review",
    publicationDate: "2024-01-20",
    type: "article",
    domains: ["Microfinance", "Développement Urbain", "Croissance", "IMF"],
    citations: 18,
    coverImage: "https://images.unsplash.com/photo-1551833086-f6d22eae3b2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    doi: "10.1234/adr.2024.67890"
  },
  {
    id: 3,
    title: "Financement Participatif et Innovation dans les PME Congolaises",
    abstract: "Étude de cas sur l'émergence du crowdfunding comme alternative de financement pour les PME innovantes en RDC. Analyse de 15 plateformes et 50 projets financés avec succès.",
    authors: ["Dr. Alain Ilunga"],
    journal: "International Journal of Entrepreneurship",
    publicationDate: "2023-11-10",
    type: "conference",
    domains: ["Finance Participatif", "Innovation", "FinTech", "Crowdfunding"],
    citations: 12,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    doi: "10.1234/ije.2023.54321"
  },
  {
    id: 4,
    title: "Impact des Réformes Réglementaires sur l'Écosystème Financier des PME",
    abstract: "Analyse longitudinale des effets des réformes bancaires récentes sur l'environnement financier des petites entreprises congolaises. Période d'étude : 2018-2023.",
    authors: ["Prof. Denise Mbuji", "Dr. Henri Kisangani"],
    journal: "World Development",
    publicationDate: "2023-09-05",
    type: "article",
    domains: ["Régulation", "Politique Publique", "Environnement Financier", "Réformes"],
    citations: 31,
    coverImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    doi: "10.1234/wd.2023.98765"
  },
  {
    id: 5,
    title: "Stratégies de Financement des PME Familiales en RDC",
    abstract: "Thèse doctorale explorant les dynamiques de financement spécifiques aux entreprises familiales congolaises. Méthodologie mixte avec entretiens approfondis et analyse financière.",
    authors: ["Dr. Chantal Nzuji"],
    journal: "Thèse - Université de Kinshasa",
    publicationDate: "2023-06-18",
    type: "thesis",
    domains: ["Entreprises Familiales", "Stratégie", "Capital", "Succession"],
    citations: 8,
    coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    doi: "10.1234/thesis.2023.13579"
  },
  {
    id: 6,
    title: "Digitalisation des Services Financiers et Inclusion des PME Rurales",
    abstract: "Évaluation de l'impact des services financiers digitaux sur l'inclusion financière des PME dans les zones rurales de la RDC. Étude couvrant 5 provinces et 300 entreprises.",
    authors: ["Dr. Pascal Kabila", "Dr. Anne Matondo"],
    journal: "Journal of Development Economics",
    publicationDate: "2023-04-22",
    type: "article",
    domains: ["Digitalisation", "Inclusion Financière", "Zones Rurales", "Mobile Banking"],
    citations: 27,
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    doi: "10.1234/jde.2023.24680"
  },
  {
    id: 7,
    title: "Résilience Financière des PME Face aux Chocs Économiques",
    abstract: "Document de travail analysant les stratégies de résilience financière des PME congolaises pendant les périodes de crise économique. Focus sur la pandémie COVID-19.",
    authors: ["Dr. Samuel Lubamba"],
    journal: "Working Paper - CRFPME",
    publicationDate: "2023-02-14",
    type: "working-paper",
    domains: ["Résilience", "Gestion de Crise", "Stratégie Financière", "COVID-19"],
    citations: 15,
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    doi: "10.1234/wp.2023.11223"
  },
  {
    id: 8,
    title: "Capital-Risque et Développement des Startups Technologiques",
    abstract: "Étude sur l'émergence du capital-risque dans le financement des startups technologiques en RDC. Analyse de 20 investissements et leur impact sur la croissance.",
    authors: ["Dr. Eric Tshilombo", "Prof. Grace Kasaï"],
    journal: "Venture Capital Journal",
    publicationDate: "2022-12-08",
    type: "article",
    domains: ["Capital-Risque", "Startups", "Technologie", "Innovation"],
    citations: 22,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    doi: "10.1234/vcj.2022.44556"
  },
  {
    id: 9,
    title: "Financement par la Diaspora et Entrepreneuriat en RDC",
    abstract: "Analyse du rôle des transferts de fonds de la diaspora dans le financement des projets entrepreneuriaux. Enquête auprès de 150 entrepreneurs de la diaspora.",
    authors: ["Dr. Michel Ngbanda"],
    journal: "Diaspora Studies Quarterly",
    publicationDate: "2022-10-30",
    type: "article",
    domains: ["Diaspora", "Transferts", "Entrepreneuriat", "Investissement"],
    citations: 19,
    coverImage: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    doi: "10.1234/dsq.2022.77889"
  },
  {
    id: 10,
    title: "Évaluation de l'Impact des Programmes de Garantie de Prêts",
    abstract: "Étude d'impact des programmes gouvernementaux de garantie de prêts sur l'accès au financement des PME congolaises. Analyse coût-bénéfice sur 3 ans.",
    authors: ["Dr. Lucie Mbayo", "Dr. Robert Kany"],
    journal: "Public Policy Review",
    publicationDate: "2022-08-15",
    type: "article",
    domains: ["Garantie de Prêts", "Politique Publique", "Évaluation d'Impact", "Gouvernement"],
    citations: 14,
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    doi: "10.1234/ppr.2022.33445"
  }
])

const showAdvancedFilters = ref(false)

// Types de publications
const publicationTypes = [
  { value: 'all', label: 'Tous', icon: 'fas fa-layer-group' },
  { value: 'article', label: 'Articles', icon: 'fas fa-newspaper' },
  { value: 'thesis', label: 'Thèses', icon: 'fas fa-graduation-cap' },
  { value: 'conference', label: 'Conférences', icon: 'fas fa-microphone' },
  { value: 'working-paper', label: 'Documents', icon: 'fas fa-file-contract' }
]

// Propriétés calculées
const researchDomains = computed(() => {
  return [
    "Finance Bancaire",
    "Microfinance", 
    "Capital-Risque",
    "Finance Digitale",
    "PME & Entrepreneuriat",
    "Politique Publique",
    "Innovation Financière",
    "Développement Durable"
  ]
})

const publicationYears = computed(() => {
  return ['2024', '2023', '2022', '2021', '2020', '2019', '2018']
})

const recentYears = computed(() => publicationYears.value.slice(0, 3))
const olderYears = computed(() => publicationYears.value.slice(3))

const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' || 
         selectedDomains.value.length > 0 || 
         selectedType.value !== 'all' || 
         selectedYear.value !== 'all'
})

const activeFiltersCount = computed(() => {
  let count = 0
  if (searchQuery.value) count++
  if (selectedDomains.value.length > 0) count += selectedDomains.value.length
  if (selectedType.value !== 'all') count++
  if (selectedYear.value !== 'all') count++
  return count
})

// Méthodes
const toggleDomain = (domain) => {
  const index = selectedDomains.value.indexOf(domain)
  if (index > -1) {
    selectedDomains.value.splice(index, 1)
  } else {
    selectedDomains.value.push(domain)
  }
}

const resetPagination = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedDomains.value = []
  selectedType.value = 'all'
  selectedYear.value = 'all'
  sortBy.value = 'newest'
  resetPagination()
}

const applyFilters = () => {
  showAdvancedFilters.value = false
  resetPagination()
}

const getTypeLabel = (type) => {
  const typeObj = publicationTypes.find(t => t.value === type)
  return typeObj ? typeObj.label : type
}

const researchers = computed(() => {
  const researchersSet = new Set()
  allPublications.value.forEach(pub => {
    pub.authors.forEach(author => researchersSet.add(author))
  })
  return Array.from(researchersSet)
})

const totalPublications = computed(() => allPublications.value.length)

const currentYear = computed(() => new Date().getFullYear())

const filteredPublications = computed(() => {
  let filtered = allPublications.value

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(pub => 
      pub.title.toLowerCase().includes(query) ||
      pub.abstract.toLowerCase().includes(query) ||
      pub.authors.some(author => author.toLowerCase().includes(query)) ||
      pub.journal.toLowerCase().includes(query)
    )
  }

  // Filtre par domaines
  if (selectedDomains.value.length > 0) {
    filtered = filtered.filter(pub => 
      pub.domains.some(domain => selectedDomains.value.includes(domain))
    )
  }

  // Filtre par type
  if (selectedType.value !== 'all') {
    filtered = filtered.filter(pub => pub.type === selectedType.value)
  }

  // Filtre par année
  if (selectedYear.value !== 'all') {
    filtered = filtered.filter(pub => 
      new Date(pub.publicationDate).getFullYear().toString() === selectedYear.value
    )
  }

  // Tri
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.publicationDate) - new Date(b.publicationDate))
      break
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'citations':
      filtered.sort((a, b) => b.citations - a.citations)
      break
  }

  return filtered
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredPublications.value.length / itemsPerPage.value))

const paginatedPublications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredPublications.value.slice(start, end)
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)

const endIndex = computed(() => {
  const end = startIndex.value + itemsPerPage.value
  return end > filteredPublications.value.length ? filteredPublications.value.length : end
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
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
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

<template>
  <NavBarComponent/>
  
  <!-- Header Hero Section -->
   <header class="relative overflow-hidden bg-gradient-to-br pt-40 pb-16 from-blue-800/90 to-blue-600/90 py-24 w-full">
    <div class="absolute inset-0 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        alt="Publications de Recherche - Financement des PME en RDC"
        class="w-full h-full object-cover opacity-20"
      />
      <!-- Overlay et effets -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-blue-500/30"></div>
      <!-- Blobs animés -->
      <div class="absolute top-10 left-20 w-64 h-64 bg-cyan-400/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-slow"></div>
      <div class="absolute top-20 right-32 w-72 h-72 bg-blue-300/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-fast"></div>
    </div>

    <!-- Contenu principal -->
    <div class="max-w-6xl mx-auto px-4 text-center relative z-10">

      <!-- Titre principal avec effet de dégradé animé -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 animate-gradient-text fade-in-up">
        <span class="block">Publications de Recherche</span>
        <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-blue-400 mt-2">
          Financement des PME en RDC
        </span>
      </h1>

      <!-- Sous-titre avec animation -->
      <p class="text-lg sm:text-xl text-blue-50 max-w-3xl mx-auto mb-10 animate-fade-in fade-in-up delay-200">
        Découvrez nos <strong class="text-white">dernières recherches</strong> et publications 
        sur le financement des petites et moyennes entreprises 
        en République Démocratique du Congo.
      </p>

      <!-- Statistiques -->
      <div class="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8 fade-in-up delay-400">
        <div class="text-center">
          <div class="text-2xl sm:text-3xl font-bold text-white">{{ totalPublications }}</div>
          <div class="text-blue-200 text-sm">Publications</div>
        </div>
        <div class="text-center">
          <div class="text-2xl sm:text-3xl font-bold text-white">{{ researchers.length }}</div>
          <div class="text-blue-200 text-sm">Chercheurs</div>
        </div>
        <div class="text-center">
          <div class="text-2xl sm:text-3xl font-bold text-white">{{ currentYear }}</div>
          <div class="text-blue-200 text-sm">Année en Cours</div>
        </div>
      </div>
    </div>

    <!-- Forme décorative en bas -->
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-white/5 transform -skew-y-3 origin-bottom-left animate-wave"></div>
  </header>

  <!-- Main Content -->
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Filtres et Recherche -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-8 fade-in-up delay-600">
    <!-- Section principale des filtres -->
    <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start lg:items-center justify-between">
      
      <!-- Barre de recherche améliorée -->
      <div class="flex-1 w-full lg:max-w-md">
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-search text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"></i>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher par titre, auteur, résumé..."
            class="w-full pl-10 pr-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder-gray-400 group-hover:border-gray-300 text-sm sm:text-base"
            @input="resetPagination"
          >
          <!-- Bouton effacer -->
          <button
            v-if="searchQuery"
            @click="searchQuery = ''; resetPagination()"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <i class="fas fa-times-circle text-gray-400 hover:text-gray-600 transition-colors duration-200 text-sm"></i>
          </button>
        </div>
      </div>

      <!-- Contrôles de tri et filtres -->
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center w-full lg:w-auto">
        
        <!-- Sélecteur de tri -->
        <div class="relative group w-full sm:w-auto">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-sort text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300 text-sm"></i>
          </div>
          <select
            v-model="sortBy"
            @change="resetPagination"
            class="w-full pl-10 pr-8 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 focus:bg-white appearance-none cursor-pointer transition-all duration-300 hover:border-gray-300 text-sm sm:text-base"
          >
            <option value="newest">Plus récent</option>
            <option value="oldest">Plus ancien</option>
            <option value="title">Titre A-Z</option>
            <option value="citations">Plus cités</option>
          </select>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
          </div>
        </div>

        <!-- Bouton filtres avancés -->
        <button
          @click="showAdvancedFilters = !showAdvancedFilters"
          :class="[
            'px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 font-medium transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center',
            showAdvancedFilters || hasActiveFilters
              ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
          ]"
        >
          <i class="fas fa-sliders-h text-sm"></i>
          <span class="text-sm">Filtres</span>
          <span 
            v-if="hasActiveFilters"
            class="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ activeFiltersCount }}
          </span>
        </button>
      </div>
    </div>

    <!-- Filtres avancés dépliables -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="showAdvancedFilters" class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
        
        <!-- Filtres par domaine -->
        <div class="mb-4 sm:mb-6">
          <h3 class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <i class="fas fa-tags text-blue-500"></i>
            Domaines de recherche
          </h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="domain in researchDomains"
              :key="domain"
              @click="toggleDomain(domain)"
              :class="[
                'group relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 border-2 transform hover:scale-105 active:scale-95',
                selectedDomains.includes(domain)
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/50 shadow-sm'
              ]"
            >
              {{ domain }}
              <i 
                v-if="selectedDomains.includes(domain)"
                class="fas fa-check ml-1.5 text-xs"
              ></i>
            </button>
          </div>
        </div>

        <!-- Filtres par type et année -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          <!-- Type de publication -->
          <div>
            <label class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <i class="fas fa-file-alt text-blue-500"></i>
              Type de publication
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="type in publicationTypes"
                :key="type.value"
                @click="selectedType = type.value; resetPagination()"
                :class="[
                  'px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 border-2 text-center',
                  selectedType === type.value
                    ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-700'
                ]"
              >
                <i :class="[type.icon, 'mr-1 sm:mr-1.5 text-xs']"></i>
                {{ type.label }}
              </button>
            </div>
          </div>

          <!-- Année de publication -->
          <div>
            <label class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <i class="fas fa-calendar-alt text-blue-500"></i>
              Année de publication
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-filter text-gray-400 text-sm"></i>
              </div>
              <select
                v-model="selectedYear"
                @change="resetPagination"
                class="w-full pl-10 pr-8 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer transition-all duration-300 hover:border-gray-300 text-sm sm:text-base"
              >
                <option value="all">Toutes les années</option>
                <optgroup label="Années récentes">
                  <option v-for="year in recentYears" :key="year" :value="year">{{ year }}</option>
                </optgroup>
                <optgroup label="Années antérieures">
                  <option v-for="year in olderYears" :key="year" :value="year">{{ year }}</option>
                </optgroup>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions des filtres -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 sm:mt-6 pt-4 border-t border-gray-100">
          <div class="text-xs sm:text-sm text-gray-600">
            <span v-if="hasActiveFilters" class="text-blue-600 font-medium">
              {{ activeFiltersCount }} filtre(s) actif(s)
            </span>
            <span v-else class="text-gray-400">
              Aucun filtre actif
            </span>
          </div>
          <div class="flex gap-2 w-full sm:w-auto">
            <button
              @click="clearFilters"
              :class="[
                'px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 border flex-1 sm:flex-none text-center',
                hasActiveFilters
                  ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300'
                  : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              ]"
              :disabled="!hasActiveFilters"
            >
              <i class="fas fa-times mr-1.5"></i>
              Tout effacer
            </button>
            <button
              @click="applyFilters"
              class="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5 border border-blue-500 flex-1 sm:flex-none text-center"
            >
              <i class="fas fa-check mr-1.5"></i>
              Appliquer
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Indicateurs de filtres actifs (compact) -->
    <div v-if="hasActiveFilters && !showAdvancedFilters" class="mt-3 flex flex-wrap gap-2 items-center">
      <span class="text-xs text-gray-500 font-medium">Filtres actifs:</span>
      
      <!-- Filtre recherche -->
      <span v-if="searchQuery" class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
        Recherche: "{{ searchQuery }}"
        <button @click="searchQuery = ''; resetPagination()" class="text-blue-500 hover:text-blue-700">
          <i class="fas fa-times text-xs"></i>
        </button>
      </span>
      
      <!-- Filtres domaines -->
      <span
        v-for="domain in selectedDomains"
        :key="domain"
        class="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
      >
        {{ domain }}
        <button @click="toggleDomain(domain)" class="text-green-500 hover:text-green-700">
          <i class="fas fa-times text-xs"></i>
        </button>
      </span>
      
      <!-- Filtre type -->
      <span v-if="selectedType !== 'all'" class="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
        Type: {{ getTypeLabel(selectedType) }}
        <button @click="selectedType = 'all'; resetPagination()" class="text-purple-500 hover:text-purple-700">
          <i class="fas fa-times text-xs"></i>
        </button>
      </span>
      
      <!-- Filtre année -->
      <span v-if="selectedYear !== 'all'" class="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
        Année: {{ selectedYear }}
        <button @click="selectedYear = 'all'; resetPagination()" class="text-orange-500 hover:text-orange-700">
          <i class="fas fa-times text-xs"></i>
        </button>
      </span>

      <button
        @click="clearFilters"
        class="text-xs text-gray-500 hover:text-gray-700 underline ml-2"
      >
        Tout effacer
      </button>
    </div>
  </div>

      <!-- Liste des Publications - Une par ligne -->
      <div class="space-y-4 sm:space-y-6 mb-8">
        <article
          v-for="(publication, index) in paginatedPublications"
          :key="publication.id"
          class="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer fade-in-up"
          :style="`animation-delay: ${index * 100}ms;`"
          @click="openPublication(publication.id)"
        >
          <div class="flex flex-col lg:flex-row">
            <!-- Image de couverture -->
            <div class="lg:w-48 lg:h-48 h-40 relative overflow-hidden">
              <img
                :src="publication.coverImage"
                :alt="publication.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <!-- Badge de type -->
              <div class="absolute top-3 left-3">
                <span :class="[
                  'text-xs font-semibold px-2 py-1 rounded-full shadow-sm',
                  publication.type === 'article' ? 'bg-green-500 text-white' :
                  publication.type === 'thesis' ? 'bg-purple-500 text-white' :
                  publication.type === 'conference' ? 'bg-orange-500 text-white' :
                  'bg-blue-500 text-white'
                ]">
                  {{ getTypeLabel(publication.type) }}
                </span>
              </div>
            </div>
            
            <!-- Contenu de la publication -->
            <div class="flex-1 p-4 sm:p-6">
              <div class="flex flex-col h-full">
                <!-- En-tête avec date et citations -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <span class="text-blue-600 text-sm font-medium flex items-center">
                    <i class="far fa-calendar-alt mr-1"></i>
                    {{ formatDate(publication.publicationDate) }}
                  </span>
                  <span class="text-gray-500 text-sm flex items-center">
                    <i class="fas fa-quote-right mr-1"></i>
                    {{ publication.citations }} citations
                  </span>
                </div>
                
                <!-- Titre -->
                <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors leading-tight">
                  {{ publication.title }}
                </h3>
                
                <!-- Auteurs -->
                <div class="mb-3">
                  <p class="text-sm text-gray-600 line-clamp-1">
                    {{ publication.authors.join(', ') }}
                  </p>
                </div>
                
                <!-- Résumé -->
                <p class="text-gray-600 text-sm mb-4 leading-relaxed flex-1 line-clamp-2 sm:line-clamp-3">
                  {{ publication.abstract }}
                </p>
                
                <!-- Journal et domaines -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                  <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-3">
                    <span class="text-xs text-gray-500 font-medium">
                      {{ publication.journal }}
                    </span>
                    <div class="flex flex-wrap gap-1">
                      <span
                        v-for="domain in publication.domains.slice(0, 2)"
                        :key="domain"
                        class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {{ domain }}
                      </span>
                      <span v-if="publication.domains.length > 2" class="text-xs text-gray-400">
                        +{{ publication.domains.length - 2 }}
                      </span>
                    </div>
                  </div>
                  <div class="text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform flex items-center justify-end sm:justify-start mt-2 sm:mt-0">
                    Voir plus
                    <i class="fas fa-arrow-right ml-2 text-xs"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 fade-in-up">
        <!-- Informations sur la pagination -->
        <div class="text-sm text-gray-600">
          Affichage de <span class="font-semibold">{{ startIndex + 1 }}</span> à 
          <span class="font-semibold">{{ endIndex }}</span> sur 
          <span class="font-semibold">{{ filteredPublications.length }}</span> publications
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
            v-model="itemsPerPage"
            @change="resetPagination"
            class="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-xs sm:text-sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      <!-- Aucun Résultat -->
      <div
        v-if="filteredPublications.length === 0"
        class="text-center py-12 sm:py-16 bg-white rounded-xl shadow-sm border border-gray-200 fade-in-up"
      >
        <i class="fas fa-search text-4xl sm:text-5xl text-gray-300 mb-4"></i>
        <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">Aucune publication trouvée</h3>
        <p class="text-gray-600 mb-6 text-sm sm:text-base">Essayez d'ajuster vos critères de recherche</p>
        <button
          @click="clearFilters"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
        >
          Effacer Tous les Filtres
        </button>
      </div>

      <!-- Section Newsletter -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 sm:p-8 text-white fade-in-up">
        <div class="max-w-4xl mx-auto text-center">
          <h3 class="text-xl sm:text-2xl font-bold mb-4">Restez Informé</h3>
          <p class="text-blue-100 mb-6 text-sm sm:text-base">
            Abonnez-vous à notre newsletter pour recevoir les dernières publications et recherches.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Entrez votre email"
              class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none text-sm sm:text-base"
            >
            <button class="bg-white text-blue-600 font-semibold px-5 sm:px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base whitespace-nowrap">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent/>
</template>

<style scoped>
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:translate-x-2 {
  transform: translateX(0.5rem);
}

/* Transitions douces */
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

/* Line clamp utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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
}

@media (max-width: 768px) {
  .line-clamp-1 {
    -webkit-line-clamp: 1;
  }
  
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
  .group:hover .group-hover\:scale-105 {
    transform: none;
  }
  
  .group:hover .group-hover\:translate-x-2 {
    transform: none;
  }
}
</style>