<template>
  <header
    class="fixed w-full z-50 transition-all duration-500"
    :class="{
      'bg-white/95 backdrop-blur-xl shadow-2xl shadow-blue-900/10 border-b border-blue-200/30': isScrolled,
      'bg-white/90 backdrop-blur-lg': !isScrolled && !isMobileMenuOpen,
      'bg-white': isMobileMenuOpen,
    }"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo CReFF-PME -->
        <router-link 
          to="/" 
          class="flex items-center space-x-3 z-60 group"
          @click="closeMobileMenu"
        >
          <div
            class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-7 h-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
              <path d="M9 10h6" />
              <path d="M9 14h6" />
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-xl text-blue-800 tracking-tight group-hover:text-blue-700 transition-colors">
              CReFF-PME
            </span>
            <span class="text-xs text-blue-600 font-medium -mt-1 leading-tight">
              Centre de Recherche<br>Financement des PME
            </span>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <nav v-if="!isMobile" class="flex items-center space-x-1">
          <!-- Accueil -->
          <router-link
            to="/"
            class="px-5 py-2.5 flex items-center font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl group relative"
            :class="{ 
              'text-blue-600 bg-blue-50/80 shadow-sm': route.path === '/',
              'hover:bg-blue-50/50': route.path !== '/'
            }"
          >
            <div class="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-2 text-gray-400 group-hover:text-blue-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Accueil
          </router-link>

          <!-- À propos -->
          <router-link
            to="/a-propos"
            class="px-5 py-2.5 flex items-center font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl group relative"
            :class="{ 
              'text-blue-600 bg-blue-50/80 shadow-sm': route.path.includes('/a-propos'),
              'hover:bg-blue-50/50': !route.path.includes('/a-propos')
            }"
          >
            <div class="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-2 text-gray-400 group-hover:text-blue-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            À propos
          </router-link>

          <!-- Recherche Dropdown -->
          <div
            class="relative group"
            @mouseenter="activeDropdown = 'recherche'"
            @mouseleave="activeDropdown = null"
          >
            <button
              class="px-5 py-2.5 flex items-center font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl group"
              :class="{ 
                'text-blue-600 bg-blue-50/80 shadow-sm': route.path.includes('/recherche') || activeDropdown === 'recherche',
                'hover:bg-blue-50/50': !route.path.includes('/recherche')
              }"
            >
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2 text-gray-400 group-hover:text-blue-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Recherche
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 ml-2 transition-transform duration-300 text-gray-400 group-hover:text-blue-600"
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
            </button>

            <!-- Dropdown Menu -->
            <transition
              enter-active-class="transition duration-300 ease-out transform"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-200 ease-in transform"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div
                v-if="activeDropdown === 'recherche'"
                class="absolute top-full left-0 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/10 border border-blue-200/30 mt-3 py-3 z-50"
              >
                <div class="px-4 py-2 border-b border-blue-100/30">
                  <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider">Domaines de Recherche</span>
                </div>
                
                <router-link
                  to="/forum"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300 group/item border-b border-blue-100/30 last:border-b-0"
                  @click="closeDropdowns"
                >
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-sm">Forum de Recherche</div>
                    <div class="text-xs text-blue-500 mt-0.5">Échanges et discussions académiques</div>
                  </div>
                </router-link>
                
                <router-link
                  to="/activites-recherche"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300 group/item border-b border-blue-100/30 last:border-b-0"
                  @click="closeDropdowns"
                >
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-sm">Activités de Recherche</div>
                    <div class="text-xs text-blue-500 mt-0.5">Projets et initiatives en cours</div>
                  </div>
                </router-link>
                
                <router-link
                  to="/evenements"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300 group/item border-b border-blue-100/30 last:border-b-0"
                  @click="closeDropdowns"
                >
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-sm">Événements</div>
                    <div class="text-xs text-blue-500 mt-0.5">Conférences et séminaires</div>
                  </div>
                </router-link>
                
                <router-link
                  to="/publications"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300 group/item border-b border-blue-100/30 last:border-b-0"
                  @click="closeDropdowns"
                >
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-800 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-sm">Publications</div>
                    <div class="text-xs text-blue-500 mt-0.5">Articles et recherches publiées</div>
                  </div>
                </router-link>
              </div>
            </transition>
          </div>

          <!-- Contact -->
          <router-link
            to="/contact"
            class="px-5 py-2.5 flex items-center font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl group relative"
            :class="{ 
              'text-blue-600 bg-blue-50/80 shadow-sm': route.path.includes('/contact'),
              'hover:bg-blue-50/50': !route.path.includes('/contact')
            }"
          >
            <div class="w-2 h-2 bg-blue-300 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-2 text-gray-400 group-hover:text-blue-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact
          </router-link>

          <!-- Bouton Espace Membre -->
          <router-link
            to="/authentification"
            class="ml-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center group relative overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            <span class="relative z-10">Espace Membre</span>
          </router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          v-if="isMobile"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="p-3 rounded-xl text-gray-700 hover:bg-blue-50/50 transition-all duration-300 z-60 group relative"
          :class="{ 'bg-blue-50/80 text-blue-600': isMobileMenuOpen }"
        >
          <div class="w-6 h-6 relative">
            <span
              class="absolute top-1/2 left-1/2 w-5 h-0.5 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              :class="{
                'rotate-45 bg-blue-600': isMobileMenuOpen,
                '-translate-y-2': !isMobileMenuOpen
              }"
            ></span>
            <span
              class="absolute top-1/2 left-1/2 w-5 h-0.5 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              :class="{
                'opacity-0': isMobileMenuOpen
              }"
            ></span>
            <span
              class="absolute top-1/2 left-1/2 w-5 h-0.5 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              :class="{
                '-rotate-45 bg-blue-600': isMobileMenuOpen,
                'translate-y-2': !isMobileMenuOpen
              }"
            ></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-500 ease-out transform"
      enter-from-class="opacity-0 -translate-y-8"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-300 ease-in transform"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-8"
    >
      <div
        v-if="isMobile && isMobileMenuOpen"
        class="lg:hidden bg-white/95 backdrop-blur-xl border-t border-blue-200/30 shadow-2xl shadow-blue-900/10 absolute top-20 inset-x-0 pb-8 pt-6 max-h-[80vh] overflow-y-auto custom-scrollbar"
      >
        <div class="px-6 space-y-2">
          <!-- Accueil Mobile -->
          <router-link
            to="/"
            class="flex items-center px-5 py-4 text-gray-700 rounded-xl hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300 font-semibold group"
            :class="{ 'bg-blue-50/80 text-blue-600 shadow-sm': route.path === '/' }"
            @click="closeMobileMenu"
          >
            <div class="w-2 h-2 bg-blue-500 rounded-full mr-4 group-hover:scale-125 transition-transform"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Accueil
          </router-link>

          <!-- À propos Mobile -->
          <router-link
            to="/a-propos"
            class="flex items-center px-5 py-4 text-gray-700 rounded-xl hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300 font-semibold group"
            :class="{ 'bg-blue-50/80 text-blue-600 shadow-sm': route.path.includes('/a-propos') }"
            @click="closeMobileMenu"
          >
            <div class="w-2 h-2 bg-blue-400 rounded-full mr-4 group-hover:scale-125 transition-transform"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            À propos
          </router-link>

          <!-- Section Recherche Mobile -->
          <div class="pt-2 pb-4">
            <div class="px-5 py-3 text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100/30 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 mr-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Recherche
            </div>
            <div class="mt-3 space-y-2">
              <router-link
                to="/forum"
                class="flex items-center px-8 py-3.5 text-gray-600 hover:bg-blue-50/60 hover:text-blue-600 transition-all duration-300 rounded-xl group"
                @click="closeMobileMenu"
              >
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1" />
                  </svg>
                </div>
                <div>
                  <span class="font-semibold block">Forum</span>
                  <span class="text-xs text-blue-500 mt-0.5">Échanges académiques</span>
                </div>
              </router-link>
              
              <router-link
                to="/activites-recherche"
                class="flex items-center px-8 py-3.5 text-gray-600 hover:bg-blue-50/60 hover:text-blue-600 transition-all duration-300 rounded-xl group"
                @click="closeMobileMenu"
              >
                <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <span class="font-semibold block">Activités de recherche</span>
                  <span class="text-xs text-blue-500 mt-0.5">Projets en cours</span>
                </div>
              </router-link>
              
              <router-link
                to="/evenements"
                class="flex items-center px-8 py-3.5 text-gray-600 hover:bg-blue-50/60 hover:text-blue-600 transition-all duration-300 rounded-xl group"
                @click="closeMobileMenu"
              >
                <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span class="font-semibold block">Événements</span>
                  <span class="text-xs text-blue-500 mt-0.5">Conférences et séminaires</span>
                </div>
              </router-link>
              
              <router-link
                to="/publications"
                class="flex items-center px-8 py-3.5 text-gray-600 hover:bg-blue-50/60 hover:text-blue-600 transition-all duration-300 rounded-xl group"
                @click="closeMobileMenu"
              >
                <div class="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-800 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <span class="font-semibold block">Publications</span>
                  <span class="text-xs text-blue-500 mt-0.5">Articles et recherches</span>
                </div>
              </router-link>
            </div>
          </div>



          <!-- Contact Mobile -->
          <router-link
            to="/contact"
            class="flex items-center px-5 py-4 text-gray-700 rounded-xl hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300 font-semibold group"
            :class="{ 'bg-blue-50/80 text-blue-600 shadow-sm': route.path.includes('/contact') }"
            @click="closeMobileMenu"
          >
            <div class="w-2 h-2 bg-blue-300 rounded-full mr-4 group-hover:scale-125 transition-transform"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact
          </router-link>

          <!-- Bouton Espace Membre Mobile -->
          <router-link
            to="/authentification"
            class="flex items-center justify-center px-5 py-4 mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden"
            @click="closeMobileMenu"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-3 relative z-10"
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
            <span class="relative z-10">Espace Membre</span>
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const windowWidth = ref(window.innerWidth)
const isMobileMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)

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
  activeDropdown.value = activeDropdown.value === menu ? null : menu
}

const closeDropdowns = () => {
  activeDropdown.value = null
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  activeDropdown.value = null
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', closeDropdowns)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

header {
  font-family: 'Inter', sans-serif;
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar for mobile menu */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #bfdbfe;
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #93c5fd;
}

/* Enhanced hover effects */
.router-link-active {
  position: relative;
}

.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
  border-radius: 0 2px 2px 0;
}

/* Glass morphism effect enhancement */
.backdrop-blur-xl {
  backdrop-filter: blur(20px);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, transform, box-shadow;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Professional gradient effects */
.professional-gradient {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
}

/* Subtle shadow enhancements */
.shadow-professional {
  box-shadow: 0 10px 40px rgba(30, 64, 175, 0.1), 0 5px 15px rgba(30, 64, 175, 0.05);
}
</style>