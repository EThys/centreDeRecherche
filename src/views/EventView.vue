<template>
  <NavBarComponent/>
<header class="relative overflow-hidden bg-gradient-to-br pt-40 pb-16 from-blue-800/90 to-blue-600/90 py-24 w-full">
    <!-- Image de fond -->
    <div class="absolute inset-0 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        alt="Événements sur le Financement des PME"
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
      <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 animate-gradient-text">
        <span class="block">{{ $t('eventsPage.hero.title') }}</span>
        <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-blue-400 mt-2">
          {{ $t('eventsPage.hero.subtitle') }}
        </span>
      </h1>

      <!-- Sous-titre avec animation -->
      <p class="text-xl text-blue-50 max-w-3xl mx-auto mb-10 animate-fade-in">
        {{ $t('eventsPage.hero.description') }}
      </p>

      <!-- Statistiques -->
      <div class="flex flex-wrap justify-center gap-8 mb-8">
        <div class="text-center">
          <div class="text-3xl font-bold text-white">{{ upcomingEvents.length }}</div>
          <div class="text-blue-200 text-sm">{{ $t('eventsPage.stats.upcoming') }}</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-white">{{ pastEvents.length }}</div>
          <div class="text-blue-200 text-sm">{{ $t('eventsPage.stats.past') }}</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-white">{{ speakers.length }}</div>
          <div class="text-blue-200 text-sm">{{ $t('eventsPage.stats.experts') }}</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-white">{{ allEvents.length }}</div>
          <div class="text-blue-200 text-sm">{{ $t('eventsPage.stats.total') }}</div>
        </div>
      </div>
    </div>

    <!-- Forme décorative en bas -->
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-white/5 transform -skew-y-3 origin-bottom-left animate-wave"></div>
  </header>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Filters and Search -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <!-- Search Bar -->
          <div class="flex-1 w-full lg:max-w-md">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher des événements..."
                @input="resetPagination"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <!-- Event Type Filter -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="type in eventTypes"
              :key="type"
              @click="toggleEventType(type); resetPagination()"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                selectedEventTypes.includes(type)
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ type }}
            </button>
          </div>

          <!-- Status Filter -->
          <select
            v-model="statusFilter"
            @change="resetPagination"
            class="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="all">Tous les événements</option>
            <option value="upcoming">À venir</option>
            <option value="past">Passés</option>
          </select>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-8">
        <div class="flex items-center gap-2">
          <i class="fas fa-exclamation-circle"></i>
          <span>{{ error }}</span>
        </div>
      </div>

      <!-- Loading State with Shimmer -->
      <div v-else-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <ShimmerCard v-for="n in 6" :key="n" />
      </div>

      <!-- Events Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <article
          v-for="event in paginatedEvents"
          :key="event.id"
          class="group bg-white rounded-2xl border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
          @click="openEvent(event.id)"
        >
          <!-- Event Image -->
          <div class="relative h-56 overflow-hidden">
            <img
              :src="getEventImage(event.image)"
              :alt="event.title"
              class="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
              @error="(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }"
            />
            <!-- Event Status Badge -->
            <div 
              :class="[
                'absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg',
                event.status === 'upcoming' ? 'bg-blue-500' : 
                event.status === 'ongoing' ? 'bg-orange-500' : 'bg-gray-500'
              ]"
            >
              {{ event.status === 'upcoming' ? 'À venir' : 
                 event.status === 'ongoing' ? 'En cours' : 'Terminé' }}
            </div>
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg">
              {{ event.type }}
            </div>
            <!-- Event Date -->
            <div class="absolute bottom-4 left-4 bg-black/50 text-white text-sm px-3 py-2 rounded-lg">
              <div class="font-bold">{{ formatEventDate(event.startDate) }}</div>
              <div class="text-xs">{{ formatEventTime(event.startTime, event.endTime) }}</div>
            </div>
          </div>
          
          <!-- Event Content -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <span class="text-blue-500 text-sm font-medium flex items-center">
                <i class="fas fa-map-marker-alt mr-2"></i>
                {{ event.location }}
              </span>
              <span 
                :class="[
                  'text-sm flex items-center font-medium',
                  event.status === 'upcoming' ? 'text-blue-600' : 
                  event.status === 'ongoing' ? 'text-orange-600' : 'text-gray-500'
                ]"
              >
                <i class="fas fa-users mr-1"></i>
                {{ event.currentAttendees || 0 }}/{{ event.maxAttendees || 0 }}
              </span>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
              {{ event.title }}
            </h3>
            
            <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {{ event.description }}
            </p>

            <!-- Speakers -->
            <div v-if="event.speakers && event.speakers.length > 0" class="mb-4">
              <div class="flex items-center mb-2">
                <i class="fas fa-microphone text-blue-500 mr-2"></i>
                <span class="text-sm font-medium text-gray-700">Intervenants:</span>
              </div>
              <div class="flex -space-x-2">
                <div
                  v-for="speaker in event.speakers.slice(0, 3)"
                  :key="speaker.id || speaker.name"
                  class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-blue-600 bg-blue-100"
                  :title="speaker.name"
                >
                  <img
                    v-if="speaker.photo"
                    :src="getSpeakerPhoto(speaker.photo)"
                    :alt="speaker.name"
                    class="w-full h-full rounded-full object-cover"
                    @error="(e) => { (e.target as HTMLImageElement).style.display = 'none' }"
                  />
                  <span v-else class="text-xs">{{ speaker.name?.charAt(0) || '?' }}</span>
                </div>
                <div 
                  v-if="event.speakers.length > 3"
                  class="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-medium text-blue-600"
                >
                  +{{ event.speakers.length - 3 }}
                </div>
              </div>
            </div>
            
            <!-- Event Actions -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div class="text-blue-600 font-semibold text-sm">
                {{ !event.price || event.price === 0 ? 'Gratuit' : `${event.price} ${event.currency || 'USD'}` }}
              </div>
              <div class="text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform flex items-center">
                Voir détails
                <i class="fas fa-arrow-right ml-2"></i>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div v-if="!loading && filteredEvents.length > 0" class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <!-- Informations sur la pagination -->
        <div class="text-sm text-gray-600">
          Affichage de <span class="font-semibold">{{ startIndex + 1 }}</span> à 
          <span class="font-semibold">{{ endIndex }}</span> sur 
          <span class="font-semibold">{{ filteredEvents.length }}</span> événements
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
            v-model="eventsPerPage"
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
        v-if="!loading && filteredEvents.length === 0"
        class="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200"
      >
        <i class="fas fa-calendar-times text-6xl text-gray-300 mb-4"></i>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Aucun événement trouvé</h3>
        <p class="text-gray-600 mb-6">Essayez d'ajuster votre recherche ou vos critères de filtre</p>
        <button
          @click="clearFilters"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Effacer tous les filtres
        </button>
      </div>


    </div>
  </div>
  <FooterComponent/>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Event } from '@/models'
