<template>
  <div class="space-y-6">
    <!-- Header avec bouton ajouter -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Gestion des Événements</h2>
        <p class="text-gray-600 mt-1">Créez et gérez les événements du centre</p>
      </div>
      <button
        @click="showForm = true; editingEvent = null"
        class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <i class="fas fa-plus"></i>
        <span>Nouvel événement</span>
      </button>
    </div>

    <!-- Message d'erreur -->
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
      <div class="flex items-center gap-2">
        <i class="fas fa-exclamation-circle"></i>
        <span>{{ error }}</span>
      </div>
      <button
        v-if="error.includes('serveur') || error.includes('connecter')"
        @click="loadEvents"
        class="mt-3 text-sm text-red-600 hover:text-red-800 underline"
      >
        Réessayer
      </button>
    </div>

    <!-- Formulaire -->
    <div v-if="showForm" class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">
        {{ editingEvent ? 'Modifier l\'événement' : 'Nouvel événement' }}
      </h3>
      <form @submit.prevent="saveEvent" class="space-y-6" novalidate>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
            <input
              v-model="eventForm.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Titre de l'événement"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date de début *</label>
            <input
              v-model="eventForm.startDate"
              type="date"
              required
              :min="new Date().toISOString().split('T')[0]"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              @input="eventForm.startDate = $event.target.value"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Heure de début *</label>
            <input
              v-model="eventForm.startTime"
              type="time"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              @input="eventForm.startTime = $event.target.value"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type *</label>
            <select
              v-model="eventForm.type"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="conference">Conférence</option>
              <option value="workshop">Atelier</option>
              <option value="seminar">Séminaire</option>
              <option value="webinar">Webinaire</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lieu *</label>
            <input
              v-model="eventForm.location"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Lieu de l'événement"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <input
              @change="handleImageChange"
              type="file"
              accept="image/*"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <p class="text-xs text-gray-500 mt-1">Formats acceptés: JPEG, PNG, JPG, GIF (max 2MB)</p>
            <!-- Preview de l'image -->
            <div v-if="imagePreview" class="mt-3">
              <img :src="imagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-lg border border-gray-200" />
            </div>
            <!-- Image existante si en mode édition -->
            <div v-else-if="editingEvent && eventForm.image" class="mt-3">
              <img :src="eventForm.image" alt="Image actuelle" class="w-32 h-32 object-cover rounded-lg border border-gray-200" />
              <p class="text-xs text-gray-500 mt-1">Image actuelle</p>
            </div>
          </div>
        </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              v-model="eventForm.description"
              required
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              placeholder="Description de l'événement..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contenu détaillé</label>
            <textarea
              v-model="eventForm.content"
              rows="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              placeholder="Contenu détaillé de l'événement..."
            ></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
              <input
                v-model="eventForm.endDate"
                type="date"
                :min="eventForm.startDate || new Date().toISOString().split('T')[0]"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                @input="eventForm.endDate = $event.target.value"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Heure de fin</label>
              <input
                v-model="eventForm.endTime"
                type="time"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                @input="eventForm.endTime = $event.target.value"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Adresse complète</label>
              <input
                v-model="eventForm.address"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Adresse complète..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Inscription requise</label>
              <div class="flex items-center gap-3 mt-2">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="eventForm.registrationRequired"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span class="text-sm text-gray-700">Oui</span>
                </label>
              </div>
            </div>
          </div>
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
            <span>{{ loading ? 'Enregistrement...' : (editingEvent ? 'Modifier' : 'Créer') }}</span>
          </button>
          <button
            type="button"
            @click="cancelForm"
            :disabled="loading"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>

    <!-- Liste des événements -->
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div v-if="loading && events.length === 0" class="p-12 text-center">
        <i class="fas fa-spinner fa-spin text-3xl text-blue-600 mb-4"></i>
        <p class="text-gray-600">Chargement des événements...</p>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold">Titre</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Type</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Lieu</th>
              <th class="px-6 py-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="event in events" :key="event.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="font-medium text-gray-900">{{ event.title }}</div>
                <div class="text-sm text-gray-500 mt-1">{{ event.description?.substring(0, 50) }}...</div>
              </td>
              <td class="px-6 py-4 text-gray-600">
                <div>{{ formatDate(event.startDate) }}</div>
                <div class="text-xs text-gray-500">{{ event.startTime }}</div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                  {{ event.type }}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ event.location }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="editEvent(event)"
                    :disabled="loading"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Modifier"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    @click="deleteEvent(event.id!)"
                    :disabled="loading"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Supprimer"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="events.length === 0 && !loading">
              <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                <i class="fas fa-calendar-times text-4xl mb-3 text-gray-300"></i>
                <p>Aucun événement pour le moment</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import type { Event } from '@/models'
