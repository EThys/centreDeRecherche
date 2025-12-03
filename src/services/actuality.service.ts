/**
 * Service pour la gestion des actualités
 */

import apiClient, { getBaseUrl } from './api.client'
import type { Actuality, ActualityResponse } from '../models/actuality.model'
import type { PaginationMeta } from '../models/common.model'

const ENDPOINT = '/actualities'

export interface ActualityFilters {
  category?: string
  author?: string
  featured?: boolean
  status?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: 'date' | 'views' | 'title'
  sortOrder?: 'asc' | 'desc'
}

// Fonctions utilitaires
const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return ''
  
  // Si c'est déjà une URL complète, la retourner telle quelle
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // Le backend Laravel stocke dans storage/app/public/
  // Le lien symbolique public/storage pointe vers storage/app/public
  // Les chemins retournés sont comme "actualities/filename.jpg" ou "events/filename.jpg"
  // L'URL publique devrait être /storage/actualities/filename.jpg
  
  // Pour les images, on utilise l'URL de base sans /api (détection automatique local/prod)
  const baseUrl = getBaseUrl()
  
  // Nettoyer le chemin (enlever les backslashes échappés et les slashes initiaux)
  let cleanPath = imagePath.trim().replace(/\\/g, '/')
  
  // Enlever les slashes initiaux
  while (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1)
  }
  
  // Si le chemin commence déjà par storage/, l'utiliser tel quel
  if (cleanPath.startsWith('storage/')) {
    return `${baseUrl}/${cleanPath}`
  }
  
  // Le backend retourne directement "actualities/filename.jpg" ou "events/filename.jpg"
  // On doit ajouter "storage/" devant
  if (cleanPath.startsWith('actualities/') || cleanPath.startsWith('events/') || cleanPath.startsWith('authors/')) {
    return `${baseUrl}/storage/${cleanPath}`
  }
  
  // Si le chemin ne contient pas de slash, c'est probablement juste un nom de fichier
  // On suppose qu'il est dans storage/actualities/
  if (!cleanPath.includes('/')) {
    return `${baseUrl}/storage/actualities/${cleanPath}`
  }
  
  // Par défaut, ajouter /storage/ devant
  return `${baseUrl}/storage/${cleanPath}`
}

const toCamelCase = (obj: any): any => {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item))
  }
  if (typeof obj !== 'object') return obj
  
  const camelObj: Record<string, any> = {}
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    // Convertir l'URL de l'image si c'est le champ image
    if ((camelKey === 'image' || camelKey === 'authorPhoto') && typeof value === 'string') {
      camelObj[camelKey] = getImageUrl(value)
    } else if (camelKey === 'learningPoints' || camelKey === 'keyPoints') {
      // S'assurer que les tableaux sont bien des tableaux
      camelObj[camelKey] = Array.isArray(value) ? value : (value ? [value] : [])
    } else {
      camelObj[camelKey] = toCamelCase(value)
    }
  }
  return camelObj
}

