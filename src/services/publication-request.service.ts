/**
 * Service pour la gestion des demandes de publication
 */

import apiClient from './api.client'
import type { PublicationRequest, PublicationRequestResponse } from '../models/publication-request.model'
import type { PaginationMeta } from '../models/common.model'

const ENDPOINT = '/publication-requests'

export interface PublicationRequestFilters {
  status?: string
  type?: string
  search?: string
  page?: number
  limit?: number
}

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

export const publicationRequestService = {
  /**
   * Soumet une nouvelle demande de publication
   */
  async submitRequest(
    request: Omit<PublicationRequest, 'id' | 'status' | 'submissionDate' | 'createdAt' | 'updatedAt' | 'reviewedAt' | 'publishedAt'> & {
      documentFile?: File
      documentImage?: File
    }
  ): Promise<PublicationRequest> {
    // Vérifier s'il y a des fichiers à uploader
    const hasFiles = request.documentFile || request.documentImage
    
    if (hasFiles) {
      // Utiliser FormData pour l'upload de fichiers
      const formData = new FormData()
      
      // Ajouter les champs texte
      formData.append('name', request.name)
      formData.append('email', request.email)
      if (request.phone) formData.append('phone', request.phone)
      if (request.institution) formData.append('institution', request.institution)
      if (request.position) formData.append('position', request.position)
      formData.append('title', request.title)
      formData.append('abstract', request.abstract)
      formData.append('type', request.type)
      formData.append('domains', JSON.stringify(request.domains))
      formData.append('authors', request.authors)
      if (request.coAuthors) formData.append('co_authors', request.coAuthors)
      if (request.keywords) formData.append('keywords', request.keywords)
      if (request.message) formData.append('message', request.message)
      
      // Ajouter les fichiers seulement s'ils existent et sont des instances de File valides
      if (request.documentFile && request.documentFile instanceof File && request.documentFile.size > 0) {
        formData.append('document_file', request.documentFile)
      }
      if (request.documentImage && request.documentImage instanceof File && request.documentImage.size > 0) {
        formData.append('document_image', request.documentImage)
      }
      
      const response = await apiClient.upload<PublicationRequest>(ENDPOINT, formData)
      return toCamelCase(response.data)
    } else {
      // Utiliser JSON si pas de fichiers
      const snakeCaseRequest: any = {
        name: request.name,
        email: request.email,
        phone: request.phone,
        institution: request.institution,
        position: request.position,
        title: request.title,
        abstract: request.abstract,
        type: request.type,
        domains: request.domains,
        authors: request.authors,
        co_authors: request.coAuthors,
        keywords: request.keywords,
        message: request.message,
      }
      
      const response = await apiClient.post<PublicationRequest>(ENDPOINT, snakeCaseRequest)
      return toCamelCase(response.data)
    }
  },

  /**
   * Récupère toutes les demandes (admin)
   */
  async getRequests(filters?: PublicationRequestFilters): Promise<{ data: PublicationRequest[]; pagination: PaginationMeta }> {
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
    
    console.log('📄 Publication Request Service - Filtres envoyés:', snakeCaseFilters)
    
    const response = await apiClient.get<any[]>(ENDPOINT, snakeCaseFilters)
    
    console.log('📄 Publication Request Service - Réponse:', response)
    
    // Gérer différents formats de réponse du backend Laravel
    let requestsData: any[] = []
    
    if (response) {
      // Si response.data existe et est un tableau
      if (Array.isArray(response.data)) {
        requestsData = response.data
        console.log('📄 Publication Request Service: Données trouvées dans response.data:', requestsData.length)
      }
      // Si response.data n'existe pas mais response est un tableau
      else if (Array.isArray(response)) {
        requestsData = response
        console.log('📄 Publication Request Service: Response est directement un tableau:', requestsData.length)
      }
      // Si response est un objet avec une propriété qui contient les données
      else if (response.data && typeof response.data === 'object') {
        requestsData = Array.isArray(response.data) ? response.data : [response.data]
        console.log('📄 Publication Request Service: Données extraites de response.data:', requestsData.length)
      }
    }
    
    if (requestsData.length === 0) {
      console.warn('⚠️ Publication Request Service: Aucune donnée trouvée dans la réponse', response)
    }
    
    // Convertir les données en camelCase
    const requests = requestsData.map(item => {
      const converted = toCamelCase(item) as PublicationRequest
      console.log('📄 Publication Request convertie:', { id: converted.id, title: converted.title, status: converted.status })
      return converted
    })
    
    console.log('📄 Publication Request Service: Total requests après conversion:', requests.length)
    
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
  async getRequestById(id: number | string): Promise<PublicationRequest> {
    const response = await apiClient.get<PublicationRequest>(`${ENDPOINT}/${id}`)
    return toCamelCase(response.data)
  },

  /**
   * Met à jour le statut d'une demande (admin)
   */
  async updateRequestStatus(
    id: number | string,
    status: PublicationRequest['status']
  ): Promise<PublicationRequest> {
    const response = await apiClient.patch<PublicationRequest>(`${ENDPOINT}/${id}/status`, { 
      status
    })
    return toCamelCase(response.data)
  },

  /**
   * Supprime une demande (admin)
   */
  async deleteRequest(id: number | string): Promise<void> {
    await apiClient.delete<void>(`${ENDPOINT}/${id}`)
  },
}

export default publicationRequestService

