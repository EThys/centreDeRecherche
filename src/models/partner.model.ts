/**
 * Modèles pour les partenaires
 */

export interface Partner {
  id?: number | string
  name: string
  description: string
  logo: string
  website?: string
  email?: string
  phone?: string
  address?: string
  type: 'academic' | 'institutional' | 'corporate' | 'ngo' | 'other'
  category?: string
  partnershipType?: 'research' | 'training' | 'financial' | 'strategic' | 'other'
  startDate?: string
  endDate?: string
  active: boolean
  order?: number
  socialLinks?: {
    linkedin?: string
    twitter?: string
    facebook?: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface PartnerResponse {
  success: boolean
  data: Partner | Partner[]
  message?: string
}