export const actualityService = {
  /**
   * Récupère toutes les actualités avec filtres et pagination
   */
  async getActualities(filters?: ActualityFilters): Promise<{ data: Actuality[]; pagination: PaginationMeta }> {
    const backendFilters: Record<string, any> = {}
    if (filters) {
      if (filters.category) backendFilters.category = filters.category
      if (filters.author) backendFilters.author = filters.author
      if (filters.featured !== undefined) backendFilters.featured = filters.featured
      if (filters.status) backendFilters.status = filters.status
      if (filters.search) backendFilters.search = filters.search
      if (filters.page) backendFilters.page = filters.page
      if (filters.limit) backendFilters.per_page = filters.limit
    }

    const response = await apiClient.get<any[]>(ENDPOINT, backendFilters as Record<string, string | number | boolean>)
    
    // Gérer différents formats de réponse du backend Laravel
    let actualitiesData: any[] = []
    
    if (response) {
      // Si response.data existe et est un tableau
      if (Array.isArray(response.data)) {
        actualitiesData = response.data
      }
      // Si response.data n'existe pas mais response est un tableau
      else if (Array.isArray(response)) {
        actualitiesData = response
      }
      // Si response est un objet avec une propriété qui contient les données
      else if (response.data && typeof response.data === 'object') {
        actualitiesData = Array.isArray(response.data) ? response.data : [response.data]
      }
    }
    
    // Convertir les données en camelCase
    const actualities = actualitiesData.map(actuality => toCamelCase(actuality) as Actuality)
    
    return {
      data: actualities,
      pagination: response.pagination || {
        page: 1,
        limit: 10,
        total: actualities.length,
        totalPages: 1,
      },
    }
  },

  /**
   * Récupère une actualité par son ID
   */
  async getActualityById(id: number | string): Promise<Actuality> {
    const response = await apiClient.get<Actuality>(`${ENDPOINT}/${id}`)
    return toCamelCase(response.data) as Actuality
  },

  /**
   * Récupère les actualités récentes
   */
  async getRecentActualities(limit?: number): Promise<Actuality[]> {
    const response = await apiClient.get<Actuality[]>(`${ENDPOINT}`, { 
      status: 'published',
      per_page: limit || 3,
      sortBy: 'date',
      sortOrder: 'desc'
    })
    const actualities = Array.isArray(response.data) 
      ? response.data.map(actuality => toCamelCase(actuality) as Actuality)
      : []
    return actualities
  },

  /**
   * Récupère les actualités mises en avant
   */
  async getFeaturedActualities(limit?: number): Promise<Actuality[]> {
    const response = await apiClient.get<Actuality[]>(ENDPOINT, { 
      featured: true,
      status: 'published',
      per_page: limit || 3
    })
    const actualities = Array.isArray(response.data) 
      ? response.data.map(actuality => toCamelCase(actuality) as Actuality)
      : []
    return actualities
  },

  /**
   * Crée une nouvelle actualité avec support pour l'upload d'image
   */
  async createActuality(
    actuality: Omit<Actuality, 'id' | 'createdAt' | 'updatedAt'>, 
    imageFile?: File
  ): Promise<Actuality> {
    const formData = new FormData()
    
    // Convertir camelCase en snake_case pour le backend
    if (actuality.title) formData.append('title', actuality.title.trim())
    if (actuality.summary) formData.append('summary', actuality.summary.trim())
    if (actuality.content) formData.append('content', actuality.content.trim())
    if (actuality.category) formData.append('category', actuality.category.trim())
    if (actuality.author) formData.append('author', actuality.author.trim())
    if (actuality.publishDate) formData.append('publish_date', actuality.publishDate)
    if (actuality.readTime !== undefined && actuality.readTime !== null) {
      formData.append('read_time', actuality.readTime.toString())
    }
    if (actuality.status) formData.append('status', actuality.status)
    if (actuality.featured !== undefined && actuality.featured !== null) {
      formData.append('featured', actuality.featured ? '1' : '0')
    }
     // Toujours envoyer les tableaux, même s'ils sont vides
     if (actuality.tags !== undefined) {
       formData.append('tags', JSON.stringify(Array.isArray(actuality.tags) ? actuality.tags : []))
     } else {
       formData.append('tags', JSON.stringify([]))
     }
     if (actuality.learningPoints !== undefined) {
       formData.append('learning_points', JSON.stringify(Array.isArray(actuality.learningPoints) ? actuality.learningPoints : []))
     } else {
       formData.append('learning_points', JSON.stringify([]))
     }
     if (actuality.keyPoints !== undefined) {
       formData.append('key_points', JSON.stringify(Array.isArray(actuality.keyPoints) ? actuality.keyPoints : []))
     } else {
       formData.append('key_points', JSON.stringify([]))
     }
     if (actuality.relatedArticles !== undefined) {
       formData.append('related_articles', JSON.stringify(Array.isArray(actuality.relatedArticles) ? actuality.relatedArticles : []))
     } else {
       formData.append('related_articles', JSON.stringify([]))
     }

    // Ajouter l'image si fournie
    if (imageFile) {
      formData.append('image', imageFile)
    }

    // Utiliser la méthode upload du client API
    const response = await apiClient.upload<Actuality>(ENDPOINT, formData)
    
    // Convertir la réponse en camelCase
    const camelData = toCamelCase(response.data as any)
    return camelData as Actuality
  },

  /**
   * Met à jour une actualité avec support pour l'upload d'image
   */
  async updateActuality(
    id: number | string, 
    actuality: Partial<Actuality>,
    imageFile?: File
  ): Promise<Actuality> {
    const formData = new FormData()
    
    // Convertir camelCase en snake_case pour le backend
    if (actuality.title !== undefined) formData.append('title', actuality.title.trim())
    if (actuality.summary !== undefined) formData.append('summary', actuality.summary.trim())
    if (actuality.content !== undefined) formData.append('content', actuality.content.trim())
    if (actuality.category !== undefined) formData.append('category', actuality.category.trim())
    if (actuality.author !== undefined) formData.append('author', actuality.author.trim())
    if (actuality.publishDate !== undefined) formData.append('publish_date', actuality.publishDate)
    if (actuality.readTime !== undefined && actuality.readTime !== null) {
      formData.append('read_time', actuality.readTime.toString())
    }
    if (actuality.status !== undefined) formData.append('status', actuality.status)
    if (actuality.featured !== undefined && actuality.featured !== null) {
      formData.append('featured', actuality.featured ? '1' : '0')
    }
     // Toujours envoyer les tableaux, même s'ils sont vides
     if (actuality.tags !== undefined) {
       formData.append('tags', JSON.stringify(Array.isArray(actuality.tags) ? actuality.tags : []))
     } else {
       formData.append('tags', JSON.stringify([]))
     }
     if (actuality.learningPoints !== undefined) {
       formData.append('learning_points', JSON.stringify(Array.isArray(actuality.learningPoints) ? actuality.learningPoints : []))
     } else {
       formData.append('learning_points', JSON.stringify([]))
     }
     if (actuality.keyPoints !== undefined) {
       formData.append('key_points', JSON.stringify(Array.isArray(actuality.keyPoints) ? actuality.keyPoints : []))
     } else {
       formData.append('key_points', JSON.stringify([]))
     }
     if (actuality.relatedArticles !== undefined) {
       formData.append('related_articles', JSON.stringify(Array.isArray(actuality.relatedArticles) ? actuality.relatedArticles : []))
     } else {
       formData.append('related_articles', JSON.stringify([]))
     }

    // Ajouter l'image si fournie
    if (imageFile) {
      formData.append('image', imageFile)
    }

    // Utiliser la méthode uploadPut du client API
    const response = await apiClient.uploadPut<Actuality>(`${ENDPOINT}/${id}`, formData)
    
    // Convertir la réponse en camelCase
    const camelData = toCamelCase(response.data as any)
    return camelData as Actuality
  },

  /**
   * Supprime une actualité
   */
  async deleteActuality(id: number | string): Promise<void> {
    await apiClient.delete<void>(`${ENDPOINT}/${id}`)
  },

  /**
   * Incrémente le nombre de vues d'une actualité
   */
  async incrementViews(id: number | string): Promise<void> {
    await apiClient.post<void>(`${ENDPOINT}/${id}/views`)
  },

  /**
   * Obtient l'URL complète d'une image
   */
  getImageUrl,
}

export default actualityService

