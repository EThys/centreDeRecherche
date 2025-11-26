<template>
  <div class="bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/20 py-10 sm:py-12 lg:py-14 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl mt-8 sm:mt-12 border border-blue-100/50 relative overflow-hidden">
    <!-- Éléments décoratifs d'arrière-plan animés -->
    <div class="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-blue-200/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-float-slow"></div>
    <div class="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-200/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-float-medium"></div>
    <div class="absolute top-1/2 left-1/2 w-40 sm:w-64 h-40 sm:h-64 bg-purple-200/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-float-fast"></div>
    
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Section Actualités -->
    <div class="mb-12 sm:mb-16 lg:mb-20 relative z-10">
      <!-- En-tête de la section Actualités -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4 fade-in-up" data-delay="0">
        <div class="flex items-center">
          <div class="w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-2 sm:mr-3 shadow-lg animate-pulse-slow"></div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            {{ $t('actuality.header') }}
          </h2>
        </div>
        <div class="w-full sm:w-auto">
          <router-link 
            to="/actualites" 
            class="group inline-flex items-center justify-center sm:justify-start text-blue-600 text-xs sm:text-sm font-semibold bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-white shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-200 slide-in-right w-full sm:w-auto"
            data-delay="100"
          >
            <div class="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <i class="fas fa-newspaper text-white text-xs"></i>
            </div>
            <span class="mr-2 text-xs sm:text-sm">{{ news && news.length > 0 ? news.length : 0 }} {{ $t('actuality.newArticles') }}</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
          </router-link>
        </div>
      </div>

      <!-- Grille des actualités -->
      <div v-if="news && news.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        <!-- Article Card -->
        <article 
          v-for="(article, index) in news"
          :key="article.id"
          class="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/80 hover:border-blue-300 shadow-md sm:shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-1 sm:hover:-translate-y-2"
          :class="['stagger-item', `delay-${index * 150}`]"
          @click="openArticle(article.id)"
        >
          <div class="relative h-40 sm:h-48 lg:h-52 overflow-hidden">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute top-3 sm:top-4 left-3 sm:left-4 bg-blue-500 text-white text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300 scale-in">
              {{ formatDate(article.publishDate) }}
            </div>
            <div class="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 sm:px-3 py-1 rounded-lg transform group-hover:scale-105 transition-transform duration-300 scale-in">
              {{ article.category }}
            </div>
          </div>
          
          <div class="p-4 sm:p-6">
            <div class="flex items-center space-x-2 mb-3 sm:mb-4">
              <span class="text-blue-500 text-xs font-medium flex items-center transform group-hover:translate-x-1 transition-transform duration-300 slide-in-left">
                <i class="far fa-calendar-alt mr-1.5 text-xs"></i>{{ formatDate(article.publishDate) }}
              </span>
            </div>
            
            <h3 class="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight fade-in-up">
              {{ article.title }}
            </h3>
            
            <p class="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-5 line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 fade-in-up" data-delay="50">
              {{ article.summary }}
            </p>
            
            <div class="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 group-hover:border-blue-100 transition-colors duration-300">
              <div class="flex items-center text-blue-600 font-semibold text-xs sm:text-sm group-hover:translate-x-2 transition-transform duration-300 slide-in-right">
                <span class="mr-2">{{ $t('actuality.readMore') }}</span>
                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300 text-xs"></i>
              </div>
              <div class="text-gray-400 text-xs bg-gray-50 px-2 py-1 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-400 transition-colors duration-300 scale-in">
                {{ article.readTime }} {{ $t('common.min') }}
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- État vide pour les actualités -->
      <div v-else class="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/80 shadow-md sm:shadow-lg p-8 sm:p-12 mb-6 sm:mb-8 text-center fade-in-up">
        <div class="max-w-md mx-auto">
          <div class="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <i class="fas fa-newspaper text-3xl sm:text-4xl text-blue-500"></i>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
            {{ $t('actuality.noNews') }}
          </h3>
          <p class="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
            {{ $t('actuality.noNewsDescription') }}
          </p>
          <router-link 
            to="/actualites" 
            class="inline-flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors"
          >
            <span>{{ $t('actuality.viewAll') }}</span>
            <i class="fas fa-arrow-right ml-2"></i>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Séparateur décoratif -->
    <div class="flex items-center justify-center mb-10 sm:mb-12 lg:mb-16 relative z-10">
      <div class="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full expand-width" data-delay="400"></div>
      <div class="mx-3 sm:mx-4 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-blue-400 rounded-full animate-bounce scale-in" data-delay="600"></div>
      <div class="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full expand-width" data-delay="400"></div>
    </div>

    <!-- Section Événements à Venir -->
    <div class="relative z-10">
      <!-- En-tête de la section Événements -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4 fade-in-up" data-delay="600">
        <div class="flex items-center">
          <div class="w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-2 sm:mr-3 shadow-lg animate-pulse-slow"></div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            {{ $t('actuality.events.header') }}
          </h2>
        </div>
        <div class="w-full sm:w-auto">
          <router-link 
            to="/evenements" 
            class="group inline-flex items-center justify-center sm:justify-start text-blue-600 text-xs sm:text-sm font-semibold bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-white shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-200 slide-in-right w-full sm:w-auto"
            data-delay="700"
          >
            <div class="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <i class="fas fa-calendar-alt text-white text-xs"></i>
            </div>
            <span class="mr-2 text-xs sm:text-sm">{{ events && events.length > 0 ? events.length : 0 }} {{ $t('actuality.events.upcomingEvents') }}</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
          </router-link>
        </div>
      </div>

      <!-- Grille des événements -->
      <div v-if="events && events.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        <!-- Événement Card -->
        <div 
          v-for="(event, index) in events"
          :key="event.id"
          class="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/80 hover:border-blue-300 shadow-md sm:shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2"
          :class="['stagger-item', `delay-${index * 200 + 800}`]"
        >
          <div class="flex flex-col md:flex-row h-full">
            <!-- Date Section -->
            <div class="md:w-32 lg:w-36 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:from-blue-600 group-hover:via-blue-700 group-hover:to-blue-800 transition-all duration-500 slide-in-left min-h-[120px] md:min-h-full">
              <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              <div class="absolute top-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <p class="text-2xl sm:text-3xl font-bold mb-1 relative z-10 transform group-hover:scale-110 transition-transform duration-300 pop-in">{{ getEventDay(event.startDate) }}</p>
              <p class="text-xs sm:text-sm font-semibold relative z-10 transform group-hover:translate-y-1 transition-transform duration-300 fade-in-up" data-delay="50">{{ getEventMonth(event.startDate) }}</p>
              <p class="text-xs opacity-90 relative z-10 mt-1 fade-in-up" data-delay="100">{{ getEventYear(event.startDate) }}</p>
              <div class="absolute bottom-3 w-8 h-0.5 bg-white/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
            </div>
            
            <!-- Content Section -->
            <div class="flex-1 p-4 sm:p-6 flex flex-col justify-between">
              <div>
                <div class="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                  <span class="text-blue-500 text-xs font-medium flex items-center bg-blue-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg group-hover:bg-blue-100 transition-colors duration-300 scale-in" data-delay="150">
                    <i class="far fa-clock mr-1.5 text-xs"></i>{{ event.startTime }}
                  </span>
                  <span class="text-gray-600 text-xs font-medium flex items-center bg-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg group-hover:bg-gray-200 transition-colors duration-300 scale-in" data-delay="200">
                    <i class="fas fa-globe mr-1.5 text-xs" v-if="event.type === 'webinar'"></i>
                    <i class="fas fa-map-marker-alt mr-1.5 text-xs" v-else></i>
                    <span class="truncate max-w-[120px] sm:max-w-none">{{ event.location }}</span>
                  </span>
                </div>
                
                <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight fade-in-up" data-delay="250">
                  {{ event.title }}
                </h3>
                
                <p class="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-300 fade-in-up" data-delay="300">
                  {{ event.description }}
                </p>
              </div>
              
              <div class="flex flex-wrap gap-2 sm:gap-3">
                <button 
                  class="group/btn bg-blue-500 hover:bg-blue-600 text-white font-medium text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 flex items-center transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed slide-in-up flex-1 sm:flex-none"
                  data-delay="350"
                  @click.stop="registerEvent(event.id)"
                  :disabled="isLoading"
                >
                  <div class="w-4 h-4 sm:w-5 sm:h-5 bg-white/20 rounded-full mr-2 flex items-center justify-center group-hover/btn:scale-110 transition-transform duration-300 flex-shrink-0">
                    <i class="fas fa-user-plus text-white text-xs"></i>
                  </div>
                  <span v-if="isLoading" class="text-xs sm:text-sm">{{ $t('actuality.events.registering') }}</span>
                  <span v-else class="text-xs sm:text-sm">{{ $t('actuality.events.register') }}</span>
                </button>
                <button 
                  class="group/btn border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center transform hover:scale-105 slide-in-up flex-1 sm:flex-none"
                  data-delay="400"
                  @click.stop="viewEventDetails(event.id)"
                >
                  <div class="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full mr-2 flex items-center justify-center group-hover/btn:scale-110 transition-transform duration-300 flex-shrink-0">
                    <i class="fas fa-info-circle text-white text-xs"></i>
                  </div>
                  <span class="text-xs sm:text-sm">{{ $t('actuality.events.details') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- État vide pour les événements -->
      <div v-else class="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/80 shadow-md sm:shadow-lg p-8 sm:p-12 mb-6 sm:mb-8 text-center fade-in-up">
        <div class="max-w-md mx-auto">
          <div class="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <i class="fas fa-calendar-alt text-3xl sm:text-4xl text-green-500"></i>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
            {{ $t('actuality.events.noEvents') }}
          </h3>
          <p class="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
            {{ $t('actuality.events.noEventsDescription') }}
          </p>
          <router-link 
            to="/evenements" 
            class="inline-flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors"
          >
            <span>{{ $t('actuality.events.viewAll') }}</span>
            <i class="fas fa-arrow-right ml-2"></i>
          </router-link>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Actuality, Event } from '@/models'

const { t } = useI18n()

const router = useRouter()

// État réactif
const isLoading = ref(false)
const isVisible = ref(false)

// Observer pour les animations au défilement
let observer: IntersectionObserver | null = null

// Données des actualités adaptées au financement PME
// Remplacer le tableau 'news' existant par :
const news = reactive<Actuality[]>([
  {
    id: 1,
    title: "Étude Exclusive : Le Crowdfunding Émergent en RDC comme Solution de Financement des PME",
    summary: "Une recherche approfondie de l'ULB révèle le potentiel du crowdfunding pour combler le déficit de financement des PME congolaises, malgré les défis infrastructurels.",
    content: `
Le Potentiel Inexploité du Crowdfunding en RDC

Une étude menée par la Solvay Brussels School en collaboration avec iCite démontre que les conditions d'offre et de demande de financement sont favorables au développement du crowdfunding en République Démocratique du Congo.

Principales Constatations

• Épargne informelle importante : USD 10 millions échappent au système financier formel
• Diaspora active : Près de USD 2 milliards de transferts annuels
• Besoins non satisfaits : Seulement 3 milliards USD de crédits aux PME pour 11 milliards USD de dépôts

L'étude, basée sur 47 entretiens avec les acteurs clés du secteur financier congolais, identifie à la fois les opportunités et les défis à relever.
    `,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishDate: "2025-05-15",
    category: "Recherche",
    author: "Jean Nsonsumuna & Olivier Witmeur",
    readTime: 8,
    views: 312,
    tags: ["crowdfunding", "RDC", "PME", "recherche", "financement alternatif"]
  },
  {
    id: 2,
    title: "Infrastructure Financière en RDC : Le Frein Majeur au Développement du Crowdfunding",
    summary: "L'analyse met en lumière les défis réglementaires et infrastructurels qui entravent l'émergence des plateformes de financement participatif.",
    content: `
Les Défis Infrastructurels en RDC

L'étude identifie plusieurs obstacles majeurs au développement du crowdfunding :

Défis Réglementaires

• Absence de cadre réglementaire spécifique au crowdfunding
• Inefficacité du système de réalisation des contrats
• Longues procédures de réalisation d'hypothèques

Défis Techniques

• Taux de pénétration internet à 17.6% seulement
• Coût élevé et qualité médiocre de la connexion
• Faible taux de digitalisation des PME

Malgré ces défis, l'étude note une croissance prometteuse du mobile money avec un taux de pénétration de 10.43%.
    `,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishDate: "2025-05-10",
    category: "Analyse",
    author: "Équipe de Recherche iCite",
    readTime: 6,
    views: 234,
    tags: ["infrastructure", "régulation", "technologie", "mobile money"]
  },
  {
    id: 3,
    title: "PME Congolaises : Besoins de Financement et Stratégies de Résilience",
    summary: "Comment les petites et moyennes entreprises congolaises surmontent les obstacles d'accès au financement traditionnel.",
    content: `
Stratégies de Financement des PME en RDC

L'étude révèle trois stades de développement avec des besoins de financement spécifiques :

Stade d'Amorçage

• Fonds propres et prêts familiaux
• Main-d'œuvre familiale
• Activités informelles pour économiser les taxes

Stade de Démarrage

• Autofinancement par les bénéfices
• Crédit à court terme
• Subventions et prix

Stade de Croissance

• Diversification financée par les bénéfices
• Crédits à court terme
• Partenariats stratégiques

Ces stratégies démontrent la résilience des entrepreneurs congolais face aux contraintes financières.
    `,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishDate: "2025-05-05",
    category: "PME",
    author: "Équipe CReFF-PME",
    readTime: 7,
    views: 189,
    tags: ["PME", "stratégie", "financement", "croissance", "résilience"]
  }
])


// Données des événements adaptés au financement PME
const events = reactive<Event[]>([
  // {
  //   id: 1,
  //   title: "Webinaire : Financement Participatif pour PME Innovantes",
  //   description: "Apprenez les meilleures pratiques pour réussir votre campagne de crowdfunding avec des experts du secteur.",
  //   content: "Apprenez les meilleures pratiques pour réussir votre campagne de crowdfunding avec des experts du secteur. Ce webinaire couvrira les stratégies de financement participatif, les plateformes disponibles et les cas de succès.",
  //   image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   type: "webinar",
  //   status: "upcoming",
  //   startDate: "2025-11-25",
  //   startTime: "14:00",
  //   endTime: "16:00",
  //   location: "En ligne",
  //   registrationRequired: true,
  //   maxAttendees: 100,
  //   currentAttendees: 45
  // },
  // {
  //   id: 2,
  //   title: "Salon du Financement des Entreprises 2025",
  //   description: "Rencontrez les principaux acteurs du financement et découvrez les solutions adaptées à votre croissance.",
  //   content: "Rencontrez les principaux acteurs du financement et découvrez les solutions adaptées à votre croissance. Stands, conférences et networking au programme.",
  //   image: "https://images.unsplash.com/photo-1515168833906-d2d02d9820b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   type: "conference",
  //   status: "upcoming",
  //   startDate: "2025-12-05",
  //   endDate: "2025-12-06",
  //   startTime: "09:00",
  //   endTime: "18:00",
  //   location: "Paris, France",
  //   address: "Palais des Congrès, Paris",
  //   registrationRequired: true,
  //   price: 150,
  //   currency: "EUR",
  //   maxAttendees: 500,
  //   currentAttendees: 234
  // }
])

// Méthodes
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const getEventDay = (dateString: string): string => {
  const date = new Date(dateString)
  return date.getDate().toString().padStart(2, '0')
}

const getEventMonth = (dateString: string): string => {
  const date = new Date(dateString)
  const months = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC']
  return months[date.getMonth()]
}

const getEventYear = (dateString: string): string => {
  const date = new Date(dateString)
  return date.getFullYear().toString()
}

const openArticle = (articleId: number | string | undefined) => {
  if (!articleId) return
  // Navigation vers la page de détail de l'actualité
  router.push(`/actualites/${articleId}`)
}

const registerEvent = (eventId: number | string | undefined) => {
  if (!eventId) return
  console.log(`Inscription à l'événement ${eventId}`)
  isLoading.value = true
  // Simulation d'une requête API
  setTimeout(() => {
    isLoading.value = false
    alert(`Inscription réussie à l'événement ${eventId}`)
  }, 1000)
}

const viewEventDetails = (eventId: number | string | undefined) => {
  if (!eventId) return
  // Navigation vers la page de détail de l'événement
  router.push(`/events/${eventId}`)
}

// Système d'animation avancé avec Intersection Observer
const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        // Une fois visible, on peut arrêter d'observer
        if (observer) {
          observer.unobserve(entry.target)
        }
      }
    })
  }, observerOptions)

  // Observer tous les éléments avec des classes d'animation
  document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up, .scale-in, .pop-in, .stagger-item, .expand-width').forEach(el => {
    if (observer) {
      observer.observe(el)
    }
  })
}

