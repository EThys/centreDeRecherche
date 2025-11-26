<template>
  <NavBarComponent />
  
  <!-- Hero Section - Image pleine largeur avec contenu superposé -->
  <div v-if="publication" class="relative w-full h-screen max-h-[90vh] overflow-hidden">
    <!-- Image de fond -->
    <div class="absolute inset-0">
      <img
        :src="publication.coverImage"
        :alt="publication.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
    </div>
    <div class="absolute inset-0 flex flex-col justify-end z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 text-white">
        <div class="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
          <span :class="[
            'text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg backdrop-blur-sm',
            publication.type === 'article' ? 'bg-green-500/90 text-white' :
            publication.type === 'thesis' ? 'bg-blue-500/90 text-white' :
            publication.type === 'conference' ? 'bg-blue-500/90 text-white' :
            'bg-blue-500/90 text-white'
          ]">
            {{ getTypeLabel(publication.type) }}
          </span>
          <span class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30 flex items-center">
            <i class="far fa-calendar-alt mr-2"></i>
            {{ formatDate(publication.publicationDate) }}
          </span>
          <span class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30 flex items-center">
            <i class="fas fa-quote-right mr-2"></i>
            {{ publication.citations }} citations
          </span>
          <span class="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/30">
            {{ publication.journal }}
          </span>
        </div>

        <!-- Titre -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
          {{ publication.title }}
        </h1>

        <!-- Auteurs -->
        <div class="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
          <span class="text-white/80 text-xs sm:text-sm">Par :</span>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(author, index) in publication.authors" 
              :key="author"
              class="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-white/30 transition-colors"
            >
              <i class="fas fa-user-circle mr-1.5"></i>
              {{ author }}
            </span>
          </div>
        </div>

        <!-- DOI -->
        <div class="mb-6 sm:mb-8">
          <span class="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-mono border border-white/30">
            DOI: {{ publication.doi }}
          </span>
        </div>


        <div class="flex flex-wrap items-center gap-3 sm:gap-4">
          <router-link 
            to="/actualites" 
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg sm:rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg group"
          >
            <i class="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            <span class="text-sm sm:text-base">Retour</span>
          </router-link>
          <button 
            @click="toggleBookmark"
            :class="[
              'flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 backdrop-blur-sm shadow-lg',
              isBookmarked 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
            ]"
          >
            <i :class="isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'"></i>
            <span class="text-sm sm:text-base">{{ isBookmarked ? 'Sauvegardé' : 'Sauvegarder' }}</span>
          </button>
          <button 
            @click="sharePublication"
            class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg sm:rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg"
          >
            <i class="fas fa-share-alt"></i>
            <span class="text-sm sm:text-base">Partager</span>
          </button>
          <button class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg">
            <i class="fas fa-download"></i>
            <span class="text-sm sm:text-base">Télécharger PDF</span>
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
  <main class="min-h-screen bg-white">
    <div v-if="publication" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="space-y-6 sticky top-24">
            <!-- Journal et DOI -->
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-200 fade-in-right" data-animate>
              <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <i class="fas fa-book-open mr-2 text-blue-500"></i>
                Journal
              </h3>
              <p class="text-base font-semibold text-gray-900 mb-2">
                {{ publication.journal }}
              </p>
              <p class="text-gray-600 text-xs break-all">
                DOI: <span class="font-mono text-blue-600">{{ publication.doi }}</span>
              </p>
            </div>

            <!-- Métriques -->
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-200 fade-in-right" data-animate>
              <h3 class="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                <i class="fas fa-chart-line mr-2 text-blue-500"></i>
                Métriques
              </h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div class="flex items-center">
                    <i class="fas fa-quote-right text-blue-500 mr-2"></i>
                    <span class="text-sm text-gray-700">Citations</span>
                  </div>
                  <span class="font-bold text-blue-600 text-lg">{{ publication.citations }}</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div class="flex items-center">
                    <i class="fas fa-file-alt text-green-500 mr-2"></i>
                    <span class="text-sm text-gray-700">Pages</span>
                  </div>
                  <span class="font-bold text-green-600 text-lg">15</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div class="flex items-center">
                    <i class="fas fa-tags text-blue-500 mr-2"></i>
                    <span class="text-sm text-gray-700">Mots-clés</span>
                  </div>
                  <span class="font-bold text-blue-600 text-lg">{{ publication.domains.length }}</span>
                </div>
              </div>
            </div>

            <!-- Domaines -->
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-200 fade-in-right" data-animate>
              <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <i class="fas fa-tags mr-2 text-blue-500"></i>
                Domaines
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="domain in publication.domains"
                  :key="domain"
                  class="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  {{ domain }}
                </span>
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
            <!-- Résumé -->
            <section class="mb-10 pb-10 border-b border-gray-200 fade-in-up" data-animate>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-file-alt mr-3 text-blue-500"></i>
                Résumé
              </h2>
              <p class="text-gray-700 leading-relaxed text-base sm:text-lg">
                {{ publication.abstract }}
              </p>
            </section>

            <!-- Introduction -->
            <section class="mb-10 pb-10 border-b border-gray-200 fade-in-up" data-animate>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-play-circle mr-3 text-green-500"></i>
                Introduction
              </h2>
              <div class="text-gray-700 leading-relaxed text-base">
                <p class="mb-4">
                  Cette recherche s'inscrit dans le contexte du financement des PME en République Démocratique du Congo, 
                  un enjeu crucial pour le développement économique du pays. Malgré leur importance dans l'économie nationale, 
                  les PME congolaises font face à des défis persistants dans l'accès au financement.
                </p>
                <p>
                  L'étude vise à identifier les principaux obstacles structurels et institutionnels qui entravent 
                  l'accès des PME aux services financiers formels, et à proposer des solutions adaptées au contexte local.
                </p>
              </div>
            </section>

            <!-- Méthodologie -->
            <section class="mb-10 pb-10 border-b border-gray-200 fade-in-up" data-animate>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-flask mr-3 text-blue-500"></i>
                Méthodologie
              </h2>
              <div class="text-gray-700 leading-relaxed text-base">
                <p class="mb-6">
                  Notre approche méthodologique combine des méthodes quantitatives et qualitatives pour offrir 
                  une analyse complète du paysage financier des PME en RDC.
                </p>
                
                <div class="bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl p-6 mb-6 fade-in-up" data-animate>
                  <h3 class="text-xl font-semibold mb-4 text-gray-900">Échantillon et Collecte de Données</h3>
                  <ul class="space-y-3">
                    <li class="flex items-start stagger-item" :style="{ animationDelay: '100ms' }" data-animate>
                      <i class="fas fa-check-circle text-blue-500 mt-1 mr-3 flex-shrink-0"></i>
                      <span>Enquête quantitative auprès de <strong>500 PME</strong> réparties dans 5 provinces</span>
                    </li>
                    <li class="flex items-start stagger-item" :style="{ animationDelay: '200ms' }" data-animate>
                      <i class="fas fa-check-circle text-blue-500 mt-1 mr-3 flex-shrink-0"></i>
                      <span>Entretiens approfondis avec <strong>30 dirigeants</strong> de PME</span>
                    </li>
                    <li class="flex items-start stagger-item" :style="{ animationDelay: '300ms' }" data-animate>
                      <i class="fas fa-check-circle text-blue-500 mt-1 mr-3 flex-shrink-0"></i>
                      <span>Analyse documentaire des politiques financières</span>
                    </li>
                    <li class="flex items-start stagger-item" :style="{ animationDelay: '400ms' }" data-animate>
                      <i class="fas fa-check-circle text-blue-500 mt-1 mr-3 flex-shrink-0"></i>
                      <span>Revue de la littérature scientifique internationale</span>
                    </li>
                  </ul>
                </div>

                <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-900">Analyse des Données</h3>
                <p>
                  Les données ont été analysées à l'aide de modèles de régression logistique et d'analyse thématique 
                  pour les données qualitatives.
                </p>
              </div>
            </section>

            <!-- Résultats -->
            <section class="mb-10 pb-10 border-b border-gray-200 fade-in-up" data-animate>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-chart-bar mr-3 text-blue-500"></i>
                Résultats Principaux
              </h2>
              <div class="text-gray-700 leading-relaxed text-base">
                <p class="mb-6">
                  Les résultats de notre étude révèlent plusieurs tendances significatives concernant 
                  l'accès au financement des PME en RDC.
                </p>

                <div class="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-xl p-6 sm:p-8 border-l-4 border-blue-500 fade-in-up" data-animate>
                  <h3 class="text-xl font-semibold mb-6 text-gray-900 flex items-center">
                    <i class="fas fa-star text-blue-500 mr-2"></i>
                    Points Clés
                  </h3>
                  <ul class="space-y-4">
                    <li class="flex items-start stagger-item" :style="{ animationDelay: '100ms' }" data-animate>
                      <div class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                        <i class="fas fa-check text-white text-sm"></i>
                      </div>
                      <div>
                        <span class="text-base leading-relaxed">
                          <strong class="text-gray-900">78% des PME</strong> interrogées rapportent des difficultés d'accès au crédit bancaire
                        </span>
                      </div>
                    </li>
                    <li class="flex items-start stagger-item" :style="{ animationDelay: '200ms' }" data-animate>
                      <div class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                        <i class="fas fa-check text-white text-sm"></i>
                      </div>
                      <div>
                        <span class="text-base leading-relaxed">
                          <strong class="text-gray-900">45% des entreprises</strong> dépendent principalement de financement informel
                        </span>
                      </div>
                    </li>
                    <li class="flex items-start stagger-item" :style="{ animationDelay: '300ms' }" data-animate>
                      <div class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                        <i class="fas fa-check text-white text-sm"></i>
                      </div>
                      <div>
                        <span class="text-base leading-relaxed">
                          Les taux d'intérêt moyens s'élèvent à <strong class="text-gray-900">18% annuels</strong>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- Conclusion -->
            <section class="mb-10 pb-10 border-b border-gray-200 fade-in-up" data-animate>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-flag-checkered mr-3 text-red-500"></i>
                Conclusion et Recommandations
              </h2>
              <div class="text-gray-700 leading-relaxed text-base">
                <p class="mb-6">
                  Cette étude met en lumière la nécessité de réformes structurelles pour améliorer 
                  l'environnement financier des PME en RDC. Nos résultats suggèrent que l'amélioration 
                  de l'accès au financement passe par une approche multidimensionnelle.
                </p>

                <div class="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500 fade-in-up" data-animate>
                  <h3 class="text-xl font-semibold mb-4 text-gray-900">Recommandations :</h3>
                  <ol class="space-y-3 list-decimal list-inside">
                    <li class="stagger-item" :style="{ animationDelay: '100ms' }" data-animate>Renforcer les capacités des institutions financières locales</li>
                    <li class="stagger-item" :style="{ animationDelay: '200ms' }" data-animate>Développer des produits financiers adaptés aux PME</li>
                    <li class="stagger-item" :style="{ animationDelay: '300ms' }" data-animate>Améliorer l'environnement réglementaire</li>
                    <li class="stagger-item" :style="{ animationDelay: '400ms' }" data-animate>Promouvoir l'éducation financière des entrepreneurs</li>
                  </ol>
                </div>
              </div>
            </section>

            <!-- Références -->
            <section class="fade-in-up" data-animate>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-book mr-3 text-indigo-500"></i>
                Références Bibliographiques
              </h2>
              <div class="text-gray-700 leading-relaxed text-sm">
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-circle text-indigo-500 text-xs mt-2 mr-3 flex-shrink-0"></i>
                    <span>Banque Centrale du Congo (2023). Rapport sur le Secteur Financier</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-circle text-indigo-500 text-xs mt-2 mr-3 flex-shrink-0"></i>
                    <span>Organisation Mondiale du Commerce (2022). Financement des PME en Afrique</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-circle text-indigo-500 text-xs mt-2 mr-3 flex-shrink-0"></i>
                    <span>PNUD (2023). Développement Entrepreneurial en RDC</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-circle text-indigo-500 text-xs mt-2 mr-3 flex-shrink-0"></i>
                    <span>Ministère des PME (2022). Stratégie Nationale de Financement</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>

      <!-- Publications similaires -->
      <section v-if="relatedPublications.length > 0" class="mt-12 fade-in-up" data-animate>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
            <i class="fas fa-newspaper mr-3 text-blue-500"></i>
            Publications Similaires
          </h2>
          <router-link 
            to="/publications" 
            class="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors flex items-center"
          >
            Voir toutes
            <i class="fas fa-arrow-right ml-2"></i>
          </router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="(related, index) in relatedPublications"
            :key="related.id"
            @click="openPublication(related.id)"
            class="bg-white rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group fade-in-up stagger-item"
            :style="{ animationDelay: `${index * 100}ms` }"
            data-animate
          >
            <div class="h-40 relative overflow-hidden">
              <img
                :src="related.coverImage"
                :alt="related.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                {{ new Date(related.publicationDate).getFullYear() }}
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors leading-tight">
                {{ related.title }}
              </h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                {{ related.abstract }}
              </p>
              <div class="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                <span class="flex items-center">
                  <i class="fas fa-quote-right mr-1"></i>
                  {{ related.citations }} citations
                </span>
                <span class="text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Lire
                  <i class="fas fa-arrow-right ml-1"></i>
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>

    <!-- Loading State -->
    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
        <p class="text-gray-600">Chargement de la publication...</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'

