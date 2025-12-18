<template>
  <header
    class="fixed w-full z-[100] transition-all duration-500 ease-out bg-white"
    :class="{
      'shadow-lg border-b border-gray-200/60': isScrolled,
      'border-b border-transparent': !isScrolled && !isMobileMenuOpen,
      'border-b border-gray-200': isMobileMenuOpen,
    }"
  >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20 lg:h-24">
        <!-- Logo CReFF-PME avec texte -->
        <router-link 
          to="/" 
          class="flex items-center gap-2 sm:gap-3 z-60 group relative flex-shrink-0 min-w-0"
          @click="closeMobileMenu"
        >
          <!-- Logo -->
         <!-- Logo -->
<div class="flex-shrink-0">
  <img 
    :src="logoImage" 
    alt="CReFF-PME Logo"
    class="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
  />
</div>
<!-- Nom du centre -->
<div class="flex items-center min-w-0 ml-2 sm:ml-3">
  <span class="font-bold text-sm sm:text-base md:text-lg text-gray-900 group-hover:text-blue-600 transition-colors leading-tight whitespace-nowrap">
    CReFF-PME
  </span>
</div>
        </router-link>

        <!-- Desktop Navigation -->
        <nav v-if="!isMobile" class="hidden lg:flex items-center space-x-1 xl:space-x-2">
          <!-- Accueil -->
          <router-link
            to="/"
            class="relative px-4 xl:px-5 py-2.5 flex items-center font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg group whitespace-nowrap"
            :class="{ 
              'text-blue-600': route.path === '/',
            }"
          >
            <span class="relative z-10">{{ $t('nav.home') }}</span>
            <!-- Indicateur actif animé -->
            <span 
              v-if="route.path === '/'"
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-slide-in"
            ></span>
            <!-- Effet de fond au survol -->
            <span class="absolute inset-0 bg-blue-50/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
          </router-link>

          <!-- À propos -->
          <router-link
            to="/about"
            class="relative px-4 xl:px-5 py-2.5 flex items-center font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg group whitespace-nowrap"
            :class="{ 
              'text-blue-600': route.path.includes('/about'),
            }"
          >
            <span class="relative z-10">{{ $t('nav.about') }}</span>
            <span 
              v-if="route.path.includes('/about')"
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-slide-in"
            ></span>
            <span class="absolute inset-0 bg-blue-50/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
          </router-link>

          <!-- Recherche Dropdown -->
          <div
            ref="rechercheDropdownRef"
            class="relative group"
            @mouseenter="handleDropdownEnter"
            @mouseleave="handleDropdownLeave"
          >
            <button
              ref="rechercheButtonRef"
              @click="toggleDropdown('recherche')"
              class="relative px-4 xl:px-5 py-2.5 flex items-center font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg whitespace-nowrap"
              :class="{ 
                'text-blue-600': route.path.includes('/recherche') || route.path.includes('/actualites') || route.path.includes('/evenements') || route.path.includes('/publications') || activeDropdown === 'recherche',
              }"
            >
              <span class="relative z-10">{{ $t('nav.research') }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 ml-1.5 transition-transform duration-300"
                :class="{ 'rotate-180': activeDropdown === 'recherche' }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <span 
                v-if="route.path.includes('/recherche') || route.path.includes('/actualites') || route.path.includes('/evenements') || route.path.includes('/publications') || activeDropdown === 'recherche'"
                class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-slide-in"
              ></span>
              <span class="absolute inset-0 bg-blue-50/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
            </button>

            <!-- Dropdown Menu Premium -->
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-4 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 -translate-y-4 scale-95"
            >
              <Teleport to="body">
                <!-- Zone de transition invisible entre le bouton et le dropdown -->
                <div
                  v-if="activeDropdown === 'recherche'"
                  class="fixed z-[9998]"
                  :style="{
                    top: dropdownStyle.top.replace('px', '') ? `${parseFloat(dropdownStyle.top) - 12}px` : '0px',
                    left: dropdownStyle.left,
                    width: '320px',
                    height: '12px',
                    pointerEvents: 'auto'
                  }"
                  @mouseenter="handleDropdownEnter"
                  @mouseleave="handleDropdownLeave"
                ></div>
                <div
                  v-if="activeDropdown === 'recherche'"
                  class="fixed w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/60 py-3 z-[9999] overflow-hidden"
                  :style="dropdownStyle"
                  @click.stop
                  @mouseenter="handleDropdownEnter"
                  @mouseleave="handleDropdownLeave"
                >
                <!-- Effet de brillance en haut -->
                <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
                
                <div class="px-5 py-3 border-b border-gray-100/80">
                  <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">{{ $t('nav.researchDomains') }}</span>
                </div>
                
                <div class="py-2">
                  <router-link
                    to="/actualites"
                    class="flex items-center px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-300 group/item relative"
                    @click="closeDropdowns"
                  >
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                    <div class="w-2 h-2 bg-blue-600 rounded-full mr-4 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform scale-0 group-hover/item:scale-100"></div>
                    <span class="text-sm font-semibold relative z-10">{{ $t('nav.news') }}</span>
                  </router-link>
                  
                  <router-link
                    to="/evenements"
                    class="flex items-center px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-300 group/item relative"
                    @click="closeDropdowns"
                  >
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                    <div class="w-2 h-2 bg-blue-600 rounded-full mr-4 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform scale-0 group-hover/item:scale-100"></div>
                    <span class="text-sm font-semibold relative z-10">{{ $t('nav.events') }}</span>
                  </router-link>
                  
                  <router-link
                    to="/publications"
                    class="flex items-center px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-300 group/item relative"
                    @click="closeDropdowns"
                  >
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                    <div class="w-2 h-2 bg-blue-600 rounded-full mr-4 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform scale-0 group-hover/item:scale-100"></div>
                    <span class="text-sm font-semibold relative z-10">{{ $t('nav.publications') }}</span>
                  </router-link>

                  <router-link
                    to="/comite-scientifique"
                    class="flex items-center px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-300 group/item relative"
                    @click="closeDropdowns"
                  >
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                    <div class="w-2 h-2 bg-blue-600 rounded-full mr-4 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform scale-0 group-hover/item:scale-100"></div>
                    <span class="text-sm font-semibold relative z-10">{{ $t('nav.scientificCommittee') }}</span>
                  </router-link>
                </div>
                </div>
              </Teleport>
            </transition>
          </div>

          <!-- Entrepreneurs -->
          <router-link
            to="/programme-entrepreneurs"
            class="relative px-4 xl:px-5 py-2.5 flex items-center font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg group whitespace-nowrap"
            :class="{ 
              'text-blue-600': route.path.includes('/programme-entrepreneurs'),
            }"
          >
            <span class="relative z-10">{{ $t('nav.entrepreneurs') }}</span>
            <span 
              v-if="route.path.includes('/programme-entrepreneurs')"
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-slide-in"
            ></span>
            <span class="absolute inset-0 bg-blue-50/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
          </router-link>

          <!-- Contact -->
          <router-link
            to="/contact"
            class="relative px-4 xl:px-5 py-2.5 flex items-center font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg group whitespace-nowrap"
            :class="{ 
              'text-blue-600': route.path.includes('/contact'),
            }"
          >
            <span class="relative z-10">{{ $t('nav.contact') }}</span>
            <span 
              v-if="route.path.includes('/contact')"
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-slide-in"
            ></span>
            <span class="absolute inset-0 bg-blue-50/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
          </router-link>

          <!-- Séparateur élégant -->
          <div class="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-2 xl:mx-3 flex-shrink-0"></div>

          <!-- Bouton Espace Membre Premium -->
          <!-- Sélecteur de langue -->
          <div
            ref="languageDropdownRef"
            class="relative group mr-4 language-selector flex-shrink-0"
            @mouseenter="handleLanguageDropdownEnter"
            @mouseleave="handleLanguageDropdownLeave"
          >
            <button
              ref="languageButtonRef"
              @click.stop="toggleLanguageMenu"
              class="relative px-4 py-2.5 flex items-center font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg group whitespace-nowrap"
            >
              <i class="fas fa-globe mr-2"></i>
              <span class="uppercase text-sm">{{ currentLocale }}</span>
              <i class="fas fa-chevron-down ml-2 text-xs transition-transform duration-300" :class="{ 'rotate-180': showLanguageMenu }"></i>
            </button>
            
            <!-- Menu déroulant des langues -->
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-4 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 -translate-y-4 scale-95"
            >
              <Teleport to="body">
                <!-- Zone de transition invisible entre le bouton et le dropdown -->
                <div
                  v-if="showLanguageMenu"
                  class="fixed z-[9998]"
                  :style="{
                    top: languageDropdownStyle.top.replace('px', '') ? `${parseFloat(languageDropdownStyle.top) - 12}px` : '0px',
                    right: languageDropdownStyle.right,
                    width: '160px',
                    height: '12px',
                    pointerEvents: 'auto'
                  }"
                  @mouseenter="handleLanguageDropdownEnter"
                  @mouseleave="handleLanguageDropdownLeave"
                ></div>
                <div
                  v-if="showLanguageMenu"
                  class="fixed w-40 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/60 py-2 z-[9999] overflow-hidden"
                  :style="languageDropdownStyle"
                  @click.stop
                  @mouseenter="handleLanguageDropdownEnter"
                  @mouseleave="handleLanguageDropdownLeave"
                >
                  <button
                    @click="changeLanguage('fr')"
                    class="w-full px-4 py-2.5 text-left hover:bg-blue-50 transition-colors flex items-center justify-between"
                    :class="{ 'bg-blue-50 text-blue-600': currentLocale === 'fr' }"
                  >
                    <span class="flex items-center">
                      <span class="text-lg mr-2">🇫🇷</span>
                      <span>Français</span>
                    </span>
                    <i v-if="currentLocale === 'fr'" class="fas fa-check text-blue-600"></i>
                  </button>
                  <button
                    @click="changeLanguage('en')"
                    class="w-full px-4 py-2.5 text-left hover:bg-blue-50 transition-colors flex items-center justify-between"
                    :class="{ 'bg-blue-50 text-blue-600': currentLocale === 'en' }"
                  >
                    <span class="flex items-center">
                      <span class="text-lg mr-2">🇬🇧</span>
                      <span>English</span>
                    </span>
                    <i v-if="currentLocale === 'en'" class="fas fa-check text-blue-600"></i>
                  </button>
                </div>
              </Teleport>
            </transition>
          </div>

          <router-link
            to="/authentification"
            class="relative px-4 xl:px-5 2xl:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center overflow-hidden group/btn whitespace-nowrap flex-shrink-0"
          >
            <!-- Effet de brillance animé -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 mr-2 relative z-10 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span class="relative z-10">{{ $t('nav.login') }}</span>
          </router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          v-if="isMobile"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 z-60 relative"
          :class="{ 'bg-blue-50 text-blue-600': isMobileMenuOpen }"
          aria-label="Toggle menu"
        >
          <div class="w-6 h-6 relative">
            <span
              class="absolute top-1/2 left-1/2 w-5 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 rounded-full"
              :class="{
                'rotate-45 translate-y-0': isMobileMenuOpen,
                '-translate-y-2': !isMobileMenuOpen
              }"
            ></span>
            <span
              class="absolute top-1/2 left-1/2 w-5 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 rounded-full"
              :class="{
                'opacity-0': isMobileMenuOpen
              }"
            ></span>
            <span
              class="absolute top-1/2 left-1/2 w-5 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 rounded-full"
              :class="{
                '-rotate-45 translate-y-0': isMobileMenuOpen,
                'translate-y-2': !isMobileMenuOpen
              }"
            ></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Premium -->
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 -translate-y-10"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-10"
    >
      <div
        v-if="isMobile && isMobileMenuOpen"
        class="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200 shadow-2xl fixed top-20 sm:top-24 inset-x-0 pb-8 pt-6 max-h-[85vh] overflow-y-auto custom-scrollbar z-[101]"
      >
        <div class="px-4 sm:px-6 space-y-1">
          <!-- Accueil Mobile -->
          <router-link
            to="/"
            class="flex items-center px-5 py-4 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-300 font-semibold group relative"
            :class="{ 'bg-blue-50 text-blue-600': route.path === '/' }"
            @click="closeMobileMenu"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" :class="{ 'opacity-100': route.path === '/' }"></div>
            <span class="relative z-10 ml-2">{{ $t('nav.home') }}</span>
          </router-link>

          <!-- À propos Mobile -->
          <router-link
            to="/about"
            class="flex items-center px-5 py-4 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-300 font-semibold group relative"
            :class="{ 'bg-blue-50 text-blue-600': route.path.includes('/about') }"
            @click="closeMobileMenu"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" :class="{ 'opacity-100': route.path.includes('/about') }"></div>
            <span class="relative z-10 ml-2">{{ $t('nav.about') }}</span>
          </router-link>

          <!-- Section Recherche Mobile -->
          <div class="pt-3 pb-2">
            <div class="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200">
              {{ $t('nav.research') }}
            </div>
            <div class="mt-3 space-y-1">
              <router-link
                to="/actualites"
                class="flex items-center px-8 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-300 rounded-xl group relative"
                :class="{ 'bg-blue-50 text-blue-600': route.path.includes('/actualites') }"
                @click="closeMobileMenu"
              >
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" :class="{ 'opacity-100': route.path.includes('/actualites') }"></div>
                <span class="text-sm font-semibold relative z-10 ml-2">{{ $t('nav.news') }}</span>
              </router-link>
              
              <router-link
                to="/evenements"
                class="flex items-center px-8 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-300 rounded-xl group relative"
                :class="{ 'bg-blue-50 text-blue-600': route.path.includes('/evenements') }"
                @click="closeMobileMenu"
              >
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" :class="{ 'opacity-100': route.path.includes('/evenements') }"></div>
                <span class="text-sm font-semibold relative z-10 ml-2">{{ $t('nav.events') }}</span>
              </router-link>
              
              <router-link
                to="/publications"
                class="flex items-center px-8 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-300 rounded-xl group relative"
                :class="{ 'bg-blue-50 text-blue-600': route.path.includes('/publications') }"
                @click="closeMobileMenu"
              >
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" :class="{ 'opacity-100': route.path.includes('/publications') }"></div>
                <span class="text-sm font-semibold relative z-10 ml-2">{{ $t('nav.publications') }}</span>
              </router-link>

              <router-link
                to="/comite-scientifique"
                class="flex items-center px-8 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-300 rounded-xl group relative"
                :class="{ 'bg-blue-50 text-blue-600': route.path.includes('/comite-scientifique') }"
                @click="closeMobileMenu"
              >
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" :class="{ 'opacity-100': route.path.includes('/comite-scientifique') }"></div>
                <span class="text-sm font-semibold relative z-10 ml-2">{{ $t('nav.scientificCommittee') }}</span>
              </router-link>
            </div>
          </div>

          <!-- Entrepreneurs Mobile -->
          <router-link
            to="/programme-entrepreneurs"
            class="flex items-center px-5 py-4 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-300 font-semibold group relative"
            :class="{ 'bg-blue-50 text-blue-600': route.path.includes('/programme-entrepreneurs') }"
            @click="closeMobileMenu"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" :class="{ 'opacity-100': route.path.includes('/programme-entrepreneurs') }"></div>
            <span class="relative z-10 ml-2">{{ $t('nav.entrepreneurs') }}</span>
          </router-link>

          <!-- Contact Mobile -->
          <router-link
            to="/contact"
            class="flex items-center px-5 py-4 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-300 font-semibold group relative"
            :class="{ 'bg-blue-50 text-blue-600': route.path.includes('/contact') }"
            @click="closeMobileMenu"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" :class="{ 'opacity-100': route.path.includes('/contact') }"></div>
            <span class="relative z-10 ml-2">{{ $t('nav.contact') }}</span>
          </router-link>

          <!-- Sélecteur de langue Mobile -->
          <div class="px-5 pt-2 flex items-center justify-between">
            <span class="text-xs font-medium text-gray-500 uppercase tracking-widest">
              {{ $t('common.language') || 'Langue' }}
            </span>
            <div class="flex items-center space-x-2">
              <button
                @click="changeLanguage('fr')"
                class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300"
                :class="currentLocale === 'fr' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'"
              >
                FR
              </button>
              <button
                @click="changeLanguage('en')"
                class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300"
                :class="currentLocale === 'en' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'"
              >
                EN
              </button>
            </div>
          </div>

          <!-- Bouton Espace Membre Mobile Premium -->
          <router-link
            to="/authentification"
            class="flex items-center justify-center px-5 py-4 mt-6 mx-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group/btn"
            @click="closeMobileMenu"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-2 relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span class="relative z-10">Connexion</span>
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Teleport } from 'vue'
// Import du logo depuis assets
import logoImage from '../../assets/logoCreff-PME.jpeg'

