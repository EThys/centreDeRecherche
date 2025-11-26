<template>
  <NavBarComponent/>
  
  <!-- Hero Section - Image pleine largeur avec contenu superposé -->
  <div v-if="event" class="relative w-full h-screen max-h-[90vh] overflow-hidden">
    <!-- Image de fond -->
    <div class="absolute inset-0">
      <img
        :src="event.image"
        :alt="event.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
    </div>

    <!-- Contenu superposé -->
    <div class="absolute inset-0 flex flex-col justify-end z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 text-white">
        <!-- Badges et métadonnées -->
        <div class="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
          <span 
            :class="[
              'text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg backdrop-blur-sm',
              event.status === 'upcoming' ? 'bg-blue-500/90 text-white' : 
              event.status === 'ongoing' ? 'bg-orange-500/90 text-white' : 'bg-gray-500/90 text-white'
            ]"
          >
            {{ event.status === 'upcoming' ? 'À venir' : 
               event.status === 'ongoing' ? 'En cours' : 'Terminé' }}
          </span>
          <span class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30">
            {{ event.type }}
          </span>
          <span class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30 flex items-center">
            <i class="far fa-calendar-alt mr-2"></i>
            {{ formatEventDate(event.date) }}
          </span>
          <span class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30 flex items-center">
            <i class="far fa-clock mr-2"></i>
            {{ event.startTime }} - {{ event.endTime }}
          </span>
          <span class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30 flex items-center">
            <i class="fas fa-map-marker-alt mr-2"></i>
            {{ event.location }}
          </span>
        </div>

        <!-- Titre -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
          {{ event.title }}
        </h1>

        <!-- Prix et capacité -->
        <div class="flex flex-wrap items-center gap-4 mb-6 sm:mb-8">
          <div class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
            <span class="text-2xl sm:text-3xl font-bold">{{ event.price === 0 ? 'Gratuit' : `${event.price} $` }}</span>
          </div>
          <div class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
            <span class="text-sm sm:text-base">{{ event.attendees }}/{{ event.capacity }} participants</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-3 sm:gap-4">
          <router-link 
            to="/evenements" 
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg sm:rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg group"
          >
            <i class="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            <span class="text-sm sm:text-base">Retour</span>
          </router-link>
          <button
            v-if="event.status === 'upcoming' && !isRegistered && event.attendees < event.capacity"
            @click="showRegistrationForm = true"
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-500 text-white rounded-lg sm:rounded-xl font-medium hover:bg-blue-600 transition-all duration-300 shadow-lg"
          >
            <i class="fas fa-user-plus"></i>
            <span class="text-sm sm:text-base">S'inscrire</span>
          </button>
          <button
            v-else-if="isRegistered"
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-500 text-white rounded-lg sm:rounded-xl font-medium cursor-default shadow-lg"
          >
            <i class="fas fa-check"></i>
            <span class="text-sm sm:text-base">Déjà inscrit</span>
          </button>
          <button 
            @click="shareEvent"
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg sm:rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg"
          >
            <i class="fas fa-share-alt"></i>
            <span class="text-sm sm:text-base">Partager</span>
          </button>
          <button 
            @click="shareOnFacebook"
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            <i class="fab fa-facebook-f"></i>
            <span class="text-sm sm:text-base hidden sm:inline">Facebook</span>
          </button>
          <button 
            @click="shareOnTwitter"
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-400 text-white rounded-lg sm:rounded-xl font-medium hover:bg-blue-500 transition-all duration-300 shadow-lg"
          >
            <i class="fab fa-twitter"></i>
            <span class="text-sm sm:text-base hidden sm:inline">Twitter</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
      <i class="fas fa-chevron-down text-white/80 text-2xl"></i>
    </div>
  </div>

  <!-- Contenu principal -->
  <main class="min-h-screen bg-white" v-if="event">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="space-y-6 sticky top-24">
            <!-- Registration Card -->
            <div v-if="showRegistrationForm && event.status === 'upcoming' && event.attendees < event.capacity" class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Inscription</h3>
              <form @submit.prevent="submitRegistration" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <input
                    v-model="registrationForm.fullName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Votre nom complet"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    v-model="registrationForm.email"
                    type="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="votre@email.com"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    v-model="registrationForm.phone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+243 XX XXX XXXX"
                  >
                </div>
                <div class="flex space-x-3">
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    :class="[
                      'flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-300',
                      isSubmitting
                        ? 'bg-blue-400 cursor-not-allowed text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                    ]"
                  >
                    {{ isSubmitting ? 'Inscription...' : "Confirmer" }}
                  </button>
                  <button
                    type="button"
                    @click="showRegistrationForm = false"
                    class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>

            <!-- Event Info -->
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-200 fade-in-right" data-animate>
              <h3 class="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                <i class="fas fa-info-circle mr-2 text-blue-500"></i>
                Informations
              </h3>
              <div class="space-y-3 text-sm">
                <div class="flex items-center text-gray-600">
                  <i class="fas fa-calendar-alt w-5 mr-3 text-blue-500"></i>
                  <span>{{ formatFullDate(event.date) }}</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <i class="fas fa-clock w-5 mr-3 text-blue-500"></i>
                  <span>{{ event.startTime }} - {{ event.endTime }}</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <i class="fas fa-map-marker-alt w-5 mr-3 text-blue-500"></i>
                  <span>{{ event.location }}</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <i class="fas fa-users w-5 mr-3 text-blue-500"></i>
                  <span>{{ event.capacity }} places maximum</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <i class="fas fa-language w-5 mr-3 text-blue-500"></i>
                  <span>{{ event.language || 'Français' }}</span>
                </div>
              </div>
            </div>

            <!-- Partage -->
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-200 fade-in-right" data-animate>
              <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <i class="fas fa-share-alt mr-2 text-blue-500"></i>
                Partager
              </h3>
              <div class="space-y-2">
                <button 
                  @click="shareOnFacebook"
                  class="w-full py-2 px-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <i class="fab fa-facebook-f mr-2"></i>
                  Facebook
                </button>
                <button 
                  @click="shareOnTwitter"
                  class="w-full py-2 px-3 bg-blue-400 text-white rounded-lg text-sm hover:bg-blue-500 transition-colors flex items-center justify-center"
                >
                  <i class="fab fa-twitter mr-2"></i>
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenu principal -->
        <div class="lg:col-span-3">
          <div class="prose prose-lg max-w-none">
            <!-- Description -->
            <section class="mb-10 pb-10 border-b border-gray-200 fade-in-up" data-animate>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-align-left mr-3 text-blue-500"></i>
                Description de l'événement
              </h2>
              <p class="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
                {{ event.description }}
              </p>
              
              <div class="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500 fade-in-up" data-animate>
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Ce que vous apprendrez :</h3>
                <ul class="list-disc list-inside space-y-2 text-gray-700">
                  <li class="stagger-item" :style="{ animationDelay: '100ms' }" data-animate>Les dernières tendances en matière de financement des PME</li>
                  <li class="stagger-item" :style="{ animationDelay: '200ms' }" data-animate>Comment préparer un dossier de financement convaincant</li>
                  <li class="stagger-item" :style="{ animationDelay: '300ms' }" data-animate>Les différentes sources de financement disponibles</li>
                  <li class="stagger-item" :style="{ animationDelay: '400ms' }" data-animate>Les erreurs à éviter lors de la recherche de financement</li>
                </ul>
              </div>
            </section>

            <!-- Speakers Section -->
            <section v-if="event.speakers && event.speakers.length > 0" class="mb-10 pb-10 border-b border-gray-200 fade-in-up" data-animate>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-users mr-3 text-blue-500"></i>
                Intervenants
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  v-for="(speaker, index) in event.speakers"
                  :key="speaker.id"
                  class="flex items-start space-x-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors bg-gray-50 stagger-item"
                  :style="{ animationDelay: `${index * 100}ms` }"
                  data-animate
                >
                  <img
                    :src="speaker.avatar"
                    :alt="speaker.name"
                    class="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">{{ speaker.name }}</h3>
                    <p class="text-blue-600 text-sm mb-2">{{ speaker.role }}</p>
                    <p class="text-gray-600 text-sm">
                      {{ speaker.bio || 'Expert avec plus de 10 ans d\'expérience dans le domaine du financement des PME.' }}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Agenda Section -->
            <section v-if="event.agenda && event.agenda.length > 0" class="fade-in-up" data-animate>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-calendar-check mr-3 text-blue-500"></i>
                Programme
              </h2>
              <div class="space-y-4">
                <div
                  v-for="(session, index) in event.agenda"
                  :key="index"
                  class="flex items-start space-x-4 p-4 rounded-xl border border-gray-200 hover:border-blue-100 transition-colors bg-gray-50 stagger-item"
                  :style="{ animationDelay: `${index * 80}ms` }"
                  data-animate
                >
                  <div class="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span class="text-blue-600 font-semibold text-sm">{{ session.time }}</span>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-1">{{ session.title }}</h3>
                    <p class="text-blue-600 text-sm mb-2" v-if="session.speaker">{{ session.speaker }}</p>
                    <p class="text-gray-500 text-sm">{{ session.description }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- Registration Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-6 max-w-md w-full text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check text-green-500 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Inscription confirmée !</h3>
        <p class="text-gray-600 mb-6">
          Votre inscription à l'événement <strong>"{{ event.title }}"</strong> a été enregistrée avec succès.
        </p>
        <div class="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <h4 class="font-semibold text-blue-900 mb-2">Détails de votre inscription :</h4>
          <p class="text-sm text-blue-800"><strong>Nom :</strong> {{ registrationForm.fullName }}</p>
          <p class="text-sm text-blue-800"><strong>Email :</strong> {{ registrationForm.email }}</p>
          <p class="text-sm text-blue-800"><strong>Événement :</strong> {{ event.title }}</p>
          <p class="text-sm text-blue-800"><strong>Date :</strong> {{ formatFullDate(event.date) }}</p>
        </div>
        <button
          @click="showSuccessModal = false"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
        <p class="text-gray-600">Chargement de l'événement...</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const eventId = parseInt(route.params.id)

//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'

// Reactive data
const showRegistrationForm = ref(false)
const isSubmitting = ref(false)
const showSuccessModal = ref(false)
const isRegistered = ref(false)
let observer = null

// Registration form
const registrationForm = ref({
  fullName: '',
  email: '',
  phone: '',
  company: '',
  position: ''
})

// Sample event data
const event = ref({
  id: 1,
  title: "Conférence Nationale sur le Financement des PME",
  description: "Une conférence majeure réunissant les acteurs clés du financement des PME en RDC pour discuter des défis et opportunités dans le secteur. Cet événement unique rassemble des experts internationaux, des décideurs politiques, des investisseurs et des entrepreneurs pour partager des insights précieux sur l'avenir du financement des PME en République Démocratique du Congo.",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  date: "2025-12-15",
  startTime: "09:00",
  endTime: "17:00",
  location: "Kinshasa, Hôtel du Gouvernement, Salle des Conférences",
  type: "Conférence",
  status: "upcoming",
  price: 150,
  capacity: 300,
  attendees: 245,
  language: "Français",
  speakers: [
    { 
      id: 1, 
      name: "Dr. Jean Kabila", 
      role: "Ministre des PME",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      bio: "Ministre des PME avec 15 ans d'expérience dans le développement entrepreneurial."
    },
    { 
      id: 2, 
      name: "Marie Lumbu", 
      role: "Directrice Banque Centrale",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      bio: "Experte en politiques monétaires et financement des entreprises."
    },
    { 
      id: 3, 
      name: "Pierre Mbayo", 
      role: "Consultant en Finance",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      bio: "Consultant senior spécialisé dans le financement des PME africaines."
    }
  ],
  agenda: [
    {
      time: "09:00",
      title: "Mot de bienvenue et introduction",
      speaker: "Dr. Jean Kabila",
      description: "Ouverture officielle de la conférence"
    },
    {
      time: "09:30",
      title: "Landscape du financement des PME en RDC",
      speaker: "Marie Lumbu",
      description: "Analyse complète du marché actuel"
    },
    {
      time: "11:00",
      title: "Pause-café et networking",
      speaker: "",
      description: "Session d'échanges entre participants"
    },
    {
      time: "11:30",
      title: "Nouvelles solutions de financement digital",
      speaker: "Pierre Mbayo",
      description: "Présentation des innovations fintech"
    },
    {
      time: "13:00",
      title: "Déjeuner",
      speaker: "",
      description: "Buffet offert aux participants"
    },
    {
      time: "14:30",
      title: "Table ronde: Défis et opportunités",
      speaker: "Tous les intervenants",
      description: "Discussion interactive avec le public"
    },
    {
      time: "16:30",
      title: "Clôture et recommandations",
      speaker: "Dr. Jean Kabila",
      description: "Synthèse et perspectives futures"
    }
  ]
})

// Methods
const formatEventDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatFullDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const submitRegistration = async () => {
  isSubmitting.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    event.value.attendees++
    isRegistered.value = true
    showRegistrationForm.value = false
    showSuccessModal.value = true
    
    registrationForm.value = {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      position: ''
    }
    
  } catch (error) {
    console.error('Registration failed:', error)
    alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}

const shareEvent = () => {
  if (navigator.share) {
    navigator.share({
      title: event.value.title,
      text: event.value.description,
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Lien copié dans le presse-papiers!')
  }
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`Rejoignez-moi à l'événement: ${event.value.title}`)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank')
}

const shareOnTwitter = () => {
  const text = encodeURIComponent(`Je participe à "${event.value.title}" - Rejoignez-moi !`)
  const url = encodeURIComponent(window.location.href)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
}

const checkRegistrationStatus = () => {
  const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents') || '[]')
  isRegistered.value = registeredEvents.includes(eventId)
}

const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observer tous les éléments avec data-animate
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el)
  })
}

onMounted(() => {
  checkRegistrationStatus()
  
  // Initialiser les animations au scroll
  setTimeout(() => {
    initScrollAnimations()
  }, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.sticky {
  position: sticky;
}

.prose {
  line-height: 1.75;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translate(-50%, 0);
  }
  40% {
    transform: translate(-50%, -10px);
  }
  60% {
    transform: translate(-50%, -5px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Animations d'apparition */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.fade-in-right {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-right.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.stagger-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.stagger-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .fade-in-right,
  .stagger-item {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
</style>