import eventService from '@/services/event.service'

const router = useRouter()

// Reactive data
const searchQuery = ref('')
const selectedEventTypes = ref<string[]>([])
const statusFilter = ref('all')
const currentPage = ref(1)
const eventsPerPage = ref(9)
const loading = ref(false)
const error = ref<string | null>(null)

//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'
// @ts-ignore
import ShimmerCard from '../components/ShimmerCard.vue'

// Events data from backend
const allEvents = ref<Event[]>([])

// Computed properties
const eventTypes = computed(() => {
  return [...new Set(allEvents.value.map(event => event.type))]
})

const upcomingEvents = computed(() => {
  return allEvents.value.filter(event => event.status === 'upcoming')
})

const pastEvents = computed(() => {
  return allEvents.value.filter(event => event.status === 'completed')
})

const speakers = computed(() => {
  const allSpeakers = allEvents.value.flatMap(event => event.speakers || [])
  // Utiliser un identifiant unique basé sur l'ID ou le nom
  const uniqueSpeakers = new Map()
  allSpeakers.forEach(speaker => {
    const key = speaker.id || speaker.name || `${speaker.position}-${speaker.organization}`
    if (!uniqueSpeakers.has(key)) {
      uniqueSpeakers.set(key, speaker)
    }
  })
  return Array.from(uniqueSpeakers.values())
})

const filteredEvents = computed(() => {
  let filtered = allEvents.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query) ||
      (event.speakers && event.speakers.some(speaker => speaker.name.toLowerCase().includes(query)))
    )
  }

  // Filter by event types
  if (selectedEventTypes.value.length > 0) {
    filtered = filtered.filter(event => 
      selectedEventTypes.value.includes(event.type)
    )
  }

  // Filter by status
  if (statusFilter.value !== 'all') {
    if (statusFilter.value === 'past') {
      filtered = filtered.filter(event => event.status === 'completed')
    } else {
      filtered = filtered.filter(event => event.status === statusFilter.value)
    }
  }

  // Sort events by date (upcoming first)
  filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  return filtered
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredEvents.value.length / eventsPerPage.value))

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * eventsPerPage.value
  const end = start + eventsPerPage.value
  return filteredEvents.value.slice(start, end)
})

