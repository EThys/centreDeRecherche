/**
 * Modèles pour la newsletter
 */

export interface NewsletterSubscription {
  id?: number | string
  email: string
  firstName?: string
  lastName?: string
  status: 'active' | 'unsubscribed' | 'pending'
  preferences?: {
    events?: boolean
    publications?: boolean
    actualities?: boolean
    general?: boolean
  }
  subscribedAt?: string
  unsubscribedAt?: string
  createdAt?: string
  updatedAt?: string
}

export interface NewsletterCampaign {
  id?: number | string
  subject: string
  content: string
  htmlContent?: string
  sentAt?: string
  recipients: number
  opened?: number
  clicked?: number
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'
  scheduledFor?: string
  createdAt?: string
  updatedAt?: string
}

export interface NewsletterResponse {
  success: boolean
  data?: NewsletterSubscription | NewsletterSubscription[]
  message?: string
}

