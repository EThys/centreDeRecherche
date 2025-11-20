<template>
  <NavBarComponent/>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-2 pb-16">
    <!-- Header Hero Section -->
     <header class="relative overflow-hidden bg-gradient-to-br pt-40 pb-16 from-blue-800/90 to-blue-600/90 py-24 w-full mb-8">
      <div class="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Forum de Recherche - Échanges Scientifiques"
          class="w-full h-full object-cover opacity-20"
        />
        <!-- Overlay et effets -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-blue-500/30"></div>
        <!-- Blobs animés -->
        <div class="absolute top-10 left-20 w-64 h-64 bg-cyan-400/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-slow"></div>
        <div class="absolute top-20 right-32 w-72 h-72 bg-blue-300/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-fast"></div>
      </div>

      <!-- Contenu principal -->
      <div class="max-w-6xl mx-auto px-4 text-center relative z-10">

        <!-- Titre principal avec effet de dégradé animé -->
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 animate-gradient-text">
          <span class="block">Forum de Recherche</span>
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-blue-400 mt-2">
            Échanges Scientifiques
          </span>
        </h1>

        <!-- Sous-titre avec animation -->
        <p class="text-xl text-blue-50 max-w-3xl mx-auto mb-10 animate-fade-in">
          Espace d'échanges et de discussions entre <strong class="text-white">chercheurs, experts et praticiens</strong> 
          du financement des PME en République Démocratique du Congo.
        </p>

        <!-- Statistiques -->
        <div class="flex flex-wrap justify-center gap-8 mb-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-white">{{ stats.discussions }}</div>
            <div class="text-blue-200 text-sm">Discussions</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white">{{ stats.messages }}</div>
            <div class="text-blue-200 text-sm">Messages</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white">{{ stats.members }}</div>
            <div class="text-blue-200 text-sm">Membres</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white">{{ stats.online }}</div>
            <div class="text-blue-200 text-sm">En ligne</div>
          </div>
        </div>
      </div>

      <!-- Forme décorative en bas -->
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-white/5 transform -skew-y-3 origin-bottom-left animate-wave"></div>
    </header>


    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Créer une discussion -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <button 
              @click="showNewDiscussionModal = true"
              class="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <i class="fas fa-plus-circle"></i>
              Nouvelle Discussion
            </button>
          </div>

          <!-- Filtres et Recherche -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i class="fas fa-filter text-blue-500"></i>
              Filtres
            </h3>
            
            <!-- Barre de recherche -->
            <div class="mb-4">
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-search text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"></i>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Rechercher des discussions..."
                  class="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder-gray-400 group-hover:border-gray-300 text-sm"
                >
              </div>
            </div>

            <!-- Catégories -->
            <div class="space-y-3">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">Catégories</h4>
              <button 
                v-for="category in categories" 
                :key="category.id"
                @click="activeCategory = category.id"
                :class="[
                  'w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm border-2',
                  activeCategory === category.id 
                    ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' 
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-200'
                ]"
              >
                <div class="flex justify-between items-center">
                  <span>{{ category.name }}</span>
                  <span :class="[
                    'text-xs px-2 py-1 rounded-full transition-colors',
                    activeCategory === category.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  ]">
                    {{ category.count }}
                  </span>
                </div>
              </button>
            </div>

            <!-- Filtres avancés -->
            <div class="mt-6 pt-4 border-t border-gray-100">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Statut</h4>
              <div class="space-y-2">
                <button 
                  v-for="status in statusFilters" 
                  :key="status.id"
                  @click="activeStatus = status.id"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium',
                    activeStatus === status.id 
                      ? 'bg-green-50 text-green-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  ]"
                >
                  <div class="flex items-center gap-2">
                    <i :class="status.icon" class="w-4 h-4"></i>
                    <span>{{ status.name }}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Chercheurs en ligne -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i class="fas fa-users text-green-500"></i>
              En ligne maintenant
              <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </h3>
            <div class="space-y-3">
              <div 
                v-for="user in onlineUsers" 
                :key="user.id"
                class="flex items-center gap-3 group cursor-pointer"
                @click="startChat(user)"
              >
                <div class="relative">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {{ user.initials }}
                  </div>
                  <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors truncate">{{ user.name }}</div>
                  <div class="text-xs text-gray-500 truncate">{{ user.role }}</div>
                </div>
                <i class="fas fa-comment text-gray-400 group-hover:text-blue-500 transition-colors"></i>
              </div>
            </div>
          </div>

          <!-- Tags populaires -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i class="fas fa-tags text-purple-500"></i>
              Tags populaires
            </h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in popularTags" 
                :key="tag"
                @click="searchByTag(tag)"
                class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors cursor-pointer"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Contenu principal -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Filtres actifs et contrôles -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <!-- Filtres actifs -->
              <div class="flex flex-wrap gap-2 items-center">
                <span class="text-sm text-gray-600 font-medium">Filtres actifs:</span>
                
                <!-- Filtre catégorie -->
                <span 
                  v-if="activeCategory !== 'all'" 
                  class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium"
                >
                  {{ getCategoryName(activeCategory) }}
                  <button @click="activeCategory = 'all'" class="text-blue-500 hover:text-blue-700">
                    <i class="fas fa-times text-xs"></i>
                  </button>
                </span>
                
                <!-- Filtre statut -->
                <span 
                  v-if="activeStatus !== 'all'" 
                  class="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium"
                >
                  {{ getStatusName(activeStatus) }}
                  <button @click="activeStatus = 'all'" class="text-green-500 hover:text-green-700">
                    <i class="fas fa-times text-xs"></i>
                  </button>
                </span>
                
                <!-- Filtre recherche -->
                <span 
                  v-if="searchQuery" 
                  class="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-xs font-medium"
                >
                  "{{ searchQuery }}"
                  <button @click="searchQuery = ''" class="text-orange-500 hover:text-orange-700">
                    <i class="fas fa-times text-xs"></i>
                  </button>
                </span>

                <button
                  v-if="hasActiveFilters"
                  @click="clearFilters"
                  class="text-xs text-gray-500 hover:text-gray-700 underline ml-2"
                >
                  Tout effacer
                </button>
              </div>

              <!-- Contrôles de tri -->
              <div class="flex items-center gap-3">
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-sort text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"></i>
                  </div>
                  <select
                    v-model="sortBy"
                    class="pl-10 pr-8 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 focus:bg-white appearance-none cursor-pointer transition-all duration-300 hover:border-gray-300 text-sm"
                  >
                    <option value="newest">Plus récent</option>
                    <option value="popular">Plus populaire</option>
                    <option value="replies">Plus de réponses</option>
                    <option value="views">Plus de vues</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Liste des discussions -->
          <div class="space-y-4">
            <div 
              v-for="discussion in paginatedDiscussions" 
              :key="discussion.id"
              class="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div class="flex flex-col lg:flex-row">
                <!-- Métriques -->
                <div class="lg:w-24 bg-gradient-to-b from-blue-50 to-indigo-50 p-6 flex lg:flex-col items-center justify-center gap-4 lg:gap-2">
                  <!-- Réponses -->
                  <div class="text-center">
                    <div class="text-xl font-bold text-blue-600">{{ discussion.replies }}</div>
                    <div class="text-xs text-gray-600 font-medium">réponses</div>
                  </div>
                  
                  <!-- Vues -->
                  <div class="text-center">
                    <div class="text-lg font-bold text-gray-700">{{ discussion.views }}</div>
                    <div class="text-xs text-gray-600">vues</div>
                  </div>
                  
                  <!-- Badge statut -->
                  <div class="hidden lg:block mt-2">
                    <span :class="[
                      'text-xs font-semibold px-2 py-1 rounded-full',
                      discussion.status === 'active' ? 'bg-green-100 text-green-700' :
                      discussion.status === 'resolved' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    ]">
                      {{ getStatusLabel(discussion.status) }}
                    </span>
                  </div>
                </div>
                
                <!-- Contenu de la discussion -->
                <div class="flex-1 p-6">
                  <div class="flex flex-col h-full">
                    <!-- En-tête avec catégorie et date -->
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <span class="text-blue-600 text-sm font-medium flex items-center gap-1">
                          <i class="fas fa-tag"></i>
                          {{ discussion.category }}
                        </span>
                        <span class="text-gray-500 text-sm flex items-center gap-1">
                          <i class="far fa-clock"></i>
                          {{ discussion.lastActivity }}
                        </span>
                      </div>
                      <span class="lg:hidden text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                        {{ getStatusLabel(discussion.status) }}
                      </span>
                    </div>
                    
                    <!-- Titre -->
                    <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors leading-tight">
                      {{ discussion.title }}
                    </h3>
                    
                    <!-- Extrait -->
                    <p class="text-gray-600 mb-4 leading-relaxed flex-1">
                      {{ discussion.excerpt }}
                    </p>
                    
                    <!-- Auteur et tags -->
                    <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div class="flex items-center space-x-4">
                        <!-- Auteur -->
                        <div class="flex items-center gap-2">
                          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                            {{ discussion.author.initials }}
                          </div>
                          <span class="text-sm text-gray-700 font-medium">{{ discussion.author.name }}</span>
                        </div>
                        
                        <!-- Tags -->
                        <div class="flex flex-wrap gap-1">
                          <span
                            v-for="tag in discussion.tags.slice(0, 2)"
                            :key="tag"
                            class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                            @click.stop="searchByTag(tag)"
                          >
                            #{{ tag }}
                          </span>
                          <span v-if="discussion.tags.length > 2" class="text-xs text-gray-400">
                            +{{ discussion.tags.length - 2 }}
                          </span>
                        </div>
                      </div>
                      <button 
                        @click.stop="openDiscussion(discussion.id)"
                        class="text-blue-600 font-semibold text-sm hover:translate-x-2 transition-transform flex items-center hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50"
                      >
                        Participer
                        <i class="fas fa-arrow-right ml-2 text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <!-- Informations sur la pagination -->
            <div class="text-sm text-gray-600">
              Affichage de <span class="font-semibold">{{ startIndex + 1 }}</span> à 
              <span class="font-semibold">{{ endIndex }}</span> sur 
              <span class="font-semibold">{{ filteredDiscussions.length }}</span> discussions
            </div>

            <!-- Contrôles de pagination -->
            <div class="flex items-center space-x-2">
              <!-- Bouton précédent -->
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                :class="[
                  'px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium transition-all',
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                ]"
              >
                <i class="fas fa-chevron-left mr-2"></i>
                Précédent
              </button>

              <!-- Numéros de page -->
              <div class="flex items-center space-x-1">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'w-10 h-10 rounded-lg text-sm font-medium transition-all',
                    page === currentPage
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  ]"
                >
                  {{ page }}
                </button>
                
                <!-- Points de suspension -->
                <span v-if="showLeftEllipsis" class="px-2 text-gray-400">...</span>
                <span v-if="showRightEllipsis" class="px-2 text-gray-400">...</span>
              </div>

              <!-- Bouton suivant -->
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                :class="[
                  'px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium transition-all',
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                ]"
              >
                Suivant
                <i class="fas fa-chevron-right ml-2"></i>
              </button>
            </div>

            <!-- Sélecteur d'éléments par page -->
            <div class="flex items-center space-x-2">
              <label class="text-sm text-gray-600">Discussions par page:</label>
              <select
                v-model="itemsPerPage"
                @change="resetPagination"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
          </div>

          <!-- Aucun Résultat -->
          <div
            v-if="filteredDiscussions.length === 0"
            class="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <i class="fas fa-comments text-5xl text-gray-300 mb-4"></i>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Aucune discussion trouvée</h3>
            <p class="text-gray-600 mb-6">Essayez d'ajuster vos critères de recherche ou créez une nouvelle discussion</p>
            <button
              @click="showNewDiscussionModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Créer une Discussion
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Nouvelle Discussion -->
    <div v-if="showNewDiscussionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <!-- En-tête -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">Nouvelle Discussion</h2>
            <button 
              @click="showNewDiscussionModal = false"
              class="text-white hover:text-blue-200 transition-colors"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <!-- Formulaire -->
        <div class="p-6 overflow-y-auto">
          <form @submit.prevent="createNewDiscussion" class="space-y-6">
            <!-- Titre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Titre de la discussion *
              </label>
              <input
                v-model="newDiscussion.title"
                type="text"
                required
                placeholder="Donnez un titre clair à votre discussion..."
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder-gray-400"
              >
            </div>

            <!-- Catégorie -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <select
                v-model="newDiscussion.category"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300"
              >
                <option value="">Sélectionnez une catégorie</option>
                <option 
                  v-for="category in categories.filter(c => c.id !== 'all')" 
                  :key="category.id" 
                  :value="category.name"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <!-- Tags -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span
                  v-for="tag in newDiscussion.tags"
                  :key="tag"
                  class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  #{{ tag }}
                  <button 
                    type="button"
                    @click="removeTag(tag)"
                    class="ml-1 text-blue-500 hover:text-blue-700"
                  >
                    <i class="fas fa-times text-xs"></i>
                  </button>
                </span>
              </div>
              <div class="flex gap-2">
                <input
                  v-model="tagInput"
                  type="text"
                  placeholder="Ajouter un tag..."
                  @keydown.enter.prevent="addTag"
                  class="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder-gray-400"
                >
                <button
                  type="button"
                  @click="addTag"
                  class="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <!-- Contenu -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Votre message *
              </label>
              <textarea
                v-model="newDiscussion.content"
                required
                rows="6"
                placeholder="Décrivez votre question ou le sujet de discussion en détail..."
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder-gray-400 resize-none"
              ></textarea>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="showNewDiscussionModal = false"
                class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="!isFormValid"
                :class="[
                  'flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium transition-all duration-300',
                  isFormValid 
                    ? 'hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                    : 'opacity-50 cursor-not-allowed'
                ]"
              >
                <i class="fas fa-paper-plane mr-2"></i>
                Publier la Discussion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <FooterComponent/>

    <!-- Toast de confirmation -->
    <div
      v-if="showToast"
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300"
      :class="toastClass"
    >
      <div class="flex items-center gap-2">
        <i class="fas fa-check-circle"></i>
        <span>{{ toastMessage }}</span>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'

