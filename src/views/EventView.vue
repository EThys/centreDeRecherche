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
        <span class="block">Événements & Conférences</span>
        <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-blue-400 mt-2">
          Financement des PME en RDC
        </span>
      </h1>

      <!-- Sous-titre avec animation -->
      <p class="text-xl text-blue-50 max-w-3xl mx-auto mb-10 animate-fade-in">
        Participez à nos <strong class="text-white">événements exclusifs</strong>, 
        conférences et ateliers sur le financement des petites et moyennes entreprises 
        en République Démocratique du Congo.
      </p>

      <!-- Statistiques -->
      <div class="flex flex-wrap justify-center gap-8 mb-8">
        <div class="text-center">
          <div class="text-3xl font-bold text-white">{{ upcomingEvents.length }}</div>
          <div class="text-blue-200 text-sm">Événements à Venir</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-white">{{ pastEvents.length }}</div>
          <div class="text-blue-200 text-sm">Événements Passés</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-white">{{ speakers.length }}</div>
          <div class="text-blue-200 text-sm">Experts Invités</div>
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
              @click="toggleEventType(type)"
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
            class="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="all">Tous les événements</option>
            <option value="upcoming">À venir</option>
            <option value="past">Passés</option>
          </select>
        </div>
      </div>

      <!-- Events Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <article
          v-for="event in filteredEvents"
          :key="event.id"
          class="group bg-white rounded-2xl border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
          @click="openEvent(event.id)"
        >
          <!-- Event Image -->
          <div class="relative h-56 overflow-hidden">
            <img
              :src="event.image"
              :alt="event.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                <img
                  v-for="speaker in event.speakers.slice(0, 3)"
                  :key="speaker.id"
                  :src="speaker.photo"
                  :alt="speaker.name"
                  class="w-8 h-8 rounded-full border-2 border-white object-cover"
                  :title="speaker.name"
                />
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

      <!-- Load More Button -->
      <div v-if="showLoadMore" class="text-center mb-12">
        <button
          @click="loadMoreEvents"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Charger plus d'événements
        </button>
      </div>

      <!-- No Results -->
      <div
        v-if="filteredEvents.length === 0"
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

const router = useRouter()

// Reactive data
const searchQuery = ref('')
const selectedEventTypes = ref<string[]>([])
const statusFilter = ref('all')
const currentPage = ref(1)
const eventsPerPage = 9

//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'

