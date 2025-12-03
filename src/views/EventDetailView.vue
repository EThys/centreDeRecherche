<template>
  <NavBarComponent/>
  
  <!-- Hero Section - Image pleine largeur avec contenu superposé -->
  <div v-if="event" class="relative w-full h-screen max-h-[90vh] overflow-hidden">
    <!-- Image de fond -->
    <div class="absolute inset-0">
      <img
        :src="getEventImage(event.image)"
        :alt="event.title"
        class="w-full h-full object-cover"
        @error="(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80' }"
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
          <span v-if="event.type" class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30">
            {{ event.type }}
          </span>
          <span v-if="event.startDate" class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30 flex items-center">
            <i class="far fa-calendar-alt mr-2"></i>
            {{ formatEventDate(event.startDate) }}
          </span>
          <span v-if="event.startTime || event.endTime" class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30 flex items-center">
            <i class="far fa-clock mr-2"></i>
            {{ formatTime(event.startTime) || '' }}<span v-if="event.startTime && event.endTime"> - </span>{{ formatTime(event.endTime) || '' }}
          </span>
          <span v-if="event.location" class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30 flex items-center">
            <i class="fas fa-map-marker-alt mr-2"></i>
            {{ event.location }}
          </span>
        </div>

        <!-- Titre -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl line-clamp-2">
          {{ event.title }}
        </h1>

        <!-- Prix et capacité -->
        <div class="flex flex-wrap items-center gap-4 mb-6 sm:mb-8">
          <div class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
            <span class="text-2xl sm:text-3xl font-bold">{{ !event.price || event.price === 0 ? 'Gratuit' : `${event.price} ${event.currency || 'USD'}` }}</span>
          </div>
          <div v-if="event.maxAttendees" class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
            <span class="text-sm sm:text-base">{{ event.currentAttendees || 0 }}/{{ event.maxAttendees }} participants</span>
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
            v-if="event.registrationRequired && event.status === 'upcoming' && !isRegistered && (!event.maxAttendees || (event.currentAttendees || 0) < event.maxAttendees)"
            @click="showRegistrationForm = true; scrollToRegistration()"
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
            <!-- Registration Card - Toujours visible si l'événement accepte les inscriptions -->
            <div 
              v-if="event.registrationRequired && event.status === 'upcoming' && (!event.maxAttendees || (event.currentAttendees || 0) < event.maxAttendees)" 
              data-registration-card
              class="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Inscription</h3>
              </div>
              
              <!-- Message si déjà inscrit -->
              <div v-if="isRegistered" class="bg-white rounded-xl shadow-xl border-2 border-green-200 overflow-hidden">
                <!-- Header avec gradient -->
                <div class="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
                  <div class="flex items-center justify-center gap-3">
                    <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <i class="fas fa-check-circle text-white text-xl"></i>
                    </div>
                    <div class="text-white">
                      <h4 class="text-lg font-bold">Inscription confirmée !</h4>
                      <p class="text-sm text-green-50">Votre place est réservée</p>
                    </div>
                  </div>
                </div>
                
                <!-- Contenu -->
                <div class="p-6">
                  <!-- Informations du participant -->
                  <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-100">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        {{ savedRegistrationData.firstName?.charAt(0) || '' }}{{ savedRegistrationData.lastName?.charAt(0) || '' }}
                      </div>
                      <div>
                        <p class="font-bold text-gray-900">{{ savedRegistrationData.firstName }} {{ savedRegistrationData.lastName }}</p>
                        <p class="text-xs text-gray-600">{{ savedRegistrationData.email }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Détails de l'événement -->
                  <div class="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                    <p class="font-semibold text-gray-900 mb-2 text-sm flex items-start gap-2">
                      <i class="fas fa-calendar-alt text-blue-500 mt-0.5"></i>
                      <span class="line-clamp-2">{{ event.title }}</span>
                    </p>
                    <div class="space-y-1 text-xs text-gray-600">
                      <p class="flex items-center gap-2">
                        <i class="fas fa-clock w-4 text-blue-500"></i>
                        {{ formatFullDate(event.startDate) }} à {{ formatTime(event.startTime) }}
                      </p>
                      <p v-if="event.location" class="flex items-center gap-2">
                        <i class="fas fa-map-marker-alt w-4 text-blue-500"></i>
                        {{ event.location }}
                      </p>
                    </div>
                  </div>
                  
                  <!-- Actions -->
                  <div class="mb-4">
                    <button
                      @click="downloadBadge"
                      class="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-105"
                    >
                      <i class="fas fa-download"></i>
                      <span>Télécharger le badge</span>
                    </button>
                  </div>
                  
                  <!-- Message informatif -->
                  <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p class="text-xs text-blue-800 flex items-center gap-2">
                      <i class="fas fa-info-circle text-blue-500"></i>
                      <span>Présentez ce badge à l'entrée de l'événement pour accéder</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <!-- Formulaire d'inscription -->
              <form v-else-if="!isRegistered" @submit.prevent="submitRegistration" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                  <input
                    v-model="registrationForm.firstName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Votre prénom"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input
                    v-model="registrationForm.lastName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Votre nom"
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
                  <label class="block text-sm font-medium text-gray-700 mb-1">Organisation (optionnel)</label>
                  <input
                    v-model="registrationForm.company"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Votre organisation"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Poste (optionnel)</label>
                  <input
                    v-model="registrationForm.position"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Votre poste"
                  >
                </div>
                <div>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    :class="[
                      'w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl',
                      isSubmitting
                        ? 'bg-blue-400 cursor-not-allowed text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    ]"
                  >
                    <i class="fas fa-user-plus mr-2"></i>
                    {{ isSubmitting ? 'Inscription en cours...' : "S'inscrire à cet événement" }}
                  </button>
                  <p class="text-xs text-gray-500 mt-2 text-center">
                    {{ event.maxAttendees ? `${event.maxAttendees - (event.currentAttendees || 0)} places restantes` : 'Places illimitées' }}
                  </p>
                </div>
              </form>
            </div>
            
            <!-- Message si l'événement ne nécessite pas d'inscription -->
            <div v-else-if="!event.registrationRequired" class="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <i class="fas fa-info-circle text-blue-600 text-2xl mb-2"></i>
              <p class="text-blue-800 font-semibold">Inscription non requise</p>
              <p class="text-blue-600 text-sm mt-1">Cet événement est ouvert à tous</p>
            </div>
            
            <!-- Message si l'événement est complet -->
            <div v-else-if="event.maxAttendees && (event.currentAttendees || 0) >= event.maxAttendees" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <i class="fas fa-times-circle text-red-600 text-2xl mb-2"></i>
              <p class="text-red-800 font-semibold">Événement complet</p>
              <p class="text-red-600 text-sm mt-1">Toutes les places ont été réservées</p>
            </div>
            
            <!-- Message si l'événement est terminé -->
            <div v-else-if="event.status !== 'upcoming'" class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <i class="fas fa-calendar-times text-gray-600 text-2xl mb-2"></i>
              <p class="text-gray-800 font-semibold">Événement terminé</p>
              <p class="text-gray-600 text-sm mt-1">Les inscriptions ne sont plus possibles</p>
            </div>

            <!-- Event Info -->
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-200 fade-in-right" data-animate>
              <h3 class="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                <i class="fas fa-info-circle mr-2 text-blue-500"></i>
                Informations
              </h3>
              <div class="space-y-3 text-sm">
                <div v-if="event.startDate" class="flex items-center text-gray-600">
                  <i class="fas fa-calendar-alt w-5 mr-3 text-blue-500"></i>
                  <span>{{ formatFullDate(event.startDate) }}</span>
                </div>
                <div v-if="event.startTime || event.endTime" class="flex items-center text-gray-600">
                  <i class="fas fa-clock w-5 mr-3 text-blue-500"></i>
                  <span>{{ formatTime(event.startTime) || '' }}<span v-if="event.startTime && event.endTime"> - </span>{{ formatTime(event.endTime) || '' }}</span>
                </div>
                <div v-if="event.location" class="flex items-center text-gray-600">
                  <i class="fas fa-map-marker-alt w-5 mr-3 text-blue-500"></i>
                  <span>{{ event.location }}</span>
                </div>
                <div v-if="event.maxAttendees" class="flex items-center text-gray-600">
                  <i class="fas fa-users w-5 mr-3 text-blue-500"></i>
                  <span>{{ event.maxAttendees }} places maximum</span>
                </div>
                <div v-if="event.address" class="flex items-center text-gray-600">
                  <i class="fas fa-map-marker-alt w-5 mr-3 text-blue-500"></i>
                  <span>{{ event.address }}</span>
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
                    :src="getSpeakerPhoto(speaker.photo)"
                    :alt="speaker.name"
                    class="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    @error="(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }"
                  />
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">{{ speaker.name }}</h3>
                    <p class="text-blue-600 text-sm mb-2">{{ speaker.position || speaker.role || 'Intervenant' }}</p>
                    <p v-if="speaker.organization" class="text-gray-500 text-xs mb-2">{{ speaker.organization }}</p>
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
                    <p class="text-gray-500 text-sm">{{ session.description || '' }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- Registration Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="showSuccessModal = false">
      <div class="bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-8 max-w-lg w-full text-center transform transition-all duration-300 scale-100">
        <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
          <i class="fas fa-check text-white text-3xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">Inscription confirmée !</h3>
        <p class="text-gray-600 mb-6 text-lg">
          Félicitations ! Votre inscription à l'événement <strong class="text-blue-600">"{{ event.title }}"</strong> a été enregistrée avec succès.
        </p>
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 text-left border border-blue-200">
          <h4 class="font-bold text-blue-900 mb-3 flex items-center">
            <i class="fas fa-user-circle mr-2"></i>
            Détails de votre inscription
          </h4>
          <div class="space-y-2 text-sm">
            <p class="text-blue-800"><strong class="text-blue-900">Nom :</strong> {{ savedRegistrationData.firstName }} {{ savedRegistrationData.lastName }}</p>
            <p class="text-blue-800"><strong class="text-blue-900">Email :</strong> {{ savedRegistrationData.email }}</p>
            <p class="text-blue-800"><strong class="text-blue-900">Événement :</strong> {{ event.title }}</p>
            <p class="text-blue-800"><strong class="text-blue-900">Date :</strong> {{ formatFullDate(event.startDate) }} à {{ event.startTime }}</p>
            <p v-if="event.location" class="text-blue-800"><strong class="text-blue-900">Lieu :</strong> {{ event.location }}</p>
          </div>
        </div>
        <div class="mb-4">
          <button
            @click="downloadBadge"
            class="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <i class="fas fa-download"></i>
            <span>Télécharger le badge</span>
          </button>
        </div>
        <button
          @click="showSuccessModal = false"
          class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors"
        >
          Fermer
        </button>
        <p class="text-xs text-gray-500 mt-4">
          <i class="fas fa-info-circle mr-1"></i>
          Un email de confirmation vous a été envoyé
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
        <p class="text-gray-600">Chargement de l'événement...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl shadow-lg border border-red-200 p-8 text-center">
        <i class="fas fa-exclamation-triangle text-4xl text-red-600 mb-4"></i>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Erreur</h3>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button
          @click="loadEvent"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Réessayer
        </button>
        <router-link
          to="/evenements"
          class="ml-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors inline-block"
        >
          Retour aux événements
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Event } from '@/models'
import eventService from '@/services/event.service'
import { jsPDF } from 'jspdf'

const route = useRoute()
const router = useRouter()
const eventId = route.params.id as string

//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'

// Reactive data
const event = ref<Event | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showRegistrationForm = ref(true) // Le formulaire est visible par défaut
const isSubmitting = ref(false)
const showSuccessModal = ref(false)
const isRegistered = ref(false)
let observer: IntersectionObserver | null = null

// Registration form
const registrationForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  position: ''
})