// Données réactives
const searchQuery = ref('')
const activeCategory = ref('all')
const activeStatus = ref('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(5)
const showNewDiscussionModal = ref(false)
const tagInput = ref('')
const showToast = ref(false)
const toastMessage = ref('')
const toastClass = ref('')

// Nouvelle discussion
const newDiscussion = ref({
  title: '',
  category: '',
  tags: [] as string[],
  content: ''
})

// Données
const stats = ref({
  discussions: 142,
  messages: 856,
  members: 89,
  online: 12
})

const categories = [
  { id: 'all', name: 'Toutes les discussions', count: 142 },
  { id: 'methodology', name: 'Méthodologie', count: 23 },
  { id: 'funding', name: 'Financement', count: 45 },
  { id: 'publication', name: 'Publication', count: 18 },
  { id: 'events', name: 'Événements', count: 32 },
  { id: 'general', name: 'Général', count: 24 }
]

const statusFilters = [
  { id: 'all', name: 'Tous les statuts', icon: 'fas fa-layer-group' },
  { id: 'active', name: 'Actives', icon: 'fas fa-comments' },
  { id: 'resolved', name: 'Résolues', icon: 'fas fa-check-circle' },
  { id: 'popular', name: 'Populaires', icon: 'fas fa-fire' }
]

const onlineUsers = [
  { id: 1, name: 'Dr. Marie Koffi', role: 'Directrice de Recherche', initials: 'MK' },
  { id: 2, name: 'Prof. Jean Diallo', role: 'Chercheur Senior', initials: 'JD' },
  { id: 3, name: 'Dr. Sarah M.', role: 'Post-doctorante', initials: 'SM' },
  { id: 4, name: 'Dr. Paul Mobutu', role: 'Expert Finance', initials: 'PM' }
]

const popularTags = ['PME', 'Financement', 'RDC', 'Recherche', 'Données', 'Analyse', 'Méthodologie', 'Publication']

const discussions = ref([
  {
    id: 1,
    title: "Meilleures pratiques pour l'analyse des données financières des PME congolaises",
    excerpt: "Je cherche des conseils sur les méthodes d'analyse les plus adaptées pour les données financières des petites entreprises en contexte africain. Quelles approches statistiques recommandez-vous ?",
    category: "Méthodologie",
    author: { name: "Dr. Marie Koffi", initials: "MK" },
    replies: 12,
    views: 145,
    lastActivity: "Il y a 2 heures",
    status: "active",
    tags: ["Analyse", "Données", "Statistiques", "PME"]
  },
  {
    id: 2,
    title: "Impact des fintechs sur l'accès au crédit des PME en Afrique subsaharienne",
    excerpt: "Discussion sur l'émergence des plateformes fintech et leur rôle dans la démocratisation du crédit aux PME. Retours d'expérience et études de cas bienvenus.",
    category: "Financement",
    author: { name: "Prof. Jean Diallo", initials: "JD" },
    replies: 8,
    views: 98,
    lastActivity: "Il y a 5 heures",
    status: "active",
    tags: ["Fintech", "Crédit", "Innovation", "Digital"]
  },
  {
    id: 3,
    title: "Stratégies de publication dans des revues scientifiques internationales",
    excerpt: "Partagez vos expériences et conseils pour publier des recherches sur le financement des PME dans des revues indexées de renom.",
    category: "Publication",
    author: { name: "Dr. Sarah M.", initials: "SM" },
    replies: 15,
    views: 203,
    lastActivity: "Il y a 1 jour",
    status: "resolved",
    tags: ["Publication", "Recherche", "Académique"]
  },
  {
    id: 4,
    title: "Appel à participation : Colloque international sur les PME africaines",
    excerpt: "Présentation du prochain colloque et appel à contributions. Date limite pour soumettre vos abstracts : 30 novembre 2024.",
    category: "Événements",
    author: { name: "Dr. Paul Mobutu", initials: "PM" },
    replies: 23,
    views: 187,
    lastActivity: "Il y a 2 jours",
    status: "active",
    tags: ["Colloque", "Événement", "Réseautage"]
  },
  {
    id: 5,
    title: "Défis spécifiques du financement des PME manufacturières en RDC",
    excerpt: "Échange sur les obstacles particuliers rencontrés par les PME du secteur manufacturier dans l'accès au financement en RDC.",
    category: "Financement",
    author: { name: "Dr. Alain Ilunga", initials: "AI" },
    replies: 6,
    views: 76,
    lastActivity: "Il y a 3 jours",
    status: "active",
    tags: ["Manufacturier", "RDC", "Défis"]
  }
])

// Propriétés calculées
const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' || activeCategory.value !== 'all' || activeStatus.value !== 'all'
})