const route = useRoute()
const router = useRouter()
const publication = ref(null)
const isBookmarked = ref(false)
let observer = null

// Données simulées
const allPublications = [
  {
    id: 1,
    title: "Analyse des Déterminants du Financement Bancaire des PME en RDC",
    abstract: "Cette étude examine les facteurs influençant l'accès au crédit bancaire pour les PME congolaises. Nous analysons les obstacles structurels et institutionnels qui limitent l'accès au financement formel, en nous appuyant sur une enquête quantitative et des entretiens qualitatifs avec les dirigeants d'entreprises.",
    authors: ["Dr. Jean Kabila", "Prof. Marie Lumumba", "Dr. Paul Mobutu"],
    journal: "Journal of African Business Studies",
    publicationDate: "2024-03-15",
    type: "article",
    domains: ["Finance Bancaire", "Accès au Crédit", "PME", "RDC"],
    citations: 24,
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    doi: "10.1234/jabs.2024.12345"
  },
  {
    id: 2,
    title: "Innovation Financière et Développement des PME en Afrique",
    abstract: "Une analyse approfondie des nouvelles solutions de financement pour les PME africaines...",
    authors: ["Dr. Sarah Mwamba", "Prof. David Koffi"],
    journal: "African Economic Review",
    publicationDate: "2024-01-20",
    type: "article",
    domains: ["Innovation", "Financement", "PME"],
    citations: 18,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    doi: "10.1234/aer.2024.12346"
  },
  {
    id: 3,
    title: "Politiques Publiques et Accès au Financement des PME",
    abstract: "Évaluation des politiques publiques visant à faciliter l'accès au financement...",
    authors: ["Dr. Pierre Tshisekedi"],
    journal: "Policy Studies Journal",
    publicationDate: "2023-11-10",
    type: "article",
    domains: ["Politiques Publiques", "Financement"],
    citations: 32,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    doi: "10.1234/psj.2023.12347"
  }
]

