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

    <!-- Formulaire -->
    <div v-if="showForm" class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">
        {{ editingEvent ? 'Modifier l\'événement' : 'Nouvel événement' }}
      </h3>
      <form @submit.prevent="saveEvent" class="space-y-6">
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
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Heure de début *</label>
            <input
              v-model="eventForm.startTime"
              type="time"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              v-model="eventForm.image"
              type="url"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="https://..."
            />
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
        <div class="flex gap-4">
          <button
            type="submit"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {{ editingEvent ? 'Modifier' : 'Créer' }}
          </button>
          <button
            type="button"
            @click="cancelForm"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>

    <!-- Liste des événements -->
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold">Titre</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Lieu</th>
              <th class="px-6 py-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="event in events" :key="event.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="font-medium text-gray-900">{{ event.title }}</div>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ formatDate(event.startDate) }}</td>
              <td class="px-6 py-4 text-gray-600">{{ event.location }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="editEvent(event)"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    @click="deleteEvent(event.id!)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="events.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                Aucun événement pour le moment
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
import type { Event } from '@/models'

const showForm = ref(false)
const editingEvent = ref<Event | null>(null)
const events = ref<Event[]>([])

const eventForm = ref<{
  title: string
  startDate: string
  startTime: string
  location: string
  description: string
  image: string
  type: 'conference' | 'workshop' | 'seminar' | 'webinar' | 'other'
  registrationRequired: boolean
}>({
  title: '',
  startDate: '',
  startTime: '',
  location: '',
  description: '',
  image: '',
  type: 'conference',
  registrationRequired: false
})

const loadEvents = () => {
  // TODO: Charger depuis l'API
  events.value = []
}

const saveEvent = () => {
  // TODO: Sauvegarder via l'API
  if (editingEvent.value) {
    // Mettre à jour
    const index = events.value.findIndex(e => e.id === editingEvent.value?.id)
    if (index !== -1) {
      events.value[index] = { ...editingEvent.value, ...eventForm.value }
    }
  } else {
    // Créer
    const newEvent: Event = {
      id: Date.now(),
      title: eventForm.value.title,
      description: eventForm.value.description,
      image: eventForm.value.image,
      location: eventForm.value.location,
      startDate: eventForm.value.startDate,
      startTime: eventForm.value.startTime,
      type: eventForm.value.type,
      status: 'upcoming',
      registrationRequired: eventForm.value.registrationRequired,
      createdAt: new Date().toISOString()
    }
    events.value.push(newEvent)
  }
  cancelForm()
}

const editEvent = (event: Event) => {
  editingEvent.value = event
  eventForm.value = {
    title: event.title || '',
    startDate: event.startDate || '',
    startTime: event.startTime || '',
    location: event.location || '',
    description: event.description || '',
    image: event.image || '',
    type: event.type || 'conference',
    registrationRequired: event.registrationRequired || false
  }
  showForm.value = true
}

const deleteEvent = (id: number | string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
    events.value = events.value.filter(e => e.id !== id)
  }
}

const cancelForm = () => {
  showForm.value = false
  editingEvent.value = null
  eventForm.value = {
    title: '',
    startDate: '',
    startTime: '',
    location: '',
    description: '',
    image: '',
    type: 'conference',
    registrationRequired: false
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

