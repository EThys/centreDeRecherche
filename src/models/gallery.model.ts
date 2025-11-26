
export interface GalleryPhoto {
  id?: number | string
  title: string
  description: string
  image: string
  thumbnail?: string
  category: string
  date: string
  author: string
  tags?: string[]
  featured?: boolean
  order?: number
  createdAt?: string
  updatedAt?: string
}

export interface GalleryCategory {
  id: string
  name: string
  count?: number
}

import type { PaginationMeta } from './common.model'

export interface GalleryResponse {
  success: boolean
  data: GalleryPhoto | GalleryPhoto[]
  message?: string
  pagination?: PaginationMeta
}

