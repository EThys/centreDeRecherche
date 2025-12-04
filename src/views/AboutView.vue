<template>
  <div class="min-h-screen bg-white">
    <!-- Navbar -->
    <NavBarComponent />

    <!-- Hero Section avec image de fond -->
    <section class="relative pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-24 min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden">
      <!-- Image de fond -->
      <div class="absolute inset-0 z-0">
        <img 
          src="../assets/carousel-2.jpg" 
          alt="CReFF-PME Background"
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
          <h1 class="text-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
            {{ $t('about.aboutView.heroTitle') }}<br class="hidden sm:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-blue-400">{{ $t('about.aboutView.heroSubtitle') }}</span>
        </h1>
          <p class="text-[10px] sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light px-2 sm:px-0">
            {{ $t('about.aboutView.heroDescription') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Genèse du projet -->
    <section class="py-10 sm:py-14 lg:py-20 bg-white relative">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Contenu -->
          <div class="fade-in-up" data-animate>
            <div class="mb-6">
              <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">{{ $t('about.aboutView.genesis.header') }}</span>
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              {{ $t('about.aboutView.genesis.title') }} <span class="text-blue-600">{{ $t('about.aboutView.genesis.titleHighlight') }}</span>
            </h2>
            <div class="space-y-5 text-gray-700 leading-relaxed text-base sm:text-lg">
              <p class="font-light">
                {{ $t('about.aboutView.genesis.paragraph1') }}
              </p>
              <p class="font-light">
                {{ $t('about.aboutView.genesis.paragraph2') }}
              </p>
            </div>
      </div>

          <!-- Image décorative -->
          <div class="fade-in-right" data-animate>
            <div class="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="../assets/nsomuna.jpeg" 
                alt="Recherche et formation"
                class="w-full h-full object-cover aspect-[4/3]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Activités du Creff-PME -->
    <section class="py-10 sm:py-14 lg:py-20 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-20 left-20 w-32 h-32 bg-blue-200/10 rounded-full blur-2xl"></div>
        <div class="absolute bottom-20 right-20 w-40 h-40 bg-indigo-200/10 rounded-full blur-2xl"></div>
      </div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-12 sm:mb-16 lg:mb-20 fade-in-up" data-animate>
          <div class="mb-6">
            <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">{{ $t('about.aboutView.activities.header') }}</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {{ $t('about.aboutView.activities.title') }}<span class="text-blue-600">{{ $t('about.aboutView.activities.titleHighlight') }}</span>
          </h2>
          <p class="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto font-light">
            {{ $t('about.aboutView.activities.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          <!-- Creff Research -->
          <div class="bg-white rounded-lg p-8 sm:p-10 lg:p-12 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 fade-in-up stagger-item" data-animate>
            <div class="mb-8">
              <div class="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <i class="fas fa-microscope text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{{ $t('about.aboutView.activities.research.title') }}</h3>
              <p class="text-gray-600 text-base">{{ $t('about.aboutView.activities.research.subtitle') }}</p>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start">
                <div class="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-blue-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('about.aboutView.activities.research.item1') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-blue-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('about.aboutView.activities.research.item2') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-blue-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('about.aboutView.activities.research.item3') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-blue-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('about.aboutView.activities.research.item4') }}</span>
              </li>
            </ul>
          </div>

          <!-- Creff Entrepreneurs -->
          <div class="bg-white rounded-lg p-8 sm:p-10 lg:p-12 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 fade-in-up stagger-item" :style="{ animationDelay: '150ms' }" data-animate>
            <div class="mb-8">
              <div class="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <i class="fas fa-briefcase text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{{ $t('about.aboutView.activities.entrepreneurs.title') }}</h3>
              <p class="text-gray-600 text-base">{{ $t('about.aboutView.activities.entrepreneurs.subtitle') }}</p>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start">
                <div class="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-indigo-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('about.aboutView.activities.entrepreneurs.item1') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-indigo-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('about.aboutView.activities.entrepreneurs.item2') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <i class="fas fa-check text-indigo-600 text-xs"></i>
                </div>
                <span class="text-gray-700 text-base leading-relaxed">{{ $t('about.aboutView.activities.entrepreneurs.item3') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Équipe -->
    <section class="py-10 sm:py-14 lg:py-20 bg-white relative">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Conseil de Direction -->
        <div class="mb-12 sm:mb-16 lg:mb-20 fade-in-up" data-animate>
          <div class="text-center mb-12 sm:mb-16">
            <div class="mb-6">
              <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">{{ $t('about.aboutView.team.header') }}</span>
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {{ $t('about.aboutView.team.boardTitle') }} <span class="text-blue-600">{{ $t('about.aboutView.team.boardTitleHighlight') }}</span>
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <!-- Olivier Witmeur -->
            <div class="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 fade-in-up stagger-item h-96 sm:h-[28rem] lg:h-[32rem]" data-animate>
              <!-- Image en plein -->
              <div class="absolute inset-0">
                <img 
                  :src="researchImage2" 
                  alt="Olivier Witmeur" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <!-- Overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-gray-900/50 group-hover:from-gray-900/95 group-hover:via-gray-900/80 transition-all duration-500"></div>
              </div>
              
              <!-- Contenu superposé -->
              <div class="relative h-full flex flex-col justify-end p-6 sm:p-8 text-white">
                <div class="inline-block bg-blue-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-3 self-start">
                  {{ $t('about.aboutView.team.roles.president') }}
                </div>
                <h3 class="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {{ $t('about.aboutView.team.board.president.name') }}
                </h3>
                <p class="text-blue-200 text-sm sm:text-base font-medium mb-4">{{ $t('about.aboutView.team.board.president.title') }}</p>
                
                <div class="space-y-2 text-sm sm:text-base text-gray-200 border-t border-white/20 pt-4">
                  <p class="leading-relaxed flex items-start">
                    <i class="fas fa-check-circle mr-2 mt-1 text-blue-400 flex-shrink-0"></i>
                    <span>{{ $t('about.aboutView.team.board.president.item1') }}</span>
                  </p>
                  <p class="leading-relaxed flex items-start">
                    <i class="fas fa-check-circle mr-2 mt-1 text-blue-400 flex-shrink-0"></i>
                    <span>{{ $t('about.aboutView.team.board.president.item2') }}</span>
                  </p>
                  <p class="leading-relaxed flex items-start">
                    <i class="fas fa-check-circle mr-2 mt-1 text-blue-400 flex-shrink-0"></i>
                    <span>{{ $t('about.aboutView.team.board.president.item3') }}</span>
                  </p>
                  <p class="text-xs text-gray-300 mt-4 pt-4 border-t border-white/10">
                    <i class="fas fa-graduation-cap mr-2"></i>
                    {{ $t('about.aboutView.team.board.president.education') }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Justin Kamavuako -->
            <div class="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 fade-in-up stagger-item h-96 sm:h-[28rem] lg:h-[32rem]" :style="{ animationDelay: '150ms' }" data-animate>
              <!-- Image en plein -->
              <div class="absolute inset-0">
                <img 
                  :src="researchImage3" 
                  alt="Justin Kamavuako" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <!-- Overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-gray-900/50 group-hover:from-gray-900/95 group-hover:via-gray-900/80 transition-all duration-500"></div>
              </div>
              
              <!-- Contenu superposé -->
              <div class="relative h-full flex flex-col justify-end p-6 sm:p-8 text-white">
                <div class="inline-block bg-blue-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-3 self-start">
                  {{ $t('about.aboutView.team.roles.vicePresident') }}
                </div>
                <h3 class="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {{ $t('about.aboutView.team.board.vicePresident.name') }}
                </h3>
                <p class="text-blue-200 text-sm sm:text-base font-medium mb-4">{{ $t('about.aboutView.team.board.vicePresident.title') }}</p>
                
                <div class="space-y-2 text-sm sm:text-base text-gray-200 border-t border-white/20 pt-4">
                  <p class="leading-relaxed flex items-start">
                    <i class="fas fa-check-circle mr-2 mt-1 text-blue-400 flex-shrink-0"></i>
                    <span>{{ $t('about.aboutView.team.board.vicePresident.item1') }}</span>
                  </p>
                  <p class="leading-relaxed flex items-start">
                    <i class="fas fa-check-circle mr-2 mt-1 text-blue-400 flex-shrink-0"></i>
                    <span>{{ $t('about.aboutView.team.board.vicePresident.item2') }}</span>
                  </p>
                  <p class="leading-relaxed flex items-start">
                    <i class="fas fa-check-circle mr-2 mt-1 text-blue-400 flex-shrink-0"></i>
                    <span>{{ $t('about.aboutView.team.board.vicePresident.item3') }}</span>
                  </p>
                  <p class="text-xs text-gray-300 mt-4 pt-4 border-t border-white/10">
                    <i class="fas fa-graduation-cap mr-2"></i>
                    {{ $t('about.aboutView.team.board.vicePresident.education') }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Jean Nsonsumuna -->
            <div class="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 fade-in-up stagger-item h-96 sm:h-[28rem] lg:h-[32rem]" :style="{ animationDelay: '300ms' }" data-animate>
              <!-- Image en plein -->
              <div class="absolute inset-0">
                <img 
                  :src="researchImage1" 
                  alt="Jean Nsonsumuna" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <!-- Overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-gray-900/50 group-hover:from-gray-900/95 group-hover:via-gray-900/80 transition-all duration-500"></div>
              </div>
              
              <!-- Contenu superposé -->
              <div class="relative h-full flex flex-col justify-end p-6 sm:p-8 text-white">
                <div class="inline-block bg-blue-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-3 self-start">
                  {{ $t('about.aboutView.team.roles.secretary') }}
                </div>
                <h3 class="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {{ $t('about.aboutView.team.board.secretary.name') }}
                </h3>
                <p class="text-blue-200 text-sm sm:text-base font-medium mb-4">{{ $t('about.aboutView.team.board.secretary.title') }}</p>
                
                <div class="space-y-2 text-sm sm:text-base text-gray-200 border-t border-white/20 pt-4">
                  <p class="leading-relaxed flex items-start">
                    <i class="fas fa-check-circle mr-2 mt-1 text-blue-400 flex-shrink-0"></i>
                    <span>{{ $t('about.aboutView.team.board.secretary.item1') }}</span>
                  </p>
                  <p class="leading-relaxed flex items-start">
                    <i class="fas fa-check-circle mr-2 mt-1 text-blue-400 flex-shrink-0"></i>
                    <span>{{ $t('about.aboutView.team.board.secretary.item2') }}</span>
                  </p>
                  <p class="leading-relaxed flex items-start">
                    <i class="fas fa-check-circle mr-2 mt-1 text-blue-400 flex-shrink-0"></i>
                    <span>{{ $t('about.aboutView.team.board.secretary.item3') }}</span>
                  </p>
                  <p class="text-xs text-gray-300 mt-4 pt-4 border-t border-white/10">
                    <i class="fas fa-graduation-cap mr-2"></i>
                    {{ $t('about.aboutView.team.board.secretary.education') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comité de gestion -->
        <div class="fade-in-up " data-animate>
          <div class="text-center mb-12 sm:mb-16">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {{ $t('about.aboutView.team.managementTitle') }} <span class="text-blue-600">{{ $t('about.aboutView.team.managementTitleHighlight') }}</span>
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <!-- Directeur -->
            <div class="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 fade-in-up stagger-item h-96 sm:h-[28rem] lg:h-[32rem]" data-animate>
              <!-- Image en plein -->
              <div class="absolute inset-0">
                <img 
                  :src="researchImage1" 
                  alt="Jean Nsonsumuna" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <!-- Overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-gray-900/50 group-hover:from-gray-900/95 group-hover:via-gray-900/80 transition-all duration-500"></div>
    </div>

              <!-- Contenu superposé -->
              <div class="relative h-full flex flex-col justify-end p-6 sm:p-8 text-white">
                <div class="inline-block bg-blue-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-3 self-start">
                  {{ $t('about.aboutView.team.roles.director') }}
                </div>
                <h3 class="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {{ $t('about.aboutView.team.management.director.name') }}
                </h3>
                <p class="text-blue-200 text-sm sm:text-base font-medium mb-4">{{ $t('about.aboutView.team.management.director.title') }}</p>
                
                <div class="space-y-2 text-sm sm:text-base text-gray-200 border-t border-white/20 pt-4">
                  <p class="leading-relaxed">{{ $t('about.aboutView.team.management.director.item1') }}</p>
                  <p class="text-xs text-gray-300 mt-4 pt-4 border-t border-white/10">
                    <i class="fas fa-graduation-cap mr-2"></i>
                    {{ $t('about.aboutView.team.management.director.education') }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Secrétaire -->
            <div class="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 fade-in-up stagger-item h-96 sm:h-[28rem] lg:h-[32rem]" :style="{ animationDelay: '150ms' }" data-animate>
              <!-- Image en plein (placeholder si pas d'image) -->
              <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-800">
                <div class="absolute inset-0 flex items-center justify-center">
                  <img 
                  :src="researchImage4" 
                  alt="Jean Nsonsumuna" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                </div>
              </div>
              <!-- Overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-gray-900/50 group-hover:from-gray-900/95 group-hover:via-gray-900/80 transition-all duration-500"></div>
              
              <!-- Contenu superposé -->
              <div class="relative h-full flex flex-col justify-end p-6 sm:p-8 text-white">
                <div class="inline-block bg-indigo-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-3 self-start">
                  {{ $t('about.aboutView.team.roles.secretary') }}
                </div>
                <h3 class="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {{ $t('about.aboutView.team.management.secretary.name') }}
                </h3>
                <p class="text-indigo-200 text-sm sm:text-base font-medium mb-4">{{ $t('about.aboutView.team.management.secretary.title') }}</p>
                
                <div class="space-y-2 text-sm sm:text-base text-gray-200 border-t border-white/20 pt-4">
                  <p class="leading-relaxed">{{ $t('about.aboutView.team.management.secretary.item1') }}</p>
                  <p class="leading-relaxed">{{ $t('about.aboutView.team.management.secretary.item2') }}</p>
                  <p class="leading-relaxed">{{ $t('about.aboutView.team.management.secretary.item3') }}</p>
                </div>
              </div>
            </div>

            <!-- Chargé logistique -->
            <div class="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 fade-in-up stagger-item h-96 sm:h-[28rem] lg:h-[32rem]" :style="{ animationDelay: '300ms' }" data-animate>
              <!-- Image en plein (placeholder si pas d'image) -->
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-600 to-cyan-800">
                <div class="absolute inset-0 flex items-center justify-center">
                  <img 
                  :src="researchImage5" 
                  alt="Jean Nsonsumuna" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                </div>
              </div>
              <!-- Overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-gray-900/50 group-hover:from-gray-900/95 group-hover:via-gray-900/80 transition-all duration-500"></div>
              
              <!-- Contenu superposé -->
              <div class="relative h-full flex flex-col justify-end p-6 sm:p-8 text-white">
                <div class="inline-block bg-cyan-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-3 self-start">
                  {{ $t('about.aboutView.team.roles.logistics') }}
                </div>
                <h3 class="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {{ $t('about.aboutView.team.management.logistics.name') }}
                </h3>
                <p class="text-cyan-200 text-sm sm:text-base font-medium mb-4">{{ $t('about.aboutView.team.management.logistics.title') }}</p>
                
                <div class="space-y-2 text-sm sm:text-base text-gray-200 border-t border-white/20 pt-4">
                  <p class="leading-relaxed">{{ $t('about.aboutView.team.management.logistics.item1') }}</p>
                  <p class="leading-relaxed">{{ $t('about.aboutView.team.management.logistics.item2') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partenaires -->
    <section class="py-10 sm:py-14 lg:py-20 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-20 right-20 w-32 h-32 bg-blue-200/10 rounded-full blur-2xl"></div>
        <div class="absolute bottom-20 left-20 w-40 h-40 bg-indigo-200/10 rounded-full blur-2xl"></div>
      </div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-12 sm:mb-16 fade-in-up" data-animate>
          <div class="mb-6">
            <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">{{ $t('about.aboutView.partners.header') }}</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {{ $t('about.aboutView.partners.title') }} <span class="text-blue-600">{{ $t('about.aboutView.partners.titleHighlight') }}</span>
          </h2>
        </div>

        <!-- Container de cartes des partenaires -->
        <div class="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 fade-in-up" data-animate>
          <div 
            v-for="(partner, index) in partners"
            :key="index"
            class="group relative bg-white rounded-3xl sm:rounded-[2rem] p-8 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl border border-gray-100/80 hover:border-blue-300/60 transition-all duration-700 fade-in-up stagger-item overflow-hidden w-full sm:w-auto sm:max-w-md"
            :style="{ animationDelay: `${index * 150}ms` }"
            data-animate
          >
            <!-- Effet de fond animé au survol -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-indigo-50/0 to-cyan-50/0 group-hover:from-blue-50/50 group-hover:via-indigo-50/30 group-hover:to-cyan-50/40 transition-all duration-700 rounded-3xl"></div>
            
            <!-- Effet de brillance qui traverse -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out rounded-3xl"></div>
            </div>
            
            <!-- Logo du partenaire -->
            <div class="mb-8 h-36 sm:h-44 lg:h-48 flex items-center justify-center relative z-10">
              <!-- Effet de halo coloré au survol -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-cyan-400/20 rounded-3xl blur-3xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110"></div>
              
              <!-- Conteneur du logo premium -->
              <div class="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2 border-2 border-gray-100/60 group-hover:border-blue-300/80 backdrop-blur-sm">
                <!-- Effet de brillance sur le conteneur -->
                <div class="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <img 
                  :src="partner.logo" 
                  :alt="partner.name"
                  class="relative z-10 max-h-28 sm:max-h-36 lg:max-h-40 max-w-full object-contain transition-all duration-700 group-hover:scale-105 drop-shadow-md group-hover:drop-shadow-xl"
                />
              </div>
            </div>
            
            <!-- Contenu -->
            <div class="text-center relative z-10">
              <div class="mb-5">
                <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-all duration-500 transform group-hover:scale-105">
                  {{ partner.name }}
                </h3>
                <!-- Ligne décorative animée -->
                <div class="relative w-20 h-1.5 mx-auto rounded-full overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-full group-hover:w-32 transition-all duration-500"></div>
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-8 group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </div>
              </div>
              
              <p class="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium mb-6 group-hover:text-gray-700 transition-colors duration-300">
                {{ partner.description }}
              </p>
              
              <!-- Badge premium avec icône -->
              <div class="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 px-5 py-2.5 rounded-full transition-all duration-500 shadow-md group-hover:shadow-lg border border-blue-200/50 group-hover:border-blue-300/80 transform group-hover:scale-105">
                <i :class="partner.icon" class="text-blue-600 text-base group-hover:text-blue-700 transition-colors duration-300"></i>
                <span class="text-xs sm:text-sm font-bold text-blue-700 group-hover:text-blue-800 tracking-wide">{{ $t('about.aboutView.partners.badge') }}</span>
              </div>
            </div>
            
            <!-- Bordure animée premium -->
            <div class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400/60 group-hover:via-indigo-400/60 group-hover:to-cyan-400/60 transition-all duration-700 pointer-events-none">
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/0 via-indigo-400/0 to-cyan-400/0 group-hover:from-blue-400/20 group-hover:via-indigo-400/20 group-hover:to-cyan-400/20 transition-all duration-700"></div>
            </div>
            
            <!-- Points décoratifs -->
            <div class="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
            <div class="absolute bottom-4 left-4 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-0 group-hover:scale-100" style="transition-delay: 100ms"></div>
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
//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'

const { t } = useI18n()
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'

import researchImage1 from '../assets/nsomuna.jpeg'
import researchImage2 from '../assets/president.jpeg'
import researchImage3 from '../assets/prof.jpeg'
import researchImage4 from '../assets/eunice.jpeg'
import researchImage5 from '../assets/marcel.jpeg'
import solvayLogo from '../assets/solvay.jpeg'
import aresLogo from '../assets/ares.jpeg'

const partners = computed(() => [
  {
    name: t('about.aboutView.partners.solvay.name'),
    description: t('about.aboutView.partners.solvay.description'),
    icon: 'fas fa-university',
    logo: solvayLogo
  },
  {
    name: t('about.aboutView.partners.ares.name'),
    description: t('about.aboutView.partners.ares.description'),
    icon: 'fas fa-graduation-cap',
    logo: aresLogo
  }
])


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
    observer.observe(el)
  })
}

onMounted(() => {
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
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.stagger-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Animations flottantes */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-medium {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .fade-in-right,
  .stagger-item,
  .animate-float-slow,
  .animate-float-medium {
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
</style>


