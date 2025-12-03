<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import authService from '@/services/auth.service'
//@ts-ignore
import authBg from '../assets/carousel-1.jpg'
//@ts-ignore
import logoImage from '../assets/logoCreff-PME.jpeg'

const router = useRouter()
const route = useRoute()

const isLogin = ref(true)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Form data
const loginForm = ref({
  email: '',
  password: '',
  rememberMe: false
})

const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  userType: 'entrepreneur',
  acceptTerms: false
})

const switchToLogin = () => {
  isLogin.value = true
  error.value = null
}

const switchToRegister = () => {
  isLogin.value = false
  error.value = null
}

const handleLogin = async () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const response = await authService.login({
      email: loginForm.value.email,
      password: loginForm.value.password,
    })
    
    // Vérifier que le token est bien sauvegardé
    const token = localStorage.getItem('auth_token')
    if (!token) {
      error.value = 'Erreur lors de la sauvegarde de la session. Veuillez réessayer.'
      return
    }
    
    // Vérifier le rôle si on redirige vers le dashboard
    const redirectPath = (route.query.redirect as string) || '/dashboard'
    if (redirectPath === '/dashboard' || redirectPath.includes('/dashboard')) {
      const user = response.data?.user || JSON.parse(localStorage.getItem('user') || '{}')
      if (user.role !== 'admin') {
        error.value = 'Vous n\'avez pas les permissions nécessaires pour accéder au dashboard.'
        return
      }
    }
    
    // Attendre un peu pour s'assurer que tout est sauvegardé
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Rediriger vers la page demandée ou le dashboard
    router.push(redirectPath)
  } catch (err: any) {
    console.error('Erreur de connexion:', err)
    error.value = err.message || err.errors?.email?.[0] || 'Erreur lors de la connexion. Vérifiez vos identifiants.'
  } finally {
    isLoading.value = false
  }
}

const handleRegister = async () => {
  if (!registerForm.value.firstName || !registerForm.value.lastName || !registerForm.value.email || !registerForm.value.password) {
    error.value = 'Veuillez remplir tous les champs obligatoires'
    return
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas'
    return
  }

  if (!registerForm.value.acceptTerms) {
    error.value = 'Vous devez accepter les conditions d\'utilisation'
    return
  }

  isLoading.value = true
  error.value = null

  try {
    await authService.register({
      firstName: registerForm.value.firstName,
      lastName: registerForm.value.lastName,
      email: registerForm.value.email,
      password: registerForm.value.password,
      passwordConfirmation: registerForm.value.confirmPassword,
      role: registerForm.value.userType === 'chercheur' ? 'researcher' : 'entrepreneur',
    })
    
    // Rediriger vers le dashboard après inscription réussie
    router.push('/dashboard')
  } catch (err: any) {
    console.error('Erreur d\'inscription:', err)
    if (err.errors) {
      // Afficher la première erreur de validation
      const firstError = Object.values(err.errors)[0]
      error.value = Array.isArray(firstError) ? firstError[0] : String(firstError)
    } else {
      error.value = err.message || 'Erreur lors de l\'inscription'
    }
  } finally {
    isLoading.value = false
  }
}

const passwordStrength = computed(() => {
  const password = registerForm.value.password
  if (!password) return 0
  
  let strength = 0
  if (password.length >= 8) strength += 25
  if (/[A-Z]/.test(password)) strength += 25
  if (/[0-9]/.test(password)) strength += 25
  if (/[^A-Za-z0-9]/.test(password)) strength += 25
  
  return strength
})

