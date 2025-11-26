/**
 * Modèles pour les publications
 */

export interface Publication {
  id?: number | string
  title: string
  abstract: string
  content: string
  image: string
  type: 'article' | 'research-paper' | 'book' | 'report' | 'other'
  authors: PublicationAuthor[]
  journal?: string
  publisher?: string
  publicationDate: string
  doi?: string
  isbn?: string
  citations?: number
  downloads?: number
  views?: number
  pdfUrl?: string
  domains: string[]
  keywords?: string[]
  references?: string[]
  status?: 'draft' | 'published' | 'archived'
  featured?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface PublicationAuthor {
  id?: number | string
  name: string
  affiliation?: string
  email?: string
  orcid?: string
}

import type { PaginationMeta } from './common.model'

export interface PublicationResponse {
  success: boolean
  data: Publication | Publication[]
  message?: string
  pagination?: PaginationMeta
}