import eventService from '@/services/event.service'

const toast = useToast()

const showForm = ref(false)
const editingEvent = ref<Event | null>(null)
const events = ref<Event[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const imageFile = ref<File | null>(null)
const imagePreview = ref<string | null>(null)

const eventForm = ref<{
  title: string
  startDate: string
  startTime: string
  location: string
  description: string
  image: string
  type: 'conference' | 'workshop' | 'seminar' | 'webinar' | 'other'
  registrationRequired: boolean
  endDate?: string
  endTime?: string
  address?: string
  content?: string
}>({
  title: '',
  startDate: '',
  startTime: '',
  location: '',
  description: '',
  image: '',
  type: 'conference',
  registrationRequired: false,
  endDate: '',
  endTime: '',
  address: '',
  content: ''
})

const loadEvents = async () => {
  loading.value = true
  error.value = null
  try {
    console.log('🔄 Chargement des événements...')
    const result = await eventService.getEvents()
    console.log('✅ Réponse reçue:', result)
    
    if (result && result.data) {
      console.log(`📊 ${result.data.length} événement(s) chargé(s)`)
      events.value = result.data
    } else {
      console.warn('⚠️ Aucune donnée dans la réponse:', result)
      events.value = []
      error.value = 'Aucune donnée reçue du serveur'
    }
  } catch (err: any) {
    console.error('❌ Erreur complète lors du chargement:', err)
    console.error('Détails:', {
      message: err.message,
      status: err.status,
      errors: err.errors,
      stack: err.stack
    })
    
    if (err.status === 500) {
      error.value = 'Erreur serveur. Vérifiez que le backend est démarré et que la base de données est accessible.'
    } else if (err.status === 404) {
      error.value = 'Endpoint non trouvé. Vérifiez la configuration de l\'API.'
    } else if (err.status === 0 || err.message?.includes('fetch') || err.message?.includes('Failed to fetch')) {
      error.value = 'Impossible de se connecter au serveur. Vérifiez que le backend est accessible.'
    } else {
      error.value = err.message || (err.errors ? JSON.stringify(err.errors) : 'Erreur lors du chargement des événements')
    }
    events.value = []
  } finally {
    loading.value = false
  }
}

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    imageFile.value = target.files[0]
    // Créer une preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(imageFile.value)
  }
}