// Sauvegarder les données d'inscription pour le badge
const savedRegistrationData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  position: ''
})

// Charger l'événement depuis le backend
const loadEvent = async () => {
  loading.value = true
  error.value = null
  try {
    const loadedEvent = await eventService.getEventById(eventId)
    
    // Déterminer le statut basé sur la date si nécessaire
    const now = new Date()
    const eventDate = new Date(loadedEvent.startDate)
    const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())
    const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    if (!loadedEvent.status || loadedEvent.status === 'upcoming') {
      if (eventDateOnly < nowDateOnly) {
        loadedEvent.status = 'completed'
      } else if (eventDateOnly.getTime() === nowDateOnly.getTime()) {
        loadedEvent.status = 'ongoing'
      } else {
        loadedEvent.status = 'upcoming'
      }
    }
    
    event.value = loadedEvent
  } catch (err: any) {
    console.error('Erreur lors du chargement de l\'événement:', err)
    error.value = err.message || 'Erreur lors du chargement de l\'événement'
  } finally {
    loading.value = false
  }
}

// Obtenir l'URL de l'image de l'événement
const getEventImage = (image?: string | null): string => {
  if (!image) {
    return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
  }
  return eventService.getImageUrl(image) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
}

// Obtenir l'URL de la photo du speaker
const getSpeakerPhoto = (photo?: string | null): string => {
  if (!photo) {
    return 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  }
  return eventService.getImageUrl(photo) || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
}

