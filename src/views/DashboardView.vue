<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
    <div class="flex">
      <!-- Sidebar Professionnelle -->
      <aside 
        class="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-white to-slate-50/50 backdrop-blur-2xl border-r border-slate-200/80 shadow-2xl shadow-slate-900/5 z-40 transition-all duration-500 ease-out"
        :class="{ '-translate-x-full lg:translate-x-0': !sidebarOpen, 'translate-x-0': sidebarOpen }"
      >
        <!-- Sidebar Content avec scroll personnalisé -->
        <div class="h-full flex flex-col overflow-y-auto custom-scrollbar">
          <!-- Header Sidebar avec Logo -->
          <div class="p-6 pb-4 border-b border-slate-200/60 bg-gradient-to-r from-blue-600/5 to-indigo-600/5">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <i class="fas fa-chart-line text-white text-lg"></i>
              </div>
              <div>
                <h2 class="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
                <p class="text-xs text-slate-500 font-medium">CReFF-PME</p>
              </div>
            </div>
          </div>

          <!-- Navigation Menu -->
          <nav class="flex-1 p-4 space-y-1">
            <button
              v-for="item in menuItems"
              :key="item.id"
              @click="activeSection = item.id; sidebarOpen = false"
              class="w-full group relative"
            >
              <div
                class="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden"
              :class="activeSection === item.id 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/40 scale-[1.02]' 
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-blue-600 hover:translate-x-1'"
            >
                <!-- Indicateur actif -->
                <div 
                  v-if="activeSection === item.id"
                  class="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                ></div>
                
                <!-- Icône -->
                <div 
                  class="w-5 h-5 flex items-center justify-center transition-transform duration-300"
                  :class="activeSection === item.id ? 'scale-110' : 'group-hover:scale-110'"
                >
                  <i :class="item.icon" class="text-base"></i>
                </div>
                
                <!-- Label -->
                <span class="font-semibold text-sm tracking-wide flex-1 text-left">
                  {{ item.label }}
                </span>
                
                <!-- Badge -->
              <span 
                v-if="item.badge" 
                  class="ml-auto px-2.5 py-1 rounded-full text-xs font-bold min-w-[24px] text-center transition-all duration-300"
                  :class="activeSection === item.id 
                    ? 'bg-white/20 text-white backdrop-blur-sm' 
                    : 'bg-red-500 text-white shadow-md shadow-red-500/30 group-hover:scale-110'"
              >
                {{ item.badge }}
              </span>
              </div>
            </button>
          </nav>

          <!-- Footer Sidebar avec Logout -->
          <div class="p-4 pt-2 border-t border-slate-200/60 bg-gradient-to-t from-slate-50/50 to-transparent">
            <div class="mb-3 px-4">
              <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 border border-slate-200/60">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                  <i class="fas fa-user text-white text-sm"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-slate-900 truncate">Administrateur</p>
                  <p class="text-xs text-slate-500 truncate">creff.pme.uk@gmail.com</p>
                </div>
              </div>
            </div>
            
            <button
              @click="handleLogout"
              class="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300 group border border-transparent hover:border-red-200"
            >
              <div class="w-5 h-5 flex items-center justify-center">
                <i class="fas fa-sign-out-alt text-base group-hover:translate-x-0.5 transition-transform"></i>
              </div>
              <span class="font-semibold text-sm">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      <!-- Overlay pour mobile -->
      <div 
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
      ></div>

      <!-- Main Content -->
      <main class="flex-1 ml-0 lg:ml-72 transition-all duration-500">
        <!-- Header Professionnel -->
        <header class="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm z-30">
          <div class="px-4 sm:px-6 lg:px-8 py-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
            <button
              @click="sidebarOpen = !sidebarOpen"
                  class="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-all duration-200 hover:scale-105"
            >
                  <i class="fas fa-bars text-lg"></i>
            </button>
                <div>
                  <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
              {{ getCurrentSectionLabel() }}
            </h1>
                  <p class="text-sm text-slate-500 mt-0.5">Gestion et administration</p>
                </div>
              </div>
              
            <div class="flex items-center gap-4">
                <!-- Notifications -->
                <button class="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-all duration-200 hover:scale-105">
                  <i class="fas fa-bell text-lg"></i>
                  <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>
                
                <!-- User Info -->
                <div class="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <i class="fas fa-user text-white text-xs"></i>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-slate-900">Admin</p>
                    <p class="text-xs text-slate-500">En ligne</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Stats Cards Améliorées -->
        <div v-if="activeSection === 'overview'" class="p-4 sm:p-6 lg:p-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div 
              v-for="stat in stats"
              :key="stat.id"
              class="group relative bg-white rounded-2xl p-6 shadow-lg shadow-slate-900/5 border border-slate-200/60 hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <!-- Gradient overlay au hover -->
              <div class="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/0 group-hover:to-blue-50/30 transition-all duration-300 pointer-events-none"></div>
              
              <div class="relative">
              <div class="flex items-center justify-between mb-4">
                  <div class="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  :class="stat.bgColor"
                >
                    <i :class="[stat.icon, stat.iconColor, 'text-2xl']"></i>
                </div>
                <span 
                    class="text-xs font-bold px-2.5 py-1 rounded-full shadow-sm"
                  :class="stat.badgeColor"
                >
                  {{ stat.change }}
                </span>
              </div>
                <h3 class="text-3xl font-bold text-slate-900 mb-1.5 tracking-tight">{{ stat.value }}</h3>
                <p class="text-sm font-medium text-slate-600">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <!-- Quick Actions Améliorées -->
          <div class="bg-white rounded-2xl p-6 shadow-lg shadow-slate-900/5 border border-slate-200/60 mb-8">
            <div class="flex items-center gap-2 mb-6">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
              <h3 class="text-xl font-bold text-slate-900">Actions rapides</h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                v-for="action in quickActions"
                :key="action.id"
                @click="activeSection = action.section"
                class="group flex items-center gap-4 p-5 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
              >
                <div class="w-12 h-12 rounded-xl bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <i :class="[action.icon, 'text-blue-600 group-hover:text-white text-lg transition-colors']"></i>
                </div>
                <span class="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{{ action.label }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Dynamic Content -->
        <div class="p-4 sm:p-6 lg:p-8">
          <!-- Events Section -->
          <DashboardEvents v-if="activeSection === 'events'" />

          <!-- Event Registrations Section -->
          <DashboardEventRegistrations v-if="activeSection === 'event-registrations'" />

          <!-- Actualites Section -->
          <DashboardActualites v-if="activeSection === 'actualites'" />

          <!-- Gallery Section -->
          <DashboardGallery v-if="activeSection === 'gallery'" />

          <!-- Newsletter Section -->
          <DashboardNewsletter v-if="activeSection === 'newsletter'" />

          <!-- Financing Requests Section -->
          <DashboardFinancing v-if="activeSection === 'financing'" />

          <!-- Training Registrations Section -->
          <DashboardTraining v-if="activeSection === 'training'" />

          <!-- Publication Requests Section -->
          <DashboardPublications v-if="activeSection === 'publications'" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import newsletterService from '@/services/newsletter.service'