onMounted(() => {
  // Initialiser les animations au scroll
  setTimeout(() => {
    initScrollAnimations()
  }, 100)

  // Animation d'entrée initiale au chargement de la page
  setTimeout(() => {
    isVisible.value = true
  }, 300)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* Animations d'entrée améliorées */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Animations de slide */
.slide-in-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-in-left.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.slide-in-right {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-in-right.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.slide-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Animations de scale */
.scale-in {
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.scale-in.animate-in {
  opacity: 1;
  transform: scale(1);
}

/* Animation pop-in */
.pop-in {
  opacity: 0;
  transform: scale(0.5) rotate(-5deg);
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.pop-in.animate-in {
  opacity: 1;
  transform: scale(1) rotate(0);
}

/* Animation d'expansion de largeur */
.expand-width {
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.expand-width.animate-in {
  opacity: 1;
  transform: scaleX(1);
}

/* Animations flottantes pour les éléments d'arrière-plan */
@keyframes float-slow {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0px);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-20px);
  }
}

@keyframes float-medium {
  0%, 100% {
    transform: translate(50%, 50%) translateY(0px);
  }
  50% {
    transform: translate(50%, 50%) translateY(-15px);
  }
}

@keyframes float-fast {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0px);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-10px);
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

/* Système de délais pour les animations en cascade */
.stagger-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.stagger-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Délais personnalisés basés sur les classes */
.delay-0 { transition-delay: 0ms; }
.delay-50 { transition-delay: 50ms; }
.delay-100 { transition-delay: 100ms; }
.delay-150 { transition-delay: 150ms; }
.delay-200 { transition-delay: 200ms; }
.delay-250 { transition-delay: 250ms; }
.delay-300 { transition-delay: 300ms; }
.delay-350 { transition-delay: 350ms; }
.delay-400 { transition-delay: 400ms; }
.delay-600 { transition-delay: 600ms; }
.delay-700 { transition-delay: 700ms; }
.delay-800 { transition-delay: 800ms; }
.delay-1000 { transition-delay: 1000ms; }

/* Animation de pulse lente */
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

/* Animation de rebond améliorée */
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Utilitaires pour le texte */
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

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .slide-in-left,
  .slide-in-right,
  .slide-in-up,
  .scale-in,
  .pop-in,
  .stagger-item,
  .expand-width,
  .animate-float-slow,
  .animate-float-medium,
  .animate-float-fast,
  .group-hover\:scale-110,
  .group-hover\:translate-x-2,
  .animate-pulse-slow,
  .animate-bounce {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
  
  .fade-in-up.animate-in,
  .slide-in-left.animate-in,
  .slide-in-right.animate-in,
  .slide-in-up.animate-in,
  .scale-in.animate-in,
  .pop-in.animate-in,
  .stagger-item.animate-in,
  .expand-width.animate-in {
    opacity: 1;
    transform: none;
  }
}

/* Responsive design amélioré - Mobile First */
@media (max-width: 640px) {
  .fade-in-up,
  .slide-in-left,
  .slide-in-right,
  .stagger-item {
    transform: translateY(15px) !important;
    transition-duration: 0.5s !important;
  }
  
  .slide-in-left { 
    transform: translateX(-15px) !important; 
  }
  
  .slide-in-right { 
    transform: translateX(15px) !important; 
  }
  
  .grid {
    gap: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .grid {
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .grid {
    gap: 2rem;
  }
}

/* Effets de glassmorphisme améliorés */
.backdrop-blur-sm {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Ombres portées améliorées */
.shadow-2xl {
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.hover\:shadow-2xl:hover {
  box-shadow: 
    0 35px 60px -12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(59, 130, 246, 0.1);
}

/* Optimisation des performances d'animation */
.transform {
  will-change: transform;
}

.backdrop-blur-sm {
  will-change: backdrop-filter;
}

/* Correction du z-index pour les éléments superposés */
.relative.z-10 {
  position: relative;
  z-index: 10;
}
</style>
