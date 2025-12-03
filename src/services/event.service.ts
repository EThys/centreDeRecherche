/**
 * Service pour la gestion des événements
 */

import apiClient, { getBaseUrl } from './api.client'
import type { Event, EventRegistration, EventResponse } from '../models/event.model'
import type { PaginationMeta } from '../models/common.model'

const ENDPOINT = '/events'

export interface EventFilters {
  type?: string
  status?: string
  category?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
  search?: string
}

// Fonctions utilitaires
const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return ''
  
  // Si c'est déjà une URL complète, la retourner telle quelle
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // Le backend Laravel stocke dans storage/app/public/
  // Le lien symbolique public/storage pointe vers storage/app/public
  // Les chemins retournés sont comme "events/filename.jpg" ou "actualities/filename.jpg"
  // L'URL publique devrait être /storage/events/filename.jpg
  
  // Pour les images, on utilise l'URL de base sans /api (détection automatique local/prod)
  const baseUrl = getBaseUrl()
  
  // Nettoyer le chemin (enlever les backslashes échappés et les slashes initiaux)
  let cleanPath = imagePath.trim().replace(/\\/g, '/')
  
  // Enlever les slashes initiaux
  while (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1)
  }
  
  // Si le chemin commence déjà par storage/, l'utiliser tel quel
  if (cleanPath.startsWith('storage/')) {
    return `${baseUrl}/${cleanPath}`
  }
  
  // Le backend retourne directement "events/filename.jpg" ou "actualities/filename.jpg"
  // On doit ajouter "storage/" devant
  if (cleanPath.startsWith('events/') || cleanPath.startsWith('actualities/') || cleanPath.startsWith('authors/')) {
    return `${baseUrl}/storage/${cleanPath}`
  }
  
  // Si le chemin ne contient pas de slash, c'est probablement juste un nom de fichier
  // On suppose qu'il est dans storage/events/
  if (!cleanPath.includes('/')) {
    return `${baseUrl}/storage/events/${cleanPath}`
  }
  
  // Par défaut, ajouter /storage/ devant
  return `${baseUrl}/storage/${cleanPath}`
}

const toCamelCase = (obj: any): any => {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item))
  }
  if (typeof obj !== 'object') return obj
  
  const camelObj: Record<string, any> = {}
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    // Convertir l'URL de l'image si c'est le champ image ou photo
    if ((camelKey === 'image' || camelKey === 'photo') && typeof value === 'string') {
      camelObj[camelKey] = getImageUrl(value)
    } else {
      camelObj[camelKey] = toCamelCase(value)
    }
  }
  return camelObj
}

