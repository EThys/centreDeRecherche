/**
 * Service pour la gestion des demandes de financement
 */

import apiClient from './api.client'
import type { FinancingRequest, FinancingRequestResponse } from '../models/financing-request.model'
import type { PaginationMeta } from '../models/common.model'

const ENDPOINT = '/financing-requests'

// Fonction pour convertir snake_case en camelCase
const toCamelCase = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item))
  }
  
  if (typeof obj !== 'object') {
    return obj
  }
  
  const camelObj: any = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      camelObj[camelKey] = toCamelCase(obj[key])
    }
  }
  return camelObj
}

export interface FinancingRequestFilters {
  status?: string
  projectType?: string
  sector?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: 'date' | 'amount' | 'status'
  sortOrder?: 'asc' | 'desc'
}

export const financingRequestService = {
  /**
   * Soumet une nouvelle demande de financement
   */
  async submitRequest(request: Omit<FinancingRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<FinancingRequest> {
    // Convertir camelCase vers snake_case pour l'API
    const snakeCaseRequest: any = {}
    for (const key in request) {
      if (request.hasOwnProperty(key)) {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
        snakeCaseRequest[snakeKey] = (request as any)[key]
      }
    }
    
    const response = await apiClient.post<FinancingRequest>(ENDPOINT, snakeCaseRequest)
    return toCamelCase(response.data)
  },

  /**
   * Récupère toutes les demandes (admin)
   */
  async getRequests(filters?: FinancingRequestFilters): Promise<{ data: FinancingRequest[]; pagination: PaginationMeta }> {
    // Convertir les filtres camelCase en snake_case et filtrer les valeurs undefined
    const snakeCaseFilters: any = {}
    
    // Toujours définir per_page par défaut
    snakeCaseFilters['per_page'] = filters?.limit || 100
    
    if (filters) {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          const value = (filters as any)[key]
          // Ignorer les valeurs undefined, null ou vides
          if (value !== undefined && value !== null && value !== '') {
            let snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
            // Convertir 'limit' en 'per_page' pour Laravel (déjà fait au-dessus)
            if (snakeKey !== 'limit') {
              snakeCaseFilters[snakeKey] = value
            }
          }
        }
      }
    }
    
    console.log('📋 Financing Request Service - Filtres envoyés:', snakeCaseFilters)
    
    const response = await apiClient.get<any[]>(ENDPOINT, snakeCaseFilters)
    
    console.log('📋 Financing Request Service - Réponse:', response)
    
    // Gérer différents formats de réponse du backend Laravel
    let requestsData: any[] = []
    
    if (response) {
      // Si response.data existe et est un tableau
      if (Array.isArray(response.data)) {
        requestsData = response.data
        console.log('📋 Financing Request Service: Données trouvées dans response.data:', requestsData.length)
      }
      // Si response.data n'existe pas mais response est un tableau
      else if (Array.isArray(response)) {
        requestsData = response
        console.log('📋 Financing Request Service: Response est directement un tableau:', requestsData.length)
      }
      // Si response est un objet avec une propriété qui contient les données
      else if (response.data && typeof response.data === 'object') {
        requestsData = Array.isArray(response.data) ? response.data : [response.data]
        console.log('📋 Financing Request Service: Données extraites de response.data:', requestsData.length)
      }
    }
    
    if (requestsData.length === 0) {
      console.warn('⚠️ Financing Request Service: Aucune donnée trouvée dans la réponse', response)
    }
    
    // Convertir les données en camelCase
    const requests = requestsData.map(item => {
      const converted = toCamelCase(item) as FinancingRequest
      console.log('📋 Financing Request convertie:', { id: converted.id, companyName: converted.companyName, status: converted.status })
      return converted
    })
    
    console.log('📋 Financing Request Service: Total requests après conversion:', requests.length)
    
    return {
      data: requests,
      pagination: response.pagination || {
        page: 1,
        limit: 10,
        total: requests.length,
        totalPages: 1,
      },
    }
  },

  /**
   * Récupère une demande par son ID
   */
  async getRequestById(id: number | string): Promise<FinancingRequest> {
    const response = await apiClient.get<FinancingRequest>(`${ENDPOINT}/${id}`)
    return toCamelCase(response.data)
  },

  /**
   * Met à jour le statut d'une demande (admin)
   */
  async updateRequestStatus(
    id: number | string,
    status: FinancingRequest['status'],
    reviewNotes?: string
  ): Promise<FinancingRequest> {
    const response = await apiClient.patch<FinancingRequest>(`${ENDPOINT}/${id}/status`, { 
      status, 
      review_notes: reviewNotes 
    })
    return toCamelCase(response.data)
  },

  /**
   * Supprime une demande (admin)
   */
  async deleteRequest(id: number | string): Promise<void> {
    await apiClient.delete<void>(`${ENDPOINT}/${id}`)
  },

  /**
   * Upload des documents pour une demande
   */
  async uploadDocuments(id: number | string, files: File[]): Promise<FinancingRequest> {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`documents[${index}]`, file)
    })

    const response = await apiClient.upload<FinancingRequest>(`${ENDPOINT}/${id}/documents`, formData)
    return response.data
  },
}

export default financingRequestService

