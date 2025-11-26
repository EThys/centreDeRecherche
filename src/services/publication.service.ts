/**
 * Service pour la gestion des publications
 */

import apiClient from './api.client'
import type { Publication, PublicationResponse } from '../models/publication.model'
import type { PaginationMeta } from '../models/common.model'

const ENDPOINT = '/publications'

export interface PublicationFilters {
  type?: string
  domain?: string
  author?: string
  featured?: boolean
  status?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: 'date' | 'citations' | 'downloads' | 'title'
  sortOrder?: 'asc' | 'desc'
}

export const publicationService = {
  /**
   * Récupère toutes les publications avec filtres et pagination
   */
  async getPublications(filters?: PublicationFilters): Promise<{ data: Publication[]; pagination: PaginationMeta }> {
    const response = await apiClient.get<Publication[]>(ENDPOINT, filters as Record<string, string | number | boolean>)
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
   * Récupère une publication par son ID
   */
  async getPublicationById(id: number | string): Promise<Publication> {
    const response = await apiClient.get<Publication>(`${ENDPOINT}/${id}`)
    return response.data
  },

  /**
   * Récupère les publications récentes
   */
  async getRecentPublications(limit?: number): Promise<Publication[]> {
    const response = await apiClient.get<Publication[]>(`${ENDPOINT}/recent`, { limit: limit || 3 })
    return response.data
  },

  /**
   * Récupère les publications mises en avant
   */
  async getFeaturedPublications(limit?: number): Promise<Publication[]> {
    const response = await apiClient.get<Publication[]>(`${ENDPOINT}/featured`, { limit: limit || 3 })
    return response.data
  },

  /**
   * Crée une nouvelle publication
   */
  async createPublication(publication: Omit<Publication, 'id' | 'createdAt' | 'updatedAt'>): Promise<Publication> {
    const response = await apiClient.post<Publication>(ENDPOINT, publication)
    return response.data
  },

  /**
   * Met à jour une publication
   */
  async updatePublication(id: number | string, publication: Partial<Publication>): Promise<Publication> {
    const response = await apiClient.put<Publication>(`${ENDPOINT}/${id}`, publication)
    return response.data
  },

  /**
   * Supprime une publication
   */
  async deletePublication(id: number | string): Promise<void> {
    await apiClient.delete<void>(`${ENDPOINT}/${id}`)
  },

  /**
   * Télécharge le PDF d'une publication
   */
  async downloadPDF(id: number | string): Promise<Blob> {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}${ENDPOINT}/${id}/download`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
    })
    return response.blob()
  },

  /**
   * Incrémente le nombre de vues d'une publication
   */
  async incrementViews(id: number | string): Promise<void> {
    await apiClient.post<void>(`${ENDPOINT}/${id}/views`)
  },

  /**
   * Incrémente le nombre de téléchargements d'une publication
   */
  async incrementDownloads(id: number | string): Promise<void> {
    await apiClient.post<void>(`${ENDPOINT}/${id}/downloads`)
  },
}

export default publicationService