const startIndex = computed(() => (currentPage.value - 1) * eventsPerPage.value)

const endIndex = computed(() => {
  const end = startIndex.value + eventsPerPage.value
  return end > filteredEvents.value.length ? filteredEvents.value.length : end
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

const goToPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


// Methods
const toggleEventType = (type: string) => {
  const index = selectedEventTypes.value.indexOf(type)
  if (index > -1) {
    selectedEventTypes.value.splice(index, 1)
  } else {
    selectedEventTypes.value.push(type)
  }
  currentPage.value = 1
}


const clearFilters = () => {
  searchQuery.value = ''
  selectedEventTypes.value = []
  statusFilter.value = 'all'
  currentPage.value = 1
}

const resetPagination = () => {
  currentPage.value = 1
}

const formatEventDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    })
  } catch {
    return dateString
  }
}

const formatEventTime = (startTime: string | undefined, endTime: string | undefined) => {
  const formatTime = (timeStr: string | undefined) => {
    if (!timeStr) return ''
    const time = timeStr.trim()
    if (time.includes(':')) {
      const parts = time.split(':')
      if (parts.length >= 2) {
        const hours = parseInt(parts[0], 10)
        const minutes = parts[1].padStart(2, '0')
        return `${hours}:${minutes}`
      }
    }
    return time
  }
  
  if (!startTime) return ''
  const formattedStart = formatTime(startTime)
  if (endTime) {
    const formattedEnd = formatTime(endTime)
    return `${formattedStart} - ${formattedEnd}`
  }
  return formattedStart
}

const getEventImage = (image?: string | null): string => {
  if (!image) {
    return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
  return eventService.getImageUrl(image) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
}

const getSpeakerPhoto = (photo?: string | null): string => {
  if (!photo) return ''
  // Si c'est déjà une URL complète, forcer HTTPS pour éviter Mixed Content
  if (photo.startsWith('http://')) {
    // Convertir HTTP en HTTPS
    return photo.replace(/^http:\/\//i, 'https://')
  }
  if (photo.startsWith('https://')) {
    return photo
  }
  // Sinon, utiliser le service pour construire l'URL
  return eventService.getImageUrl(photo)
}

const openEvent = (eventId: string | number | undefined) => {
  if (!eventId) return
  router.push(`/events/${eventId}`)
}

// Load events from backend
const loadEvents = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await eventService.getEvents({
      limit: 100, // Charger un grand nombre pour avoir tous les événements
    })
    
    // Déterminer le statut des événements basé sur la date
    const now = new Date()
    allEvents.value = result.data.map(event => {
      // Si le statut n'est pas défini ou est 'upcoming', déterminer le statut basé sur la date
      if (!event.status || event.status === 'upcoming') {
        try {
          const eventDate = new Date(event.startDate)
          if (isNaN(eventDate.getTime())) {
            return { ...event, status: 'upcoming' as const }
          }
          
          // Comparer la date (sans l'heure)
          const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())
          const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          
          if (eventDateOnly < nowDateOnly) {
            return { ...event, status: 'completed' as const }
          } else if (eventDateOnly.getTime() === nowDateOnly.getTime()) {
            return { ...event, status: 'ongoing' as const }
          } else {
            return { ...event, status: 'upcoming' as const }
          }
        } catch {
          return { ...event, status: 'upcoming' as const }
        }
      }
      return event
    })
  } catch (err: any) {
    error.value = err.message || 'Erreur lors du chargement des événements'
    console.error('Erreur:', err)
    allEvents.value = []
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadEvents()
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

/* Animations */
@keyframes blob-slow {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  25% { transform: translate(20px, -20px) scale(1.1); }
  50% { transform: translate(-20px, 20px) scale(0.9); }
  75% { transform: translate(20px, 20px) scale(1.05); }
}

@keyframes blob-fast {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  25% { transform: translate(-30px, 15px) scale(1.05); }
  50% { transform: translate(15px, -30px) scale(0.95); }
  75% { transform: translate(-15px, 30px) scale(1.1); }
}

@keyframes gradient-text {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes wave {
  0%, 100% { transform: -skew-y-3 scaleY(1); }
  50% { transform: -skew-y-3 scaleY(1.1); }
}

.animate-blob-slow {
  animation: blob-slow 7s infinite;
}

.animate-blob-fast {
  animation: blob-fast 5s infinite;
}

.animate-gradient-text {
  background-size: 200% 200%;
  animation: gradient-text 3s ease infinite;
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-wave {
  animation: wave 3s ease-in-out infinite;
}

/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>