/**
 * Service pour la gestion des actualités
 */

import apiClient from './api.client'
import type { Actuality, ActualityResponse } from '../models/actuality.model'
import type { PaginationMeta } from '../models/common.model'

const ENDPOINT = '/actualities'

export interface ActualityFilters {
  category?: string
  author?: string
  featured?: boolean
  status?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: 'date' | 'views' | 'title'
  sortOrder?: 'asc' | 'desc'
}

export const actualityService = {
  /**
   * Récupère toutes les actualités avec filtres et pagination
   */
  async getActualities(filters?: ActualityFilters): Promise<{ data: Actuality[]; pagination: PaginationMeta }> {
    const response = await apiClient.get<Actuality[]>(ENDPOINT, filters as Record<string, string | number | boolean>)
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
   * Récupère une actualité par son ID
   */
  async getActualityById(id: number | string): Promise<Actuality> {
    const response = await apiClient.get<Actuality>(`${ENDPOINT}/${id}`)
    return response.data
  },

  /**
   * Récupère les actualités récentes
   */
  async getRecentActualities(limit?: number): Promise<Actuality[]> {
    const response = await apiClient.get<Actuality[]>(`${ENDPOINT}/recent`, { limit: limit || 3 })
    return response.data
  },

  /**
   * Récupère les actualités mises en avant
   */
  async getFeaturedActualities(limit?: number): Promise<Actuality[]> {
    const response = await apiClient.get<Actuality[]>(`${ENDPOINT}/featured`, { limit: limit || 3 })
    return response.data
  },

  /**
   * Crée une nouvelle actualité
   */
  async createActuality(actuality: Omit<Actuality, 'id' | 'createdAt' | 'updatedAt'>): Promise<Actuality> {
    const response = await apiClient.post<Actuality>(ENDPOINT, actuality)
    return response.data
  },

  /**
   * Met à jour une actualité
   */
  async updateActuality(id: number | string, actuality: Partial<Actuality>): Promise<Actuality> {
    const response = await apiClient.put<Actuality>(`${ENDPOINT}/${id}`, actuality)
    return response.data
  },

  /**
   * Supprime une actualité
   */
  async deleteActuality(id: number | string): Promise<void> {
    await apiClient.delete<void>(`${ENDPOINT}/${id}`)
  },

  /**
   * Incrémente le nombre de vues d'une actualité
   */
  async incrementViews(id: number | string): Promise<void> {
    await apiClient.post<void>(`${ENDPOINT}/${id}/views`)
  },
}

export default actualityService