const saveEvent = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Nettoyer et valider les dates et heures requises
    const startDateValue = eventForm.value.startDate?.trim() || ''
    const startTimeValue = eventForm.value.startTime?.trim() || ''
    
    if (!startDateValue) {
      error.value = 'Veuillez entrer une date de début'
      loading.value = false
      return
    }
    
    if (!isValidDate(startDateValue)) {
      error.value = 'Veuillez entrer une date de début valide (format YYYY-MM-DD)'
      loading.value = false
      return
    }
    
    if (!startTimeValue) {
      error.value = 'Veuillez entrer une heure de début'
      loading.value = false
      return
    }
    
    if (!isValidTime(startTimeValue)) {
      error.value = 'Veuillez entrer une heure de début valide (format HH:MM)'
      loading.value = false
      return
    }
    
    // Valider la date de fin si elle est fournie
    if (eventForm.value.endDate && eventForm.value.endDate.trim() !== '') {
      if (!isValidDate(eventForm.value.endDate)) {
        error.value = 'Veuillez entrer une date de fin valide'
        loading.value = false
        return
      }
      
      // Vérifier que la date de fin est après la date de début
      const startDate = new Date(eventForm.value.startDate)
      const endDate = new Date(eventForm.value.endDate)
      if (endDate < startDate) {
        error.value = 'La date de fin doit être postérieure à la date de début'
        loading.value = false
        return
      }
    }
    
    // Valider l'heure de fin si elle est fournie
    if (eventForm.value.endTime && eventForm.value.endTime.trim() !== '') {
      if (!isValidTime(eventForm.value.endTime)) {
        error.value = 'Veuillez entrer une heure de fin valide (format HH:MM)'
        loading.value = false
        return
      }
      
      // Si la date de fin est la même que la date de début, vérifier que l'heure de fin est après l'heure de début
      if (eventForm.value.endDate === eventForm.value.startDate) {
        const startTime = eventForm.value.startTime.split(':').map(Number)
        const endTime = eventForm.value.endTime.split(':').map(Number)
        const startMinutes = startTime[0] * 60 + startTime[1]
        const endMinutes = endTime[0] * 60 + endTime[1]
        if (endMinutes <= startMinutes) {
          error.value = 'L\'heure de fin doit être postérieure à l\'heure de début'
          loading.value = false
          return
        }
      }
    }
    
    // Normaliser les dates et heures avant l'envoi
    const normalizedStartDate = normalizeDate(startDateValue)
    const normalizedStartTime = normalizeTime(startTimeValue)
    
    const eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'> = {
      title: eventForm.value.title.trim(),
      description: eventForm.value.description.trim(),
      type: eventForm.value.type,
      status: 'upcoming',
      startDate: normalizedStartDate,
      startTime: normalizedStartTime,
      location: eventForm.value.location.trim(),
      registrationRequired: eventForm.value.registrationRequired,
    }
    
    // Ajouter les champs optionnels seulement s'ils ne sont pas vides
    if (eventForm.value.content && eventForm.value.content.trim() !== '') {
      eventData.content = eventForm.value.content.trim()
    }
    if (eventForm.value.endDate && eventForm.value.endDate.trim() !== '') {
      eventData.endDate = normalizeDate(eventForm.value.endDate)
    }
    if (eventForm.value.endTime && eventForm.value.endTime.trim() !== '') {
      eventData.endTime = normalizeTime(eventForm.value.endTime)
    }
    if (eventForm.value.address && eventForm.value.address.trim() !== '') {
      eventData.address = eventForm.value.address.trim()
    }

    if (editingEvent.value) {
      // Mettre à jour
      await eventService.updateEvent(editingEvent.value.id!, eventData, imageFile.value || undefined)
      toast.open({
        message: '✅ Événement modifié avec succès !',
        type: 'success',
        position: 'top-right',
        duration: 5000,
      })
    } else {
      // Créer
      await eventService.createEvent(eventData, imageFile.value || undefined)
      toast.open({
        message: '✅ Événement créé et publié avec succès !',
        type: 'success',
        position: 'top-right',
        duration: 5000,
      })
    }
    
    await loadEvents()
    cancelForm()
    
    // Émettre un événement pour mettre à jour les stats
    window.dispatchEvent(new CustomEvent('dashboard:update-stats'))
  } catch (err: any) {
    console.error('Erreur complète:', err)
    let errorMessage = 'Erreur lors de la sauvegarde de l\'événement. Vérifiez la console pour plus de détails.'
    if (err.errors) {
      const errorMessages = Object.values(err.errors).flat().join(', ')
      errorMessage = `Erreurs de validation: ${errorMessages}`
      error.value = errorMessage
    } else if (err.message) {
      errorMessage = err.message
      error.value = err.message
    } else {
      error.value = errorMessage
    }
    
    toast.open({
      message: `❌ ${errorMessage}`,
      type: 'error',
      position: 'top-right',
      duration: 6000,
    })
  } finally {
    loading.value = false
  }
}

