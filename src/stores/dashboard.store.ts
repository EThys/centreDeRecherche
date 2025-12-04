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

      // Charger toutes les données en parallèle pour un chargement plus rapide
      const [eventsResult, actualitiesResult, photosResult, newsletterResult] = await Promise.allSettled([
        eventService.getEvents({ limit: 1000 }),
        actualityService.getActualities({ limit: 1000 }),
        galleryService.getPhotos({ limit: 1000 }),
        newsletterService.getAllSubscribers({ limit: 1000 })
      ])

      // Traiter les résultats
      if (eventsResult.status === 'fulfilled') {
        stats.value.events = eventsResult.value.pagination?.total || eventsResult.value.data.length
      } else {
        console.error('Erreur lors du chargement des événements:', eventsResult.reason)
      }

      if (actualitiesResult.status === 'fulfilled') {
        stats.value.actualities = actualitiesResult.value.pagination?.total || actualitiesResult.value.data.length
      } else {
        console.error('Erreur lors du chargement des actualités:', actualitiesResult.reason)
      }

      if (photosResult.status === 'fulfilled') {
        stats.value.photos = photosResult.value.pagination?.total || photosResult.value.data.length
      } else {
        console.error('Erreur lors du chargement des photos:', photosResult.reason)
      }

      if (newsletterResult.status === 'fulfilled') {
        stats.value.messages = newsletterResult.value.data.length
      } else if (newsletterResult.status === 'rejected') {
        console.error('Erreur lors du chargement des messages:', newsletterResult.reason)
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
      // Charger toutes les notifications en parallèle pour un chargement plus rapide
      const [
        newsletterResult,
        financingSubmittedResult,
        financingUnderReviewResult,
        trainingResult,
        publicationsResult,
        eventRegistrationsResult
      ] = await Promise.allSettled([
        newsletterService.getAllSubscribers({ status: 'active', limit: 1000 }),
        financingRequestService.getRequests({ status: 'submitted', limit: 1000 }),
        financingRequestService.getRequests({ status: 'under-review', limit: 1000 }),
        trainingRegistrationService.getRegistrations({ status: 'pending', limit: 1000 }),
        publicationRequestService.getRequests({ status: 'pending', limit: 1000 }),
        eventService.getAllRegistrations({ status: 'pending', limit: 1000 })
      ])

      // Traiter les résultats
      if (newsletterResult.status === 'fulfilled') {
        notificationCounts.value.newsletter = newsletterResult.value.data.length
      } else if (newsletterResult.status === 'rejected') {
        console.error('Erreur lors du chargement des newsletters:', newsletterResult.reason)
      }

      if (financingSubmittedResult.status === 'fulfilled' && financingUnderReviewResult.status === 'fulfilled') {
        notificationCounts.value.financing = 
          financingSubmittedResult.value.data.length + financingUnderReviewResult.value.data.length
      } else {
        const financingError = financingSubmittedResult.status === 'rejected' 
          ? financingSubmittedResult.reason 
          : financingUnderReviewResult.status === 'rejected' 
            ? financingUnderReviewResult.reason 
            : 'Erreur inconnue'
        console.error('Erreur lors du chargement des demandes de financement:', financingError)
      }

      if (trainingResult.status === 'fulfilled') {
        notificationCounts.value.training = trainingResult.value.data.length
      } else if (trainingResult.status === 'rejected') {
        console.error('Erreur lors du chargement des inscriptions aux formations:', trainingResult.reason)
      }

      if (publicationsResult.status === 'fulfilled') {
        notificationCounts.value.publications = publicationsResult.value.data.length
      } else if (publicationsResult.status === 'rejected') {
        console.error('Erreur lors du chargement des demandes de publication:', publicationsResult.reason)
      }

      if (eventRegistrationsResult.status === 'fulfilled') {
        notificationCounts.value.eventRegistrations = eventRegistrationsResult.value.data.length
      } else {
        console.error('Erreur lors du chargement des inscriptions aux événements:', eventRegistrationsResult.reason)
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

