<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30 pt-24 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 border border-orange-200 mb-6">
          <span class="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
          <span class="text-sm font-medium text-orange-700 uppercase tracking-wider">Communauté Scientifique</span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Forum de Recherche</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Espace d'échanges et de discussions entre chercheurs, experts et praticiens du financement des PME
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Créer une discussion -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <button class="w-full px-4 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Nouvelle Discussion
            </button>
          </div>

          <!-- Catégories -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="font-bold text-gray-900 mb-4">Catégories</h3>
            <div class="space-y-2">
              <button 
                v-for="category in categories" 
                :key="category.id"
                @click="activeCategory = category.id"
                :class="[
                  'w-full text-left px-3 py-2 rounded-lg transition-all duration-300 font-medium',
                  activeCategory === category.id 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                ]"
              >
                <div class="flex justify-between items-center">
                  <span>{{ category.name }}</span>
                  <span class="text-xs bg-gray-200 px-2 py-1 rounded-full">{{ category.count }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Chercheurs en ligne -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="font-bold text-gray-900 mb-4">Chercheurs en ligne</h3>
            <div class="space-y-3">
              <div 
                v-for="user in onlineUsers" 
                :key="user.id"
                class="flex items-center gap-3"
              >
                <div class="relative">
                  <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {{ user.initials }}
                  </div>
                  <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <div class="font-medium text-gray-900 text-sm">{{ user.name }}</div>
                  <div class="text-xs text-gray-500">{{ user.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenu principal -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Statistiques rapides -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white rounded-xl p-4 text-center shadow-lg border border-gray-100">
              <div class="text-2xl font-bold text-orange-600 mb-1">{{ stats.discussions }}</div>
              <div class="text-xs text-gray-600 font-medium">Discussions</div>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-lg border border-gray-100">
              <div class="text-2xl font-bold text-blue-600 mb-1">{{ stats.messages }}</div>
              <div class="text-xs text-gray-600 font-medium">Messages</div>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-lg border border-gray-100">
              <div class="text-2xl font-bold text-green-600 mb-1">{{ stats.members }}</div>
              <div class="text-xs text-gray-600 font-medium">Membres</div>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-lg border border-gray-100">
              <div class="text-2xl font-bold text-purple-600 mb-1">{{ stats.online }}</div>
              <div class="text-xs text-gray-600 font-medium">En ligne</div>
            </div>
          </div>

          <!-- Liste des discussions -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <!-- En-tête de la liste -->
            <div class="border-b border-gray-200 p-6">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 class="text-xl font-bold text-gray-900">Discussions Récentes</h2>
                <div class="flex gap-2">
                  <select class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm">
                    <option>Trier par: Récent</option>
                    <option>Populaire</option>
                    <option>Ancien</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Discussions -->
            <div class="divide-y divide-gray-100">
              <div 
                v-for="discussion in filteredDiscussions" 
                :key="discussion.id"
                class="p-6 hover:bg-gray-50/50 transition-colors duration-300 group"
              >
                <div class="flex gap-4">
                  <!-- Avatar et stats -->
                  <div class="flex-shrink-0 text-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-sm font-bold text-white mx-auto mb-2">
                      {{ discussion.author.initials }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ discussion.replies }} réponses
                    </div>
                  </div>

                  <!-- Contenu -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-2">
                      <h3 class="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-lg">
                        {{ discussion.title }}
                      </h3>
                      <span class="flex-shrink-0 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium ml-4">
                        {{ discussion.category }}
                      </span>
                    </div>

                    <p class="text-gray-600 mb-3 leading-relaxed">
                      {{ discussion.excerpt }}
                    </p>

                    <div class="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        {{ discussion.author.name }}
                      </div>
                      <div class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {{ discussion.lastActivity }}
                      </div>
                      <div class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1"/>
                        </svg>
                        {{ discussion.views }} vues
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="border-t border-gray-200 p-6">
              <div class="flex justify-center">
                <div class="flex gap-2">
                  <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                    Précédent
                  </button>
                  <button class="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium text-sm">
                    1
                  </button>
                  <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                    2
                  </button>
                  <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeCategory = ref('all')

const stats = {
  discussions: 142,
  messages: 856,
  members: 89,
  online: 12
}

const categories = [
  { id: 'all', name: 'Toutes les discussions', count: 142 },
  { id: 'methodology', name: 'Méthodologie', count: 23 },
  { id: 'funding', name: 'Financement', count: 45 },
  { id: 'publication', name: 'Publication', count: 18 },
  { id: 'events', name: 'Événements', count: 32 },
  { id: 'general', name: 'Général', count: 24 }
]

const onlineUsers = [
  { id: 1, name: 'Dr. Marie Koffi', role: 'Directrice', initials: 'MK' },
  { id: 2, name: 'Prof. Diallo', role: 'Chercheur', initials: 'PD' },
  { id: 3, name: 'Dr. Sarah M.', role: 'Post-doc', initials: 'SM' }
]

const discussions = [
  {
    id: 1,
    title: "Meilleures pratiques pour l'analyse des données financières des PME",
    excerpt: "Je cherche des conseils sur les méthodes d'analyse les plus adaptées pour les données financières des petites entreprises...",
    category: "Méthodologie",
    author: { name: "Dr. Marie Koffi", initials: "MK" },
    replies: 12,
    views: 145,
    lastActivity: "Il y a 2 heures"
  },
  {
    id: 2,
    title: "Impact des fintechs sur l'accès au crédit des PME en Afrique",
    excerpt: "Discussion sur l'émergence des plateformes fintech et leur rôle dans la démocratisation du crédit aux PME...",
    category: "Financement",
    author: { name: "Prof. Jean Diallo", initials: "JD" },
    replies: 8,
    views: 98,
    lastActivity: "Il y a 5 heures"
  }
]

const filteredDiscussions = computed(() => {
  if (activeCategory.value === 'all') return discussions
  return discussions.filter(discussion => 
    discussion.category.toLowerCase() === activeCategory.value
  )
})
</script>