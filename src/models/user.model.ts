/**
 * Modèles pour l'authentification et les utilisateurs
 */

export interface User {
  id?: number | string
  name?: string
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  role?: 'admin' | 'entrepreneur' | 'researcher'
  company?: string
  position?: string
  createdAt?: string
  updatedAt?: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
  phone?: string
  role?: 'admin' | 'entrepreneur' | 'researcher'
  company?: string
  position?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    token: string
    tokenType: string
  }
}

export interface AuthError {
  success: false
  message: string
  errors?: Record<string, string[]>
}

