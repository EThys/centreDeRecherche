/**
 * Service pour la gestion de la galerie
 */

import apiClient, { getBaseUrl } from './api.client'
import type { GalleryPhoto, GalleryCategory, GalleryResponse } from '../models/gallery.model'
import type { PaginationMeta } from '../models/common.model'

const ENDPOINT = '/gallery'

// Fonction utilitaire pour obtenir l'URL complète d'une image
const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return ''
  
  // Si c'est déjà une URL complète, la retourner telle quelle
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // Le backend Laravel stocke dans storage/app/public/
  // Le lien symbolique public/storage pointe vers storage/app/public
  // Les chemins retournés sont comme "gallery/filename.jpg"
  // L'URL publique devrait être /storage/gallery/filename.jpg
  
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
  
  // Le backend retourne directement "gallery/filename.jpg"
  // On doit ajouter "storage/" devant
  if (cleanPath.startsWith('gallery/')) {
    return `${baseUrl}/storage/${cleanPath}`
  }
  
  // Si le chemin ne contient pas de slash, c'est probablement juste un nom de fichier
  // On suppose qu'il est dans storage/gallery/
  if (!cleanPath.includes('/')) {
    return `${baseUrl}/storage/gallery/${cleanPath}`
  }
  
  // Par défaut, ajouter /storage/ devant
  return `${baseUrl}/storage/${cleanPath}`
}