// Methods
const formatEventDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return dateString
  }
}

const formatFullDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Formater l'heure pour n'afficher que HH:MM
const formatTime = (timeString: string | undefined) => {
  if (!timeString) return ''
  // Si l'heure contient des secondes (HH:MM:SS), ne garder que HH:MM
  if (timeString.includes(':') && timeString.split(':').length === 3) {
    return timeString.substring(0, 5)
  }
  return timeString
}

const submitRegistration = async () => {
  if (!event.value) return
  
  isSubmitting.value = true
  
  try {
    // Vérifier que les champs requis sont remplis
    if (!registrationForm.value.firstName || !registrationForm.value.lastName || !registrationForm.value.email) {
      alert('Veuillez remplir tous les champs obligatoires (Prénom, Nom, Email)')
      return
    }
    
    // Utiliser le service pour s'inscrire à l'événement
    await eventService.registerToEvent(event.value.id!, {
      firstName: registrationForm.value.firstName.trim(),
      lastName: registrationForm.value.lastName.trim(),
      email: registrationForm.value.email.trim(),
      phone: registrationForm.value.phone?.trim() || undefined,
      organization: registrationForm.value.company?.trim() || undefined,
      position: registrationForm.value.position?.trim() || undefined
    })
    
    // Mettre à jour le nombre de participants localement
    if (event.value.currentAttendees !== undefined) {
      event.value.currentAttendees = (event.value.currentAttendees || 0) + 1
    }
    
    // Sauvegarder les données d'inscription avant de réinitialiser le formulaire
    savedRegistrationData.value = {
      firstName: registrationForm.value.firstName.trim(),
      lastName: registrationForm.value.lastName.trim(),
      email: registrationForm.value.email.trim(),
      phone: registrationForm.value.phone?.trim() || '',
      company: registrationForm.value.company?.trim() || '',
      position: registrationForm.value.position?.trim() || ''
    }
    
    // Sauvegarder l'inscription dans le localStorage
    const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents') || '[]')
    if (!registeredEvents.includes(eventId)) {
      registeredEvents.push(eventId)
      localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents))
    }
    
    // Sauvegarder les données d'inscription dans le localStorage pour cet événement
    const registrationDataKey = `registration_${eventId}`
    localStorage.setItem(registrationDataKey, JSON.stringify(savedRegistrationData.value))
    
    isRegistered.value = true
    showSuccessModal.value = true
    
    // Réinitialiser le formulaire après avoir sauvegardé les données
    registrationForm.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      position: ''
    }
    
  } catch (error: any) {
    console.error('Registration failed:', error)
    alert(error.message || 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}

const shareEvent = () => {
  if (!event.value) return
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
  if (!event.value) return
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`Rejoignez-moi à l'événement: ${event.value.title}`)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank')
}

