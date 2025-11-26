/**
 * Service pour la gestion des demandes de financement
 */

import apiClient from './api.client'
import type { FinancingRequest, FinancingRequestResponse } from '../models/financing-request.model'
import type { PaginationMeta } from '../models/common.model'

const ENDPOINT = '/financing-requests'

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
    const response = await apiClient.post<FinancingRequest>(ENDPOINT, request)
    return response.data
  },

  /**
   * Récupère toutes les demandes (admin)
   */
  async getRequests(filters?: FinancingRequestFilters): Promise<{ data: FinancingRequest[]; pagination: PaginationMeta }> {
    const response = await apiClient.get<FinancingRequest[]>(ENDPOINT, filters as Record<string, string | number | boolean>)
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
   * Récupère une demande par son ID
   */
  async getRequestById(id: number | string): Promise<FinancingRequest> {
    const response = await apiClient.get<FinancingRequest>(`${ENDPOINT}/${id}`)
    return response.data
  },

  /**
   * Met à jour le statut d'une demande (admin)
   */
  async updateRequestStatus(
    id: number | string,
    status: FinancingRequest['status'],
    reviewNotes?: string
  ): Promise<FinancingRequest> {
    const response = await apiClient.put<FinancingRequest>(`${ENDPOINT}/${id}/status`, { status, reviewNotes })
    return response.data
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

