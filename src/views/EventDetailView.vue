<template>
  <NavBarComponent/>
  
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <router-link to="/events" class="hover:text-blue-600 transition-colors">
              Événements
            </router-link>
          </li>
          <li class="flex items-center">
            <i class="fas fa-chevron-right text-xs mx-2"></i>
            <span class="text-gray-900 font-medium">{{ event.title }}</span>
          </li>
        </ol>
      </nav>

      <!-- Event Header -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
        <div class="relative h-80 overflow-hidden">
          <img
            :src="event.image"
            :alt="event.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <!-- Event Status Badge -->
          <div 
            :class="[
              'absolute top-6 left-6 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg',
              event.status === 'upcoming' ? 'bg-blue-500' : 
              event.status === 'ongoing' ? 'bg-orange-500' : 'bg-gray-500'
            ]"
          >
            {{ event.status === 'upcoming' ? 'À venir' : 
               event.status === 'ongoing' ? 'En cours' : 'Terminé' }}
          </div>

          <!-- Event Type -->
          <div class="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-medium px-4 py-2 rounded-lg">
            {{ event.type }}
          </div>

          <!-- Event Info Overlay -->
          <div class="absolute bottom-6 left-6 right-6 text-white">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ event.title }}</h1>
            <div class="flex flex-wrap items-center gap-6 text-sm">
              <div class="flex items-center">
                <i class="fas fa-calendar-alt mr-2"></i>
                <span>{{ formatEventDate(event.date) }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-clock mr-2"></i>
                <span>{{ event.startTime }} - {{ event.endTime }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-map-marker-alt mr-2"></i>
                <span>{{ event.location }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-tag mr-2"></i>
                <span>{{ event.price === 0 ? 'Gratuit' : `${event.price} $` }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Event Description -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Description de l'événement</h2>
            <p class="text-gray-700 leading-relaxed mb-6">{{ event.description }}</p>
            
            <!-- Detailed Description -->
            <div class="prose max-w-none">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Ce que vous apprendrez :</h3>
              <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Les dernières tendances en matière de financement des PME</li>
                <li>Comment préparer un dossier de financement convaincant</li>
                <li>Les différentes sources de financement disponibles</li>
                <li>Les erreurs à éviter lors de la recherche de financement</li>
              </ul>

              <h3 class="text-lg font-semibold text-gray-900 mb-3">Public cible :</h3>
              <p class="text-gray-700 mb-6">
                Entrepreneurs, dirigeants de PME, porteurs de projets, consultants en finance, 
                et toute personne intéressée par le financement des entreprises en RDC.
              </p>
            </div>
          </div>

          <!-- Speakers Section -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Intervenants</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="speaker in event.speakers"
                :key="speaker.id"
                class="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
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
          </div>

          <!-- Agenda Section -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Programme</h2>
            <div class="space-y-4">
              <div
                v-for="(session, index) in event.agenda"
                :key="index"
                class="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors"
              >
                <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span class="text-blue-600 font-semibold text-sm">{{ session.time }}</span>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 mb-1">{{ session.title }}</h3>
                  <p class="text-blue-600 text-sm mb-2" v-if="session.speaker">{{ session.speaker }}</p>
                  <p class="text-gray-500 text-sm">{{ session.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Registration Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <div class="text-center mb-6">
              <div class="text-3xl font-bold text-gray-900 mb-2">
                {{ event.price === 0 ? 'Gratuit' : `${event.price} $` }}
              </div>
              <div class="text-sm text-gray-600">{{ event.attendees }}/{{ event.capacity }} participants</div>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  class="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  :style="{ width: `${(event.attendees / event.capacity) * 100}%` }"
                ></div>
              </div>
            </div>

            <!-- Registration Form -->
            <div v-if="showRegistrationForm && event.status === 'upcoming' && event.attendees < event.capacity" class="mb-4">
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
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <input
                    v-model="registrationForm.company"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nom de votre entreprise"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                  <input
                    v-model="registrationForm.position"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Votre poste"
                  >
                </div>
                <div class="flex space-x-3">
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    :class="[
                      'flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300',
                      isSubmitting
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    ]"
                  >
                    {{ isSubmitting ? 'Inscription...' : "Confirmer l'inscription" }}
                  </button>
                  <button
                    type="button"
                    @click="showRegistrationForm = false"
                    class="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>

            <!-- Registration Button -->
            <div v-else>
              <button
                v-if="event.status === 'upcoming' && !isRegistered"
                @click="showRegistrationForm = true"
                :disabled="event.attendees >= event.capacity"
                :class="[
                  'w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 mb-4',
                  event.attendees >= event.capacity
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                ]"
              >
                {{ event.attendees >= event.capacity ? 'Complet' : "S'inscrire" }}
              </button>

              <button
                v-else-if="isRegistered"
                class="w-full py-3 px-4 bg-green-500 text-white rounded-xl font-semibold cursor-default mb-4"
              >
                ✓ Déjà inscrit
              </button>

              <button
                v-else
                class="w-full py-3 px-4 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed mb-4"
              >
                Événement {{ event.status === 'past' ? 'terminé' : 'en cours' }}
              </button>
            </div>

            <!-- Event Details -->
            <div class="space-y-4 mt-6 pt-6 border-t border-gray-100">
              <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-calendar-alt w-5 mr-3 text-blue-500"></i>
                <span>{{ formatFullDate(event.date) }}</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-clock w-5 mr-3 text-blue-500"></i>
                <span>{{ event.startTime }} - {{ event.endTime }}</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-map-marker-alt w-5 mr-3 text-blue-500"></i>
                <span>{{ event.location }}</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-users w-5 mr-3 text-blue-500"></i>
                <span>{{ event.capacity }} places maximum</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-language w-5 mr-3 text-blue-500"></i>
                <span>{{ event.language || 'Français' }}</span>
              </div>
            </div>

            <!-- Share Buttons -->
            <div class="mt-6 pt-6 border-t border-gray-100">
              <h4 class="font-semibold text-gray-900 mb-3">Partager l'événement</h4>
              <div class="flex space-x-3">
                <button 
                  @click="shareOnFacebook"
                  class="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <i class="fab fa-facebook-f mr-2"></i>
                  Facebook
                </button>
                <button 
                  @click="shareOnTwitter"
                  class="flex-1 py-2 px-3 bg-blue-400 text-white rounded-lg text-sm hover:bg-blue-500 transition-colors flex items-center justify-center"
                >
                  <i class="fab fa-twitter mr-2"></i>
                  Twitter
                </button>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Contact</h3>
            <div class="space-y-3 text-sm text-gray-600">
              <div class="flex items-center">
                <i class="fas fa-envelope w-5 mr-3 text-blue-500"></i>
                <span>events@pmefinance-rdc.cd</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-phone w-5 mr-3 text-blue-500"></i>
                <span>+243 81 234 5678</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-globe w-5 mr-3 text-blue-500"></i>
                <span>www.pmefinance-rdc.cd</span>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
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
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
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

// Computed properties
const registrationProgress = computed(() => {
  return (event.value.attendees / event.value.capacity) * 100
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update event attendees
    event.value.attendees++
    isRegistered.value = true
    showRegistrationForm.value = false
    showSuccessModal.value = true
    
    // Reset form
    registrationForm.value = {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      position: ''
    }
    
    console.log('Registration submitted:', registrationForm.value)
    
  } catch (error) {
    console.error('Registration failed:', error)
    alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
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

// Check if user is already registered (in a real app, this would check against an API)
const checkRegistrationStatus = () => {
  // For demo purposes, check localStorage
  const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents') || '[]')
  isRegistered.value = registeredEvents.includes(eventId)
}

onMounted(() => {
  checkRegistrationStatus()
})
</script>

<style scoped>
.prose {
  line-height: 1.75;
}

.prose ul {
  list-style-type: disc;
  margin-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.sticky {
  position: sticky;
}

/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>