const shareOnTwitter = () => {
  if (!event.value) return
  const text = encodeURIComponent(`Je participe à "${event.value.title}" - Rejoignez-moi !`)
  const url = encodeURIComponent(window.location.href)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
}

const checkRegistrationStatus = () => {
  const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents') || '[]')
  isRegistered.value = registeredEvents.includes(eventId)
  
  // Charger les données d'inscription sauvegardées si l'utilisateur est inscrit
  if (isRegistered.value) {
    const registrationDataKey = `registration_${eventId}`
    const savedData = localStorage.getItem(registrationDataKey)
    if (savedData) {
      try {
        savedRegistrationData.value = JSON.parse(savedData)
      } catch (e) {
        console.error('Error loading registration data:', e)
      }
    }
  }
}

// Fonction pour scroller vers le formulaire d'inscription
const scrollToRegistration = () => {
  setTimeout(() => {
    const registrationCard = document.querySelector('[data-registration-card]')
    if (registrationCard) {
      registrationCard.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100)
}

// Générer et télécharger le badge en PDF (style Google)
const downloadBadge = () => {
  if (!event.value) return
  
  // Créer un nouveau document PDF (format badge: 85.6mm x 53.98mm - format carte bancaire)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [85.6, 53.98]
  })
  
  // Couleurs style Google
  const googleBlue = '#4285F4'
  const googleGray = '#5F6368'
  const lightGray = '#F8F9FA'
  const borderGray = '#E8EAED'
  
  // Fond blanc
  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, 85.6, 53.98, 'F')
  
  // Barre colorée en haut (style Google)
  doc.setFillColor(66, 133, 244) // Google Blue
  doc.rect(0, 0, 85.6, 8, 'F')
  
  // Ligne de séparation subtile
  doc.setDrawColor(232, 234, 237) // borderGray
  doc.setLineWidth(0.5)
  doc.line(0, 8, 85.6, 8)
  
  // Texte "BADGE" en haut à gauche (blanc, petit)
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('BADGE D\'ACCÈS', 5, 5.5)
  
  // Logo et nom du centre en haut à droite (dans la barre bleue)
  // Le logo et le texte seront ajoutés après le chargement de l'image
  
  // Nom complet (grand, centré, style Google)
  const fullName = `${savedRegistrationData.value.firstName} ${savedRegistrationData.value.lastName}`
  doc.setTextColor(32, 33, 36) // Google Dark Gray
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  const nameWidth = doc.getTextWidth(fullName)
  doc.text(fullName, (85.6 - nameWidth) / 2, 20)
  
  // Organisation (si disponible)
  let yPos = 26
  if (registrationForm.value.company) {
    doc.setTextColor(95, 99, 104) // googleGray
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    const companyWidth = doc.getTextWidth(registrationForm.value.company)
    doc.text(registrationForm.value.company, (85.6 - companyWidth) / 2, yPos)
    yPos += 5
  }
  
  // Poste (si disponible)
  if (registrationForm.value.position) {
    doc.setTextColor(95, 99, 104) // googleGray
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    const positionWidth = doc.getTextWidth(registrationForm.value.position)
    doc.text(registrationForm.value.position, (85.6 - positionWidth) / 2, yPos)
    yPos += 7
  } else {
    yPos += 7
  }
  
  // Ligne de séparation
  doc.setDrawColor(232, 234, 237)
  doc.setLineWidth(0.3)
  doc.line(10, yPos, 75.6, yPos)
  yPos += 5
  
  // Titre de l'événement
  doc.setTextColor(32, 33, 36)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  const eventTitle = doc.splitTextToSize(event.value.title, 75)
  const titleY = yPos
  doc.text(eventTitle, 5, titleY)
  yPos += eventTitle.length * 4 + 2
  
  // Date et heure
  doc.setTextColor(95, 99, 104)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  const dateTime = `${formatFullDate(event.value.startDate)}${event.value.startTime ? ' - ' + event.value.startTime : ''}`
  doc.text(dateTime, 5, yPos)
  yPos += 3.5
  
  // Lieu (si disponible)
  if (event.value.location) {
    doc.setTextColor(95, 99, 104)
    doc.setFontSize(7)
    doc.text(event.value.location, 5, yPos)
  }
  
  // Fonction pour charger et ajouter le logo
  const addLogoAndSave = async () => {
    try {
      // Charger le logo depuis le dossier public
      const logoUrl = '/logoCreff-PME.png'
      const response = await fetch(logoUrl)
      const blob = await response.blob()
      const reader = new FileReader()
      
      reader.onloadend = () => {
        const base64data = reader.result as string
        // Ajouter le logo en haut à droite (dans la barre bleue)
        const logoWidth = 8
        const logoHeight = 5
        const logoX = 85.6 - logoWidth - 5 // Position X: largeur badge - largeur logo - marge
        const logoY = 1.5 // Position Y: en haut de la barre bleue
        doc.addImage(base64data, 'PNG', logoX, logoY, logoWidth, logoHeight)
        
        // Nom du centre à droite du logo (en blanc, dans la barre bleue)
        doc.setTextColor(255, 255, 255) // Blanc pour la barre bleue
        doc.setFontSize(6)
        doc.setFont('helvetica', 'bold')
        const centerNameX = logoX - 20 // À gauche du logo
        doc.text('CReFF-PME', centerNameX, 4.5)
        
        // Icône de confirmation (cercle avec check) en bas à droite
        doc.setFillColor(52, 168, 83) // Google Green
        doc.circle(78, 48, 3, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(4)
        doc.text('✓', 78, 49)
        
        // Télécharger le PDF
        const fileName = `badge-${event.value.title.replace(/\s+/g, '-')}-${savedRegistrationData.value.lastName || 'badge'}.pdf`
        doc.save(fileName)
      }
      
      reader.onerror = () => {
        throw new Error('Failed to read logo')
      }
      
      reader.readAsDataURL(blob)
    } catch (error) {
      console.error('Error loading logo:', error)
      // Fallback: juste le texte si l'image ne charge pas
      doc.setTextColor(255, 255, 255) // Blanc pour la barre bleue
      doc.setFontSize(6)
      doc.setFont('helvetica', 'bold')
      doc.text('CReFF-PME', 85.6 - 20, 4.5) // Positionné à droite
      
      // Icône de confirmation (cercle avec check) en bas à droite
      doc.setFillColor(52, 168, 83) // Google Green
      doc.circle(78, 48, 3, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(4)
      doc.text('✓', 78, 49)
      
      // Télécharger le PDF même sans logo
      const fileName = `badge-${event.value.title.replace(/\s+/g, '-')}-${savedRegistrationData.value.lastName || 'badge'}.pdf`
      doc.save(fileName)
    }
  }
  
  // Appeler la fonction pour ajouter le logo et sauvegarder
  addLogoAndSave()
}

// Imprimer le badge (génère un PDF et l'ouvre pour impression)
const printBadge = () => {
  if (!event.value) return
  
  // Créer un nouveau document PDF (format badge: 85.6mm x 53.98mm - format carte bancaire)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [85.6, 53.98]
  })
  
  // Couleurs style Google
  const googleBlue = '#4285F4'
  const googleGray = '#5F6368'
  const lightGray = '#F8F9FA'
  const borderGray = '#E8EAED'
  
  // Fond blanc
  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, 85.6, 53.98, 'F')
  
  // Barre colorée en haut (style Google)
  doc.setFillColor(66, 133, 244) // Google Blue
  doc.rect(0, 0, 85.6, 8, 'F')
  
  // Ligne de séparation subtile
  doc.setDrawColor(232, 234, 237) // borderGray
  doc.setLineWidth(0.5)
  doc.line(0, 8, 85.6, 8)
  
  // Texte "BADGE" en haut à gauche (blanc, petit)
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('BADGE D\'ACCÈS', 5, 5.5)
  
  // Logo et nom du centre en haut à droite (dans la barre bleue)
  // Le logo et le texte seront ajoutés après le chargement de l'image
  
  // Nom complet (grand, centré, style Google)
  const fullName = `${savedRegistrationData.value.firstName} ${savedRegistrationData.value.lastName}`
  doc.setTextColor(32, 33, 36) // Google Dark Gray
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  const nameWidth = doc.getTextWidth(fullName)
  doc.text(fullName, (85.6 - nameWidth) / 2, 20)
  
  // Organisation (si disponible)
  let yPos = 26
  if (savedRegistrationData.value.company) {
    doc.setTextColor(95, 99, 104) // googleGray
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    const companyWidth = doc.getTextWidth(savedRegistrationData.value.company)
    doc.text(savedRegistrationData.value.company, (85.6 - companyWidth) / 2, yPos)
    yPos += 5
  }
  
  // Poste (si disponible)
  if (savedRegistrationData.value.position) {
    doc.setTextColor(95, 99, 104) // googleGray
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    const positionWidth = doc.getTextWidth(savedRegistrationData.value.position)
    doc.text(savedRegistrationData.value.position, (85.6 - positionWidth) / 2, yPos)
    yPos += 7
  } else {
    yPos += 7
  }
  
  // Ligne de séparation
  doc.setDrawColor(232, 234, 237)
  doc.setLineWidth(0.3)
  doc.line(10, yPos, 75.6, yPos)
  yPos += 5
  
  // Titre de l'événement
  doc.setTextColor(32, 33, 36)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  const eventTitle = doc.splitTextToSize(event.value.title, 75)
  const titleY = yPos
  doc.text(eventTitle, 5, titleY)
  yPos += eventTitle.length * 4 + 2
  
  // Date et heure
  doc.setTextColor(95, 99, 104)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  const dateTime = `${formatFullDate(event.value.startDate)}${event.value.startTime ? ' - ' + event.value.startTime : ''}`
  doc.text(dateTime, 5, yPos)
  yPos += 3.5
  
  // Lieu (si disponible)
  if (event.value.location) {
    doc.setTextColor(95, 99, 104)
    doc.setFontSize(7)
    doc.text(event.value.location, 5, yPos)
  }
  
  // Fonction pour charger et ajouter le logo
  const addLogoAndPrint = async () => {
    try {
      // Charger le logo depuis le dossier public
      const logoUrl = '/logoCreff-PME.png'
      const response = await fetch(logoUrl)
      const blob = await response.blob()
      const reader = new FileReader()
      
      reader.onloadend = () => {
        const base64data = reader.result as string
        // Ajouter le logo en haut à droite (dans la barre bleue)
        const logoWidth = 8
        const logoHeight = 5
        const logoX = 85.6 - logoWidth - 5 // Position X: largeur badge - largeur logo - marge
        const logoY = 1.5 // Position Y: en haut de la barre bleue
        doc.addImage(base64data, 'PNG', logoX, logoY, logoWidth, logoHeight)
        
        // Nom du centre à droite du logo (en blanc, dans la barre bleue)
        doc.setTextColor(255, 255, 255) // Blanc pour la barre bleue
        doc.setFontSize(6)
        doc.setFont('helvetica', 'bold')
        const centerNameX = logoX - 20 // À gauche du logo
        doc.text('CReFF-PME', centerNameX, 4.5)
        
        // Icône de confirmation (cercle avec check) en bas à droite
        doc.setFillColor(52, 168, 83) // Google Green
        doc.circle(78, 48, 3, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(4)
        doc.text('✓', 78, 49)
        
        // Ouvrir le PDF dans une nouvelle fenêtre pour impression
        const pdfBlob = doc.output('blob')
        const pdfUrl = URL.createObjectURL(pdfBlob)
        const printWindow = window.open(pdfUrl, '_blank')
        
        if (printWindow) {
          printWindow.onload = () => {
            setTimeout(() => {
              printWindow.print()
              URL.revokeObjectURL(pdfUrl)
            }, 500)
          }
        } else {
          // Fallback: télécharger le PDF si les popups sont bloquées
          doc.save(`badge-${event.value.title.replace(/\s+/g, '-')}-${savedRegistrationData.value.lastName || 'badge'}.pdf`)
        }
      }
      
      reader.onerror = () => {
        throw new Error('Failed to read logo')
      }
      
      reader.readAsDataURL(blob)
    } catch (error) {
      console.error('Error loading logo:', error)
      // Fallback: juste le texte si l'image ne charge pas
      doc.setTextColor(255, 255, 255) // Blanc pour la barre bleue
      doc.setFontSize(6)
      doc.setFont('helvetica', 'bold')
      doc.text('CReFF-PME', 85.6 - 20, 4.5) // Positionné à droite
      
      // Icône de confirmation (cercle avec check) en bas à droite
      doc.setFillColor(52, 168, 83) // Google Green
      doc.circle(78, 48, 3, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(4)
      doc.text('✓', 78, 49)
      
      // Ouvrir le PDF dans une nouvelle fenêtre pour impression
      const pdfBlob = doc.output('blob')
      const pdfUrl = URL.createObjectURL(pdfBlob)
      const printWindow = window.open(pdfUrl, '_blank')
      
      if (printWindow) {
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print()
            URL.revokeObjectURL(pdfUrl)
          }, 500)
        }
      } else {
        // Fallback: télécharger le PDF si les popups sont bloquées
        doc.save(`badge-${event.value.title.replace(/\s+/g, '-')}-${savedRegistrationData.value.lastName || 'badge'}.pdf`)
      }
    }
  }
  
  // Appeler la fonction pour ajouter le logo et imprimer
  addLogoAndPrint()
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
  // Charger l'événement depuis le backend
  loadEvent()
  
  // Vérifier le statut d'inscription
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

/* Limiter le nombre de lignes pour le titre */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
