export interface FinancingRequest {
  id?: number | string
  // Informations sur l'entreprise
  companyName: string
  legalForm: string
  registrationNumber?: string
  taxId?: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  website?: string
  
  // Informations sur le demandeur
  contactFirstName: string
  contactLastName: string
  contactPosition: string
  contactPhone: string
  contactEmail: string
  
  // Informations sur le projet
  projectTitle: string
  projectDescription: string
  projectType: 'startup' | 'expansion' | 'equipment' | 'working-capital' | 'other'
  sector: string
  requestedAmount: number
  currency: string
  projectDuration?: number // en mois
  expectedStartDate?: string
  
  // Documents
  businessPlan?: string
  financialStatements?: string[]
  otherDocuments?: string[]
  
  // Statut
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected' | 'on-hold'
  reviewNotes?: string
  reviewedBy?: string
  reviewedAt?: string
  
  createdAt?: string
  updatedAt?: string
}

import type { PaginationMeta } from './common.model'

export interface FinancingRequestResponse {
  success: boolean
  data?: FinancingRequest | FinancingRequest[]
  message?: string
  pagination?: PaginationMeta
}