const getPasswordStrengthColor = computed(() => {
  const strength = passwordStrength.value
  if (strength < 50) return 'bg-red-500'
  if (strength < 75) return 'bg-yellow-500'
  return 'bg-green-500'
})
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Form -->
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <!-- Logo -->
        <div class="flex items-center mb-8">
          <div class="flex-shrink-0">
            <img 
              :src="logoImage" 
              alt="CReFF-PME Logo" 
              class="h-12 w-auto"
            />
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            @click="switchToLogin"
            :class="[
              'pb-4 px-1 cursor-pointer text-sm font-medium border-b-2 transition-colors duration-200',
              isLogin 
                ? 'border-blue-600 text-gray-900' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            Connexion
          </button>
          <button
            @click="switchToRegister"
            :class="[
              'pb-4 px-1 cursor-pointer text-sm font-medium border-b-2 transition-colors duration-200',
              !isLogin 
                ? 'border-blue-600 text-gray-900' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            Inscription
          </button>
        </div>

        <!-- Login Form -->
        <div v-if="isLogin" class="space-y-6">
          <!-- Message d'erreur -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div class="flex items-center gap-2">
              <i class="fas fa-exclamation-circle"></i>
              <span>{{ error }}</span>
            </div>
          </div>
          
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Content de vous revoir</h2>
            <p class="mt-2 text-sm text-gray-600">
              Pas encore de compte ? 
              <button @click="switchToRegister" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Créer un compte
              </button>
            </p>
          </div>

          <form class="space-y-6" @submit.prevent="handleLogin">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="loginForm.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="votre@entreprise.com"
                >
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  v-model="loginForm.password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Votre mot de passe"
                >
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="loginForm.rememberMe"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                :disabled="isLoading"
                :class="[
                  'w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200',
                  isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 transform hover:scale-105'
                ]"
              >
                <span v-if="isLoading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion...
                </span>
                <span v-else>
                  Se connecter
                </span>
              </button>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Ou continuer avec</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                class="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span class="ml-2">Google</span>
              </button>

              <button
                type="button"
                class="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg class="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span class="ml-2">Facebook</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Register Form -->
        <div v-else class="space-y-6">
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Rejoignez CFFR PME</h2>
            <p class="mt-2 text-sm text-gray-600">
              Déjà membre ? 
              <button @click="switchToLogin" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Se connecter
              </button>
            </p>
          </div>

          <form class="space-y-6" @submit.prevent="handleRegister">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <div class="mt-1">
                  <input
                    id="firstName"
                    v-model="registerForm.firstName"
                    type="text"
                    required
                    class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Votre prénom"
                  >
                </div>
              </div>

              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <div class="mt-1">
                  <input
                    id="lastName"
                    v-model="registerForm.lastName"
                    type="text"
                    required
                    class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Votre nom"
                  >
                </div>
              </div>
            </div>

            <div>
              <label for="register-email" class="block text-sm font-medium text-gray-700">
                Adresse email professionnelle
              </label>
              <div class="mt-1">
                <input
                  id="register-email"
                  v-model="registerForm.email"
                  type="email"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="votre@entreprise.com"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                Je suis :
              </label>
              <div class="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  @click="registerForm.userType = 'entrepreneur'"
                  :class="[
                    'py-3 px-4 border rounded-lg text-sm font-medium transition-all duration-200',
                    registerForm.userType === 'entrepreneur'
                      ? 'border-blue-600 bg-blue-50 text-gray-900 shadow-sm transform scale-105'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  ]"
                >
                  Entrepreneur
                </button>
                <button
                  type="button"
                  @click="registerForm.userType = 'chercheur'"
                  :class="[
                    'py-3 px-4 border rounded-lg text-sm font-medium transition-all duration-200',
                    registerForm.userType === 'chercheur'
                      ? 'border-blue-600 bg-blue-50 text-gray-900 shadow-sm transform scale-105'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  ]"
                >
                  Chercheur
                </button>
              </div>
            </div>

            <div>
              <label for="register-password" class="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div class="mt-1">
                <input
                  id="register-password"
                  v-model="registerForm.password"
                  type="password"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Créez un mot de passe sécurisé"
                >
              </div>
              <div v-if="registerForm.password" class="mt-2">
                <div class="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Force du mot de passe</span>
                  <span>{{ passwordStrength }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    :class="['h-2 rounded-full transition-all duration-300', getPasswordStrengthColor]"
                    :style="{ width: passwordStrength + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <div class="mt-1">
                <input
                  id="confirm-password"
                  v-model="registerForm.confirmPassword"
                  type="password"
                  required
                  :class="[
                    'appearance-none block w-full px-3 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 transition-colors',
                    registerForm.confirmPassword && registerForm.password !== registerForm.confirmPassword
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  ]"
                  placeholder="Confirmez votre mot de passe"
                >
              </div>
              <p v-if="registerForm.confirmPassword && registerForm.password !== registerForm.confirmPassword" class="mt-1 text-sm text-red-600">
                Les mots de passe ne correspondent pas
              </p>
            </div>

            <div class="flex items-center">
              <input
                id="accept-terms"
                v-model="registerForm.acceptTerms"
                type="checkbox"
                required
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <label for="accept-terms" class="ml-2 block text-sm text-gray-700">
                J'accepte les 
                <a href="#" class="text-blue-600 hover:text-blue-500 transition-colors">conditions d'utilisation</a>
                et la 
                <a href="#" class="text-blue-600 hover:text-blue-500 transition-colors">politique de confidentialité</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                :disabled="isLoading || !registerForm.acceptTerms || registerForm.password !== registerForm.confirmPassword"
                :class="[
                  'w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200',
                  (isLoading || !registerForm.acceptTerms || registerForm.password !== registerForm.confirmPassword)
                    ? 'bg-blue-400 cursor-not-allowed opacity-50' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 transform hover:scale-105'
                ]"
              >
                <span v-if="isLoading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création du compte...
                </span>
                <span v-else>
                  Créer mon compte
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Right Side - Hero Image -->
    <div class="hidden lg:block relative flex-1">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent z-10 opacity-90"></div>
      <img
        class="absolute inset-0 h-full w-full object-cover"
        :src="authBg"
        alt="CFFR PME - Financement des PME"
      />
      <div class="absolute inset-0 z-20 flex items-center justify-center px-12">
        <div class="max-w-lg text-white">
          <div class="badge bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 rounded-full inline-block mb-8 shadow-lg">
            <span class="text-white font-semibold text-sm uppercase tracking-wide">Financez votre croissance</span>
          </div>
          <h1 class="text-5xl font-bold mb-6 leading-tight">
            Votre partenaire
            <span class="text-blue-300">financement PME</span>
          </h1>
          <p class="text-xl mb-8 text-gray-200 leading-relaxed">
            Accédez à des solutions de financement adaptées et accompagnez la croissance de votre entreprise avec CFFR PME.
          </p>
          <div class="space-y-4">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span class="text-lg">Solutions de financement sur mesure</span>
            </div>
            <div class="flex items-center">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span class="text-lg">Accompagnement personnalisé</span>
            </div>
            <div class="flex items-center">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span class="text-lg">Réseau d'investisseurs partenaires</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}

/* Smooth transitions for all interactive elements */
button, input, a {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus states */
input:focus, button:focus {
  outline: none;
  ring: 2px;
}

/* Custom badge animation */
.badge {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>