import financingRequestService from '@/services/financing-request.service'
import trainingRegistrationService from '@/services/training-registration.service'
import publicationRequestService from '@/services/publication-request.service'
import eventService from '@/services/event.service'
import actualityService from '@/services/actuality.service'
import galleryService from '@/services/gallery.service'
//@ts-ignore
import DashboardEvents from '../components/dashboard/DashboardEvents.vue'
//@ts-ignore
import DashboardEventRegistrations from '../components/dashboard/DashboardEventRegistrations.vue'
//@ts-ignore
import DashboardActualites from '../components/dashboard/DashboardActualites.vue'
//@ts-ignore
import DashboardGallery from '../components/dashboard/DashboardGallery.vue'
//@ts-ignore
import DashboardNewsletter from '../components/dashboard/DashboardNewsletter.vue'
//@ts-ignore
import DashboardFinancing from '../components/dashboard/DashboardFinancing.vue'
//@ts-ignore
import DashboardTraining from '../components/dashboard/DashboardTraining.vue'
//@ts-ignore
import DashboardPublications from '../components/dashboard/DashboardPublications.vue'

const router = useRouter()
const sidebarOpen = ref(false)
const activeSection = ref('overview')

// Compteurs pour les badges
const newsletterCount = ref(0)
const financingCount = ref(0)
const trainingCount = ref(0)
const publicationsCount = ref(0)
const eventRegistrationsCount = ref(0)

// Compteurs pour les stats de la vue d'ensemble
const eventsCount = ref(0)
const actualitiesCount = ref(0)
const photosCount = ref(0)
const messagesCount = ref(0)

// Valeurs précédentes pour calculer les pourcentages
const previousEventsCount = ref(0)
const previousActualitiesCount = ref(0)
const previousPhotosCount = ref(0)
const previousMessagesCount = ref(0)

