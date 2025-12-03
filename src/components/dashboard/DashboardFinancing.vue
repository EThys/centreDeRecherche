<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Demandes de Financement</h2>
      <p class="text-gray-600 mt-1">Gérez les demandes de financement reçues</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p class="text-sm text-gray-600 mb-1">Total</p>
        <p class="text-2xl font-bold text-gray-900">{{ requests.length }}</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p class="text-sm text-gray-600 mb-1">En attente</p>
        <p class="text-2xl font-bold text-yellow-600">{{ pendingCount }}</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p class="text-sm text-gray-600 mb-1">Traitées</p>
        <p class="text-2xl font-bold text-green-600">{{ processedCount }}</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p class="text-sm text-gray-600 mb-1">Nouvelles</p>
        <p class="text-2xl font-bold text-blue-600">{{ newCount }}</p>
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
      <p class="text-gray-600">Chargement des demandes...</p>
    </div>

    <!-- Filtres -->
    <div v-else class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 flex items-center gap-4">
      <select
        v-model="statusFilter"
        @change="loadRequests"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      >
        <option value="">Tous les statuts</option>
        <option value="submitted">Soumise</option>
        <option value="under-review">En révision</option>
        <option value="approved">Approuvée</option>
        <option value="rejected">Refusée</option>
        <option value="on-hold">En attente</option>
      </select>
      <input
        v-model="searchQuery"
        @input="loadRequests"
        type="text"
        placeholder="Rechercher..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />
    </div>

    <!-- Liste -->
    <div v-if="!loading" class="space-y-4">
      <div
        v-for="request in filteredRequests"
        :key="request.id"
        class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-lg font-bold text-gray-900">{{ request.contactFirstName }} {{ request.contactLastName }}</h3>
              <span
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="getStatusClass(request.status)"
              >
                {{ getStatusLabel(request.status) }}
              </span>
            </div>
            <p class="text-gray-600 mb-1">
              <i class="fas fa-building mr-2"></i>{{ request.companyName }}
            </p>
            <p class="text-gray-600 mb-1">
              <i class="fas fa-envelope mr-2"></i>{{ request.contactEmail }}
            </p>
            <p class="text-gray-600 mb-1" v-if="request.contactPhone">
              <i class="fas fa-phone mr-2"></i>{{ request.contactPhone }}
            </p>
            <p class="text-gray-600">
              <i class="fas fa-calendar mr-2"></i>{{ formatDate(request.createdAt) }}
            </p>
          </div>
          <div class="flex gap-2">
            <button
              v-if="request.status !== 'approved'"
              @click="updateStatus(request, 'approved')"
              :disabled="saving"
              class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
              title="Approuver"
            >
              <i class="fas fa-check"></i>
            </button>
            <button
              v-if="request.status !== 'rejected'"
              @click="updateStatus(request, 'rejected')"
              :disabled="saving"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Rejeter"
            >
              <i class="fas fa-times"></i>
            </button>
            <button
              @click="viewRequest(request)"
              class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Voir les détails"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              @click="deleteRequest(request.id!)"
              :disabled="saving"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Supprimer"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-700">
            <strong>Projet:</strong> {{ request.projectTitle }}
          </p>
          <p class="text-sm text-gray-700 mt-2">
            <strong>Description:</strong> {{ request.projectDescription?.substring(0, 200) }}{{ request.projectDescription && request.projectDescription.length > 200 ? '...' : '' }}
          </p>
          <p class="text-sm text-gray-700 mt-2">
            <strong>Montant demandé:</strong> {{ request.requestedAmount }} {{ request.currency }}
          </p>
        </div>
      </div>
      <div v-if="filteredRequests.length === 0" class="text-center py-12 text-gray-500">
        Aucune demande trouvée
      </div>
    </div>

    <!-- Modal de détails -->
    <div
      v-if="selectedRequest"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click.self="selectedRequest = null"
    >
      <div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">Détails de la demande</h3>
          <button
            @click="selectedRequest = null"
            class="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Contact</label>
            <p class="text-gray-900">{{ selectedRequest.contactFirstName }} {{ selectedRequest.contactLastName }}</p>
            <p class="text-gray-600 text-sm">{{ selectedRequest.contactEmail }}</p>
            <p class="text-gray-600 text-sm" v-if="selectedRequest.contactPhone">{{ selectedRequest.contactPhone }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Entreprise</label>
            <p class="text-gray-900">{{ selectedRequest.companyName }}</p>
            <p class="text-gray-600 text-sm">{{ selectedRequest.address }}, {{ selectedRequest.city }}, {{ selectedRequest.country }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Projet</label>
            <p class="text-gray-900 font-semibold">{{ selectedRequest.projectTitle }}</p>
            <p class="text-gray-900 mt-2 whitespace-pre-wrap">{{ selectedRequest.projectDescription }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Montant demandé</label>
            <p class="text-gray-900">{{ selectedRequest.requestedAmount }} {{ selectedRequest.currency }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Date</label>
            <p class="text-gray-900">{{ formatDate(selectedRequest.createdAt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import type { FinancingRequest } from '@/models'
import financingRequestService from '@/services/financing-request.service'

const toast = useToast()

const searchQuery = ref('')
const statusFilter = ref('')
const requests = ref<FinancingRequest[]>([])
const selectedRequest = ref<FinancingRequest | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const saving = ref(false)

const filteredRequests = computed(() => {
  let filtered = requests.value
  if (statusFilter.value) {
    filtered = filtered.filter(r => r.status === statusFilter.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(r =>
      (r.contactFirstName + ' ' + r.contactLastName).toLowerCase().includes(query) ||
      r.contactEmail.toLowerCase().includes(query) ||
      r.companyName.toLowerCase().includes(query) ||
      r.projectTitle.toLowerCase().includes(query)
    )
  }
  return filtered
})

const pendingCount = computed(() => requests.value.filter(r => r.status === 'submitted' || r.status === 'under-review').length)
const processedCount = computed(() => requests.value.filter(r => r.status === 'approved' || r.status === 'rejected').length)
const newCount = computed(() => requests.value.filter(r => {
  const date = new Date(r.createdAt || '')
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return date >= weekAgo
}).length)

const loadRequests = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await financingRequestService.getRequests({
      status: statusFilter.value || undefined,
      search: searchQuery.value || undefined,
      limit: 100,
    })
    requests.value = result.data
  } catch (err: any) {
    console.error('Erreur lors du chargement des demandes:', err)
    error.value = err.message || 'Erreur lors du chargement des demandes'
    requests.value = []
  } finally {
    loading.value = false
  }
}

const viewRequest = (request: FinancingRequest) => {
  selectedRequest.value = request
}

const deleteRequest = async (id: number | string | undefined) => {
  if (!id) return
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
    return
  }

  saving.value = true
  error.value = null
  try {
    await financingRequestService.deleteRequest(id)
    // Recharger les données après la suppression
    await loadRequests()
    toast.open({
      message: '✅ Demande de financement supprimée avec succès !',
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

const updateStatus = async (request: FinancingRequest, status: FinancingRequest['status']) => {
  if (!request.id) return
  
  saving.value = true
  error.value = null
  try {
    await financingRequestService.updateRequestStatus(request.id, status)
    // Recharger les données après la mise à jour
    await loadRequests()
    
    const statusLabels: Record<string, string> = {
      approved: 'approuvée',
      rejected: 'refusée',
      'under-review': 'mise en révision',
      'on-hold': 'mise en attente'
    }
    
    toast.open({
      message: `✅ Demande ${statusLabels[status] || 'mise à jour'} avec succès !`,
      type: 'success',
      position: 'top-right',
      duration: 5000,
    })
    
    // Émettre un événement pour mettre à jour les notifications
    window.dispatchEvent(new CustomEvent('dashboard:update-notifications'))
  } catch (err: any) {
    console.error('Erreur lors de la mise à jour:', err)
    const errorMessage = err.message || err.errors?.status?.[0] || 'Erreur lors de la mise à jour du statut'
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

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    draft: 'Brouillon',
    submitted: 'Soumise',
    'under-review': 'En révision',
    approved: 'Approuvée',
    rejected: 'Refusée',
    'on-hold': 'En attente'
  }
  return labels[status] || status
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    submitted: 'bg-yellow-100 text-yellow-700',
    'under-review': 'bg-blue-100 text-blue-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    'on-hold': 'bg-orange-100 text-orange-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
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
  loadRequests()
})
</script>

