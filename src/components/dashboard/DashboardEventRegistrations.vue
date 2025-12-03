<template>
  <div class="space-y-6">
    <!-- Header amélioré -->
    <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl shadow-xl overflow-hidden">
      <div class="p-4 sm:p-6 lg:p-8">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
          <div class="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg flex-shrink-0">
              <i class="fas fa-user-check text-white text-xl sm:text-2xl"></i>
            </div>
            <div class="min-w-0 flex-1">
              <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 truncate">Inscriptions aux Événements</h2>
              <p class="text-blue-100 text-xs sm:text-sm font-medium truncate">Gérez et suivez toutes les inscriptions</p>
            </div>
          </div>
          
          <!-- Stats rapides -->
          <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 sm:px-4 border border-white/20">
              <div class="text-xs text-blue-100 font-medium mb-0.5">Total</div>
              <div class="text-xl sm:text-2xl font-bold text-white">{{ registrations.length }}</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 sm:px-4 border border-white/20">
              <div class="text-xs text-blue-100 font-medium mb-0.5">En attente</div>
              <div class="text-xl sm:text-2xl font-bold text-yellow-300">{{ pendingCount }}</div>
            </div>
          </div>
        </div>
        
        <!-- Filtres améliorés -->
        <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
          <div class="flex-1 min-w-0">
            <label class="block text-xs font-semibold text-blue-100 mb-2">Filtrer par événement</label>
            <div class="relative">
              <i class="fas fa-calendar-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 text-sm z-10"></i>
              <select
                v-model="selectedEventId"
                @change="loadRegistrations"
                class="w-full pl-10 pr-4 py-2.5 bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl text-gray-900 font-medium text-sm focus:ring-2 focus:ring-white/50 focus:border-white transition-all shadow-sm appearance-none"
              >
                <option value="">Tous les événements</option>
                <option v-for="event in events" :key="event.id" :value="event.id">
                  {{ truncateText(event.title, 30) }}
                </option>
              </select>
            </div>
          </div>
          <div class="flex-1 min-w-0 sm:max-w-[200px]">
            <label class="block text-xs font-semibold text-blue-100 mb-2">Filtrer par statut</label>
            <div class="relative">
              <i class="fas fa-filter absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 text-sm z-10"></i>
              <select
                v-model="selectedStatus"
                @change="loadRegistrations"
                class="w-full pl-10 pr-4 py-2.5 bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl text-gray-900 font-medium text-sm focus:ring-2 focus:ring-white/50 focus:border-white transition-all shadow-sm appearance-none"
              >
                <option value="">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message d'erreur -->
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
      <div class="flex items-center gap-2">
        <i class="fas fa-exclamation-circle"></i>
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
      <p class="text-gray-600">Chargement des inscriptions...</p>
    </div>

    <!-- Table des inscriptions -->
    <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[800px]">
          <thead class="bg-gradient-to-r from-blue-600 to-indigo-600">
            <tr>
              <th class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider whitespace-nowrap">
                <div class="flex items-center gap-1.5 sm:gap-2">
                  <i class="fas fa-user text-xs sm:text-sm"></i>
                  <span class="hidden sm:inline">Participant</span>
                  <span class="sm:hidden">Part.</span>
                </div>
              </th>
              <th class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider whitespace-nowrap">
                <div class="flex items-center gap-1.5 sm:gap-2">
                  <i class="fas fa-envelope text-xs sm:text-sm"></i>
                  <span>Contact</span>
                </div>
              </th>
              <th class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                <div class="flex items-center gap-1.5 sm:gap-2">
                  <i class="fas fa-building text-xs sm:text-sm"></i>
                  <span>Organisation</span>
                </div>
              </th>
              <th class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider whitespace-nowrap">
                <div class="flex items-center gap-1.5 sm:gap-2">
                  <i class="fas fa-calendar-alt text-xs sm:text-sm"></i>
                  <span class="hidden lg:inline">Événement</span>
                  <span class="lg:hidden">Évén.</span>
                </div>
              </th>
              <th class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-bold text-white uppercase tracking-wider whitespace-nowrap">
                <div class="flex items-center justify-center gap-1.5 sm:gap-2">
                  <i class="fas fa-info-circle text-xs sm:text-sm"></i>
                  <span>Statut</span>
                </div>
              </th>
              <th class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                <div class="flex items-center gap-1.5 sm:gap-2">
                  <i class="fas fa-clock text-xs sm:text-sm"></i>
                  <span>Date</span>
                </div>
              </th>
              <th class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-bold text-white uppercase tracking-wider whitespace-nowrap">
                <div class="flex items-center justify-center gap-1.5 sm:gap-2">
                  <i class="fas fa-cog text-xs sm:text-sm"></i>
                  <span class="hidden sm:inline">Actions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr
              v-for="(registration, index) in registrations"
              :key="registration.id"
              class="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 group"
              :class="{ 'bg-gray-50/50': index % 2 === 1 }"
            >
              <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                <div class="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md flex-shrink-0">
                    {{ (registration.firstName?.[0] || '') + (registration.lastName?.[0] || '') }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate text-sm sm:text-base">
                      {{ registration.firstName }} {{ registration.lastName }}
                    </div>
                    <div v-if="registration.position" class="text-xs text-gray-500 mt-0.5 truncate">
                      {{ registration.position }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 min-w-0">
                <div class="space-y-1">
                  <div class="flex items-center gap-1.5 sm:gap-2 text-gray-700 min-w-0">
                    <i class="fas fa-envelope text-xs text-gray-400 flex-shrink-0"></i>
                    <span class="text-xs sm:text-sm truncate">{{ registration.email }}</span>
                  </div>
                  <div v-if="registration.phone" class="flex items-center gap-1.5 sm:gap-2 text-gray-600">
                    <i class="fas fa-phone text-xs text-gray-400 flex-shrink-0"></i>
                    <span class="text-xs truncate">{{ registration.phone }}</span>
                  </div>
                  <div v-else class="text-xs text-gray-400">-</div>
                </div>
              </td>
              <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 hidden md:table-cell min-w-0">
                <div class="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <i class="fas fa-building text-gray-400 text-xs sm:text-sm flex-shrink-0"></i>
                  <span class="text-xs sm:text-sm text-gray-700 truncate">{{ registration.organization || '-' }}</span>
                </div>
              </td>
              <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 min-w-0">
                <div 
                  class="relative inline-block"
                  @mouseenter="hoveredEventId = registration.eventId"
                  @mouseleave="hoveredEventId = null"
                >
                  <div class="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-50 rounded-lg border border-blue-200 max-w-full cursor-help">
                    <i class="fas fa-calendar-alt text-blue-600 text-xs flex-shrink-0"></i>
                    <span class="text-xs sm:text-sm font-medium text-blue-700 truncate">
                      {{ truncateText(getEventTitle(registration.eventId), 16) }}
                    </span>
                  </div>
                  <!-- Tooltip personnalisé -->
                  <div 
                    v-if="hoveredEventId === registration.eventId && getEventTitle(registration.eventId).length > 16"
                    class="absolute z-[100] bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl whitespace-normal max-w-xs text-center pointer-events-none"
                    style="min-width: 150px;"
                  >
                    {{ getEventTitle(registration.eventId) }}
                    <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div class="border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                <div class="flex justify-center">
                  <span
                    :class="[
                      'px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1 sm:gap-1.5 whitespace-nowrap',
                      registration.status === 'confirmed'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : registration.status === 'cancelled'
                        ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                        : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white'
                    ]"
                  >
                    <i 
                      :class="[
                        'fas text-xs flex-shrink-0',
                        registration.status === 'confirmed' ? 'fa-check-circle' 
                        : registration.status === 'cancelled' ? 'fa-times-circle' 
                        : 'fa-clock'
                      ]"
                    ></i>
                    <span class="hidden sm:inline">{{
                      registration.status === 'confirmed'
                        ? 'Confirmé'
                        : registration.status === 'cancelled'
                        ? 'Annulé'
                        : 'En attente'
                    }}</span>
                    <span class="sm:hidden">{{
                      registration.status === 'confirmed'
                        ? 'OK'
                        : registration.status === 'cancelled'
                        ? 'Ann.'
                        : 'Att.'
                    }}</span>
                  </span>
                </div>
              </td>
              <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 hidden lg:table-cell">
                <div class="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  <i class="fas fa-clock text-gray-400 text-xs flex-shrink-0"></i>
                  <span>{{ formatDate(registration.createdAt) }}</span>
                </div>
              </td>
              <td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                <div class="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
                  <button
                    v-if="registration.status !== 'confirmed'"
                    @click="updateStatus(registration.id!, 'confirmed')"
                    :disabled="saving"
                    class="p-2 sm:p-2.5 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 disabled:opacity-50 hover:scale-110 hover:shadow-md"
                    title="Confirmer"
                  >
                    <i class="fas fa-check text-xs sm:text-sm"></i>
                  </button>
                  <button
                    v-if="registration.status !== 'cancelled'"
                    @click="updateStatus(registration.id!, 'cancelled')"
                    :disabled="saving"
                    class="p-2 sm:p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 hover:scale-110 hover:shadow-md"
                    title="Annuler"
                  >
                    <i class="fas fa-times text-xs sm:text-sm"></i>
                  </button>
                  <button
                    @click="viewDetails(registration)"
                    class="p-2 sm:p-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md"
                    title="Voir les détails"
                  >
                    <i class="fas fa-eye text-xs sm:text-sm"></i>
                  </button>
                  <button
                    @click="deleteRegistration(registration.id!)"
                    :disabled="saving"
                    class="p-2 sm:p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 hover:scale-110 hover:shadow-md"
                    title="Supprimer"
                  >
                    <i class="fas fa-trash text-xs sm:text-sm"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="registrations.length === 0">
              <td colspan="7" class="px-6 py-16 text-center">
                <div class="flex flex-col items-center gap-3">
                  <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <i class="fas fa-inbox text-2xl text-gray-400"></i>
                  </div>
                  <p class="text-gray-500 font-medium">Aucune inscription trouvée</p>
                  <p class="text-sm text-gray-400">Les inscriptions apparaîtront ici</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de détails -->
    <div
      v-if="selectedRegistration"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="selectedRegistration = null"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold text-gray-900">Détails de l'inscription</h3>
            <button
              @click="selectedRegistration = null"
              class="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Nom complet</label>
            <p class="text-gray-900 font-semibold">
              {{ selectedRegistration.firstName }} {{ selectedRegistration.lastName }}
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Email</label>
            <p class="text-gray-900">{{ selectedRegistration.email }}</p>
          </div>
          <div v-if="selectedRegistration.phone">
            <label class="text-sm font-medium text-gray-600">Téléphone</label>
            <p class="text-gray-900">{{ selectedRegistration.phone }}</p>
          </div>
          <div v-if="selectedRegistration.organization">
            <label class="text-sm font-medium text-gray-600">Organisation</label>
            <p class="text-gray-900">{{ selectedRegistration.organization }}</p>
          </div>
          <div v-if="selectedRegistration.position">
            <label class="text-sm font-medium text-gray-600">Poste</label>
            <p class="text-gray-900">{{ selectedRegistration.position }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Événement</label>
            <p class="text-gray-900">{{ getEventTitle(selectedRegistration.eventId) }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Statut</label>
            <span
              :class="[
                'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                selectedRegistration.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : selectedRegistration.status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              ]"
            >
              {{
                selectedRegistration.status === 'confirmed'
                  ? 'Confirmé'
                  : selectedRegistration.status === 'cancelled'
                  ? 'Annulé'
                  : 'En attente'
              }}
            </span>
          </div>
          <div v-if="selectedRegistration.notes">
            <label class="text-sm font-medium text-gray-600">Notes</label>
            <p class="text-gray-900">{{ selectedRegistration.notes }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Date d'inscription</label>
            <p class="text-gray-900">{{ formatDate(selectedRegistration.createdAt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import type { EventRegistration, Event } from '@/models'
import eventService from '@/services/event.service'

const toast = useToast()

const registrations = ref<EventRegistration[]>([])
const events = ref<Event[]>([])
const loading = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)
const selectedEventId = ref<string | number>('')
const selectedStatus = ref<string>('')
const selectedRegistration = ref<EventRegistration | null>(null)
const hoveredEventId = ref<number | string | null>(null)

// Compteur d'inscriptions en attente
const pendingCount = computed(() => {
  return registrations.value.filter(r => r.status === 'pending').length
})

// Charger les événements
const loadEvents = async () => {
  try {
    const result = await eventService.getEvents({ limit: 100 })
    events.value = result.data
  } catch (err) {
    console.error('Erreur lors du chargement des événements:', err)
  }
}

// Charger les inscriptions
const loadRegistrations = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await eventService.getAllRegistrations({
      eventId: selectedEventId.value || undefined,
      status: selectedStatus.value || undefined,
      limit: 100,
    })
    registrations.value = result.data
  } catch (err: any) {
    console.error('Erreur lors du chargement des inscriptions:', err)
    error.value = err.message || 'Erreur lors du chargement des inscriptions'
    registrations.value = []
  } finally {
    loading.value = false
  }
}

// Obtenir le titre de l'événement
const getEventTitle = (eventId: number | string | undefined): string => {
  if (!eventId) return 'N/A'
  const event = events.value.find(e => e.id == eventId)
  return event?.title || `Événement #${eventId}`
}

// Tronquer un texte à une longueur maximale
const truncateText = (text: string | undefined, maxLength: number): string => {
  if (!text) return '-'
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Mettre à jour le statut
const updateStatus = async (registrationId: number | string, status: 'pending' | 'confirmed' | 'cancelled') => {
  if (!confirm(`Êtes-vous sûr de vouloir ${status === 'confirmed' ? 'confirmer' : 'annuler'} cette inscription ?`)) {
    return
  }

  saving.value = true
  error.value = null
  try {
    await eventService.updateRegistrationStatus(registrationId, status)
    await loadRegistrations()
    
    const statusLabels: Record<string, string> = {
      confirmed: 'confirmée',
      cancelled: 'annulée',
      pending: 'mise en attente'
    }
    
    toast.open({
      message: `✅ Inscription ${statusLabels[status] || 'mise à jour'} avec succès !`,
      type: 'success',
      position: 'top-right',
      duration: 5000,
    })
    
    // Émettre un événement pour mettre à jour les notifications
    window.dispatchEvent(new CustomEvent('dashboard:update-notifications'))
  } catch (err: any) {
    console.error('Erreur lors de la mise à jour:', err)
    const errorMessage = err.message || 'Erreur lors de la mise à jour'
    error.value = errorMessage
    toast.open({
      message: `❌ ${errorMessage}`,
      type: 'error',
      position: 'top-right',
      duration: 6000,
    })
  } finally {
    saving.value = false
  }
}

// Supprimer une inscription
const deleteRegistration = async (registrationId: number | string) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) {
    return
  }

  saving.value = true
  error.value = null
  try {
    await eventService.deleteRegistration(registrationId)
    await loadRegistrations()
    toast.open({
      message: '✅ Inscription supprimée avec succès !',
      type: 'success',
      position: 'top-right',
      duration: 5000,
    })
    
    // Émettre un événement pour mettre à jour les notifications
    window.dispatchEvent(new CustomEvent('dashboard:update-notifications'))
  } catch (err: any) {
    console.error('Erreur lors de la suppression:', err)
    const errorMessage = err.message || 'Erreur lors de la suppression'
    error.value = errorMessage
    toast.open({
      message: `❌ ${errorMessage}`,
      type: 'error',
      position: 'top-right',
      duration: 6000,
    })
  } finally {
    saving.value = false
  }
}

// Voir les détails
const viewDetails = (registration: EventRegistration) => {
  selectedRegistration.value = registration
}

// Formater la date
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-'
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return dateString
  }
}

onMounted(async () => {
  await loadEvents()
  await loadRegistrations()
})
</script>

