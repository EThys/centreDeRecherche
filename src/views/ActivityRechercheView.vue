<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 pt-24 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
          <span class="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
          <span class="text-sm font-medium text-purple-700 uppercase tracking-wider">Programmes de Recherche</span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Activités de Recherche</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Découvrez nos programmes de recherche, projets en cours et collaborations scientifiques
        </p>
      </div>

      <!-- Cartes des programmes principaux -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div 
          v-for="program in mainPrograms" 
          :key="program.id"
          class="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-gray-100"
        >
          <div class="h-48 relative overflow-hidden">
            <img 
              :src="program.image" 
              :alt="program.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-6 left-6 text-white">
              <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-3 inline-block">
                {{ program.duration }}
              </span>
              <h3 class="text-2xl font-bold mb-2">{{ program.title }}</h3>
            </div>
          </div>

          <div class="p-6">
            <p class="text-gray-600 mb-6 leading-relaxed">
              {{ program.description }}
            </p>

            <!-- Équipe -->
            <div class="mb-6">
              <h4 class="font-semibold text-gray-900 mb-3">Équipe de recherche</h4>
              <div class="flex -space-x-2">
                <div 
                  v-for="member in program.team" 
                  :key="member.id"
                  class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  :title="member.name"
                >
                  {{ member.initials }}
                </div>
              </div>
            </div>

            <!-- Progrès -->
            <div class="mb-6">
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progression</span>
                <span>{{ program.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                  :style="{ width: `${program.progress}%` }"
                ></div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3">
              <button class="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm">
                Voir le projet
              </button>
              <button class="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Projets en cours -->
      <div class="mb-16">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Projets en Cours</h2>
          <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
            Voir tous les projets
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="project in ongoingProjects" 
            :key="project.id"
            class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group"
          >
            <div class="flex items-start justify-between mb-4">
              <span :class="[
                'px-2.5 py-1 rounded-full text-xs font-semibold',
                project.status === 'En cours' ? 'bg-green-100 text-green-700' :
                project.status === 'Planifié' ? 'bg-blue-100 text-blue-700' :
                'bg-orange-100 text-orange-700'
              ]">
                {{ project.status }}
              </span>
              <span class="text-xs text-gray-500">{{ project.deadline }}</span>
            </div>

            <h3 class="font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
              {{ project.title }}
            </h3>

            <p class="text-gray-600 text-sm mb-4 leading-relaxed">
              {{ project.description }}
            </p>

            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">{{ project.participants }} participants</span>
              <button class="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Détails →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Collaborations -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Partenaires & Collaborations</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          <div 
            v-for="partner in partners" 
            :key="partner.id"
            class="grayscale hover:grayscale-0 transition-all duration-300 p-4 hover:scale-110"
          >
            <img 
              :src="partner.logo" 
              :alt="partner.name"
              class="h-12 object-contain"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const mainPrograms = [
  {
    id: 1,
    title: "Financement Innovant des PME",
    description: "Recherche sur les nouvelles formes de financement (crowdfunding, fintech, capital-risque) et leur impact sur le développement des PME en Afrique.",
    duration: "2022-2025",
    image: "/api/placeholder/600/400",
    team: [
      { id: 1, name: "Dr. Marie Koffi", initials: "MK" },
      { id: 2, name: "Prof. Jean Diallo", initials: "JD" },
      { id: 3, name: "Dr. Sarah Mensah", initials: "SM" },
      { id: 4, name: "Dr. Paul N'Guessan", initials: "PN" }
    ],
    progress: 65
  },
  {
    id: 2,
    title: "Résilience des PME Post-Crise",
    description: "Étude longitudinale sur les stratégies de résilience et d'adaptation des PME face aux crises économiques et sanitaires.",
    duration: "2023-2026",
    image: "/api/placeholder/600/400",
    team: [
      { id: 1, name: "Prof. Jean Diallo", initials: "JD" },
      { id: 2, name: "Dr. Sarah Mensah", initials: "SM" },
      { id: 3, name: "Dr. Paul N'Guessan", initials: "PN" }
    ],
    progress: 30
  }
]

const ongoingProjects = [
  {
    id: 1,
    title: "Impact du digital sur l'accès au crédit",
    description: "Analyse de l'impact des plateformes digitales sur l'accès au crédit des PME informelles.",
    status: "En cours",
    deadline: "Juin 2024",
    participants: 8
  },
  {
    id: 2,
    title: "Étude genre et entrepreneuriat",
    description: "Recherche sur les spécificités du financement des entreprises dirigées par des femmes.",
    status: "Planifié",
    deadline: "Sept 2024",
    participants: 6
  },
  {
    id: 3,
    title: "Baromètre du financement PME",
    description: "Enquête trimestrielle sur les conditions de financement des PME en Afrique de l'Ouest.",
    status: "En cours",
    deadline: "Déc 2024",
    participants: 12
  }
]

const partners = [
  { id: 1, name: "Université Kongo", logo: "/api/placeholder/120/60" },
  { id: 2, name: "ULB", logo: "/api/placeholder/120/60" },
  { id: 3, name: "Banque Mondiale", logo: "/api/placeholder/120/60" },
  { id: 4, name: "BAD", logo: "/api/placeholder/120/60" }
]
</script>