export const eventService = {

  /**
   * Récupère tous les événements avec filtres et pagination
   */
  async getEvents(filters?: EventFilters): Promise<{ data: Event[]; pagination: PaginationMeta }> {
    // Convertir les filtres camelCase en snake_case
    const backendFilters: Record<string, any> = {}
    if (filters) {
      if (filters.startDate) backendFilters.start_date = filters.startDate
      if (filters.endDate) backendFilters.end_date = filters.endDate
      if (filters.type) backendFilters.type = filters.type
      if (filters.status) backendFilters.status = filters.status
      if (filters.category) backendFilters.category = filters.category
      if (filters.page) backendFilters.page = filters.page
      if (filters.limit) backendFilters.per_page = filters.limit
      if (filters.search) backendFilters.search = filters.search
    }

    const response = await apiClient.get<any[]>(ENDPOINT, backendFilters as Record<string, string | number | boolean>)
    
    // Gérer différents formats de réponse du backend Laravel
    let eventsData: any[] = []
    
    if (response) {
      // Si response.data existe et est un tableau
      if (Array.isArray(response.data)) {
        eventsData = response.data
      }
      // Si response.data n'existe pas mais response est un tableau
      else if (Array.isArray(response)) {
        eventsData = response
      }
      // Si response est un objet avec une propriété qui contient les données
      else if (response.data && typeof response.data === 'object') {
        eventsData = Array.isArray(response.data) ? response.data : [response.data]
      }
    }
    
    // Convertir les données en camelCase
    const events = eventsData.map(event => toCamelCase(event) as Event)
    
    return {
      data: events,
      pagination: response.pagination || {
        page: 1,
        limit: 10,
        total: events.length,
        totalPages: 1,
      },
    }
  },

  /**
   * Récupère un événement par son ID
   */
  async getEventById(id: number | string): Promise<Event> {
    const response = await apiClient.get<any>(`${ENDPOINT}/${id}`)
    return toCamelCase(response.data) as Event
  },

  /**
   * Récupère les événements à venir
   */
  async getUpcomingEvents(limit?: number): Promise<Event[]> {
    const response = await apiClient.get<Event[]>(`${ENDPOINT}/upcoming`, { limit: limit || 3 })
    return response.data
  },


  /**
   * Crée un nouvel événement avec support pour l'upload d'image
   */
  async createEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>, imageFile?: File): Promise<Event> {
    const formData = new FormData()
    
    // Ajouter les champs requis
    formData.append('title', event.title)
    formData.append('description', event.description)
    formData.append('type', event.type)
    formData.append('start_date', event.startDate)
    formData.append('start_time', event.startTime)
    formData.append('location', event.location)
    
    // Ajouter les champs optionnels seulement s'ils existent
    if (event.content && event.content.trim() !== '') {
      formData.append('content', event.content)
    }
    if (event.status) {
      formData.append('status', event.status)
    }
    if (event.endDate) {
      formData.append('end_date', event.endDate)
    }
    if (event.endTime) {
      formData.append('end_time', event.endTime)
    }
    if (event.address) {
      formData.append('address', event.address)
    }
    if (event.price !== undefined && event.price !== null) {
      formData.append('price', String(event.price))
    }
    if (event.currency) {
      formData.append('currency', event.currency)
    }
    if (event.maxAttendees !== undefined && event.maxAttendees !== null) {
      formData.append('max_attendees', String(event.maxAttendees))
    }
    if (event.registrationRequired !== undefined) {
      formData.append('registration_required', event.registrationRequired ? '1' : '0')
    }
    if (event.registrationDeadline) {
      formData.append('registration_deadline', event.registrationDeadline)
    }
    if (event.category) {
      formData.append('category', event.category)
    }

    // Ajouter les tableaux si présents
    // Laravel peut recevoir des JSON stringifiés, mais il faut les décoder côté backend
    // Pour l'instant, on envoie comme JSON stringifié
    if (event.speakers && event.speakers.length > 0) {
      formData.append('speakers', JSON.stringify(event.speakers))
    }
    if (event.agenda && event.agenda.length > 0) {
      formData.append('agenda', JSON.stringify(event.agenda))
    }
    if (event.tags && event.tags.length > 0) {
      formData.append('tags', JSON.stringify(event.tags))
    }

    // Ajouter l'image si fournie
    if (imageFile) {
      formData.append('image', imageFile)
    }

    // Utiliser la méthode upload du client API
    const response = await apiClient.upload<Event>(ENDPOINT, formData)
    
    // Convertir la réponse en camelCase
    const camelData = toCamelCase(response.data as any)
    return camelData as Event
  },

  /**
   * Met à jour un événement avec support pour l'upload d'image
   */
  async updateEvent(id: number | string, event: Partial<Event>, imageFile?: File): Promise<Event> {
    const formData = new FormData()
    
    // Convertir seulement les champs présents
    const eventData: Record<string, any> = {}
    
    if (event.title !== undefined) eventData.title = event.title
    if (event.description !== undefined) eventData.description = event.description
    if (event.content !== undefined) eventData.content = event.content
    if (event.type !== undefined) eventData.type = event.type
    if (event.status !== undefined) eventData.status = event.status
    if (event.startDate !== undefined) eventData.start_date = event.startDate
    if (event.endDate !== undefined) eventData.end_date = event.endDate
    if (event.startTime !== undefined) eventData.start_time = event.startTime
    if (event.endTime !== undefined) eventData.end_time = event.endTime
    if (event.location !== undefined) eventData.location = event.location
    if (event.address !== undefined) eventData.address = event.address
    if (event.price !== undefined) eventData.price = event.price
    if (event.currency !== undefined) eventData.currency = event.currency
    if (event.maxAttendees !== undefined) eventData.max_attendees = event.maxAttendees
    if (event.registrationRequired !== undefined) eventData.registration_required = event.registrationRequired
    if (event.registrationDeadline !== undefined) eventData.registration_deadline = event.registrationDeadline
    if (event.category !== undefined) eventData.category = event.category

    // Ajouter les tableaux si présents
    if (event.speakers !== undefined) {
      formData.append('speakers', JSON.stringify(event.speakers))
    }
    if (event.agenda !== undefined) {
      formData.append('agenda', JSON.stringify(event.agenda))
    }
    if (event.tags !== undefined) {
      formData.append('tags', JSON.stringify(event.tags))
    }

    // Ajouter tous les champs au FormData
    Object.entries(eventData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (typeof value === 'boolean') {
          formData.append(key, value ? '1' : '0')
        } else {
          formData.append(key, String(value))
        }
      }
    })

    // Ajouter l'image si fournie
    if (imageFile) {
      formData.append('image', imageFile)
    }

    // Utiliser la méthode uploadPut du client API
    const response = await apiClient.uploadPut<Event>(`${ENDPOINT}/${id}`, formData)
    
    // Convertir la réponse en camelCase
    const camelData = toCamelCase(response.data as any)
    return camelData as Event
  },

  /**
   * Supprime un événement
   */
  async deleteEvent(id: number | string): Promise<void> {
    await apiClient.delete<void>(`${ENDPOINT}/${id}`)
  },

  /**
   * Inscrit un utilisateur à un événement
   */
  async registerToEvent(eventId: number | string, registration: Omit<EventRegistration, 'id' | 'eventId' | 'createdAt'>): Promise<EventRegistration> {
    // Convertir camelCase en snake_case pour le backend
    const backendData: Record<string, any> = {
      first_name: registration.firstName,
      last_name: registration.lastName,
      email: registration.email,
    }
    
    if (registration.phone) backendData.phone = registration.phone
    if (registration.organization) backendData.organization = registration.organization
    if (registration.position) backendData.position = registration.position
    if (registration.notes) backendData.notes = registration.notes
    
    const response = await apiClient.post<EventRegistration>(`${ENDPOINT}/${eventId}/register`, backendData)
    return toCamelCase(response.data) as EventRegistration
  },

  /**
   * Récupère les inscriptions d'un événement
   */
  async getEventRegistrations(eventId: number | string): Promise<EventRegistration[]> {
    const response = await apiClient.get<EventRegistration[]>(`${ENDPOINT}/${eventId}/registrations`)
    const registrations = Array.isArray(response.data) ? response.data : []
    return registrations.map(reg => toCamelCase(reg) as EventRegistration)
  },

  /**
   * Récupère toutes les inscriptions (tous événements)
   */
  async getAllRegistrations(filters?: { eventId?: number | string; status?: string; page?: number; limit?: number }): Promise<{ data: EventRegistration[]; pagination: PaginationMeta }> {
    const backendFilters: Record<string, any> = {}
    if (filters?.eventId) backendFilters.event_id = filters.eventId
    if (filters?.status) backendFilters.status = filters.status
    if (filters?.page) backendFilters.page = filters.page
    if (filters?.limit) backendFilters.per_page = filters.limit
    
    const response = await apiClient.get<any>('/event-registrations', backendFilters)
    const registrations = Array.isArray(response.data) ? response.data : []
    
    return {
      data: registrations.map(reg => toCamelCase(reg) as EventRegistration),
      pagination: response.pagination || {
        page: 1,
        limit: 10,
        total: registrations.length,
        totalPages: 1,
      },
    }
  },

  /**
   * Met à jour le statut d'une inscription
   */
  async updateRegistrationStatus(registrationId: number | string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<EventRegistration> {
    const response = await apiClient.patch<EventRegistration>(`/event-registrations/${registrationId}/status`, { status })
    return toCamelCase(response.data) as EventRegistration
  },

  /**
   * Supprime une inscription
   */
  async deleteRegistration(registrationId: number | string): Promise<void> {
    await apiClient.delete<void>(`/event-registrations/${registrationId}`)
  },

  /**
   * Obtient l'URL complète d'une image
   */
  getImageUrl,
}

export default eventService

