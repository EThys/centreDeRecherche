/**
 * Service pour la gestion de la galerie
 */

import apiClient from './api.client'
import type { GalleryPhoto, GalleryCategory, GalleryResponse } from '../models/gallery.model'
import type { PaginationMeta } from '../models/common.model'

const ENDPOINT = '/gallery'

export interface GalleryFilters {
  category?: string
  featured?: boolean
  search?: string
  page?: number
  limit?: number
  sortBy?: 'date' | 'title' | 'order'
  sortOrder?: 'asc' | 'desc'
}

export const galleryService = {
  /**
   * Récupère toutes les photos avec filtres et pagination
   */
  async getPhotos(filters?: GalleryFilters): Promise<{ data: GalleryPhoto[]; pagination: PaginationMeta }> {
    const response = await apiClient.get<GalleryPhoto[]>(ENDPOINT, filters as Record<string, string | number | boolean>)
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
   * Récupère une photo par son ID
   */
  async getPhotoById(id: number | string): Promise<GalleryPhoto> {
    const response = await apiClient.get<GalleryPhoto>(`${ENDPOINT}/${id}`)
    return response.data
  },

  /**
   * Récupère toutes les catégories
   */
  async getCategories(): Promise<GalleryCategory[]> {
    const response = await apiClient.get<GalleryCategory[]>(`${ENDPOINT}/categories`)
    return response.data
  },

  /**
   * Récupère les photos mises en avant
   */
  async getFeaturedPhotos(limit?: number): Promise<GalleryPhoto[]> {
    const response = await apiClient.get<GalleryPhoto[]>(`${ENDPOINT}/featured`, { limit: limit || 6 })
    return response.data
  },

  /**
   * Crée une nouvelle photo
   */
  async createPhoto(photo: Omit<GalleryPhoto, 'id' | 'createdAt' | 'updatedAt'>): Promise<GalleryPhoto> {
    const response = await apiClient.post<GalleryPhoto>(ENDPOINT, photo)
    return response.data
  },

  /**
   * Met à jour une photo
   */
  async updatePhoto(id: number | string, photo: Partial<GalleryPhoto>): Promise<GalleryPhoto> {
    const response = await apiClient.put<GalleryPhoto>(`${ENDPOINT}/${id}`, photo)
    return response.data
  },

  /**
   * Supprime une photo
   */
  async deletePhoto(id: number | string): Promise<void> {
    await apiClient.delete<void>(`${ENDPOINT}/${id}`)
  },

  /**
   * Upload une image
   */
  async uploadPhoto(file: File, photoData: Partial<GalleryPhoto>): Promise<GalleryPhoto> {
    const formData = new FormData()
    formData.append('file', file)
    if (photoData.title) formData.append('title', photoData.title)
    if (photoData.description) formData.append('description', photoData.description)
    if (photoData.category) formData.append('category', photoData.category)
    if (photoData.date) formData.append('date', photoData.date)
    if (photoData.author) formData.append('author', photoData.author)

    const response = await apiClient.upload<GalleryPhoto>(`${ENDPOINT}/upload`, formData)
    return response.data
  },
}

export default galleryService