const publicationTypes = [
  { value: 'all', label: 'Tous', icon: 'fas fa-layer-group' },
  { value: 'article', label: 'Articles', icon: 'fas fa-newspaper' },
  { value: 'thesis', label: 'Thèses', icon: 'fas fa-graduation-cap' },
  { value: 'conference', label: 'Conférences', icon: 'fas fa-microphone' },
  { value: 'working-paper', label: 'Documents', icon: 'fas fa-file-contract' }
]

const relatedPublications = computed(() => {
  if (!publication.value) return []
  return allPublications
    .filter(p => p.id !== publication.value.id)
    .slice(0, 3)
})

const getTypeLabel = (type) => {
  const typeObj = publicationTypes.find(t => t.value === type)
  return typeObj ? typeObj.label : type
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
  const bookmarks = JSON.parse(localStorage.getItem('bookmarkedPublications') || '[]')
  const publicationId = parseInt(route.params.id)
  if (isBookmarked.value) {
    if (!bookmarks.includes(publicationId)) {
      bookmarks.push(publicationId)
      localStorage.setItem('bookmarkedPublications', JSON.stringify(bookmarks))
    }
  } else {
    const index = bookmarks.indexOf(publicationId)
    if (index > -1) {
      bookmarks.splice(index, 1)
      localStorage.setItem('bookmarkedPublications', JSON.stringify(bookmarks))
    }
  }
}

const sharePublication = () => {
  if (navigator.share) {
    navigator.share({
      title: publication.value.title,
      text: publication.value.abstract,
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Lien copié dans le presse-papiers!')
  }
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(publication.value.title)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank')
}

const shareOnTwitter = () => {
  const text = encodeURIComponent(`"${publication.value.title}" - ${publication.value.abstract}`)
  const url = encodeURIComponent(window.location.href)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
}

const openPublication = (publicationId) => {
  router.push(`/publications/${publicationId}`)
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
  const publicationId = parseInt(route.params.id)
  publication.value = allPublications.find(p => p.id === publicationId)
  const bookmarks = JSON.parse(localStorage.getItem('bookmarkedPublications') || '[]')
  isBookmarked.value = bookmarks.includes(publicationId)
  
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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
