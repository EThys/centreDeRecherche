/**
 * Service pour la gestion de la newsletter
 */

import apiClient from './api.client'
import type { NewsletterSubscription, NewsletterCampaign, NewsletterResponse } from '../models/newsletter.model'

const ENDPOINT = '/newsletter'

export const newsletterService = {
  /**
   * S'abonne à la newsletter
   */
  async subscribe(subscription: Omit<NewsletterSubscription, 'id' | 'status' | 'subscribedAt' | 'createdAt' | 'updatedAt'>): Promise<NewsletterSubscription> {
    // Convertir camelCase vers snake_case pour l'API
    const snakeCaseSubscription: any = {
      email: subscription.email,
    }
    
    if (subscription.firstName) {
      snakeCaseSubscription.first_name = subscription.firstName
    }
    if (subscription.lastName) {
      snakeCaseSubscription.last_name = subscription.lastName
    }
    if (subscription.preferences) {
      snakeCaseSubscription.preferences = subscription.preferences
    }
    
    const response = await apiClient.post<NewsletterSubscription>(`${ENDPOINT}/subscribe`, snakeCaseSubscription)
    
    // Convertir la réponse en camelCase
    const convertToCamelCase = (obj: any): any => {
      if (obj === null || obj === undefined) return obj
      if (Array.isArray(obj)) return obj.map(item => convertToCamelCase(item))
      if (typeof obj !== 'object') return obj
      
      const camelObj: any = {}
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
          camelObj[camelKey] = convertToCamelCase(obj[key])
        }
      }
      return camelObj
    }
    
    return convertToCamelCase(response.data) as NewsletterSubscription
  },

  /**
   * Se désabonne de la newsletter
   */
  async unsubscribe(email: string): Promise<void> {
    await apiClient.post<void>(`${ENDPOINT}/unsubscribe`, { email })
  },

  /**
   * Vérifie le statut d'un abonnement
   */
  async getSubscriptionStatus(email: string): Promise<NewsletterSubscription | null> {
    try {
      const response = await apiClient.get<NewsletterSubscription>(`${ENDPOINT}/status`, { email })
      return response.data
    } catch {
      return null
    }
  },

  /**
   * Met à jour les préférences d'abonnement
   */
  async updatePreferences(email: string, preferences: NewsletterSubscription['preferences']): Promise<NewsletterSubscription> {
    const response = await apiClient.put<NewsletterSubscription>(`${ENDPOINT}/preferences`, { email, preferences })
    return response.data
  },

  /**
   * Récupère tous les abonnés (admin)
   */
  async getAllSubscribers(filters?: { status?: string; search?: string; limit?: number }): Promise<{ data: NewsletterSubscription[]; pagination?: any }> {
    const params: any = {}
    if (filters?.status) params.status = filters.status
    if (filters?.search) params.search = filters.search
    params.per_page = filters?.limit || 100
    
    const response = await apiClient.get<NewsletterSubscription[]>(`${ENDPOINT}/subscribers`, params)
    
    // Convertir snake_case en camelCase
    const convertToCamelCase = (obj: any): any => {
      if (obj === null || obj === undefined) return obj
      if (Array.isArray(obj)) return obj.map(item => convertToCamelCase(item))
      if (typeof obj !== 'object') return obj
      
      const camelObj: any = {}
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
          camelObj[camelKey] = convertToCamelCase(obj[key])
        }
      }
      return camelObj
    }
    
    let subscribersData: any[] = []
    if (response) {
      if (Array.isArray(response.data)) {
        subscribersData = response.data
      } else if (Array.isArray(response)) {
        subscribersData = response
      } else if (response.data && typeof response.data === 'object') {
        subscribersData = Array.isArray(response.data) ? response.data : [response.data]
      }
    }
    
    const subscribers = subscribersData.map(item => convertToCamelCase(item) as NewsletterSubscription)
    
    return {
      data: subscribers,
      pagination: response.pagination
    }
  },

  /**
   * Crée une campagne de newsletter (admin)
   */
  async createCampaign(campaign: Omit<NewsletterCampaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<NewsletterCampaign> {
    const response = await apiClient.post<NewsletterCampaign>(`${ENDPOINT}/campaigns`, campaign)
    return response.data
  },

  /**
   * Envoie une campagne (admin)
   */
  async sendCampaign(campaignId: number | string): Promise<void> {
    await apiClient.post<void>(`${ENDPOINT}/campaigns/${campaignId}/send`)
  },

  /**
   * Supprime un abonné (admin)
   */
  async deleteSubscriber(id: number | string): Promise<void> {
    await apiClient.delete<void>(`${ENDPOINT}/${id}`)
  },
}

export default newsletterService


