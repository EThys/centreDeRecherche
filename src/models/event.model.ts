export interface Event {
  id?: number | string
  title: string
  description: string
  content?: string
  image: string
  type: 'conference' | 'workshop' | 'seminar' | 'webinar' | 'other'
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  startDate: string
  endDate?: string
  startTime: string
  endTime?: string
  location: string
  address?: string
  price?: number
  currency?: string
  maxAttendees?: number
  currentAttendees?: number
  registrationRequired: boolean
  registrationDeadline?: string
  speakers?: EventSpeaker[]
  agenda?: EventAgendaItem[]
  tags?: string[]
  category?: string
  createdAt?: string
  updatedAt?: string
}

export interface EventSpeaker {
  id?: number | string
  name: string
  position: string
  bio?: string
  photo?: string
  organization?: string
}

export interface EventAgendaItem {
  id?: number | string
  time: string
  title: string
  description?: string
  speaker?: string
}

export interface EventRegistration {
  id?: number | string
  eventId: number | string
  firstName: string
  lastName: string
  email: string
  phone?: string
  organization?: string
  position?: string
  notes?: string
  status?: 'pending' | 'confirmed' | 'cancelled'
  createdAt?: string
}

import type { PaginationMeta } from './common.model'

export interface EventResponse {
  success: boolean
  data: Event | Event[]
  message?: string
  pagination?: PaginationMeta
}

