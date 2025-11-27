/**
 * Service pour la gestion des partenaires
 */

import apiClient from './api.client'
import type { Partner, PartnerResponse } from '../models/partner.model'

const ENDPOINT = '/partners'

export interface PartnerFilters {
  type?: string
  category?: string
  active?: boolean
}

export const partnerService = {
  /**
   * Récupère tous les partenaires
   */
  async getPartners(filters?: PartnerFilters): Promise<Partner[]> {
    const response = await apiClient.get<Partner[]>(ENDPOINT, filters as Record<string, string | number | boolean>)
    return response.data
  },

  /**
   * Récupère un partenaire par son ID
   */
  async getPartnerById(id: number | string): Promise<Partner> {
    const response = await apiClient.get<Partner>(`${ENDPOINT}/${id}`)
    return response.data
  },

  /**
   * Récupère les partenaires actifs
   */
  async getActivePartners(): Promise<Partner[]> {
    const response = await apiClient.get<Partner[]>(`${ENDPOINT}/active`)
    return response.data
  },

  /**
   * Crée un nouveau partenaire
   */
  async createPartner(partner: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>): Promise<Partner> {
    const response = await apiClient.post<Partner>(ENDPOINT, partner)
    return response.data
  },

  /**
   * Met à jour un partenaire
   */
  async updatePartner(id: number | string, partner: Partial<Partner>): Promise<Partner> {
    const response = await apiClient.put<Partner>(`${ENDPOINT}/${id}`, partner)
    return response.data
  },

  /**
   * Supprime un partenaire
   */
  async deletePartner(id: number | string): Promise<void> {
    await apiClient.delete<void>(`${ENDPOINT}/${id}`)
  },

  /**
   * Upload un logo de partenaire
   */
  async uploadLogo(id: number | string, file: File): Promise<Partner> {
    const formData = new FormData()
    formData.append('logo', file)

    const response = await apiClient.upload<Partner>(`${ENDPOINT}/${id}/logo`, formData)
    return response.data
  },
}

export default partnerService


