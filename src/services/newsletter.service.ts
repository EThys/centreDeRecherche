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
    const response = await apiClient.post<NewsletterSubscription>(`${ENDPOINT}/subscribe`, subscription)
    return response.data
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
  async getAllSubscribers(): Promise<NewsletterSubscription[]> {
    const response = await apiClient.get<NewsletterSubscription[]>(`${ENDPOINT}/subscribers`)
    return response.data
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
}

export default newsletterService