const isFormValid = computed(() => {
  return newDiscussion.value.title && newDiscussion.value.category && newDiscussion.value.content
})

const filteredDiscussions = computed(() => {
  let filtered = discussions.value

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(discussion => 
      discussion.title.toLowerCase().includes(query) ||
      discussion.excerpt.toLowerCase().includes(query) ||
      discussion.tags.some(tag => tag.toLowerCase().includes(query)) ||
      discussion.author.name.toLowerCase().includes(query)
    )
  }

  // Filtre par catégorie
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(discussion => 
      discussion.category.toLowerCase() === activeCategory.value
    )
  }

  // Filtre par statut
  if (activeStatus.value !== 'all') {
    filtered = filtered.filter(discussion => 
      discussion.status === activeStatus.value
    )
  }

  // Tri
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => b.id - a.id)
      break
    case 'popular':
      filtered.sort((a, b) => b.views - a.views)
      break
    case 'replies':
      filtered.sort((a, b) => b.replies - a.replies)
      break
    case 'views':
      filtered.sort((a, b) => b.views - a.views)
      break
  }

  return filtered
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredDiscussions.value.length / itemsPerPage.value))

const paginatedDiscussions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredDiscussions.value.slice(start, end)
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)

const endIndex = computed(() => {
  const end = startIndex.value + itemsPerPage.value
  return end > filteredDiscussions.value.length ? filteredDiscussions.value.length : end
})