const route = useRoute()
const { locale } = useI18n()

const isScrolled = ref(false)
const windowWidth = ref(window.innerWidth)
const isMobileMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)
const showLanguageMenu = ref(false)
const rechercheButtonRef = ref<HTMLElement | null>(null)
const rechercheDropdownRef = ref<HTMLElement | null>(null)
const dropdownStyle = ref<{ top: string; left: string }>({ top: '0px', left: '0px' })
const dropdownCloseTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const languageButtonRef = ref<HTMLElement | null>(null)
const languageDropdownRef = ref<HTMLElement | null>(null)
const languageDropdownStyle = ref<{ top: string; right: string }>({ top: '0px', right: '0px' })
const languageDropdownCloseTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const currentLocale = computed(() => locale.value)

const toggleLanguageMenu = () => {
  if (showLanguageMenu.value) {
    showLanguageMenu.value = false
    if (languageDropdownCloseTimer.value) {
      clearTimeout(languageDropdownCloseTimer.value)
      languageDropdownCloseTimer.value = null
    }
  } else {
    showLanguageMenu.value = true
    updateLanguageDropdownPosition()
  }
}

const changeLanguage = (lang: 'fr' | 'en') => {
  locale.value = lang
  localStorage.setItem('locale', lang)
  showLanguageMenu.value = false
}

