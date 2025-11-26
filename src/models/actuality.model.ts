export interface Actuality {
  id?: number | string
  title: string
  summary: string
  content: string
  image: string
  category: string
  author: string
  authorPhoto?: string
  publishDate: string
  readTime?: number
  views?: number
  tags?: string[]
  featured?: boolean
  status?: 'draft' | 'published' | 'archived'
  relatedArticles?: number[]
  createdAt?: string
  updatedAt?: string
}

import type { PaginationMeta } from './common.model'

export interface ActualityResponse {
  success: boolean
  data: Actuality | Actuality[]
  message?: string
  pagination?: PaginationMeta
}

