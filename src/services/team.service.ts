/**
 * Service pour la gestion des équipes (Conseil de Direction et Comité de gestion)
 */

import apiClient from './api.client'
import type { TeamMember, TeamCategory, TeamResponse } from '../models/team.model'

const ENDPOINT = '/teams'

export const teamService = {
  /**
   * Récupère tous les membres d'une catégorie
   */
  async getMembersByCategory(category: 'conseil-direction' | 'comite-gestion'): Promise<TeamMember[]> {
    const response = await apiClient.get<TeamMember[]>(`${ENDPOINT}/category/${category}`)
    return response.data
  },

  /**
   * Récupère tous les membres de toutes les catégories
   */
  async getAllMembers(): Promise<TeamCategory[]> {
    const response = await apiClient.get<TeamCategory[]>(ENDPOINT)
    return response.data
  },

  /**
   * Récupère un membre par son ID
   */
  async getMemberById(id: number | string): Promise<TeamMember> {
    const response = await apiClient.get<TeamMember>(`${ENDPOINT}/${id}`)
    return response.data
  },

  /**
   * Crée un nouveau membre
   */
  async createMember(member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<TeamMember> {
    const response = await apiClient.post<TeamMember>(ENDPOINT, member)
    return response.data
  },

  /**
   * Met à jour un membre
   */
  async updateMember(id: number | string, member: Partial<TeamMember>): Promise<TeamMember> {
    const response = await apiClient.put<TeamMember>(`${ENDPOINT}/${id}`, member)
    return response.data
  },

  /**
   * Supprime un membre
   */
  async deleteMember(id: number | string): Promise<void> {
    await apiClient.delete<void>(`${ENDPOINT}/${id}`)
  },
}

export default teamService


