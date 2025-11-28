<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Inscriptions aux Formations</h2>
      <p class="text-gray-600 mt-1">Gérez les inscriptions aux formations d'entrepreneurs</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p class="text-sm text-gray-600 mb-1">Total</p>
        <p class="text-2xl font-bold text-gray-900">{{ registrations.length }}</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p class="text-sm text-gray-600 mb-1">En attente</p>
        <p class="text-2xl font-bold text-yellow-600">{{ pendingCount }}</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p class="text-sm text-gray-600 mb-1">Confirmées</p>
        <p class="text-2xl font-bold text-green-600">{{ confirmedCount }}</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p class="text-sm text-gray-600 mb-1">Nouvelles</p>
        <p class="text-2xl font-bold text-blue-600">{{ newCount }}</p>
      </div>
    </div>

    <!-- Filtres -->
    <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 flex items-center gap-4">
      <select
        v-model="statusFilter"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      >
        <option value="">Tous les statuts</option>
        <option value="pending">En attente</option>
        <option value="confirmed">Confirmée</option>
        <option value="cancelled">Annulée</option>
        <option value="completed">Terminée</option>
      </select>
      <select
        v-model="programFilter"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      >
        <option value="">Tous les programmes</option>
        <option value="training1">Formation en Gestion d'Entreprise</option>
        <option value="training2">Accompagnement Personnalisé</option>
        <option value="training3">Formation en Entrepreneuriat</option>
        <option value="training4">Réseautage et Partenariats</option>
      </select>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />
    </div>

    <!-- Liste -->
    <div class="space-y-4">
      <div
        v-for="registration in filteredRegistrations"
        :key="registration.id"
        class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-lg font-bold text-gray-900">{{ registration.name }}</h3>
              <span
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="getStatusClass(registration.status)"
              >
                {{ getStatusLabel(registration.status) }}
              </span>
            </div>
            <p class="text-gray-600 mb-1">
              <i class="fas fa-envelope mr-2"></i>{{ registration.email }}
            </p>
            <p class="text-gray-600 mb-1" v-if="registration.phone">
              <i class="fas fa-phone mr-2"></i>{{ registration.phone }}
            </p>
            <p class="text-gray-600 mb-1">
              <i class="fas fa-graduation-cap mr-2"></i>{{ getProgramName(registration.program) }}
            </p>
            <p class="text-gray-600">
              <i class="fas fa-calendar mr-2"></i>{{ formatDate(registration.registrationDate) }}
            </p>
          </div>
          <div class="flex gap-2">
            <button
              @click="viewRegistration(registration)"
              class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              @click="updateStatus(registration)"
              class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <i class="fas fa-check"></i>
            </button>
            <button
              @click="deleteRegistration(registration.id)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div v-if="registration.message" class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-700">
            <strong>Message:</strong> {{ registration.message }}
          </p>
        </div>
      </div>
      <div v-if="filteredRegistrations.length === 0" class="text-center py-12 text-gray-500">
        Aucune inscription trouvée
      </div>
    </div>

    <!-- Modal de détails -->
    <div
      v-if="selectedRegistration"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click.self="selectedRegistration = null"
    >
      <div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">Détails de l'inscription</h3>
          <button
            @click="selectedRegistration = null"
            class="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Nom complet</label>
            <p class="text-gray-900">{{ selectedRegistration.name }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Email</label>
            <p class="text-gray-900">{{ selectedRegistration.email }}</p>
          </div>
          <div v-if="selectedRegistration.phone">
            <label class="text-sm font-medium text-gray-600">Téléphone</label>
            <p class="text-gray-900">{{ selectedRegistration.phone }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Programme</label>
            <p class="text-gray-900">{{ getProgramName(selectedRegistration.program) }}</p>
          </div>
          <div v-if="selectedRegistration.message">
            <label class="text-sm font-medium text-gray-600">Message</label>
            <p class="text-gray-900 whitespace-pre-wrap">{{ selectedRegistration.message }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Date d'inscription</label>
            <p class="text-gray-900">{{ formatDate(selectedRegistration.registrationDate) }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Statut</label>
            <p class="text-gray-900">{{ getStatusLabel(selectedRegistration.status) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { TrainingRegistration } from '@/models'

const searchQuery = ref('')
const statusFilter = ref('')
const programFilter = ref('')
const registrations = ref<TrainingRegistration[]>([])
const selectedRegistration = ref<TrainingRegistration | null>(null)

const filteredRegistrations = computed(() => {
  let filtered = registrations.value
  if (statusFilter.value) {
    filtered = filtered.filter(r => r.status === statusFilter.value)
  }
  if (programFilter.value) {
    filtered = filtered.filter(r => r.program === programFilter.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query)
    )
  }
  return filtered
})

const pendingCount = computed(() => registrations.value.filter(r => r.status === 'pending').length)
const confirmedCount = computed(() => registrations.value.filter(r => r.status === 'confirmed').length)
const newCount = computed(() => registrations.value.filter(r => {
  const date = new Date(r.registrationDate || '')
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return date >= weekAgo
}).length)

const loadRegistrations = () => {
  // TODO: Charger depuis l'API
  registrations.value = []
}

const viewRegistration = (registration: TrainingRegistration) => {
  selectedRegistration.value = registration
}

const updateStatus = (registration: TrainingRegistration) => {
  if (registration.status === 'pending') {
    registration.status = 'confirmed'
    registration.confirmedAt = new Date().toISOString()
  }
}

const deleteRegistration = (id: number | string | undefined) => {
  if (!id) return
  if (confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) {
    registrations.value = registrations.value.filter(r => r.id !== id)
  }
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    cancelled: 'Annulée',
    completed: 'Terminée'
  }
  return labels[status] || status
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-blue-100 text-blue-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const getProgramName = (program: string) => {
  const names: Record<string, string> = {
    training1: "Formation en Gestion d'Entreprise",
    training2: "Accompagnement Personnalisé",
    training3: "Formation en Entrepreneuriat",
    training4: "Réseautage et Partenariats"
  }
  return names[program] || program
}

const formatDate = (date?: string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  loadRegistrations()
})
</script>