const isMobile = computed(() => windowWidth.value < 1024)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (windowWidth.value >= 1024) {
    isMobileMenuOpen.value = false
    activeDropdown.value = null
  }
}

const toggleDropdown = (menu: string) => {
  // Pour les écrans tactiles, basculer l'état
  if (activeDropdown.value === menu) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = menu
  }
}

const closeDropdowns = (event?: Event) => {
  if (!event) {
    activeDropdown.value = null
    showLanguageMenu.value = false
    return
  }
  
  const target = event.target as HTMLElement
  
  // Ne pas fermer si le clic est sur le bouton du dropdown de recherche
  if (rechercheButtonRef.value && rechercheButtonRef.value.contains(target)) {
    return
  }
  
  // Ne pas fermer si le clic est sur le bouton du dropdown de langue
  if (languageButtonRef.value && languageButtonRef.value.contains(target)) {
    return
  }
  
  // Ne pas fermer si le clic est dans un dropdown téléporté (recherche ou langue)
  const dropdowns = document.querySelectorAll('[style*="z-[9999]"]')
  for (const dropdown of Array.from(dropdowns)) {
    if (dropdown.contains(target)) {
      return
    }
  }
  
  activeDropdown.value = null
  showLanguageMenu.value = false
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  activeDropdown.value = null
}

