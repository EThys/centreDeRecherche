/**
 * Service pour la gestion de la newsletter
 */

import apiClient from './api.client'
import type { NewsletterSubscription } from '../models/newsletter.model'

const ENDPOINT = '/newsletter'

// Fonction pour convertir snake_case en camelCase
const toCamelCase = (obj: any): any => {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.map(item => toCamelCase(item))
  if (typeof obj !== 'object') return obj
  
  const camelObj: any = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      camelObj[camelKey] = toCamelCase(obj[key])
    }
  }
  return camelObj
}

export const newsletterService = {
  /**
   * S'abonne à la newsletter (route publique)
   */
  async subscribe(subscription: Omit<NewsletterSubscription, 'id' | 'status' | 'subscribedAt' | 'createdAt' | 'updatedAt' | 'unsubscribedAt'>): Promise<NewsletterSubscription> {
    try {
      // Convertir camelCase vers snake_case pour l'API
      const snakeCaseSubscription: any = {
        email: subscription.email,
        first_name: subscription.firstName,
        last_name: subscription.lastName,
        preferences: subscription.preferences,
      }
      
      const response = await apiClient.post<NewsletterSubscription>(`${ENDPOINT}/subscribe`, snakeCaseSubscription)
      
      // Gérer la structure de réponse
      let subscriptionData: any = response.data
      if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        subscriptionData = (response.data as any).data
      }
      
      return toCamelCase(subscriptionData) as NewsletterSubscription
    } catch (error: any) {
      console.error('Erreur lors de l\'abonnement à la newsletter:', error)
      throw error
    }
  },

  /**
   * Se désabonne de la newsletter (route publique)
   */
  async unsubscribe(email: string): Promise<void> {
    await apiClient.post<void>(`${ENDPOINT}/unsubscribe`, { email })
  },

  /**
   * Vérifie le statut d'un abonnement (route publique)
   */
  async getSubscriptionStatus(email: string): Promise<NewsletterSubscription | null> {
    try {
      const response = await apiClient.get<NewsletterSubscription>(`${ENDPOINT}/status`, { email })
      if (response.data) {
        return toCamelCase(response.data) as NewsletterSubscription
      }
      return null
    } catch {
      return null
    }
  },

  /**
   * Récupère tous les abonnés (admin) - utilise /subscribers
   */
  async getAllSubscribers(filters?: { status?: string; search?: string; limit?: number }): Promise<{ data: NewsletterSubscription[]; pagination?: any }> {
    const params: any = {}
    if (filters?.status) params.status = filters.status
    if (filters?.search) params.search = filters.search
    params.per_page = filters?.limit || 100
    
    try {
      const response = await apiClient.get<any>(`${ENDPOINT}/subscribers`, params)
      
      let subscribersData: any[] = []
      
      // Gérer la structure de réponse du backend Laravel
      if (response && response.data) {
        if (Array.isArray(response.data)) {
          subscribersData = response.data
        } else if (typeof response.data === 'object' && 'data' in response.data) {
          // Si c'est une réponse imbriquée
          subscribersData = Array.isArray(response.data.data) ? response.data.data : [response.data.data]
        }
      } else if (Array.isArray(response)) {
        subscribersData = response
      }
      
      const subscribers = subscribersData.map(item => toCamelCase(item) as NewsletterSubscription)
      
      return {
        data: subscribers,
        pagination: response?.pagination || response?.data?.pagination
      }
    } catch (error: any) {
      console.error('Erreur lors de la récupération des abonnés:', error)
      throw error
    }
  },

  /**
   * Récupère tous les abonnés (admin) - utilise l'endpoint index /
   */
  async getSubscriptions(filters?: { status?: string; search?: string; limit?: number; page?: number }): Promise<{ data: NewsletterSubscription[]; pagination?: any }> {
    const params: any = {}
    if (filters?.status) params.status = filters.status
    if (filters?.search) params.search = filters.search
    if (filters?.page) params.page = filters.page
    params.per_page = filters?.limit || 15
    
    try {
      const response = await apiClient.get<any>(ENDPOINT, params)
      
      let subscribersData: any[] = []
      
      // Gérer la structure de réponse du backend Laravel
      if (response && response.data) {
        if (Array.isArray(response.data)) {
          subscribersData = response.data
        } else if (typeof response.data === 'object' && 'data' in response.data) {
          // Si c'est une réponse imbriquée
          subscribersData = Array.isArray(response.data.data) ? response.data.data : [response.data.data]
        }
      } else if (Array.isArray(response)) {
        subscribersData = response
      }
      
      const subscribers = subscribersData.map(item => toCamelCase(item) as NewsletterSubscription)
      
      return {
        data: subscribers,
        pagination: response?.pagination || response?.data?.pagination
      }
    } catch (error: any) {
      console.error('Erreur lors de la récupération des abonnements:', error)
      throw error
    }
  },

  /**
   * Récupère un abonnement par ID (admin)
   */
  async getSubscriptionById(id: number | string): Promise<NewsletterSubscription> {
    const response = await apiClient.get<NewsletterSubscription>(`${ENDPOINT}/${id}`)
    return toCamelCase(response.data) as NewsletterSubscription
  },

  /**
   * Crée un abonnement (admin) - utilise POST /
   */
  async createSubscription(subscription: Omit<NewsletterSubscription, 'id' | 'subscribedAt' | 'createdAt' | 'updatedAt' | 'unsubscribedAt'>): Promise<NewsletterSubscription> {
    // Convertir camelCase vers snake_case
    const snakeCaseSubscription: any = {
      email: subscription.email,
      first_name: subscription.firstName,
      last_name: subscription.lastName,
      preferences: subscription.preferences,
      status: subscription.status || 'active',
    }
    
    const response = await apiClient.post<NewsletterSubscription>(ENDPOINT, snakeCaseSubscription)
    return toCamelCase(response.data) as NewsletterSubscription
  },

  /**
   * Met à jour un abonnement (admin)
   */
  async updateSubscription(id: number | string, subscription: Partial<NewsletterSubscription>): Promise<NewsletterSubscription> {
    // Convertir camelCase vers snake_case
    const snakeCaseSubscription: any = {}
    if (subscription.email !== undefined) snakeCaseSubscription.email = subscription.email
    if (subscription.firstName !== undefined) snakeCaseSubscription.first_name = subscription.firstName
    if (subscription.lastName !== undefined) snakeCaseSubscription.last_name = subscription.lastName
    if (subscription.preferences !== undefined) snakeCaseSubscription.preferences = subscription.preferences
    if (subscription.status !== undefined) snakeCaseSubscription.status = subscription.status
    
    const response = await apiClient.put<NewsletterSubscription>(`${ENDPOINT}/${id}`, snakeCaseSubscription)
    return toCamelCase(response.data) as NewsletterSubscription
  },

  /**
   * Supprime un abonné (admin)
   */
  async deleteSubscriber(id: number | string): Promise<void> {
    await apiClient.delete<void>(`${ENDPOINT}/${id}`)
  },
}

export default newsletterService


