import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import newsletterService from '@/services/newsletter.service'
import financingRequestService from '@/services/financing-request.service'
import trainingRegistrationService from '@/services/training-registration.service'
import publicationRequestService from '@/services/publication-request.service'
import eventService from '@/services/event.service'
import actualityService from '@/services/actuality.service'
import galleryService from '@/services/gallery.service'

interface DashboardStats {
  events: number
  actualities: number
  photos: number
  messages: number
}

interface PreviousStats {
  events: number
  actualities: number
  photos: number
  messages: number
}

export const useDashboardStore = defineStore('dashboard', () => {
  // État pour les stats de la vue d'ensemble
  const stats = ref<DashboardStats>({
    events: 0,
    actualities: 0,
    photos: 0,
    messages: 0
  })

  // Valeurs précédentes pour calculer les pourcentages
  const previousStats = ref<PreviousStats>({
    events: 0,
    actualities: 0,
    photos: 0,
    messages: 0
  })

  // État pour les compteurs de notifications
  const notificationCounts = ref({
    newsletter: 0,
    financing: 0,
    training: 0,
    publications: 0,
    eventRegistrations: 0
  })

  // État de chargement
  const isLoading = ref(false)
  const lastFetchTime = ref<number | null>(null)
  const cacheDuration = 30000 // 30 secondes

  // Computed pour les stats avec pourcentages
  const statsWithChange = computed(() => {
    const calculateChange = (current: number, previous: number): string => {
      if (previous === 0) {
        return current > 0 ? '+100%' : '0%'
      }
      const change = ((current - previous) / previous) * 100
      const sign = change >= 0 ? '+' : ''
      return `${sign}${Math.round(change)}%`
    }

    return [
      {
        id: 'events',
        label: 'Événements',
        value: stats.value.events.toString(),
        change: calculateChange(stats.value.events, previousStats.value.events),
        icon: 'fas fa-calendar-alt',
        bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
        iconColor: 'text-blue-600',
        badgeColor: stats.value.events >= previousStats.value.events 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
      },
      {
        id: 'actualites',
        label: 'Actualités',
        value: stats.value.actualities.toString(),
        change: calculateChange(stats.value.actualities, previousStats.value.actualities),
        icon: 'fas fa-newspaper',
        bgColor: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
        iconColor: 'text-indigo-600',
        badgeColor: stats.value.actualities >= previousStats.value.actualities 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
      },
      {
        id: 'messages',
        label: 'Messages',
        value: stats.value.messages.toString(),
        change: calculateChange(stats.value.messages, previousStats.value.messages),
        icon: 'fas fa-envelope',
        bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
        iconColor: 'text-purple-600',
        badgeColor: stats.value.messages >= previousStats.value.messages 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
      },
      {
        id: 'photos',
        label: 'Photos',
        value: stats.value.photos.toString(),
        change: calculateChange(stats.value.photos, previousStats.value.photos),
        icon: 'fas fa-images',
        bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200',
        iconColor: 'text-pink-600',
        badgeColor: stats.value.photos >= previousStats.value.photos 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
      }
    ]
  })

  // Computed pour les items du menu avec badges
  const menuItems = computed(() => [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'fas fa-home', badge: null },
    { id: 'events', label: 'Événements', icon: 'fas fa-calendar-alt', badge: null },
    { 
      id: 'event-registrations', 
      label: 'Inscriptions Événements', 
      icon: 'fas fa-user-check', 
      badge: notificationCounts.value.eventRegistrations > 0 
        ? notificationCounts.value.eventRegistrations.toString() 
        : null 
    },
    { id: 'actualites', label: 'Actualités', icon: 'fas fa-newspaper', badge: null },
    { id: 'gallery', label: 'Galerie', icon: 'fas fa-images', badge: null },
    { 
      id: 'newsletter', 
      label: 'Newsletter', 
      icon: 'fas fa-envelope', 
      badge: notificationCounts.value.newsletter > 0 
        ? notificationCounts.value.newsletter.toString() 
        : null 
    },
    { 
      id: 'financing', 
      label: 'Demandes Financement', 
      icon: 'fas fa-hand-holding-usd', 
      badge: notificationCounts.value.financing > 0 
        ? notificationCounts.value.financing.toString() 
        : null 
    },
    { 
      id: 'training', 
      label: 'Inscriptions Formation', 
      icon: 'fas fa-user-graduate', 
      badge: notificationCounts.value.training > 0 
        ? notificationCounts.value.training.toString() 
        : null 
    },
    { 
      id: 'publications', 
      label: 'Demandes Publication', 
      icon: 'fas fa-file-alt', 
      badge: notificationCounts.value.publications > 0 
        ? notificationCounts.value.publications.toString() 
        : null 
    }
  ])

  // Vérifier si le cache est encore valide
  const isCacheValid = computed(() => {
    if (!lastFetchTime.value) return false
    return Date.now() - lastFetchTime.value < cacheDuration
  })

  // Charger les stats de la vue d'ensemble
  const loadOverviewStats = async (force = false) => {
    // Utiliser le cache si valide et pas de force refresh
    if (!force && isCacheValid.value && stats.value.events > 0) {
      return
    }

    if (isLoading.value) return

    try {
      isLoading.value = true

      // Sauvegarder les valeurs précédentes
      previousStats.value = { ...stats.value }

      // Événements
      try {
        const eventsResult = await eventService.getEvents({ limit: 1000 })
        stats.value.events = eventsResult.pagination?.total || eventsResult.data.length
      } catch (err) {
        console.error('Erreur lors du chargement des événements:', err)
        // Ne pas réinitialiser à 0 pour garder les valeurs précédentes
      }

      // Actualités
      try {
        const actualitiesResult = await actualityService.getActualities({ limit: 1000 })
        stats.value.actualities = actualitiesResult.pagination?.total || actualitiesResult.data.length
      } catch (err) {
        console.error('Erreur lors du chargement des actualités:', err)
      }

      // Photos (Galerie)
      try {
        const photosResult = await galleryService.getPhotos({ limit: 1000 })
        stats.value.photos = photosResult.pagination?.total || photosResult.data.length
      } catch (err) {
        console.error('Erreur lors du chargement des photos:', err)
      }

      // Messages (Newsletter - toutes les inscriptions)
      try {
        const newsletterResult = await newsletterService.getAllSubscribers({ limit: 1000 })
        stats.value.messages = newsletterResult.data.length
      } catch (err) {
        console.error('Erreur lors du chargement des messages:', err)
      }

      lastFetchTime.value = Date.now()
    } catch (err) {
      console.error('Erreur lors du chargement des stats:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Charger les compteurs de notifications
  const loadNotificationCounts = async (force = false) => {
    // Utiliser le cache si valide et pas de force refresh
    if (!force && isCacheValid.value && notificationCounts.value.newsletter >= 0) {
      return
    }

    try {
      // Newsletter - compter toutes les inscriptions actives
      try {
        const newsletterResult = await newsletterService.getAllSubscribers({ status: 'active', limit: 1000 })
        notificationCounts.value.newsletter = newsletterResult.data.length
      } catch (err) {
        console.error('Erreur lors du chargement des newsletters:', err)
      }

      // Demandes de financement - en attente
      try {
        const financingSubmitted = await financingRequestService.getRequests({ status: 'submitted', limit: 1000 })
        const financingUnderReview = await financingRequestService.getRequests({ status: 'under-review', limit: 1000 })
        notificationCounts.value.financing = financingSubmitted.data.length + financingUnderReview.data.length
      } catch (err) {
        console.error('Erreur lors du chargement des demandes de financement:', err)
      }

      // Inscriptions aux formations - en attente
      try {
        const trainingResult = await trainingRegistrationService.getRegistrations({ status: 'pending', limit: 1000 })
        notificationCounts.value.training = trainingResult.data.length
      } catch (err) {
        console.error('Erreur lors du chargement des inscriptions aux formations:', err)
      }

      // Demandes de publication - en attente
      try {
        const publicationsResult = await publicationRequestService.getRequests({ status: 'pending', limit: 1000 })
        notificationCounts.value.publications = publicationsResult.data.length
      } catch (err) {
        console.error('Erreur lors du chargement des demandes de publication:', err)
      }

      // Inscriptions aux événements - en attente
      try {
        const eventRegistrationsResult = await eventService.getAllRegistrations({ status: 'pending', limit: 1000 })
        notificationCounts.value.eventRegistrations = eventRegistrationsResult.data.length
      } catch (err) {
        console.error('Erreur lors du chargement des inscriptions aux événements:', err)
      }

      if (!lastFetchTime.value) {
        lastFetchTime.value = Date.now()
      }
    } catch (err) {
      console.error('Erreur lors du chargement des compteurs:', err)
    }
  }

  // Recharger toutes les données
  const refreshAll = async () => {
    await Promise.all([
      loadOverviewStats(true),
      loadNotificationCounts(true)
    ])
  }

  // Réinitialiser le store
  const reset = () => {
    stats.value = {
      events: 0,
      actualities: 0,
      photos: 0,
      messages: 0
    }
    previousStats.value = {
      events: 0,
      actualities: 0,
      photos: 0,
      messages: 0
    }
    notificationCounts.value = {
      newsletter: 0,
      financing: 0,
      training: 0,
      publications: 0,
      eventRegistrations: 0
    }
    lastFetchTime.value = null
  }

  return {
    // State
    stats,
    previousStats,
    notificationCounts,
    isLoading,
    
    // Computed
    statsWithChange,
    menuItems,
    isCacheValid,
    
    // Actions
    loadOverviewStats,
    loadNotificationCounts,
    refreshAll,
    reset
  }
})

