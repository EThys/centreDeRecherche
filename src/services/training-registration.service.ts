/**
 * Service pour la gestion des inscriptions aux formations
 */

import apiClient from './api.client'
import type { TrainingRegistration, TrainingRegistrationResponse } from '../models/training-registration.model'
import type { PaginationMeta } from '../models/common.model'

const ENDPOINT = '/training-registrations'

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

export interface TrainingRegistrationFilters {
  status?: string
  program?: string
  search?: string
  page?: number
  limit?: number
}

export const trainingRegistrationService = {
  /**
   * Soumet une nouvelle inscription à une formation
   */
  async submitRegistration(registration: Omit<TrainingRegistration, 'id' | 'status' | 'registrationDate' | 'createdAt' | 'updatedAt' | 'confirmedAt' | 'cancelledAt'>): Promise<TrainingRegistration> {
    try {
      // Convertir camelCase vers snake_case pour l'API
      const snakeCaseRegistration: any = {
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        program: registration.program,
        program_name: registration.programName,
        message: registration.message,
        company: registration.company,
        position: registration.position,
      }
      
      const response = await apiClient.post<TrainingRegistration>(ENDPOINT, snakeCaseRegistration)
      
      // Gérer la structure de réponse
      let registrationData: any = response.data
      if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        registrationData = (response.data as any).data
      }
      
      return toCamelCase(registrationData) as TrainingRegistration
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription à la formation:', error)
      throw error
    }
  },

  /**
   * Récupère toutes les inscriptions (admin)
   */
  async getRegistrations(filters?: TrainingRegistrationFilters): Promise<{ data: TrainingRegistration[]; pagination: PaginationMeta }> {
    // Convertir les filtres camelCase en snake_case et filtrer les valeurs undefined
    const snakeCaseFilters: any = {}
    
    // Toujours définir per_page par défaut
    snakeCaseFilters['per_page'] = filters?.limit || 100
    
    if (filters) {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          const value = (filters as any)[key]
          // Ignorer les valeurs undefined, null ou vides
          if (key !== 'limit' && value !== undefined && value !== null && value !== '') {
            let snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
            snakeCaseFilters[snakeKey] = value
          }
        }
      }
    }
    
    console.log('📚 Training Registration Service - Filtres envoyés:', snakeCaseFilters)
    
    try {
      const response = await apiClient.get<any>(ENDPOINT, snakeCaseFilters)
      console.log('📚 Training Registration Service - Réponse reçue:', response)
      
      // Gérer différents formats de réponse du backend Laravel
      let registrationsData: any[] = []
      
      // Gérer la structure de réponse du backend Laravel
      if (response && response.data) {
        if (Array.isArray(response.data)) {
          registrationsData = response.data
        } else if (typeof response.data === 'object' && 'data' in response.data) {
          // Si c'est une réponse imbriquée
          registrationsData = Array.isArray(response.data.data) ? response.data.data : [response.data.data]
        }
      } else if (Array.isArray(response)) {
        registrationsData = response
      }
      
      console.log('📚 Training Registration Service - Données extraites:', registrationsData.length)
      
      // Convertir les données en camelCase
      const registrations = registrationsData.map(item => toCamelCase(item) as TrainingRegistration)
      console.log('📚 Training Registration Service - Données converties:', registrations.length)
      
      return {
        data: registrations,
        pagination: response?.pagination || response?.data?.pagination || {
          page: 1,
          limit: 10,
          total: registrations.length,
          totalPages: 1,
        },
      }
    } catch (error: any) {
      console.error('Erreur lors de la récupération des inscriptions:', error)
      throw error
    }
  },

  /**
   * Récupère une inscription par son ID
   */
  async getRegistrationById(id: number | string): Promise<TrainingRegistration> {
    const response = await apiClient.get<TrainingRegistration>(`${ENDPOINT}/${id}`)
    return toCamelCase(response.data)
  },

  /**
   * Met à jour une inscription (admin)
   */
  async updateRegistration(id: number | string, registration: Partial<TrainingRegistration>): Promise<TrainingRegistration> {
    // Convertir camelCase vers snake_case
    const snakeCaseRegistration: any = {}
    for (const key in registration) {
      if (registration.hasOwnProperty(key)) {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
        snakeCaseRegistration[snakeKey] = (registration as any)[key]
      }
    }
    
    const response = await apiClient.put<TrainingRegistration>(`${ENDPOINT}/${id}`, snakeCaseRegistration)
    return toCamelCase(response.data)
  },

  /**
   * Supprime une inscription (admin)
   */
  async deleteRegistration(id: number | string): Promise<void> {
    await apiClient.delete<void>(`${ENDPOINT}/${id}`)
  },
}

export default trainingRegistrationService