// Gérer l'entrée dans la zone du dropdown (bouton ou dropdown)
const handleDropdownEnter = () => {
  // Annuler le timer de fermeture s'il existe
  if (dropdownCloseTimer.value) {
    clearTimeout(dropdownCloseTimer.value)
    dropdownCloseTimer.value = null
  }
  // Ouvrir le dropdown
  activeDropdown.value = 'recherche'
  updateDropdownPosition()
}

// Gérer la sortie de la zone du dropdown avec délai
const handleDropdownLeave = () => {
  // Démarrer un timer pour fermer après un court délai
  if (dropdownCloseTimer.value) {
    clearTimeout(dropdownCloseTimer.value)
  }
  dropdownCloseTimer.value = setTimeout(() => {
    activeDropdown.value = null
    dropdownCloseTimer.value = null
  }, 200) // 200ms de délai pour permettre de revenir
}

// Gérer l'entrée dans la zone du dropdown de langue
const handleLanguageDropdownEnter = () => {
  // Annuler le timer de fermeture s'il existe
  if (languageDropdownCloseTimer.value) {
    clearTimeout(languageDropdownCloseTimer.value)
    languageDropdownCloseTimer.value = null
  }
  // Ouvrir le dropdown
  showLanguageMenu.value = true
  updateLanguageDropdownPosition()
}