// Fonction pour convertir les données en camelCase et traiter les images
const toCamelCase = (obj: any): any => {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item))
  }
  if (typeof obj !== 'object') return obj
  
  const camelObj: Record<string, any> = {}
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    // Convertir l'URL de l'image si c'est le champ image ou thumbnail
    if ((camelKey === 'image' || camelKey === 'thumbnail') && typeof value === 'string') {
      camelObj[camelKey] = getImageUrl(value)
    } else {
      camelObj[camelKey] = toCamelCase(value)
    }
  }
  return camelObj
}

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
    try {
      // Convertir 'limit' en 'per_page' pour Laravel et filtrer les valeurs undefined
      const laravelFilters: Record<string, string | number | boolean> = {}
      
      // Toujours définir per_page par défaut si limit n'est pas fourni
      if (filters?.limit) {
        laravelFilters['per_page'] = filters.limit
      } else {
        laravelFilters['per_page'] = 100 // Par défaut, charger 100 photos
      }
      
      if (filters) {
        Object.keys(filters).forEach(key => {
          const value = (filters as any)[key]
          // Ignorer les valeurs undefined, null ou vides, et skip 'limit' car déjà converti
          if (key !== 'limit' && value !== undefined && value !== null && value !== '') {
            laravelFilters[key] = value
          }
        })
      }
      
      console.log('📸 Gallery Service - Filtres envoyés:', laravelFilters)
      console.log('📸 Gallery Service - URL complète:', `${ENDPOINT}?${new URLSearchParams(Object.entries(laravelFilters).map(([k, v]) => [k, String(v)])).toString()}`)
      
      const response = await apiClient.get<any>(ENDPOINT, laravelFilters)
      
      console.log('📸 Gallery Service - Réponse complète:', JSON.stringify(response, null, 2))
      
      // Gérer différents formats de réponse du backend Laravel
      let photosData: any[] = []
      
      // Le backend Laravel retourne { success: true, data: [...], pagination: {...} }
      // apiClient.handleResponse() retourne déjà { success: true, data: [...], pagination: {...} }
      // Donc response = { success: true, data: [...], pagination: {...} }
      
      // Le backend Laravel retourne { success: true, data: [...], pagination: {...} }
      // apiClient.handleResponse() retourne ApiResponse<T> = { success: boolean, data: T, pagination?: {...} }
      // Donc response = { success: true, data: [...], pagination: {...} }
      
      // Cas 1: response.data existe et est un tableau (format standard)
      if (response && response.data && Array.isArray(response.data)) {
        photosData = response.data
        console.log('✅ Gallery Service: Photos trouvées dans response.data:', photosData.length)
        console.log('✅ Gallery Service: Première photo:', photosData[0])
      }
      // Cas 2: response est directement un tableau (cas rare, mais possible)
      else if (Array.isArray(response)) {
        photosData = response
        console.log('✅ Gallery Service: Response est directement un tableau:', photosData.length)
      }
      // Cas 3: response.data existe mais n'est pas un tableau (objet unique)
      else if (response && response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
        photosData = [response.data]
        console.log('✅ Gallery Service: Photo unique dans response.data:', photosData.length)
      }
      // Cas 4: response n'a pas de data, chercher dans les autres propriétés
      else if (response && typeof response === 'object' && response !== null) {
        // Chercher une propriété qui contient un tableau (sauf pagination et success)
        for (const [key, value] of Object.entries(response)) {
          if (Array.isArray(value) && key !== 'pagination' && key !== 'success') {
            photosData = value as any[]
            console.log(`✅ Gallery Service: Photos trouvées dans response.${key}:`, photosData.length)
            break
          }
        }
      }
      
      // Si aucune photo trouvée, logger pour déboguer
      if (photosData.length === 0) {
        console.warn('⚠️ Gallery Service: Aucune photo trouvée dans la réponse', {
          response,
          responseType: typeof response,
          hasData: !!response?.data,
          dataType: typeof response?.data,
          isDataArray: Array.isArray(response?.data),
          responseKeys: response ? Object.keys(response) : []
        })
      }
      
      // Convertir les données en camelCase et traiter les images
      const photos = photosData.map((photo, index) => {
        const converted = toCamelCase(photo) as GalleryPhoto
        console.log(`📸 Photo ${index + 1} convertie:`, { 
          id: converted.id, 
          title: converted.title, 
          image: converted.image, 
          category: converted.category 
        })
        return converted
      })
      
      console.log('✅ Gallery Service: Total photos après conversion:', photos.length)
      
      const result = {
        data: photos,
        pagination: response?.pagination || {
          page: 1,
          limit: 10,
          total: photos.length,
          totalPages: 1,
        },
      }
      
      console.log('✅ Gallery Service: Résultat final:', JSON.stringify(result, null, 2))
      
      return result
    } catch (error: any) {
      console.error('❌ Erreur dans getPhotos:', error)
      throw error
    }
  },

  /**
   * Récupère une photo par son ID
   */
  async getPhotoById(id: number | string): Promise<GalleryPhoto> {
    const response = await apiClient.get<any>(`${ENDPOINT}/${id}`)
    return toCamelCase(response.data) as GalleryPhoto
  },

  /**
   * Récupère toutes les catégories
   */
  async getCategories(): Promise<GalleryCategory[]> {
    try {
      const response = await apiClient.get<any[]>(`${ENDPOINT}/categories`)
      
      console.log('📂 Gallery Service - Réponse catégories:', JSON.stringify(response, null, 2))
      
      // Gérer différents formats de réponse
      let categoriesData: any[] = []
      
      if (response) {
        if (Array.isArray(response.data)) {
          categoriesData = response.data
          console.log('✅ Gallery Service: Catégories trouvées dans response.data:', categoriesData.length)
        } else if (Array.isArray(response)) {
          categoriesData = response
          console.log('✅ Gallery Service: Response est directement un tableau:', categoriesData.length)
        } else if (response.data && typeof response.data === 'object') {
          categoriesData = Array.isArray(response.data) ? response.data : [response.data]
          console.log('✅ Gallery Service: Catégories extraites de response.data:', categoriesData.length)
        }
      }
      
      const categories = categoriesData.map(cat => toCamelCase(cat) as GalleryCategory)
      console.log('✅ Gallery Service: Catégories finales:', categories)
      
      return categories
    } catch (error: any) {
      console.error('❌ Erreur dans getCategories:', error)
      throw error
    }
  },

  /**
   * Récupère les photos mises en avant
   */
  async getFeaturedPhotos(limit?: number): Promise<GalleryPhoto[]> {
    const response = await apiClient.get<any[]>(`${ENDPOINT}/featured`, { limit: limit || 6 })
    
    // Gérer différents formats de réponse
    let photosData: any[] = []
    
    if (response) {
      if (Array.isArray(response.data)) {
        photosData = response.data
      } else if (Array.isArray(response)) {
        photosData = response
      } else if (response.data && typeof response.data === 'object') {
        photosData = Array.isArray(response.data) ? response.data : [response.data]
      }
    }
    
    return photosData.map(photo => toCamelCase(photo) as GalleryPhoto)
  },

  /**
   * Crée une nouvelle photo
   */
  async createPhoto(photo: Omit<GalleryPhoto, 'id' | 'createdAt' | 'updatedAt'>): Promise<GalleryPhoto> {
    const response = await apiClient.post<any>(ENDPOINT, photo)
    return toCamelCase(response.data) as GalleryPhoto
  },

  /**
   * Met à jour une photo
   */
  async updatePhoto(id: number | string, photo: Partial<GalleryPhoto>): Promise<GalleryPhoto> {
    const response = await apiClient.put<any>(`${ENDPOINT}/${id}`, photo)
    return toCamelCase(response.data) as GalleryPhoto
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
    formData.append('image', file) // Le backend attend 'image' et non 'file'
    if (photoData.title) formData.append('title', photoData.title)
    if (photoData.description) formData.append('description', photoData.description || '')
    if (photoData.category) formData.append('category', photoData.category)
    if (photoData.date) formData.append('date', photoData.date)
    if (photoData.author) formData.append('author', photoData.author)
    if (photoData.tags && photoData.tags.length > 0) {
      formData.append('tags', JSON.stringify(photoData.tags))
    }
    if (photoData.featured !== undefined) {
      formData.append('featured', photoData.featured ? '1' : '0')
    }
    if (photoData.order !== undefined) {
      formData.append('order', photoData.order.toString())
    }

    const response = await apiClient.upload<any>(ENDPOINT, formData)
    return toCamelCase(response.data) as GalleryPhoto
  },

  /**
   * Obtient l'URL complète d'une image
   */
  getImageUrl,
}

export default galleryService

