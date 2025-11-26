/**
 * Modèles pour les équipes (Conseil de Direction et Comité de gestion)
 */

export interface TeamMember {
  id?: number | string
  name: string
  position: string
  role: string
  photo: string
  highlights: string[]
  education: string
  email?: string
  phone?: string
  bio?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface TeamCategory {
  id: number | string
  name: 'conseil-direction' | 'comite-gestion'
  label: string
  members: TeamMember[]
}

export interface TeamResponse {
  success: boolean
  data: TeamMember[] | TeamCategory[]
  message?: string
}