// Gérer la sortie de la zone du dropdown de langue avec délai
const handleLanguageDropdownLeave = () => {
  // Démarrer un timer pour fermer après un court délai
  if (languageDropdownCloseTimer.value) {
    clearTimeout(languageDropdownCloseTimer.value)
  }
  languageDropdownCloseTimer.value = setTimeout(() => {
    showLanguageMenu.value = false
    languageDropdownCloseTimer.value = null
  }, 200) // 200ms de délai pour permettre de revenir
}

// Calculer la position du dropdown de langue
const updateLanguageDropdownPosition = async () => {
  if (!languageButtonRef.value || !showLanguageMenu.value) return
  
  await nextTick()
  const rect = languageButtonRef.value.getBoundingClientRect()
  
  languageDropdownStyle.value = {
    top: `${rect.bottom + 12}px`, // mt-2 = 8px, mais on utilise 12px pour la zone de transition
    right: `${window.innerWidth - rect.right}px` // Calculer depuis le bord droit
  }
}

// Calculer la position du dropdown
const updateDropdownPosition = async () => {
  if (!rechercheButtonRef.value || activeDropdown.value !== 'recherche') return
  
  await nextTick()
  const rect = rechercheButtonRef.value.getBoundingClientRect()
  const headerHeight = windowWidth.value >= 1024 ? 96 : 80 // lg:h-24 = 96px, h-20 = 80px
  
  dropdownStyle.value = {
    top: `${rect.bottom + 12}px`, // mt-3 = 12px
    left: `${rect.left}px`
  }
}

