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

    <!-- Liste -->
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex items-center justify-between">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un email..."
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
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Actif
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

const searchQuery = ref('')
const subscribers = ref<NewsletterSubscription[]>([])

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

const loadSubscribers = () => {
  // TODO: Charger depuis l'API
  subscribers.value = []
}

const deleteSubscriber = (id: number | string | undefined) => {
  if (!id) return
  if (confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) {
    subscribers.value = subscribers.value.filter(s => s.id !== id)
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

onMounted(() => {
  loadSubscribers()
})
</script>

