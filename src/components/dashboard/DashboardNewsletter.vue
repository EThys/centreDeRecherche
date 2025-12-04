<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Abonnés Newsletter</h2>
      <p class="text-gray-600 mt-1">Gérez les abonnements à la newsletter</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Total abonnés</p>
            <p class="text-2xl font-bold text-gray-900">{{ subscribers.length }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <i class="fas fa-users text-blue-600 text-xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Ce mois</p>
            <p class="text-2xl font-bold text-gray-900">{{ newThisMonth }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <i class="fas fa-arrow-up text-green-600 text-xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Taux d'ouverture</p>
            <p class="text-2xl font-bold text-gray-900">42%</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <i class="fas fa-chart-line text-purple-600 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <i class="fas fa-spinner fa-spin text-3xl text-blue-600 mb-4"></i>
      <p class="text-gray-600">Chargement des abonnés...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      <div class="flex items-center gap-2">
        <i class="fas fa-exclamation-circle"></i>
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- Liste -->
    <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex items-center justify-between">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un email..."
          @input="loadSubscribers"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        <button
          @click="exportSubscribers"
          class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i class="fas fa-download"></i>
          <span>Exporter</span>
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold">Email</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Date d'inscription</th>
              <th class="px-6 py-4 text-center text-sm font-semibold">Statut</th>
              <th class="px-6 py-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="subscriber in filteredSubscribers" :key="subscriber.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="font-medium text-gray-900">{{ subscriber.email }}</div>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ formatDate(subscriber.subscribedAt || subscriber.createdAt) }}</td>
              <td class="px-6 py-4 text-center">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="getStatusClass(subscriber.status)"
                >
                  {{ getStatusLabel(subscriber.status) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="deleteSubscriber(subscriber.id)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredSubscribers.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                Aucun abonné trouvé
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { NewsletterSubscription } from '@/models'
import newsletterService from '@/services/newsletter.service'

const searchQuery = ref('')
const subscribers = ref<NewsletterSubscription[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const filteredSubscribers = computed(() => {
  if (!searchQuery.value) return subscribers.value
  return subscribers.value.filter(s => 
    s.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const newThisMonth = computed(() => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  return subscribers.value.filter(s => {
    const date = s.subscribedAt || s.createdAt
    return date && new Date(date) >= startOfMonth
  }).length
})

const loadSubscribers = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await newsletterService.getAllSubscribers({
      limit: 100, // Récupérer tous les abonnés
      search: searchQuery.value || undefined,
    })
    subscribers.value = result.data
    console.log('📧 Newsletter Subscribers chargés:', subscribers.value.length)
  } catch (err: any) {
    console.error('Erreur lors du chargement des abonnés:', err)
    error.value = err.message || 'Erreur lors du chargement des abonnés'
    subscribers.value = []
  } finally {
    loading.value = false
  }
}

const deleteSubscriber = async (id: number | string | undefined) => {
  if (!id) return
  if (confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) {
    try {
      await newsletterService.deleteSubscriber(id)
      await loadSubscribers() // Recharger les données
    } catch (err: any) {
      console.error('Erreur lors de la suppression:', err)
      alert('Erreur lors de la suppression: ' + (err.message || 'Erreur inconnue'))
    }
  }
}

const exportSubscribers = () => {
  // TODO: Exporter en CSV
  const csv = subscribers.value.map(s => s.email).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'newsletter-subscribers.csv'
  a.click()
}

const formatDate = (date?: string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    active: 'Actif',
    unsubscribed: 'Désabonné',
    pending: 'En attente'
  }
  return labels[status] || status
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    unsubscribed: 'bg-red-100 text-red-700',
    pending: 'bg-yellow-100 text-yellow-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

onMounted(() => {
  loadSubscribers()
})
</script>

