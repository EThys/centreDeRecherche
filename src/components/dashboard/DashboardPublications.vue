<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Demandes de Publication</h2>
      <p class="text-gray-600 mt-1">Gérez les demandes de publication d'articles</p>
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
        <p class="text-sm text-gray-600 mb-1">Acceptées</p>
        <p class="text-2xl font-bold text-green-600">{{ acceptedCount }}</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p class="text-sm text-gray-600 mb-1">Publiées</p>
        <p class="text-2xl font-bold text-blue-600">{{ publishedCount }}</p>
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
        <option value="pending">En attente</option>
        <option value="under-review">En révision</option>
        <option value="accepted">Acceptée</option>
        <option value="rejected">Refusée</option>
        <option value="published">Publiée</option>
      </select>
      <select
        v-model="typeFilter"
        @change="loadRequests"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      >
        <option value="">Tous les types</option>
        <option value="article">Article</option>
        <option value="research-paper">Document de recherche</option>
        <option value="book">Livre</option>
        <option value="report">Rapport</option>
        <option value="other">Autre</option>
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
              <h3 class="text-lg font-bold text-gray-900">{{ request.title }}</h3>
              <span
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="getStatusClass(request.status)"
              >
                {{ getStatusLabel(request.status) }}
              </span>
              <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {{ getTypeLabel(request.type) }}
              </span>
            </div>
            <p class="text-gray-600 mb-1">
              <i class="fas fa-user mr-2"></i>{{ request.name }}
            </p>
            <p class="text-gray-600 mb-1">
              <i class="fas fa-envelope mr-2"></i>{{ request.email }}
            </p>
            <p class="text-gray-600 mb-1" v-if="request.institution">
              <i class="fas fa-university mr-2"></i>{{ request.institution }}
            </p>
            <p class="text-gray-600">
              <i class="fas fa-calendar mr-2"></i>{{ formatDate(request.submissionDate) }}
            </p>
          </div>
          <div class="flex gap-2">
            <button
              v-if="request.status !== 'accepted'"
              @click="updateStatus(request, 'accepted')"
              :disabled="saving"
              class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
              title="Accepter"
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
              v-if="request.status === 'accepted' && request.status !== 'published'"
              @click="updateStatus(request, 'published')"
              :disabled="saving"
              class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-50"
              title="Publier"
            >
              <i class="fas fa-check-double"></i>
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
          <p class="text-sm text-gray-700 mb-2">
            <strong>Auteurs:</strong> {{ request.authors }}
          </p>
          <p class="text-sm text-gray-700 mb-2">
            <strong>Domaines:</strong> {{ request.domains.join(', ') }}
          </p>
          <p class="text-sm text-gray-700">
            <strong>Résumé:</strong> {{ request.abstract?.substring(0, 200) }}{{ request.abstract && request.abstract.length > 200 ? '...' : '' }}
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
      <div class="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
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
            <label class="text-sm font-medium text-gray-600">Titre du travail</label>
            <p class="text-gray-900 font-semibold">{{ selectedRequest.title }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Auteurs</label>
            <p class="text-gray-900">{{ selectedRequest.authors }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Type</label>
            <p class="text-gray-900">{{ getTypeLabel(selectedRequest.type) }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Domaines de recherche</label>
            <p class="text-gray-900">{{ selectedRequest.domains.join(', ') }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Résumé</label>
            <p class="text-gray-900 whitespace-pre-wrap">{{ selectedRequest.abstract }}</p>
          </div>
          <div v-if="selectedRequest.keywords">
            <label class="text-sm font-medium text-gray-600">Mots-clés</label>
            <p class="text-gray-900">{{ selectedRequest.keywords }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Auteur principal</label>
            <p class="text-gray-900">{{ selectedRequest.name }}</p>
            <p class="text-gray-600 text-sm">{{ selectedRequest.email }}</p>
            <p class="text-gray-600 text-sm" v-if="selectedRequest.institution">{{ selectedRequest.institution }}</p>
            <p class="text-gray-600 text-sm" v-if="selectedRequest.position">{{ selectedRequest.position }}</p>
          </div>
          <div v-if="selectedRequest.message">
            <label class="text-sm font-medium text-gray-600">Message complémentaire</label>
            <p class="text-gray-900 whitespace-pre-wrap">{{ selectedRequest.message }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Date de soumission</label>
            <p class="text-gray-900">{{ formatDate(selectedRequest.submissionDate) }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Statut</label>
            <p class="text-gray-900">{{ getStatusLabel(selectedRequest.status) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { PublicationRequest } from '@/models'
import publicationRequestService from '@/services/publication-request.service'

const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const requests = ref<PublicationRequest[]>([])
const selectedRequest = ref<PublicationRequest | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const saving = ref(false)

const filteredRequests = computed(() => {
  let filtered = requests.value
  if (statusFilter.value) {
    filtered = filtered.filter(r => r.status === statusFilter.value)
  }
  if (typeFilter.value) {
    filtered = filtered.filter(r => r.type === typeFilter.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query) ||
      r.title.toLowerCase().includes(query)
    )
  }
  return filtered
})

const pendingCount = computed(() => requests.value.filter(r => r.status === 'pending').length)
const acceptedCount = computed(() => requests.value.filter(r => r.status === 'accepted').length)
const publishedCount = computed(() => requests.value.filter(r => r.status === 'published').length)

const loadRequests = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await publicationRequestService.getRequests({
      status: statusFilter.value || undefined,
      type: typeFilter.value || undefined,
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

const viewRequest = (request: PublicationRequest) => {
  selectedRequest.value = request
}

const updateStatus = async (request: PublicationRequest, status: PublicationRequest['status']) => {
  if (!request.id) return
  
  saving.value = true
  error.value = null
  try {
    await publicationRequestService.updateRequestStatus(request.id, status)
    // Recharger les données après la mise à jour
    await loadRequests()
  } catch (err: any) {
    console.error('Erreur lors de la mise à jour:', err)
    const errorMessage = err.message || err.errors?.status?.[0] || 'Erreur lors de la mise à jour du statut'
    error.value = errorMessage
    alert(`Erreur: ${errorMessage}`)
  } finally {
    saving.value = false
  }
}

const deleteRequest = async (id: number | string | undefined) => {
  if (!id) return
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
    return
  }

  saving.value = true
  error.value = null
  try {
    await publicationRequestService.deleteRequest(id)
    // Recharger les données après la suppression
    await loadRequests()
  } catch (err: any) {
    console.error('Erreur lors de la suppression:', err)
    const errorMessage = err.message || 'Erreur lors de la suppression'
    error.value = errorMessage
    alert(`Erreur: ${errorMessage}`)
  } finally {
    saving.value = false
  }
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'En attente',
    'under-review': 'En révision',
    accepted: 'Acceptée',
    rejected: 'Refusée',
    published: 'Publiée'
  }
  return labels[status] || status
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    'under-review': 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    published: 'bg-purple-100 text-purple-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    article: 'Article',
    'research-paper': 'Document de recherche',
    book: 'Livre',
    report: 'Rapport',
    other: 'Autre'
  }
  return labels[type] || type
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

