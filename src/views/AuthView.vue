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

const isLogin = ref(true) // Forcé à true - inscription désactivée

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
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
    await authService.login({
      email: loginForm.value.email,
      password: loginForm.value.password,
    })
    
    // Rediriger vers la page demandée ou le dashboard
    const redirectPath = (route.query.redirect as string) || '/dashboard'
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
        <!-- Bouton Retour -->
        <div class="mb-6">
          <button @click="goBack" class="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors group">
            <i class="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
            <span>Retour</span>
          </button>
        </div>

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
              Connectez-vous à votre compte administrateur
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