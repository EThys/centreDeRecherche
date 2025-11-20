<template>
  <div class="bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/20 px-6 sm:px-8 lg:px-20 py-12 lg:py-16 rounded-3xl shadow-2xl mt-12 border border-blue-100/50 relative overflow-hidden">
    <!-- Éléments décoratifs d'arrière-plan animés -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-blue-200/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-float-slow"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-float-medium"></div>
    <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-float-fast"></div>

    <!-- Section Actualités -->
    <div class="mb-20 relative z-10">
      <!-- En-tête de la section Actualités -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center mb-12 gap-4 fade-in-up" data-delay="0">
        <div class="flex items-center">
          <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-3 shadow-lg animate-pulse-slow"></div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            ACTUALITÉS RÉCENTES
          </h2>
        </div>
        <div class="ml-auto">
          <router-link 
            to="/actualites" 
            class="group inline-flex items-center text-blue-600 text-sm font-semibold bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl hover:bg-white shadow-lg hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-200 slide-in-right"
            data-delay="100"
          >
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
              <i class="fas fa-newspaper text-white text-sm"></i>
            </div>
            <span class="mr-2">{{ news.length }} Nouveaux Articles</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
          </router-link>
        </div>
      </div>

      <!-- Grille des actualités -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <!-- Article Card -->
        <article 
          v-for="(article, index) in news"
          :key="article.id"
          class="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
          :class="['stagger-item', `delay-${index * 150}`]"
          @click="openArticle(article.id)"
        >
          <div class="relative h-52 overflow-hidden">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute top-4 left-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300 scale-in">
              {{ article.date }}
            </div>
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-lg transform group-hover:scale-105 transition-transform duration-300 scale-in">
              {{ article.category }}
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-blue-500 text-xs font-medium flex items-center transform group-hover:translate-x-1 transition-transform duration-300 slide-in-left">
                <i class="far fa-calendar-alt mr-1.5"></i>{{ article.date }}
              </span>
            </div>
            
            <h3 class="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight fade-in-up">
              {{ article.title }}
            </h3>
            
            <p class="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 fade-in-up" data-delay="50">
              {{ article.excerpt }}
            </p>
            
            <div class="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-blue-100 transition-colors duration-300">
              <div class="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300 slide-in-right">
                <span class="mr-2">Lire la suite</span>
                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
              <div class="text-gray-400 text-xs bg-gray-50 px-2 py-1 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-400 transition-colors duration-300 scale-in">
                {{ article.readTime }}
              </div>
            </div>
          </div>
        </article>
      </div>

    </div>

    <!-- Séparateur décoratif -->
    <div class="flex items-center justify-center mb-16 relative z-10">
      <div class="w-24 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full expand-width" data-delay="400"></div>
      <div class="mx-4 w-3 h-3 bg-blue-400 rounded-full animate-bounce scale-in" data-delay="600"></div>
      <div class="w-24 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full expand-width" data-delay="400"></div>
    </div>

    <!-- Section Événements à Venir -->
    <div class="relative z-10">
      <!-- En-tête de la section Événements -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center mb-12 gap-4 fade-in-up" data-delay="600">
        <div class="flex items-center">
          <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-3 shadow-lg animate-pulse-slow"></div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            ÉVÉNEMENTS À VENIR
          </h2>
        </div>
        <div class="ml-auto">
          <router-link 
            to="/evenements" 
            class="group inline-flex items-center text-blue-600 text-sm font-semibold bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl hover:bg-white shadow-lg hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-200 slide-in-right"
            data-delay="700"
          >
            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
              <i class="fas fa-calendar-alt text-white text-sm"></i>
            </div>
            <span class="mr-2">{{ events.length }} Événements à venir</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
          </router-link>
        </div>
      </div>

      <!-- Grille des événements -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Événement Card -->
        <div 
          v-for="(event, index) in events"
          :key="event.id"
          class="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
          :class="['stagger-item', `delay-${index * 200 + 800}`]"
        >
          <div class="flex flex-col md:flex-row h-full">
            <!-- Date Section -->
            <div class="md:w-36 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white p-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:from-blue-600 group-hover:via-blue-700 group-hover:to-blue-800 transition-all duration-500 slide-in-left">
              <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              <div class="absolute top-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <p class="text-3xl font-bold mb-1 relative z-10 transform group-hover:scale-110 transition-transform duration-300 pop-in">{{ event.day }}</p>
              <p class="text-sm font-semibold relative z-10 transform group-hover:translate-y-1 transition-transform duration-300 fade-in-up" data-delay="50">{{ event.month }}</p>
              <p class="text-xs opacity-90 relative z-10 mt-1 fade-in-up" data-delay="100">{{ event.year }}</p>
              <div class="absolute bottom-3 w-8 h-0.5 bg-white/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
            </div>
            
            <!-- Content Section -->
            <div class="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div class="flex flex-wrap items-center gap-2 mb-4">
                  <span class="text-blue-500 text-xs font-medium flex items-center bg-blue-50 px-3 py-1.5 rounded-lg group-hover:bg-blue-100 transition-colors duration-300 scale-in" data-delay="150">
                    <i class="far fa-clock mr-1.5"></i>{{ event.time }}
                  </span>
                  <span class="text-gray-600 text-xs font-medium flex items-center bg-gray-100 px-3 py-1.5 rounded-lg group-hover:bg-gray-200 transition-colors duration-300 scale-in" data-delay="200">
                    <i class="fas fa-globe mr-1.5" v-if="event.type === 'online'"></i>
                    <i class="fas fa-map-marker-alt mr-1.5" v-else></i>
                    {{ event.location }}
                  </span>
                </div>
                
                <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight fade-in-up" data-delay="250">
                  {{ event.title }}
                </h3>
                
                <p class="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-300 fade-in-up" data-delay="300">
                  {{ event.description }}
                </p>
              </div>
              
              <div class="flex flex-wrap gap-3">
                <button 
                  class="group/btn bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed slide-in-up"
                  data-delay="350"
                  @click.stop="registerEvent(event.id)"
                  :disabled="isLoading"
                >
                  <div class="w-5 h-5 bg-white/20 rounded-full mr-2 flex items-center justify-center group-hover/btn:scale-110 transition-transform duration-300">
                    <i class="fas fa-user-plus text-white text-xs"></i>
                  </div>
                  <span v-if="isLoading">Inscription...</span>
                  <span v-else>S'inscrire</span>
                </button>
                <button 
                  class="group/btn border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium text-sm px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center transform hover:scale-105 slide-in-up"
                  data-delay="400"
                  @click.stop="viewEventDetails(event.id)"
                >
                  <div class="w-5 h-5 bg-blue-500 rounded-full mr-2 flex items-center justify-center group-hover/btn:scale-110 transition-transform duration-300">
                    <i class="fas fa-info-circle text-white text-xs"></i>
                  </div>
                  Détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// État réactif
