/**
 * Modèles pour l'inscription aux formations
 */

export interface TrainingRegistration {
  id?: number | string
  // Informations personnelles
  name: string
  email: string
  phone?: string
  
  // Informations sur la formation
  program: 'training1' | 'training2' | 'training3' | 'training4' | string
  programName?: string // Nom lisible du programme
  
  // Message optionnel
  message?: string
  
  // Statut de l'inscription
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  
  // Informations supplémentaires
  company?: string
  position?: string
  
  // Dates
  registrationDate?: string
  confirmedAt?: string
  cancelledAt?: string
  createdAt?: string
  updatedAt?: string
}

export interface TrainingRegistrationResponse {
  success: boolean
  data?: TrainingRegistration | TrainingRegistration[]
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