// Pages visibles pour la pagination
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  const delta = 2

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      pages.push(i)
    }
  }
  return pages
})

const showLeftEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[0] > 1
})

const showRightEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[visiblePages.value.length - 1] < totalPages.value
})

// Méthodes
const getCategoryName = (categoryId: string) => {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : categoryId
}

const getStatusName = (statusId: string) => {
  const status = statusFilters.find(s => s.id === statusId)
  return status ? status.name : statusId
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active': return 'Active'
    case 'resolved': return 'Résolue'
    case 'popular': return 'Populaire'
    default: return status
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  activeCategory.value = 'all'
  activeStatus.value = 'all'
  resetPagination()
}

const resetPagination = () => {
  currentPage.value = 1
}

const openDiscussion = (discussionId: number) => {
  console.log(`Ouverture de la discussion ${discussionId}`)
  showToastMessage('Redirection vers la discussion...', 'bg-blue-500')
  // Navigation vers la page de détail de la discussion
  // router.push(`/forum/discussions/${discussionId}`)
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

const searchByTag = (tag: string) => {
  searchQuery.value = tag
  resetPagination()
}

const startChat = (user: any) => {
  console.log(`Démarrage d'une conversation avec ${user.name}`)
  showToastMessage(`Ouverture du chat avec ${user.name}`, 'bg-green-500')
}

const addTag = () => {
  if (tagInput.value.trim() && !newDiscussion.value.tags.includes(tagInput.value.trim())) {
    newDiscussion.value.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const removeTag = (tag: string) => {
  newDiscussion.value.tags = newDiscussion.value.tags.filter(t => t !== tag)
}

const createNewDiscussion = () => {
  if (!isFormValid.value) return

  const newDiscussionData = {
    id: Math.max(...discussions.value.map(d => d.id)) + 1,
    title: newDiscussion.value.title,
    excerpt: newDiscussion.value.content.substring(0, 150) + '...',
    category: newDiscussion.value.category,
    author: { name: "Vous", initials: "VO" }, // Simuler l'utilisateur connecté
    replies: 0,
    views: 0,
    lastActivity: "À l'instant",
    status: "active",
    tags: newDiscussion.value.tags
  }

  discussions.value.unshift(newDiscussionData)
  stats.value.discussions++
  
  // Réinitialiser le formulaire
  newDiscussion.value = {
    title: '',
    category: '',
    tags: [],
    content: ''
  }
  
  showNewDiscussionModal.value = false
  showToastMessage('Discussion créée avec succès!', 'bg-green-500')
  resetPagination()
}

const showToastMessage = (message: string, bgColor: string) => {
  toastMessage.value = message
  toastClass.value = `${bgColor} translate-x-0 opacity-100`
  showToast.value = true
  
  setTimeout(() => {
    toastClass.value = `${bgColor} translate-x-full opacity-0`
    setTimeout(() => {
      showToast.value = false
    }, 300)
  }, 3000)
}

// Cycle de vie
onMounted(() => {
  // Initialisation si nécessaire
})
</script>

<style scoped>
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-2 {
  transform: translateX(0.5rem);
}

/* Transitions douces */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Animation du toast */
.fixed {
  transition: all 0.3s ease-in-out;
}
</style>