// Menu items avec badges dynamiques
const menuItems = computed(() => [
  { id: 'overview', label: 'Vue d\'ensemble', icon: 'fas fa-home', badge: null },
  { id: 'events', label: 'Événements', icon: 'fas fa-calendar-alt', badge: null },
  { id: 'event-registrations', label: 'Inscriptions Événements', icon: 'fas fa-user-check', badge: eventRegistrationsCount.value > 0 ? eventRegistrationsCount.value.toString() : null },
  { id: 'actualites', label: 'Actualités', icon: 'fas fa-newspaper', badge: null },
  { id: 'gallery', label: 'Galerie', icon: 'fas fa-images', badge: null },
  { id: 'newsletter', label: 'Newsletter', icon: 'fas fa-envelope', badge: newsletterCount.value > 0 ? newsletterCount.value.toString() : null },
  { id: 'financing', label: 'Demandes Financement', icon: 'fas fa-hand-holding-usd', badge: financingCount.value > 0 ? financingCount.value.toString() : null },
  { id: 'training', label: 'Inscriptions Formation', icon: 'fas fa-user-graduate', badge: trainingCount.value > 0 ? trainingCount.value.toString() : null },
  { id: 'publications', label: 'Demandes Publication', icon: 'fas fa-file-alt', badge: publicationsCount.value > 0 ? publicationsCount.value.toString() : null },
])

// Fonction pour calculer le pourcentage de changement
const calculateChange = (current: number, previous: number): string => {
  if (previous === 0) {
    return current > 0 ? '+100%' : '0%'
  }
  const change = ((current - previous) / previous) * 100
  const sign = change >= 0 ? '+' : ''
  return `${sign}${Math.round(change)}%`
}

// Stats avec design amélioré - dynamiques
const stats = computed(() => [
  {
    id: 'events',
    label: 'Événements',
    value: eventsCount.value.toString(),
    change: calculateChange(eventsCount.value, previousEventsCount.value),
    icon: 'fas fa-calendar-alt',
    bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
    iconColor: 'text-blue-600',
    badgeColor: eventsCount.value >= previousEventsCount.value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
  },
  {
    id: 'actualites',
    label: 'Actualités',
    value: actualitiesCount.value.toString(),
    change: calculateChange(actualitiesCount.value, previousActualitiesCount.value),
    icon: 'fas fa-newspaper',
    bgColor: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
    iconColor: 'text-indigo-600',
    badgeColor: actualitiesCount.value >= previousActualitiesCount.value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
  },
  {
    id: 'messages',
    label: 'Messages',
    value: messagesCount.value.toString(),
    change: calculateChange(messagesCount.value, previousMessagesCount.value),
    icon: 'fas fa-envelope',
    bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
    iconColor: 'text-purple-600',
    badgeColor: messagesCount.value >= previousMessagesCount.value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
  },
  {
    id: 'photos',
    label: 'Photos',
    value: photosCount.value.toString(),
    change: calculateChange(photosCount.value, previousPhotosCount.value),
    icon: 'fas fa-images',
    bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200',
    iconColor: 'text-pink-600',
    badgeColor: photosCount.value >= previousPhotosCount.value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
  }
])

// Quick actions
const quickActions = ref([
  { id: '1', label: 'Nouvel événement', icon: 'fas fa-plus-circle', section: 'events' },
  { id: '2', label: 'Nouvelle actualité', icon: 'fas fa-plus-circle', section: 'actualites' },
  { id: '3', label: 'Ajouter photo', icon: 'fas fa-plus-circle', section: 'gallery' },
  { id: '4', label: 'Voir messages', icon: 'fas fa-envelope', section: 'newsletter' },
])

const getCurrentSectionLabel = () => {
  const item = menuItems.value.find(item => item.id === activeSection.value)
  return item ? item.label : 'Dashboard'
}

const handleLogout = () => {
  // TODO: Implémenter la déconnexion
  router.push('/')
}

// Gestion responsive de la sidebar
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      sidebarOpen.value = true
    } else {
      sidebarOpen.value = false
    }
  }

// Fermer la sidebar si on clique en dehors sur mobile
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (window.innerWidth < 1024 && sidebarOpen.value && !target.closest('aside') && !target.closest('button')) {
    sidebarOpen.value = false
  }
}

