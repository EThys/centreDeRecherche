/**
 * Client API de base pour toutes les requêtes HTTP
 */

/**
 * Fonction utilitaire pour obtenir l'URL de base de l'API
 * Utilise toujours l'URL de production, peu importe l'environnement
 */
export const getApiBaseUrl = (): string => {
  // Toujours utiliser l'URL de production
  return 'https://backend.creffpme.org/api'
}

/**
 * Fonction utilitaire pour obtenir l'URL de base sans /api (pour les fichiers statiques)
 */
export const getBaseUrl = (): string => {
  const apiUrl = getApiBaseUrl()
  // Si l'URL contient /api, l'enlever pour les fichiers statiques
  if (apiUrl.endsWith('/api')) {
    return apiUrl.replace('/api', '')
  }
  return apiUrl
}

const API_BASE_URL = getApiBaseUrl()

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
      'Accept': 'application/json',
    }
    
    // Log de l'URL de base utilisée
    console.log('🔧 API Client initialisé avec URL:', this.baseURL)
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

      // Lire le texte une seule fois, puis essayer de le parser en JSON
      try {
        const text = await response.text()
        
        // Essayer de parser comme JSON
        try {
          const errorData = JSON.parse(text)
          error.message = errorData.message || error.message
          error.errors = errorData.errors
          // Si c'est une erreur 500, on inclut plus de détails
          if (response.status === 500) {
            console.error('Server Error Details:', errorData)
          }
        } catch (parseError) {
          // Si ce n'est pas du JSON, utiliser le texte brut
          console.error('Error response (not JSON):', text)
          error.message = text || error.message
        }
      } catch (readError) {
        // Si la lecture échoue complètement, garder le message par défaut
        console.error('Could not read error response:', readError)
        error.message = response.statusText || 'Une erreur est survenue'
      }

      throw error
    }

    // Pour les réponses réussies, lire le JSON normalement
    try {
      const text = await response.text()
      try {
        const parsed = JSON.parse(text)
        
        // Si Laravel retourne directement un tableau, l'envelopper dans un objet ApiResponse
        if (Array.isArray(parsed)) {
          console.log('📦 Backend retourne un tableau directement, conversion en format ApiResponse')
          return {
            success: true,
            data: parsed as T,
          } as ApiResponse<T>
        }
        
        // Si c'est déjà un objet avec data
        if (parsed && typeof parsed === 'object' && 'data' in parsed) {
          return parsed as ApiResponse<T>
        }
        
        // Si c'est un objet sans data, l'envelopper
        if (parsed && typeof parsed === 'object') {
          return {
            success: true,
            data: parsed as T,
          } as ApiResponse<T>
        }
        
        return parsed as ApiResponse<T>
      } catch (parseError) {
        // Si ce n'est pas du JSON, retourner comme texte
        console.warn('Response is not JSON, returning as text:', text)
        return {
          success: true,
          data: text as unknown as T,
        }
      }
    } catch (readError) {
      console.error('Could not read response:', readError)
      throw {
        message: 'Impossible de lire la réponse du serveur',
        status: response.status,
      } as ApiError
    }
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

    const fullUrl = url.toString()
    const headers = this.getHeaders(customHeaders)
    
    // Log pour débogage
    console.log('🌐 Requête GET:', {
      url: fullUrl,
      headers: headers,
      baseURL: this.baseURL
    })

    try {
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: headers,
      })

      console.log('📡 Réponse reçue:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      })

      return this.handleResponse<T>(response)
    } catch (error: any) {
      console.error('❌ Erreur fetch:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        url: fullUrl,
        baseURL: this.baseURL
      })
      
      // Si c'est une erreur réseau/CORS
      if (error.message?.includes('fetch') || 
          error.message?.includes('Failed to fetch') || 
          error.message?.includes('NetworkError') ||
          error.name === 'TypeError' ||
          error.name === 'NetworkError') {
        
        const corsMessage = `
⚠️ ERREUR CORS/NETWORK

Le backend ne peut pas être atteint depuis votre navigateur. Causes possibles :

1. 🔒 Problème CORS : Le backend doit autoriser les requêtes depuis ${window.location.origin}
   → Vérifiez la configuration CORS dans config/cors.php du backend Laravel
   → Ajoutez '${window.location.origin}' dans allowed_origins

2. 🌐 Problème réseau : Vérifiez que ${fullUrl} est accessible
   → Testez dans Postman ou avec curl : curl ${fullUrl}

3. 🔐 Problème SSL/Certificat : Vérifiez que le certificat SSL est valide

URL tentée: ${fullUrl}
Origine: ${window.location.origin}
        `
        
        if (import.meta.env.DEV) {
          console.error(corsMessage)
        }
        
        throw {
          message: 'Le contenu est momentanément indisponible.',
          status: 0,
          isNetworkError: true,
          originalError: error,
          url: fullUrl
        } as ApiError
      }
      
      throw error
    }
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
   * Upload de fichier (POST)
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

  /**
   * Upload de fichier avec PUT
   */
  async uploadPut<T>(
    endpoint: string,
    formData: FormData,
    customHeaders?: HeadersInit
  ): Promise<ApiResponse<T>> {
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
      method: 'PUT',
      headers,
      body: formData,
    })

    return this.handleResponse<T>(response)
  }
}

// Export d'une instance singleton
export const apiClient = new ApiClient()
export default apiClient