const isLoading = ref(false)
const isVisible = ref(false)

// Observer pour les animations au défilement
let observer = null

// Données des actualités adaptées au financement PME
const news = reactive([
  {
    id: 1,
    title: "Nouveaux Dispositifs de Financement pour les PME en 2025",
    excerpt: "Découvrez les dernières aides gouvernementales et programmes de subventions disponibles pour le développement de votre entreprise.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "18 Nov 2025",
    category: "Financement",
    readTime: "5 min de lecture"
  },
  {
    id: 2,
    title: "Comment Optimiser votre Trésorerie en Période de Croissance",
    excerpt: "Stratégies éprouvées pour maintenir une trésorerie saine tout en investissant dans l'expansion de votre activité.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "17 Nov 2025",
    category: "Gestion",
    readTime: "4 min de lecture"
  },
  {
    id: 3,
    title: "Le Crowdfunding : Une Alternative Innovante pour les PME",
    excerpt: "Explorez comment le financement participatif peut booster votre projet et créer une communauté autour de votre marque.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    date: "15 Nov 2025",
    category: "Innovation",
    readTime: "6 min de lecture"
  }
])

// Données des événements adaptés au financement PME
const events = reactive([
  {
    id: 1,
    title: "Webinaire : Financement Participatif pour PME Innovantes",
    description: "Apprenez les meilleures pratiques pour réussir votre campagne de crowdfunding avec des experts du secteur.",
    day: "25",
    month: "NOV",
    year: "2025",
    time: "14:00",
    location: "En ligne",
    type: "online"
  },
  {
    id: 2,
    title: "Salon du Financement des Entreprises 2025",
    description: "Rencontrez les principaux acteurs du financement et découvrez les solutions adaptées à votre croissance.",
    day: "05",
    month: "DÉC",
    year: "2025",
    time: "09:00",
    location: "Paris, France",
    type: "physical"
  }
])

// Méthodes
const openArticle = (articleId) => {
  console.log(`Ouverture de l'article ${articleId}`)
  // Navigation vers l'article ou ouverture modal
}

const registerEvent = (eventId) => {
  console.log(`Inscription à l'événement ${eventId}`)
  isLoading.value = true
  // Simulation d'une requête API
  setTimeout(() => {
    isLoading.value = false
    alert(`Inscription réussie à l'événement ${eventId}`)
  }, 1000)
}

const viewEventDetails = (eventId) => {
  console.log(`Voir les détails de l'événement ${eventId}`)
  // Navigation vers les détails de l'événement
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
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observer tous les éléments avec des classes d'animation
  document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up, .scale-in, .pop-in, .stagger-item, .expand-width').forEach(el => {
    observer.observe(el)
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

/* Transitions améliorées */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-2 {
  transform: translateX(0.5rem);
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
    animation: none;
    transition: none;
    transform: none;
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

/* Responsive design amélioré */
@media (max-width: 768px) {
  .fade-in-up,
  .slide-in-left,
  .slide-in-right,
  .stagger-item {
    transform: translateY(20px) !important;
    transition-duration: 0.6s !important;
  }
  
  .slide-in-left { transform: translateX(-20px) !important; }
  .slide-in-right { transform: translateX(20px) !important; }
  
  .grid {
    gap: 1.5rem;
  }
  
  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .py-12 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

@media (max-width: 640px) {
  .text-3xl {
    font-size: 1.75rem;
  }
  
  .gap-8 {
    gap: 1rem;
  }
  
  .p-6 {
    padding: 1.25rem;
  }
}

/* Effets de glassmorphisme améliorés */
.backdrop-blur-sm {
  backdrop-filter: blur(12px);
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

/* Amélioration de la lisibilité sur mobile */
@media (max-width: 480px) {
  .text-sm {
    font-size: 0.8125rem;
  }
  
  .text-xs {
    font-size: 0.75rem;
  }
  
  .leading-relaxed {
    line-height: 1.5;
  }
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