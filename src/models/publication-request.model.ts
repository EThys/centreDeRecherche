/**
 * Modèles pour les demandes de publication de travaux de recherche
 */

export interface PublicationRequest {
  id?: number | string
  // Informations personnelles
  name: string
  email: string
  phone?: string
  institution?: string
  position?: string
  
  // Informations sur le travail de recherche
  title: string
  abstract: string
  type: 'article' | 'research-paper' | 'book' | 'report' | 'other' | string
  domains: string[] // Domaines de recherche
  
  // Informations sur les auteurs
  authors: string // Liste des auteurs séparés par des virgules
  coAuthors?: string
  
  // Informations supplémentaires
  keywords?: string
  message?: string
  
  // Statut de la demande
  status: 'pending' | 'under-review' | 'accepted' | 'rejected' | 'published'
  
  // Dates
  submissionDate?: string
  reviewedAt?: string
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
}

export interface PublicationRequestResponse {
  success: boolean
  data?: PublicationRequest | PublicationRequest[]
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