// Sample events data
const allEvents = ref<Event[]>([
  // {
  //   id: 1,
  //   title: "Conférence Nationale sur le Financement des PME",
  //   description: "Une conférence majeure réunissant les acteurs clés du financement des PME en RDC pour discuter des défis et opportunités.",
  //   content: "Une conférence majeure réunissant les acteurs clés du financement des PME en RDC pour discuter des défis et opportunités. Cette conférence abordera les enjeux actuels du financement des PME.",
  //   image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //   startDate: "2025-12-15",
  //   startTime: "09:00",
  //   endTime: "17:00",
  //   location: "Kinshasa, Hôtel du Gouvernement",
  //   address: "Hôtel du Gouvernement, Kinshasa",
  //   type: "conference",
  //   status: "upcoming",
  //   price: 150,
  //   currency: "USD",
  //   maxAttendees: 300,
  //   currentAttendees: 245,
  //   registrationRequired: true,
  //   speakers: [
  //     { id: 1, name: "Dr. Jean Kabila", position: "Ministre des PME", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" },
  //     { id: 2, name: "Marie Lumbu", position: "Directrice Banque Centrale", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" }
  //   ]
  // },
  // {
  //   id: 2,
  //   title: "Atelier Pratique: Préparer son Business Plan",
  //   description: "Session interactive pour apprendre à créer un business plan convaincant pour les investisseurs.",
  //   image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //   startDate: "2025-11-25",
  //   startTime: "14:00",
  //   endTime: "18:00",
  //   location: "Lubumbashi, Centre des Affaires",
  //   type: "workshop",
  //   status: "upcoming",
  //   price: 50,
  //   maxAttendees: 50,
  //   currentAttendees: 32,
  //   speakers: [
  //     { id: 3, name: "Pierre Mbayo", position: "Consultant en Finance", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" }
  //   ]
  // },
  // {
  //   id: 3,
  //   title: "Table Ronde: Innovation Financière pour PME",
  //   description: "Discussion sur les nouvelles solutions de financement digital et les fintech en RDC.",
  //   image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //   startDate: "2025-11-20",
  //   startTime: "10:00",
  //   endTime: "12:30",
  //   location: "En Ligne",
  //   type: "webinar",
  //   status: "upcoming",
  //   price: 0,
  //   maxAttendees: 500,
  //   currentAttendees: 387,
  //   speakers: [
  //     { id: 4, name: "Sarah Ntumba", position: "CEO FinTech RDC", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" },
  //     { id: 5, name: "David Mukendi", position: "Expert Digital", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" }
  //   ]
  // },
  // {
  //   id: 4,
  //   title: "Forum des Investisseurs PME 2025",
  //   description: "Rencontre entre entrepreneurs et investisseurs potentiels pour des opportunités de financement.",
  //   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //   startDate: "2025-10-30",
  //   startTime: "08:30",
  //   endTime: "16:00",
  //   location: "Goma, Centre de Conférences",
  //   type: "other",
  //   status: "completed",
  //   price: 100,
  //   maxAttendees: 200,
  //   currentAttendees: 180,
  //   registrationRequired: true,
  //   speakers: [
  //     { id: 6, name: "Luc Tshibanda", position: "Investisseur Privé", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" }
  //   ]
  // },
  // {
  //   id: 5,
  //   title: "Formation: Gestion de Trésorerie PME",
  //   description: "Formation intensive sur les techniques de gestion de trésorerie pour les dirigeants de PME.",
  //   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //   startDate: "2025-10-20",
  //   startTime: "09:00",
  //   endTime: "16:00",
  //   location: "Kinshasa, Centre de Formation",
  //   type: "workshop",
  //   status: "completed",
  //   price: 75,
  //   maxAttendees: 40,
  //   currentAttendees: 35,
  //   registrationRequired: true,
  //   speakers: [
  //     { id: 7, name: "Dr. Amina Koffi", position: "Expert Comptable", photo: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" }
  //   ]
  // },
  // {
  //   id: 6,
  //   title: "Séminaire International Financement Agricole",
  //   description: "Focus sur les solutions de financement pour les PME du secteur agricole en RDC.",
  //   image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //   startDate: "2025-12-05",
  //   startTime: "08:00",
  //   endTime: "13:00",
  //   location: "Kisangani, Hôtel des Chutes",
  //   type: "seminar",
  //   status: "upcoming",
  //   price: 0,
  //   maxAttendees: 150,
  //   currentAttendees: 89,
  //   registrationRequired: false,
  //   speakers: [
  //     { id: 8, name: "Prof. Joseph Lelo", position: "Expert Agricole", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" }
  //   ]
  // }
])

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
  return [...new Map(allSpeakers.map(speaker => [speaker.id, speaker])).values()]
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
    filtered = filtered.filter(event => event.status === statusFilter.value)
  }

  // Sort events by date (upcoming first)
  filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  // Pagination
  const startIndex = (currentPage.value - 1) * eventsPerPage
  return filtered.slice(0, startIndex + eventsPerPage)
})

const showLoadMore = computed(() => {
  const totalFiltered = allEvents.value.filter(event => {
    const matchesSearch = !searchQuery.value || 
      event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesType = selectedEventTypes.value.length === 0 || 
      selectedEventTypes.value.includes(event.type)
    
    const matchesStatus = statusFilter.value === 'all' || 
      event.status === statusFilter.value
    
    return matchesSearch && matchesType && matchesStatus
  }).length

  return filteredEvents.value.length < totalFiltered
})

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

const loadMoreEvents = () => {
  currentPage.value++
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedEventTypes.value = []
  statusFilter.value = 'all'
  currentPage.value = 1
}

const formatEventDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short'
  })
}

const formatEventTime = (startTime: string | undefined, endTime: string | undefined) => {
  if (!startTime || !endTime) return ''
  return `${startTime} - ${endTime}`
}

const openEvent = (eventId: string | number | undefined) => {
  if (!eventId) return
  router.push(`/events/${eventId}`)
}

// Lifecycle
onMounted(() => {
  // Initialization if needed
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