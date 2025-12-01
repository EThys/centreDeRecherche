<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { Publication, PublicationRequest } from '@/models'
//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'

const { t } = useI18n()
const router = useRouter()

// Données réactives
const searchQuery = ref('')
const selectedDomains = ref<string[]>([])
const selectedType = ref('all')
const selectedYear = ref('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(5)
const scrollObserver = ref<IntersectionObserver | null>(null)

const openPublication = (publicationId: number | string | undefined) => {
  if (!publicationId) return
  router.push(`/publications/${publicationId}`)
}

// Données des publications de recherche
const allPublications = ref<Publication[]>([
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
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    doi: "",
    views: 0,
    downloads: 0
  }
])

const showAdvancedFilters = ref(false)

// Types de publications
const publicationTypes = [
  { value: 'all', label: 'Tous', icon: 'fas fa-layer-group' },
  { value: 'article', label: 'Articles', icon: 'fas fa-newspaper' },
  { value: 'research-paper', label: 'Documents de recherche', icon: 'fas fa-file-contract' },
  { value: 'book', label: 'Livres', icon: 'fas fa-book' },
  { value: 'report', label: 'Rapports', icon: 'fas fa-file-alt' },
  { value: 'other', label: 'Autres', icon: 'fas fa-layer-group' }
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
const toggleDomain = (domain: string) => {
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

const getTypeLabel = (type: string) => {
  const typeObj = publicationTypes.find(t => t.value === type)
  return typeObj ? typeObj.label : type
}

const researchers = computed(() => {
  const researchersSet = new Set<string>()
  allPublications.value.forEach(pub => {
    pub.authors.forEach(author => researchersSet.add(author.name))
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
      pub.authors.some(author => author.name.toLowerCase().includes(query)) ||
      (pub.journal && pub.journal.toLowerCase().includes(query))
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
      filtered.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime())
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime())
      break
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'citations':
      filtered.sort((a, b) => (b.citations || 0) - (a.citations || 0))
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

const goToPage = (page: number) => {
  currentPage.value = page
}

const formatDate = (dateString: string) => {
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
    if (scrollObserver.value) {
    scrollObserver.value.observe(el)
    }
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

// Formulaire de demande de publication
const publicationRequestForm = ref<Omit<PublicationRequest, 'id' | 'status' | 'submissionDate' | 'createdAt' | 'updatedAt' | 'reviewedAt' | 'publishedAt'>>({
  name: '',
  email: '',
  phone: '',
  institution: '',
  position: '',
  title: '',
  abstract: '',
  type: '',
  domains: [],
  authors: '',
  keywords: '',
  message: ''
})

const researchDomainsForForm = [
  "Finance Bancaire",
  "Microfinance", 
  "Capital-Risque",
  "Finance Digitale",
  "PME & Entrepreneuriat",
  "Politique Publique",
  "Innovation Financière",
  "Développement Durable"
]

const toggleDomainForForm = (domain: string) => {
  const index = publicationRequestForm.value.domains.indexOf(domain)
  if (index > -1) {
    publicationRequestForm.value.domains.splice(index, 1)
  } else {
    publicationRequestForm.value.domains.push(domain)
  }
}

const submitPublicationRequest = () => {
  // Créer l'objet de demande avec le statut par défaut
  const request: PublicationRequest = {
    ...publicationRequestForm.value,
    status: 'pending',
    submissionDate: new Date().toISOString(),
  }
  
  // Ici, vous pouvez envoyer la demande à votre API
  console.log('Publication request submitted:', request)
  
  // Afficher un message de succès (vous pouvez utiliser une notification toast)
  alert(t('publications.request.success'))
  
  // Réinitialiser le formulaire
  publicationRequestForm.value = {
    name: '',
    email: '',
    phone: '',
    institution: '',
    position: '',
    title: '',
    abstract: '',
    type: '',
    domains: [],
    authors: '',
    keywords: '',
    message: ''
  }
}
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
                :src="publication.image"
                :alt="publication.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <!-- Badge de type -->
              <div class="absolute top-3 left-3">
                <span :class="[
                  'text-xs font-semibold px-2 py-1 rounded-full shadow-sm',
                  publication.type === 'article' ? 'bg-green-500 text-white' :
                  publication.type === 'research-paper' ? 'bg-purple-500 text-white' :
                  publication.type === 'book' ? 'bg-orange-500 text-white' :
                  publication.type === 'report' ? 'bg-indigo-500 text-white' :
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
                    {{ publication.authors.map(a => a.name).join(', ') }}
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

      <!-- Section Formulaire de demande de publication -->
      <section class="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 relative overflow-hidden mt-12">
        <!-- Image d'arrière-plan subtile -->
        <div class="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Background"
            class="w-full h-full object-cover opacity-10"
          />
          <!-- Overlay sombre pour plus de profondeur -->
          <div class="absolute inset-0 bg-gray-900/5"></div>
          <!-- Motif décoratif -->
          <div class="absolute top-0 left-0 w-full h-full">
            <div class="absolute top-20 right-20 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 left-20 w-80 h-80 bg-blue-50/30 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <!-- En-tête -->
          <div class="text-center mb-10 sm:mb-12 fade-in-up" data-animate>
            <div class="inline-flex items-center gap-2 mb-4">
              <div class="w-8 h-0.5 bg-blue-600"></div>
              <span class="text-blue-600 text-xs font-semibold tracking-wider uppercase">{{ $t('publications.request.subtitle') }}</span>
              <div class="w-8 h-0.5 bg-blue-600"></div>
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 leading-tight">
              {{ $t('publications.request.title') }}
            </h2>
            <p class="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {{ $t('publications.request.description') }}
            </p>
          </div>
      
          <!-- Formulaire premium -->
          <div class="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden fade-in-up" data-animate>
            <!-- Barre supérieure décorative -->
            <div class="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
            
            <div class="p-8 sm:p-10 lg:p-12">
              <form @submit.prevent="submitPublicationRequest" class="space-y-6">
                <!-- Informations personnelles -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="group">
                    <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                      {{ $t('publications.request.name') }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      v-model="publicationRequestForm.name"
                      type="text"
                      required
                      class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white group-hover:border-gray-300"
                      :placeholder="$t('publications.request.namePlaceholder')"
                    />
                  </div>
                  <div class="group">
                    <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                      {{ $t('publications.request.email') }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      v-model="publicationRequestForm.email"
                      type="email"
                      required
                      class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white group-hover:border-gray-300"
                      :placeholder="$t('publications.request.emailPlaceholder')"
                    />
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="group">
                    <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                      {{ $t('publications.request.phone') }}
                    </label>
                    <input
                      v-model="publicationRequestForm.phone"
                      type="tel"
                      class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white group-hover:border-gray-300"
                      :placeholder="$t('publications.request.phonePlaceholder')"
                    />
                  </div>
                  <div class="group">
                    <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                      {{ $t('publications.request.institution') }}
                    </label>
                    <input
                      v-model="publicationRequestForm.institution"
                      type="text"
                      class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white group-hover:border-gray-300"
                      :placeholder="$t('publications.request.institutionPlaceholder')"
                    />
                  </div>
                </div>
                
                <div class="group">
                  <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                    {{ $t('publications.request.position') }}
                  </label>
                  <input
                    v-model="publicationRequestForm.position"
                    type="text"
                    class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white group-hover:border-gray-300"
                    :placeholder="$t('publications.request.positionPlaceholder')"
                  />
                </div>
                
                <!-- Informations sur le travail -->
                <div class="border-t border-gray-200 pt-6 mt-6">
                  <h3 class="text-lg font-bold text-gray-900 mb-4">Informations sur le travail de recherche</h3>
                  
                  <div class="group mb-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                      {{ $t('publications.request.title') }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      v-model="publicationRequestForm.title"
                      type="text"
                      required
                      class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white group-hover:border-gray-300"
                      :placeholder="$t('publications.request.titlePlaceholder')"
                    />
                  </div>
                  
                  <div class="group mb-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                      {{ $t('publications.request.abstract') }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      v-model="publicationRequestForm.abstract"
                      rows="6"
                      required
                      minlength="200"
                      class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white resize-none group-hover:border-gray-300"
                      :placeholder="$t('publications.request.abstractPlaceholder')"
                    ></textarea>
                    <p class="text-xs text-gray-500 mt-1">{{ publicationRequestForm.abstract.length }} / 200 caractères minimum</p>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="group">
                      <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                        {{ $t('publications.request.type') }}
                        <span class="text-red-500 ml-1">*</span>
                      </label>
                      <div class="relative">
                        <select
                          v-model="publicationRequestForm.type"
                          required
                          class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white group-hover:border-gray-300 appearance-none cursor-pointer pr-10"
                        >
                          <option value="">{{ $t('publications.request.selectType') }}</option>
                          <option value="article">{{ $t('publications.request.typeArticle') }}</option>
                          <option value="research-paper">{{ $t('publications.request.typeResearchPaper') }}</option>
                          <option value="book">{{ $t('publications.request.typeBook') }}</option>
                          <option value="report">{{ $t('publications.request.typeReport') }}</option>
                          <option value="other">{{ $t('publications.request.typeOther') }}</option>
                        </select>
                        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
                        </div>
                      </div>
                    </div>
                    
                    <div class="group">
                      <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                        {{ $t('publications.request.authors') }}
                        <span class="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        v-model="publicationRequestForm.authors"
                        type="text"
                        required
                        class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white group-hover:border-gray-300"
                        :placeholder="$t('publications.request.authorsPlaceholder')"
                      />
                    </div>
                  </div>
                  
                  <div class="group mb-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                      {{ $t('publications.request.domains') }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="domain in researchDomainsForForm"
                        :key="domain"
                        type="button"
                        @click="toggleDomainForForm(domain)"
                        :class="[
                          'px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 border-2',
                          publicationRequestForm.domains.includes(domain)
                            ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-700'
                        ]"
                      >
                        {{ domain }}
                        <i 
                          v-if="publicationRequestForm.domains.includes(domain)"
                          class="fas fa-check ml-1.5 text-xs"
                        ></i>
                      </button>
                    </div>
                    <p v-if="publicationRequestForm.domains.length === 0" class="text-xs text-red-500 mt-1">Sélectionnez au moins un domaine</p>
                  </div>
                  
                  <div class="group mb-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                      {{ $t('publications.request.keywords') }}
                    </label>
                    <input
                      v-model="publicationRequestForm.keywords"
                      type="text"
                      class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white group-hover:border-gray-300"
                      :placeholder="$t('publications.request.keywordsPlaceholder')"
                    />
                  </div>
                  
                  <div class="group">
                    <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                      {{ $t('publications.request.message') }}
                    </label>
                    <textarea
                      v-model="publicationRequestForm.message"
                      rows="4"
                      class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white resize-none group-hover:border-gray-300"
                      :placeholder="$t('publications.request.messagePlaceholder')"
                    ></textarea>
                  </div>
                </div>
                
                <div class="pt-2">
                  <button
                    type="submit"
                    class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <span>{{ $t('publications.request.submit') }}</span>
                    <i class="fas fa-paper-plane text-sm group-hover:translate-x-1 transition-transform duration-300"></i>
                  </button>
                  <p class="text-xs text-gray-500 text-center mt-4">
                    {{ $t('publications.request.consent') }}
                    <router-link to="/politique-confidentialite" class="text-blue-600 hover:underline">{{ $t('publications.request.privacyPolicy') }}</router-link>.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

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