// Fonction pour normaliser une date au format YYYY-MM-DD pour l'input date
const normalizeDate = (dateString?: string | null): string => {
  if (!dateString || typeof dateString !== 'string') return ''
  const trimmed = dateString.trim()
  if (!trimmed) return ''
  
  try {
    // Si c'est déjà au format YYYY-MM-DD, on le retourne tel quel
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      return trimmed
    }
    
    // Sinon, on essaie de parser la date
    const date = new Date(trimmed)
    if (isNaN(date.getTime())) {
      // Si la date est invalide, on essaie de parser comme YYYY-MM-DD
      const parts = trimmed.split('-')
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10)
        const month = parseInt(parts[1], 10)
        const day = parseInt(parts[2], 10)
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          const testDate = new Date(year, month - 1, day)
          if (testDate.getFullYear() === year && testDate.getMonth() === month - 1 && testDate.getDate() === day) {
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          }
        }
      }
      return ''
    }
    
    // Formater en YYYY-MM-DD
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (e) {
    console.warn('Erreur lors de la normalisation de la date:', dateString, e)
    return ''
  }
}

// Fonction pour normaliser une heure au format HH:MM pour l'input time
const normalizeTime = (timeString?: string | null): string => {
  if (!timeString || typeof timeString !== 'string') return ''
  const trimmed = timeString.trim()
  if (!trimmed) return ''
  
  try {
    // Si c'est déjà au format HH:MM, on le retourne tel quel
    if (/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(trimmed)) {
      return trimmed.substring(0, 5)
    }
    
    // Si c'est au format HH:MM:SS, on prend les 5 premiers caractères
    if (/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(trimmed)) {
      return trimmed.substring(0, 5)
    }
    
    // Si c'est un timestamp ou une date complète, on extrait l'heure
    const date = new Date(trimmed)
    if (!isNaN(date.getTime())) {
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${hours}:${minutes}`
    }
    
    return ''
  } catch (e) {
    console.warn('Erreur lors de la normalisation de l\'heure:', timeString, e)
    return ''
  }
}

// Fonction pour valider une date
const isValidDate = (dateString: string): boolean => {
  if (!dateString || typeof dateString !== 'string') return false
  const trimmed = dateString.trim()
  if (!trimmed) return false
  
  // Vérifier le format YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const date = new Date(trimmed)
    return !isNaN(date.getTime())
  }
  
  // Sinon, essayer de parser
  const date = new Date(trimmed)
  return !isNaN(date.getTime())
}

// Fonction pour valider une heure
const isValidTime = (timeString: string): boolean => {
  if (!timeString || typeof timeString !== 'string') return false
  const trimmed = timeString.trim()
  if (!trimmed) return false
  return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(trimmed)
}

const editEvent = (event: Event) => {
  try {
    editingEvent.value = event
    eventForm.value = {
      title: event.title || '',
      startDate: normalizeDate(event.startDate),
      startTime: normalizeTime(event.startTime),
      location: event.location || '',
      description: event.description || '',
      image: event.image || '',
      type: event.type || 'conference',
      registrationRequired: event.registrationRequired || false,
      endDate: normalizeDate(event.endDate),
      endTime: normalizeTime(event.endTime),
      address: event.address || '',
      content: event.content || ''
    }
    imageFile.value = null
    imagePreview.value = event.image || null
    showForm.value = true
  } catch (err) {
    console.error('Erreur lors de l\'édition de l\'événement:', err)
    error.value = 'Erreur lors du chargement des données de l\'événement'
  }
}

const deleteEvent = async (id: number | string) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    await eventService.deleteEvent(id)
    await loadEvents()
    toast.open({
      message: '✅ Événement supprimé avec succès !',
      type: 'success',
      position: 'top-right',
      duration: 5000,
    })
    
    // Émettre un événement pour mettre à jour les stats
    window.dispatchEvent(new CustomEvent('dashboard:update-stats'))
  } catch (err: any) {
    const errorMessage = err.message || 'Erreur lors de la suppression de l\'événement'
    error.value = errorMessage
    console.error('Erreur:', err)
    toast.open({
      message: `❌ ${errorMessage}`,
      type: 'error',
      position: 'top-right',
      duration: 6000,
    })
  } finally {
    loading.value = false
  }
}

const cancelForm = () => {
  showForm.value = false
  editingEvent.value = null
  imageFile.value = null
  imagePreview.value = null
  eventForm.value = {
    title: '',
    startDate: '',
    startTime: '',
    location: '',
    description: '',
    image: '',
    type: 'conference',
    registrationRequired: false,
    endDate: '',
    endTime: '',
    address: '',
    content: ''
  }
}

const formatDate = (date?: string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  loadEvents()
})
</script>

