<template>
  <div class="min-h-screen bg-white">
    <!-- Navbar -->
    <NavBarComponent />

    <!-- Hero Section avec image de fond -->
    <section class="relative pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-24 min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden">
      <!-- Image de fond -->
      <div class="absolute inset-0 z-0">
        <img 
          :src="carousel1" 
          alt="CReFF-Entrepreneurs Background"
          class="w-full h-full object-cover"
        />
        <!-- Overlay sombre pour la lisibilité -->
        <div class="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/80"></div>
        <!-- Overlay bleu subtil -->
        <div class="absolute inset-0 bg-blue-900/30"></div>
      </div>
      
      <!-- Contenu -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="text-center fade-in-up" data-animate>
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
            {{ $t('entrepreneurs.hero.title') }}<br class="hidden sm:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-blue-400">{{ $t('entrepreneurs.hero.subtitle') }}</span>
          </h1>
          <p class="text-sm sm:text-base md:text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed font-light px-2 sm:px-0">
            {{ $t('entrepreneurs.hero.description') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Section Mission -->
    <section class="py-10 sm:py-14 lg:py-20 bg-white relative">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Contenu -->
          <div class="fade-in-up" data-animate>
            <div class="mb-6">
              <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">{{ $t('entrepreneurs.mission.header') }}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              {{ $t('entrepreneurs.mission.title') }} <span class="text-blue-600">{{ $t('entrepreneurs.mission.titleHighlight') }}</span>
            </h2>
            <div class="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p class="font-light">
                {{ $t('entrepreneurs.mission.paragraph1') }}
              </p>
              <p class="font-light">
                {{ $t('entrepreneurs.mission.paragraph2') }}
              </p>
            </div>
          </div>

          <!-- Image décorative -->
          <div class="fade-in-right" data-animate>
            <div class="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                :src="profImage" 
                alt="Formation entrepreneurs"
                class="w-full h-full object-cover aspect-[4/3]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Activités de Formation -->
    <section class="py-10 sm:py-14 lg:py-20 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-20 left-20 w-32 h-32 bg-blue-200/10 rounded-full blur-2xl"></div>
        <div class="absolute bottom-20 right-20 w-40 h-40 bg-indigo-200/10 rounded-full blur-2xl"></div>
      </div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-12 sm:mb-16 lg:mb-20 fade-in-up" data-animate>
          <div class="mb-6">
            <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">{{ $t('entrepreneurs.activities.header') }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {{ $t('entrepreneurs.activities.title') }}<span class="text-blue-600">{{ $t('entrepreneurs.activities.titleHighlight') }}</span>
          </h2>
          <p class="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto font-light">
            {{ $t('entrepreneurs.activities.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          <!-- Formation 1 -->
          <div class="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 fade-in-up stagger-item" data-animate>
            <div class="mb-6">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{{ $t('entrepreneurs.activities.training1.title') }}</h3>
              <p class="text-gray-600 text-sm">{{ $t('entrepreneurs.activities.training1.subtitle') }}</p>
            </div>
            <ul class="space-y-3">
              <li class="flex items-start">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-gray-700 text-sm leading-relaxed">{{ $t('entrepreneurs.activities.training1.item1') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-gray-700 text-sm leading-relaxed">{{ $t('entrepreneurs.activities.training1.item2') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-gray-700 text-sm leading-relaxed">{{ $t('entrepreneurs.activities.training1.item3') }}</span>
              </li>
            </ul>
          </div>

          <!-- Formation 2 -->
          <div class="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 fade-in-up stagger-item" :style="{ animationDelay: '150ms' }" data-animate>
            <div class="mb-6">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{{ $t('entrepreneurs.activities.training2.title') }}</h3>
              <p class="text-gray-600 text-sm">{{ $t('entrepreneurs.activities.training2.subtitle') }}</p>
            </div>
            <ul class="space-y-3">
              <li class="flex items-start">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-gray-700 text-sm leading-relaxed">{{ $t('entrepreneurs.activities.training2.item1') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-gray-700 text-sm leading-relaxed">{{ $t('entrepreneurs.activities.training2.item2') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-gray-700 text-sm leading-relaxed">{{ $t('entrepreneurs.activities.training2.item3') }}</span>
              </li>
            </ul>
          </div>

          <!-- Formation 3 -->
          <div class="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 fade-in-up stagger-item" :style="{ animationDelay: '300ms' }" data-animate>
            <div class="mb-6">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{{ $t('entrepreneurs.activities.training3.title') }}</h3>
              <p class="text-gray-600 text-sm">{{ $t('entrepreneurs.activities.training3.subtitle') }}</p>
            </div>
            <ul class="space-y-3">
              <li class="flex items-start">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-gray-700 text-sm leading-relaxed">{{ $t('entrepreneurs.activities.training3.item1') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-gray-700 text-sm leading-relaxed">{{ $t('entrepreneurs.activities.training3.item2') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-gray-700 text-sm leading-relaxed">{{ $t('entrepreneurs.activities.training3.item3') }}</span>
              </li>
            </ul>
          </div>

          <!-- Formation 4 -->
          <div class="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 fade-in-up stagger-item" :style="{ animationDelay: '450ms' }" data-animate>
            <div class="mb-6">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{{ $t('entrepreneurs.activities.training4.title') }}</h3>
              <p class="text-gray-600 text-sm">{{ $t('entrepreneurs.activities.training4.subtitle') }}</p>
            </div>
            <ul class="space-y-3">
              <li class="flex items-start">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-gray-700 text-sm leading-relaxed">{{ $t('entrepreneurs.activities.training4.item1') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-gray-700 text-sm leading-relaxed">{{ $t('entrepreneurs.activities.training4.item2') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-gray-700 text-sm leading-relaxed">{{ $t('entrepreneurs.activities.training4.item3') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Statistiques -->
    <section class="py-10 sm:py-14 lg:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      <div class="absolute inset-0">
        <img 
          :src="carousel2" 
          alt="Background"
          class="w-full h-full object-cover opacity-20"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-900/80"></div>
      </div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-10 sm:mb-12 fade-in-up" data-animate>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            {{ $t('entrepreneurs.stats.title') }}
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div class="text-center fade-in-up stagger-item" data-animate>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{{ $t('entrepreneurs.stats.stat1.value') }}</div>
              <div class="text-blue-100 text-xs sm:text-sm font-medium">{{ $t('entrepreneurs.stats.stat1.label') }}</div>
            </div>
          </div>
          <div class="text-center fade-in-up stagger-item" :style="{ animationDelay: '150ms' }" data-animate>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{{ $t('entrepreneurs.stats.stat2.value') }}</div>
              <div class="text-blue-100 text-xs sm:text-sm font-medium">{{ $t('entrepreneurs.stats.stat2.label') }}</div>
            </div>
          </div>
          <div class="text-center fade-in-up stagger-item" :style="{ animationDelay: '300ms' }" data-animate>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{{ $t('entrepreneurs.stats.stat3.value') }}</div>
              <div class="text-blue-100 text-xs sm:text-sm font-medium">{{ $t('entrepreneurs.stats.stat3.label') }}</div>
            </div>
          </div>
          <div class="text-center fade-in-up stagger-item" :style="{ animationDelay: '450ms' }" data-animate>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{{ $t('entrepreneurs.stats.stat4.value') }}</div>
              <div class="text-blue-100 text-xs sm:text-sm font-medium">{{ $t('entrepreneurs.stats.stat4.label') }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Témoignages -->
    <section class="py-10 sm:py-14 lg:py-20 bg-white relative">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 sm:mb-12 fade-in-up" data-animate>
          <div class="mb-4">
            <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">{{ $t('entrepreneurs.testimonials.header') }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            {{ $t('entrepreneurs.testimonials.title') }}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="group relative bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-500 fade-in-up stagger-item overflow-hidden"
            :style="{ animationDelay: `${index * 150}ms` }"
            data-animate
          >
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <div class="relative">
              <div class="mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                  {{ testimonial.initials }}
                </div>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed mb-6 relative">
                <span class="absolute -top-2 -left-2 text-blue-200 text-4xl font-serif leading-none">"</span>
                <span class="relative z-10">{{ testimonial.text }}</span>
              </p>
              <div class="pt-4 border-t border-gray-100">
                <div class="font-semibold text-gray-900 text-sm mb-1">{{ testimonial.name }}</div>
                <div class="text-xs text-gray-500">{{ testimonial.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Programmes à venir -->
    <section class="py-10 sm:py-14 lg:py-20 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-20 right-20 w-32 h-32 bg-blue-200/10 rounded-full blur-2xl"></div>
        <div class="absolute bottom-20 left-20 w-40 h-40 bg-indigo-200/10 rounded-full blur-2xl"></div>
      </div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-12 sm:mb-16 fade-in-up" data-animate>
          <div class="mb-6">
            <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">{{ $t('entrepreneurs.upcoming.header') }}</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {{ $t('entrepreneurs.upcoming.title') }}
          </h2>
        </div>

        <!-- Loading State with Shimmer -->
        <div v-if="loadingEvents" class="space-y-6">
          <ShimmerCard v-for="n in 3" :key="n" />
        </div>

        <!-- Events Grid -->
        <div v-else-if="upcomingEvents.length > 0" class="space-y-6">
          <div 
            v-for="(event, index) in upcomingEvents" 
            :key="event.id"
            class="group bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden cursor-pointer"
            @click="openEvent(event.id)"
          >
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Event Image -->
              <div class="md:w-48 lg:w-56 flex-shrink-0">
                <div class="relative h-40 md:h-full rounded-lg overflow-hidden">
                  <img
                    :src="getEventImage(event.image)"
                    :alt="event.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    @error="handleImageError"
                  />
                  <div class="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-lg">
                    {{ event.type }}
                  </div>
                </div>
              </div>

              <!-- Event Content -->
              <div class="flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {{ event.title }}
                  </h3>
                  <p class="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                    {{ event.description }}
                  </p>
                  <div class="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div class="flex items-center">
                      <i class="fas fa-calendar-alt mr-2 text-blue-600"></i>
                      {{ formatEventDate(event.startDate) }}
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-clock mr-2 text-blue-600"></i>
                      {{ formatEventTime(event.startTime, event.endTime) }}
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                      {{ event.location }}
                    </div>
                    <div v-if="event.maxAttendees" class="flex items-center">
                      <i class="fas fa-users mr-2 text-blue-600"></i>
                      {{ event.currentAttendees || 0 }}/{{ event.maxAttendees }} places
                    </div>
                  </div>
                  <div v-if="event.price !== undefined && event.price !== null && event.price !== ''" class="mb-4">
                    <span class="text-blue-600 font-semibold text-lg">
                      {{ event.price === 0 || event.price === '0' ? 'Gratuit' : `${event.price} ${event.currency || 'USD'}` }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button 
                    @click.stop="registerEvent(event.id)"
                    class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {{ $t('entrepreneurs.upcoming.register') }}
                  </button>
                  <button 
                    @click.stop="openEvent(event.id)"
                    class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2 transition-colors"
                  >
                    Voir détails
                    <i class="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <i class="fas fa-calendar-times text-4xl text-gray-300 mb-4"></i>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Aucun programme à venir</h3>
          <p class="text-gray-600 text-sm">De nouveaux programmes seront bientôt disponibles.</p>
        </div>
      </div>
    </section>

    <!-- Section FAQ -->
    <section class="py-10 sm:py-14 lg:py-20 bg-white relative">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16 fade-in-up" data-animate>
          <div class="mb-6">
            <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">{{ $t('entrepreneurs.faq.header') }}</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {{ $t('entrepreneurs.faq.title') }}
          </h2>
        </div>

        <div class="space-y-4">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 fade-in-up stagger-item"
            :style="{ animationDelay: `${index * 100}ms` }"
            data-animate
          >
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-blue-50 transition-colors duration-300"
            >
              <span class="font-semibold text-gray-900 text-sm sm:text-base">{{ faq.question }}</span>
              <i 
                class="fas fa-chevron-down text-blue-600 transition-transform duration-300"
                :class="{ 'rotate-180': openFaqs.includes(index) }"
              ></i>
            </button>
            <div 
              v-show="openFaqs.includes(index)"
              class="px-6 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Formulaire d'inscription -->
    <section class="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 relative overflow-hidden">
      <!-- Image d'arrière-plan subtile -->
      <div class="absolute inset-0">
        <img 
          :src="carousel4" 
          alt="Background"
          class="w-full h-full object-cover opacity-10"
        />
        <!-- Overlay pour assombrir légèrement -->
        <div class="absolute inset-0 bg-gradient-to-br from-gray-900/5 via-transparent to-gray-900/10"></div>
        <!-- Motif décoratif -->
        <div class="absolute top-0 left-0 w-full h-full">
          <div class="absolute top-20 right-20 w-64 h-64 bg-blue-200/15 rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 left-20 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- En-tête -->
        <div class="text-center mb-10 sm:mb-12 fade-in-up" data-animate>
          <div class="inline-flex items-center gap-2 mb-4">
            <div class="w-8 h-0.5 bg-blue-600"></div>
            <span class="text-blue-600 text-xs font-semibold tracking-wider uppercase">INSCRIPTION</span>
            <div class="w-8 h-0.5 bg-blue-600"></div>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 leading-tight">
            {{ $t('entrepreneurs.registration.title') }}
          </h2>
          <p class="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {{ $t('entrepreneurs.registration.description') }}
          </p>
        </div>

        <!-- Formulaire premium -->
        <div class="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden fade-in-up" data-animate>
          <!-- Barre supérieure décorative -->
          <div class="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
          
          <div class="p-8 sm:p-10 lg:p-12">
            <form @submit.prevent="submitRegistration" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="group">
                  <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                    {{ $t('entrepreneurs.registration.name') }}
                    <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    v-model="registrationForm.name"
                    type="text"
                    required
                    class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white group-hover:border-gray-300"
                    :placeholder="$t('entrepreneurs.registration.namePlaceholder')"
                  />
                </div>
                <div class="group">
                  <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                    {{ $t('entrepreneurs.registration.email') }}
                    <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    v-model="registrationForm.email"
                    type="email"
                    required
                    class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white group-hover:border-gray-300"
                    :placeholder="$t('entrepreneurs.registration.emailPlaceholder')"
                  />
                </div>
              </div>
              
              <div class="group">
                <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                  {{ $t('entrepreneurs.registration.program') }}
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="relative">
                  <select
                    v-model="registrationForm.program"
                    required
                    class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white group-hover:border-gray-300 appearance-none cursor-pointer pr-10"
                  >
                    <option value="">{{ $t('entrepreneurs.registration.selectProgram') }}</option>
                    <option value="training1">{{ $t('entrepreneurs.activities.training1.title') }}</option>
                    <option value="training2">{{ $t('entrepreneurs.activities.training2.title') }}</option>
                    <option value="training3">{{ $t('entrepreneurs.activities.training3.title') }}</option>
                    <option value="training4">{{ $t('entrepreneurs.activities.training4.title') }}</option>
                  </select>
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
                  </div>
                </div>
              </div>
              
              <div class="group">
                <label class="block text-gray-700 text-sm font-semibold mb-2.5">
                  {{ $t('entrepreneurs.registration.message') }}
                </label>
                <textarea
                  v-model="registrationForm.message"
                  rows="5"
                  class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-sm bg-gray-50 focus:bg-white resize-none group-hover:border-gray-300"
                  :placeholder="$t('entrepreneurs.registration.messagePlaceholder')"
                ></textarea>
              </div>
              
              <!-- Message d'erreur -->
              <div v-if="registrationError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div class="flex items-center gap-2">
                  <i class="fas fa-exclamation-circle"></i>
                  <span>{{ registrationError }}</span>
                </div>
              </div>
              
              <div class="pt-2">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i v-if="isSubmitting" class="fas fa-spinner fa-spin text-sm"></i>
                  <span v-else>{{ $t('entrepreneurs.registration.submit') }}</span>
                  <i v-if="!isSubmitting" class="fas fa-paper-plane text-sm group-hover:translate-x-1 transition-transform duration-300"></i>
                </button>
                <p class="text-xs text-gray-500 text-center mt-4">
                  En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'

const { t } = useI18n()
//@ts-ignore
import ShimmerCard from '../components/ShimmerCard.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'
import eventService from '@/services/event.service'
import trainingRegistrationService from '@/services/training-registration.service'

// Import des images
import carousel1 from '../assets/carousel-1.jpg'
import carousel2 from '../assets/carousel-2.jpg'
import carousel4 from '../assets/carousel-4.jpg'
import profImage from '../assets/prof.jpeg'

const router = useRouter()

// Témoignages
const testimonials = computed(() => [
  {
    text: t('entrepreneurs.testimonials.testimonial1.text'),
    name: t('entrepreneurs.testimonials.testimonial1.name'),
    role: t('entrepreneurs.testimonials.testimonial1.role'),
    initials: 'MK'
  },
  {
    text: t('entrepreneurs.testimonials.testimonial2.text'),
    name: t('entrepreneurs.testimonials.testimonial2.name'),
    role: t('entrepreneurs.testimonials.testimonial2.role'),
    initials: 'JD'
  },
  {
    text: t('entrepreneurs.testimonials.testimonial3.text'),
    name: t('entrepreneurs.testimonials.testimonial3.name'),
    role: t('entrepreneurs.testimonials.testimonial3.role'),
    initials: 'PL'
  }
])

// Événements à venir (dynamiques depuis le backend)
const upcomingEvents = ref([])
const loadingEvents = ref(false)

// Charger les événements depuis le backend
const loadUpcomingEvents = async () => {
  loadingEvents.value = true
  try {
    const result = await eventService.getEvents({
      limit: 10, // Limiter à 10 événements
    })
    
    // Filtrer pour ne garder que les événements à venir (basé sur la date)
    const now = new Date()
    const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    upcomingEvents.value = result.data
      .filter(event => {
        if (!event.startDate) return false
        try {
          const eventDate = new Date(event.startDate)
          if (isNaN(eventDate.getTime())) return false
          const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())
          return eventDateOnly >= nowDateOnly
        } catch {
          return false
        }
      })
      .sort((a, b) => {
        // Trier par date croissante (les plus proches en premier)
        const dateA = new Date(a.startDate || '').getTime()
        const dateB = new Date(b.startDate || '').getTime()
        return dateA - dateB
      })
      .slice(0, 6) // Limiter à 6 événements pour l'affichage
  } catch (err) {
    console.error('Erreur lors du chargement des événements:', err)
    upcomingEvents.value = []
  } finally {
    loadingEvents.value = false
  }
}

// Formater la date de l'événement
const formatEventDate = (dateString) => {
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

// Formater l'heure au format H:m (sans zéro devant pour les heures)
const formatEventTime = (startTime, endTime) => {
  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    const time = timeStr.trim()
    if (time.includes(':')) {
      const parts = time.split(':')
      if (parts.length >= 2) {
        const hours = parseInt(parts[0], 10)
        const minutes = parts[1].padStart(2, '0')
        return `${hours}:${minutes}`
      }
    }
    return time
  }
  
  if (!startTime) return ''
  const formattedStart = formatTime(startTime)
  if (endTime) {
    const formattedEnd = formatTime(endTime)
    return `${formattedStart} - ${formattedEnd}`
  }
  return formattedStart
}

// Obtenir l'URL de l'image de l'événement
const getEventImage = (image) => {
  if (!image) {
    return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
  return eventService.getImageUrl(image) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
}

// Gérer l'erreur de chargement d'image
const handleImageError = (e) => {
  if (e && e.target) {
    e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
}

// Ouvrir la page de détail de l'événement
const openEvent = (eventId) => {
  if (!eventId) return
  router.push(`/events/${eventId}`)
}

// S'inscrire à un événement
const registerEvent = (eventId) => {
  if (!eventId) return
  // Navigation vers la page de détail pour l'inscription
  router.push(`/events/${eventId}`)
}

// FAQ
const faqs = computed(() => [
  {
    question: t('entrepreneurs.faq.faq1.question'),
    answer: t('entrepreneurs.faq.faq1.answer')
  },
  {
    question: t('entrepreneurs.faq.faq2.question'),
    answer: t('entrepreneurs.faq.faq2.answer')
  },
  {
    question: t('entrepreneurs.faq.faq3.question'),
    answer: t('entrepreneurs.faq.faq3.answer')
  },
  {
    question: t('entrepreneurs.faq.faq4.question'),
    answer: t('entrepreneurs.faq.faq4.answer')
  }
])

const openFaqs = ref([])

const toggleFaq = (index) => {
  const idx = openFaqs.value.indexOf(index)
  if (idx > -1) {
    openFaqs.value.splice(idx, 1)
  } else {
    openFaqs.value.push(index)
  }
}

// Formulaire d'inscription
const registrationForm = ref({
  name: '',
  email: '',
  program: '',
  message: ''
})

const isSubmitting = ref(false)
const registrationError = ref<string | null>(null)

const submitRegistration = async () => {
  if (!registrationForm.value.name || !registrationForm.value.email || !registrationForm.value.program) {
    registrationError.value = 'Veuillez remplir tous les champs obligatoires'
    return
  }
  
  isSubmitting.value = true
  registrationError.value = null
  
  try {
    // Mapper le nom du programme depuis la valeur du select
    const programNames = {
      'training1': t('entrepreneurs.activities.training1.title'),
      'training2': t('entrepreneurs.activities.training2.title'),
      'training3': t('entrepreneurs.activities.training3.title'),
      'training4': t('entrepreneurs.activities.training4.title'),
    }
    
    const registrationData = {
      ...registrationForm.value,
      programName: programNames[registrationForm.value.program] || registrationForm.value.program
    }
    
    await trainingRegistrationService.submitRegistration(registrationData)
    
    // Afficher le message de succès
    alert(t('entrepreneurs.registration.success') || 'Votre inscription a été enregistrée avec succès ! Nous vous contacterons bientôt.')
    
    // Réinitialiser le formulaire
    registrationForm.value = { name: '', email: '', program: '', message: '' }
  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err)
    registrationError.value = err?.message || 'Une erreur est survenue lors de l\'envoi de votre inscription. Veuillez réessayer.'
    alert(registrationError.value)
  } finally {
    isSubmitting.value = false
  }
}

let observer = null

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
    if (observer) {
      observer.observe(el)
    }
  })
}

onMounted(() => {
  // Charger les événements à venir
  try {
    loadUpcomingEvents()
  } catch (err) {
    console.error('Erreur lors du chargement initial des événements:', err)
  }
  
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
/* Animations d'apparition */
.fade-in-up {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.fade-in-right {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-right.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.stagger-item {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
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
  }
  
  .fade-in-up.animate-in,
  .fade-in-right.animate-in,
  .stagger-item.animate-in {
    opacity: 1;
    transform: none;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .fade-in-up,
  .fade-in-right,
  .stagger-item {
    transform: translateY(20px);
    transition-duration: 0.6s;
  }
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