// Surveiller les changements du dropdown et du scroll
watch([activeDropdown, isScrolled], () => {
  if (activeDropdown.value === 'recherche') {
    updateDropdownPosition()
  }
})

watch(() => windowWidth.value, () => {
  if (activeDropdown.value === 'recherche') {
    updateDropdownPosition()
  }
})

// Surveiller les changements du dropdown de langue
watch([showLanguageMenu, isScrolled], () => {
  if (showLanguageMenu.value) {
    updateLanguageDropdownPosition()
  }
})

watch(() => windowWidth.value, () => {
  if (showLanguageMenu.value) {
    updateLanguageDropdownPosition()
  }
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    handleScroll()
    if (activeDropdown.value === 'recherche') {
      updateDropdownPosition()
    }
    if (showLanguageMenu.value) {
      updateLanguageDropdownPosition()
    }
  })
  window.addEventListener('resize', () => {
    handleResize()
    if (activeDropdown.value === 'recherche') {
      updateDropdownPosition()
    }
    if (showLanguageMenu.value) {
      updateLanguageDropdownPosition()
    }
  })
  document.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', closeDropdowns)
  // Nettoyer les timers de fermeture des dropdowns
  if (dropdownCloseTimer.value) {
    clearTimeout(dropdownCloseTimer.value)
    dropdownCloseTimer.value = null
  }
  if (languageDropdownCloseTimer.value) {
    clearTimeout(languageDropdownCloseTimer.value)
    languageDropdownCloseTimer.value = null
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

header {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar for mobile menu */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f9fafb;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #94a3b8, #64748b);
}

/* Animation pour l'indicateur actif */
@keyframes slide-in {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}

/* Amélioration des transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Effet de glassmorphism amélioré */
.backdrop-blur-xl {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

/* Amélioration des ombres */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
}

/* Responsive breakpoints améliorés */
@media (max-width: 640px) {
  header {
    font-size: 0.875rem;
  }
}

@media (min-width: 1024px) {
  nav {
    gap: 0.125rem;
    flex-wrap: nowrap;
  }
}

@media (min-width: 1280px) {
  nav {
    gap: 0.25rem;
  }
}

@media (min-width: 1536px) {
  nav {
    gap: 0.5rem;
  }
}

/* Empêcher le débordement sur les écrans moyens */
@media (min-width: 1024px) and (max-width: 1279px) {
  nav a,
  nav button {
    font-size: 0.875rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}

/* Assurer que le contenu ne déborde pas */
header {
  overflow-x: hidden;
}

.max-w-7xl {
  width: 100%;
  max-width: 100%;
}
</style>
