<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-24 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6">
          <span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
          <span class="text-sm font-medium text-blue-700 uppercase tracking-wider">Événements Scientifiques</span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Événements du CReFF-PME</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Participez à nos conférences, séminaires et ateliers pour échanger avec les experts du financement des PME
        </p>
      </div>

      <!-- Filtres -->
      <div class="flex flex-wrap gap-4 justify-center mb-12">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          @click="activeFilter = filter.id"
          :class="[
            'px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2',
            activeFilter === filter.id 
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Grille des événements -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div 
          v-for="event in filteredEvents" 
          :key="event.id"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-gray-100"
        >
          <!-- Image de l'événement -->
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="event.image" 
              :alt="event.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            >
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-blue-600 shadow-lg">
                {{ event.type }}
              </span>
            </div>
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
              <div class="text-lg font-bold text-gray-900">{{ event.date.split(' ')[0] }}</div>
              <div class="text-xs text-gray-600 uppercase">{{ event.date.split(' ')[1] }}</div>
            </div>
          </div>

          <!-- Contenu -->
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm text-gray-600">{{ event.time }}</span>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
              {{ event.title }}
            </h3>
            
            <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {{ event.description }}
            </p>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-xs font-bold text-white">{{ event.speaker.initials }}</span>
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-900">{{ event.speaker.name }}</div>
                  <div class="text-xs text-gray-500">{{ event.speaker.role }}</div>
                </div>
              </div>
              
              <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Newsletter -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
        <h2 class="text-2xl lg:text-3xl font-bold mb-4">Ne manquez aucun événement</h2>
        <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
          Inscrivez-vous à notre newsletter pour recevoir les invitations et actualités de nos événements
        </p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Votre email professionnel"
            class="flex-1 px-4 py-3 rounded-lg border border-blue-500 bg-white/10 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          >
          <button class="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            S'abonner
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeFilter = ref('all')

const filters = [
  { id: 'all', label: 'Tous les événements' },
  { id: 'conference', label: 'Conférences' },
  { id: 'seminar', label: 'Séminaires' },
  { id: 'workshop', label: 'Ateliers' },
  { id: 'upcoming', label: 'À venir' }
]

const events = [
  {
    id: 1,
    title: "Financement des PME en Afrique : Défis et Opportunités",
    description: "Conférence internationale sur les nouvelles tendances du financement des PME dans le contexte africain.",
    type: "Conférence",
    date: "15 Mars 2024",
    time: "14:00 - 17:00",
    image: "/api/placeholder/400/200",
    speaker: {
      name: "Dr. Marie Koffi",
      role: "Directrice de Recherche",
      initials: "MK"
    }
  },
  {
    id: 2,
    type: "Séminaire",
    title: "Méthodologies de recherche quantitative",
    description: "Atelier pratique sur les méthodes avancées de collecte et d'analyse de données pour la recherche en finance.",
    date: "22 Mars 2024",
    time: "09:00 - 12:30",
    image: "/api/placeholder/400/200",
    speaker: {
      name: "Prof. Jean Diallo",
      role: "Expert Méthodologie",
      initials: "JD"
    }
  },
  {
    id: 3,
    type: "Atelier",
    title: "Rédaction scientifique pour publications",
    description: "Formation intensive sur les techniques de rédaction et de soumission d'articles dans des revues indexées.",
    date: "5 Avril 2024",
    time: "10:00 - 16:00",
    image: "/api/placeholder/400/200",
    speaker: {
      name: "Dr. Sarah Mensah",
      role: "Éditrice Scientifique",
      initials: "SM"
    }
  }
]

const filteredEvents = computed(() => {
  if (activeFilter.value === 'all') return events
  return events.filter(event => 
    activeFilter.value === 'upcoming' ? true : event.type.toLowerCase() === activeFilter.value
  )
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>