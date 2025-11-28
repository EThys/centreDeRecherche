<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
    <!-- Navbar -->
    <NavBarComponent />

    <div class="flex pt-20 sm:pt-24">
      <!-- Sidebar -->
      <aside 
        class="fixed left-0 top-20 sm:top-24 h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] w-64 bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-lg z-40 transition-all duration-300"
        :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }"
      >
        <div class="p-6">
          <!-- Logo Dashboard -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
            <p class="text-sm text-gray-500">CReFF-PME Admin</p>
          </div>

          <!-- Navigation -->
          <nav class="space-y-2">
            <button
              v-for="item in menuItems"
              :key="item.id"
              @click="activeSection = item.id; sidebarOpen = false"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group"
              :class="activeSection === item.id 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30' 
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'"
            >
              <i :class="item.icon" class="w-5 h-5"></i>
              <span class="font-medium">{{ item.label }}</span>
              <span 
                v-if="item.badge" 
                class="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
              >
                {{ item.badge }}
              </span>
            </button>
          </nav>

          <!-- Logout -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <button
              @click="handleLogout"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
            >
              <i class="fas fa-sign-out-alt w-5 h-5"></i>
              <span class="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      <!-- Overlay pour mobile -->
      <div 
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 bg-black/50 z-30 lg:hidden"
      ></div>

      <!-- Main Content -->
      <main class="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <!-- Header avec menu mobile -->
        <header class="sticky top-20 sm:top-24 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm z-30">
          <div class="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <i class="fas fa-bars text-xl"></i>
            </button>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ getCurrentSectionLabel() }}
            </h1>
            <div class="flex items-center gap-4">
              <div class="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <i class="fas fa-user-circle text-blue-600"></i>
                <span>Admin</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Stats Cards -->
        <div v-if="activeSection === 'overview'" class="p-4 sm:p-6 lg:p-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div 
              v-for="stat in stats"
              :key="stat.id"
              class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                  :class="stat.bgColor"
                >
                  <i :class="[stat.icon, stat.iconColor, 'text-xl']"></i>
                </div>
                <span 
                  class="text-xs font-semibold px-2 py-1 rounded-full"
                  :class="stat.badgeColor"
                >
                  {{ stat.change }}
                </span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">{{ stat.value }}</h3>
              <p class="text-sm text-gray-600">{{ stat.label }}</p>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Actions rapides</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                v-for="action in quickActions"
                :key="action.id"
                @click="activeSection = action.section"
                class="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
              >
                <i :class="action.icon" class="text-blue-600 text-xl group-hover:scale-110 transition-transform"></i>
                <span class="font-medium text-gray-900">{{ action.label }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Dynamic Content -->
        <div class="p-4 sm:p-6 lg:p-8">
          <!-- Events Section -->
          <DashboardEvents v-if="activeSection === 'events'" />

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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import DashboardEvents from '../components/dashboard/DashboardEvents.vue'
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

// Menu items
const menuItems = ref([
  { id: 'overview', label: 'Vue d\'ensemble', icon: 'fas fa-home', badge: null },
  { id: 'events', label: 'Événements', icon: 'fas fa-calendar-alt', badge: null },
  { id: 'actualites', label: 'Actualités', icon: 'fas fa-newspaper', badge: null },
  { id: 'gallery', label: 'Galerie', icon: 'fas fa-images', badge: null },
  { id: 'newsletter', label: 'Newsletter', icon: 'fas fa-envelope', badge: '12' },
  { id: 'financing', label: 'Demandes Financement', icon: 'fas fa-hand-holding-usd', badge: '5' },
  { id: 'training', label: 'Inscriptions Formation', icon: 'fas fa-user-graduate', badge: '8' },
  { id: 'publications', label: 'Demandes Publication', icon: 'fas fa-file-alt', badge: '3' },
])

// Stats
const stats = ref([
  {
    id: 'events',
    label: 'Événements',
    value: '24',
    change: '+12%',
    icon: 'fas fa-calendar-alt',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badgeColor: 'bg-green-100 text-green-700'
  },
  {
    id: 'actualites',
    label: 'Actualités',
    value: '48',
    change: '+8%',
    icon: 'fas fa-newspaper',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    badgeColor: 'bg-green-100 text-green-700'
  },
  {
    id: 'messages',
    label: 'Messages',
    value: '28',
    change: '+15%',
    icon: 'fas fa-envelope',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    badgeColor: 'bg-green-100 text-green-700'
  },
  {
    id: 'photos',
    label: 'Photos',
    value: '156',
    change: '+23%',
    icon: 'fas fa-images',
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-600',
    badgeColor: 'bg-green-100 text-green-700'
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

onMounted(() => {
  // Détecter la taille de l'écran
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      sidebarOpen.value = true
    } else {
      sidebarOpen.value = false
    }
  }
  handleResize()
  window.addEventListener('resize', handleResize)
})
</script>

<style scoped>
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

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>

