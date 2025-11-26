/**
 * Service pour la gestion des événements
 */

import apiClient from './api.client'
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

export const eventService = {
  /**
   * Récupère tous les événements avec filtres et pagination
   */
  async getEvents(filters?: EventFilters): Promise<{ data: Event[]; pagination: PaginationMeta }> {
    const response = await apiClient.get<Event[]>(ENDPOINT, filters as Record<string, string | number | boolean>)
    return {
      data: response.data,
      pagination: response.pagination || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    }
  },

  /**
   * Récupère un événement par son ID
   */
  async getEventById(id: number | string): Promise<Event> {
    const response = await apiClient.get<Event>(`${ENDPOINT}/${id}`)
    return response.data
  },

  /**
   * Récupère les événements à venir
   */
  async getUpcomingEvents(limit?: number): Promise<Event[]> {
    const response = await apiClient.get<Event[]>(`${ENDPOINT}/upcoming`, { limit: limit || 3 })
    return response.data
  },

  /**
   * Crée un nouvel événement
   */
  async createEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    const response = await apiClient.post<Event>(ENDPOINT, event)
    return response.data
  },

  /**
   * Met à jour un événement
   */
  async updateEvent(id: number | string, event: Partial<Event>): Promise<Event> {
    const response = await apiClient.put<Event>(`${ENDPOINT}/${id}`, event)
    return response.data
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
    const response = await apiClient.post<EventRegistration>(`${ENDPOINT}/${eventId}/register`, registration)
    return response.data
  },

  /**
   * Récupère les inscriptions d'un événement
   */
  async getEventRegistrations(eventId: number | string): Promise<EventRegistration[]> {
    const response = await apiClient.get<EventRegistration[]>(`${ENDPOINT}/${eventId}/registrations`)
    return response.data
  },
}

export default eventService

