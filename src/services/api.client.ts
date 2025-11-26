/**
 * Client API de base pour toutes les requêtes HTTP
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

class ApiClient {
  private baseURL: string
  private defaultHeaders: HeadersInit

  constructor() {
    this.baseURL = API_BASE_URL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  /**
   * Récupère le token d'authentification depuis le localStorage
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token')
  }

  /**
   * Construit les headers avec l'authentification si disponible
   */
  private getHeaders(customHeaders?: HeadersInit): HeadersInit {
    const token = this.getAuthToken()
    const headers: Record<string, string> = {
      ...(this.defaultHeaders as Record<string, string>),
      ...(customHeaders as Record<string, string>),
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  /**
   * Gère les erreurs de réponse
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const error: ApiError = {
        message: response.statusText,
        status: response.status,
      }

      try {
        const errorData = await response.json()
        error.message = errorData.message || error.message
        error.errors = errorData.errors
      } catch {
        // Si la réponse n'est pas du JSON, on garde le message par défaut
      }

      throw error
    }

    return response.json()
  }

  /**
   * Requête GET
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
    customHeaders?: HeadersInit
  ): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseURL}${endpoint}`)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(customHeaders),
    })

    return this.handleResponse<T>(response)
  }

  /**
   * Requête POST
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    customHeaders?: HeadersInit
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(customHeaders),
      body: data ? JSON.stringify(data) : undefined,
    })

    return this.handleResponse<T>(response)
  }

  /**
   * Requête PUT
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    customHeaders?: HeadersInit
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(customHeaders),
      body: data ? JSON.stringify(data) : undefined,
    })

    return this.handleResponse<T>(response)
  }

  /**
   * Requête PATCH
   */
  async patch<T>(
    endpoint: string,
    data?: unknown,
    customHeaders?: HeadersInit
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(customHeaders),
      body: data ? JSON.stringify(data) : undefined,
    })

    return this.handleResponse<T>(response)
  }

  /**
   * Requête DELETE
   */
  async delete<T>(
    endpoint: string,
    customHeaders?: HeadersInit
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(customHeaders),
    })

    return this.handleResponse<T>(response)
  }

  /**
   * Upload de fichier
   */
  async upload<T>(
    endpoint: string,
    file: File | FormData,
    customHeaders?: HeadersInit
  ): Promise<ApiResponse<T>> {
    const formData = file instanceof FormData ? file : new FormData()
    
    if (file instanceof File) {
      formData.append('file', file)
    }

    const token = this.getAuthToken()
    const headers: Record<string, string> = {
      ...(customHeaders as Record<string, string>),
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    // Ne pas définir Content-Type pour FormData, le navigateur le fera automatiquement
    delete headers['Content-Type']

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    })

    return this.handleResponse<T>(response)
  }
}

// Export d'une instance singleton
export const apiClient = new ApiClient()
export default apiClient

