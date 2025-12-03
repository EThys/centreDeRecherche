import apiClient from './api.client'
import type { RegisterRequest, LoginRequest, AuthResponse, User } from '@/models/user.model'

const ENDPOINT = '/auth'

/**
 * Service d'authentification
 */
const authService = {
  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const requestData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      phone: data.phone,
      role: data.role || 'entrepreneur',
      company: data.company,
      position: data.position,
    }

    const response = await apiClient.post<AuthResponse>(`${ENDPOINT}/register`, requestData)
    
    console.log('📝 Register response:', response)
    
    // Vérifier la structure exacte
    let authData: AuthResponse
    
    if (response.data && 'success' in response.data && 'data' in response.data) {
      authData = response.data as AuthResponse
    } else if (response.data && 'user' in response.data && 'token' in response.data) {
      authData = {
        success: true,
        message: 'Inscription réussie',
        data: response.data as any
      }
    } else {
      authData = {
        success: true,
        message: 'Inscription réussie',
        data: response.data as any
      }
    }
    
    // Convertir la réponse en camelCase
    if (authData?.data?.user) {
      authData.data.user = toCamelCase(authData.data.user)
    }
    
    // Sauvegarder le token
    const token = authData?.data?.token
    const user = authData?.data?.user
    
    if (token) {
      localStorage.setItem('auth_token', token)
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    } else {
      console.error('❌ Pas de token dans la réponse:', authData)
      throw new Error('Erreur: aucun token reçu du serveur')
    }
    
    return authData
  },

  /**
   * Connexion d'un utilisateur
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<any>(`${ENDPOINT}/login`, {
      email: data.email,
      password: data.password,
    })
    
    console.log('🔐 Login response complète:', response)
    console.log('🔐 response.data:', response.data)
    console.log('🔐 Type de response.data:', typeof response.data)
    
    // apiClient retourne ApiResponse<T> qui a la structure { success, data: T }
    // Donc response.data contient soit directement AuthResponse, soit l'objet data
    let authData: AuthResponse
    
    // Cas 1: response.data est déjà un AuthResponse (avec success, message, data)
    if (response.data && typeof response.data === 'object' && 'success' in response.data && 'data' in response.data) {
      authData = response.data as AuthResponse
    }
    // Cas 2: response.data contient directement { user, token, tokenType }
    else if (response.data && typeof response.data === 'object' && 'user' in response.data && 'token' in response.data) {
      authData = {
        success: true,
        message: 'Connexion réussie',
        data: response.data
      }
    }
    // Cas 3: response.data.data existe (double nesting)
    else if (response.data?.data) {
      authData = {
        success: response.data.success ?? true,
        message: response.data.message ?? 'Connexion réussie',
        data: response.data.data
      }
    }
    // Cas par défaut
    else {
      console.error('❌ Structure de réponse inattendue:', response.data)
      throw new Error('Structure de réponse inattendue du serveur')
    }
    
    console.log('🔐 authData final:', authData)
    
    // Convertir la réponse en camelCase
    if (authData?.data?.user) {
      authData.data.user = toCamelCase(authData.data.user)
    }
    
    // Sauvegarder le token et l'utilisateur
    const token = authData?.data?.token
    const user = authData?.data?.user
    
    console.log('🔐 Token extrait:', token)
    console.log('🔐 User extrait:', user)
    
    if (!token) {
      console.error('❌ Pas de token dans la réponse:', authData)
      throw new Error('Erreur: aucun token reçu du serveur')
    }
    
    localStorage.setItem('auth_token', token)
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
    console.log('✅ Token et utilisateur sauvegardés dans localStorage')
    
    return authData
  },

  /**
   * Déconnexion
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(`${ENDPOINT}/logout`)
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      // Supprimer le token et les données utilisateur même en cas d'erreur
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    }
  },

  /**
   * Obtenir les informations de l'utilisateur connecté
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<{ success: boolean; data: { user: User } }>(`${ENDPOINT}/me`)
      if (response.data?.data?.user) {
        const user = toCamelCase(response.data.data.user)
        localStorage.setItem('user', JSON.stringify(user))
        return user
      }
      return null
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error)
      return null
    }
  },

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  },

  /**
   * Obtenir le token d'authentification
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token')
  },

  /**
   * Obtenir l'utilisateur depuis le localStorage
   */
  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch (error) {
        console.error('Erreur lors de la lecture de l\'utilisateur:', error)
        return null
      }
    }
    return null
  },
}

/**
 * Convertir un objet snake_case en camelCase
 */
function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item))
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
        newObj[camelKey] = toCamelCase(obj[key])
      }
    }
    return newObj
  }
  return obj
}

export default authService

