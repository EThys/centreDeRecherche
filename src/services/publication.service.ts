/**
 * Service pour la gestion des publications
 */

import apiClient, { getApiBaseUrl } from './api.client'
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
    // Convertir limit en per_page pour Laravel
    const backendFilters: Record<string, string | number | boolean> = {}
    if (filters) {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          const value = (filters as any)[key]
          if (value !== undefined && value !== null && value !== '') {
            if (key === 'limit') {
              backendFilters['per_page'] = value
            } else {
              backendFilters[key] = value
            }
          }
        }
      }
    }
    
    const response = await apiClient.get<any[]>(ENDPOINT, backendFilters)
    
    // Gérer différents formats de réponse
    let publicationsData: any[] = []
    
    if (response) {
      if (Array.isArray(response.data)) {
        publicationsData = response.data
      } else if (Array.isArray(response)) {
        publicationsData = response
      } else if (response.data && typeof response.data === 'object') {
        publicationsData = Array.isArray(response.data) ? response.data : [response.data]
      }
    }
    
    return {
      data: publicationsData as Publication[],
      pagination: response.pagination || {
        page: 1,
        limit: 10,
        total: publicationsData.length,
        totalPages: 1,
      },
    }
  },

  /**
   * Récupère une publication par son ID
   */
  async getPublicationById(id: number | string): Promise<Publication> {
    const response = await apiClient.get<Publication>(`${ENDPOINT}/${id}`)
    
    // Gérer différents formats de réponse
    let publicationData: any = null
    
    if (response) {
      if (response.data) {
        publicationData = response.data
      } else if (typeof response === 'object') {
        publicationData = response
      }
    }
    
    return publicationData as Publication
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
    const response = await fetch(`${getApiBaseUrl()}${ENDPOINT}/${id}/download`, {
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