// Charger les stats de la vue d'ensemble
const loadOverviewStats = async () => {
  try {
    // Sauvegarder les valeurs précédentes
    previousEventsCount.value = eventsCount.value
    previousActualitiesCount.value = actualitiesCount.value
    previousPhotosCount.value = photosCount.value
    previousMessagesCount.value = messagesCount.value

    // Événements
    try {
      const eventsResult = await eventService.getEvents({ limit: 1000 })
      eventsCount.value = eventsResult.pagination?.total || eventsResult.data.length
    } catch (err) {
      console.error('Erreur lors du chargement des événements:', err)
      eventsCount.value = 0
    }

    // Actualités
    try {
      const actualitiesResult = await actualityService.getActualities({ limit: 1000 })
      actualitiesCount.value = actualitiesResult.pagination?.total || actualitiesResult.data.length
    } catch (err) {
      console.error('Erreur lors du chargement des actualités:', err)
      actualitiesCount.value = 0
    }

    // Photos (Galerie)
    try {
      const photosResult = await galleryService.getPhotos({ limit: 1000 })
      photosCount.value = photosResult.pagination?.total || photosResult.data.length
    } catch (err) {
      console.error('Erreur lors du chargement des photos:', err)
      photosCount.value = 0
    }

    // Messages (Newsletter - toutes les inscriptions)
    try {
      const newsletterResult = await newsletterService.getAllSubscribers({ limit: 1000 })
      messagesCount.value = newsletterResult.data.length
    } catch (err) {
      console.error('Erreur lors du chargement des messages:', err)
      messagesCount.value = 0
    }
  } catch (err) {
    console.error('Erreur lors du chargement des stats:', err)
  }
}

// Charger les compteurs de notifications
const loadNotificationCounts = async () => {
  try {
    // Newsletter - compter toutes les inscriptions actives (pour notification)
    try {
      const newsletterResult = await newsletterService.getAllSubscribers({ status: 'active', limit: 1000 })
      // On compte toutes les inscriptions actives comme nouvelles notifications
      newsletterCount.value = newsletterResult.data.length
    } catch (err) {
      console.error('Erreur lors du chargement des newsletters:', err)
      newsletterCount.value = 0
    }

    // Demandes de financement - en attente (submitted ou under-review)
    try {
      const financingSubmitted = await financingRequestService.getRequests({ status: 'submitted', limit: 1000 })
      const financingUnderReview = await financingRequestService.getRequests({ status: 'under-review', limit: 1000 })
      financingCount.value = financingSubmitted.data.length + financingUnderReview.data.length
    } catch (err) {
      console.error('Erreur lors du chargement des demandes de financement:', err)
      financingCount.value = 0
    }

    // Inscriptions aux formations - en attente
    try {
      const trainingResult = await trainingRegistrationService.getRegistrations({ status: 'pending', limit: 1000 })
      trainingCount.value = trainingResult.data.length
    } catch (err) {
      console.error('Erreur lors du chargement des inscriptions aux formations:', err)
      trainingCount.value = 0
    }

    // Demandes de publication - en attente
    try {
      const publicationsResult = await publicationRequestService.getRequests({ status: 'pending', limit: 1000 })
      publicationsCount.value = publicationsResult.data.length
    } catch (err) {
      console.error('Erreur lors du chargement des demandes de publication:', err)
      publicationsCount.value = 0
    }

    // Inscriptions aux événements - en attente
    try {
      const eventRegistrationsResult = await eventService.getAllRegistrations({ status: 'pending', limit: 1000 })
      eventRegistrationsCount.value = eventRegistrationsResult.data.length
    } catch (err) {
      console.error('Erreur lors du chargement des inscriptions aux événements:', err)
      eventRegistrationsCount.value = 0
    }
  } catch (err) {
    console.error('Erreur lors du chargement des compteurs:', err)
  }
}

// Recharger les compteurs toutes les 30 secondes
let notificationInterval: number | null = null

onMounted(async () => {
  handleResize()
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', handleClickOutside)
  
  // Charger les stats de la vue d'ensemble initialement
  await loadOverviewStats()
  
  // Charger les compteurs initialement
  loadNotificationCounts()
  
  // Écouter les événements de mise à jour des notifications
  window.addEventListener('dashboard:update-notifications', () => {
    loadNotificationCounts()
    loadOverviewStats()
  })
  
  // Écouter les événements de mise à jour des stats
  window.addEventListener('dashboard:update-stats', loadOverviewStats)
  
  // Recharger toutes les 30 secondes
  notificationInterval = window.setInterval(() => {
    loadNotificationCounts()
    loadOverviewStats()
  }, 30000)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('dashboard:update-notifications', loadNotificationCounts)
  window.removeEventListener('dashboard:update-stats', loadOverviewStats)
  
  if (notificationInterval) {
    clearInterval(notificationInterval)
  }
})
</script>

<style scoped>
/* Scrollbar personnalisé pour la sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #94a3b8, #64748b);
}

/* Pour Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

/* Amélioration des transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Effet de brillance sur les boutons actifs */
button:active {
  transform: scale(0.98);
}
</style>

