<template>
  <section class="py-10 sm:py-14 lg:py-20 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/20 relative overflow-hidden">
    <!-- Éléments décoratifs animés -->
    <div class="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-blue-200/20 rounded-full blur-3xl animate-float-slow"></div>
    <div class="absolute bottom-10 right-10 w-40 h-40 sm:w-64 sm:h-64 bg-blue-300/15 rounded-full blur-3xl animate-float-medium"></div>
    <div class="absolute top-1/2 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-indigo-200/10 rounded-full blur-2xl animate-float-fast"></div>
    
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- En-tête -->
      <div class="text-center mb-10 sm:mb-12 lg:mb-16 fade-in-up" data-animate>
          <div class="inline-flex items-center gap-2 text-blue-600 mb-4">
            <div class="w-8 sm:w-12 h-0.5 bg-blue-500"></div>
            <span class="text-xs sm:text-sm font-semibold tracking-wider uppercase">{{ $t('team.header') }}</span>
            <div class="w-8 sm:w-12 h-0.5 bg-blue-500"></div>
          </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
          {{ $t('team.title') }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700">{{ $t('team.titleHighlight') }}</span>
        </h2>
        <p class="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {{ $t('team.description') }}
        </p>
      </div>

      <!-- Grille des membres -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        <!-- Carte membre -->
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 fade-in-up stagger-item"
          :style="{ animationDelay: `${index * 150}ms` }"
          data-animate
        >
          <!-- Photo avec overlay -->
          <div class="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
            <img
              :src="member.photo"
              :alt="member.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <!-- Overlay gradient au survol -->
            <div class="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Badge de rôle -->
            <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full sm:rounded-xl shadow-lg z-10">
              <span class="text-xs sm:text-sm font-bold text-blue-600">{{ member.role }}</span>
            </div>

            <!-- Icône décorative -->
            <div class="absolute bottom-4 left-4 w-12 h-12 bg-blue-500/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <i class="fas fa-user-tie text-white text-lg"></i>
            </div>
          </div>

          <!-- Contenu -->
          <div class="p-5 sm:p-6 lg:p-8 relative">
            <!-- Nom -->
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {{ member.name }}
            </h3>
            
            <!-- Position -->
            <p class="text-blue-600 font-semibold text-sm sm:text-base mb-4 flex items-center">
              <i class="fas fa-briefcase mr-2 text-xs"></i>
              {{ member.position }}
            </p>

            <!-- Education -->
            <div class="mb-4 pb-4 border-b border-gray-100">
              <p class="text-gray-600 text-xs sm:text-sm flex items-center">
                <i class="fas fa-graduation-cap mr-2 text-blue-500"></i>
                {{ member.education }}
              </p>
            </div>

            <!-- Highlights -->
            <div class="space-y-2">
              <p class="text-xs sm:text-sm font-semibold text-gray-700 mb-2">{{ $t('team.highlights') }} :</p>
              <ul class="space-y-2">
                <li 
                  v-for="(highlight, hIndex) in member.highlights"
                  :key="hIndex"
                  class="text-xs sm:text-sm text-gray-600 flex items-start"
                >
                  <i class="fas fa-check-circle text-blue-500 mr-2 mt-0.5 flex-shrink-0 text-xs"></i>
                  <span class="leading-relaxed">{{ highlight }}</span>
                </li>
              </ul>
            </div>

            <!-- Bordure animée -->
            <div class="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-blue-400 transition-all duration-500 pointer-events-none"></div>
          </div>

          <!-- Effet de brillance au survol -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full pointer-events-none"></div>
        </div>
      </div>

   

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TeamMember } from '@/models'

import researchImage1 from '../assets/nsomuna.jpeg'
import researchImage2 from '../assets/president.jpeg'
import researchImage3 from '../assets/prof.jpeg'
const { t } = useI18n()

const teamMembers = ref<TeamMember[]>([
  {
    id: 1,
    name: "Olivier Witmeur",
    position: "Président du Conseil de Direction",
    role: "Président",
    photo: researchImage2,
    highlights: [
      "Professeur d'entrepreneuriat à la Solvay Brussels School of Economics and Management (ULB)",
      "Vice-Doyen de Solvay Brussels School Economics & Management (ULB)",
      "Fondateur de StartLAB.Brussels"
    ],
    education: "Doctorat en Entrepreneuriat (2008)",
    email: "olivier.witmeur@ulb.be"
  },
  {
    id: 2,
    name: "Justin Kamavuako",
    position: "Vice-Président du Conseil de Direction", 
    role: "Vice-Président",
    photo: researchImage3,
    highlights: [
      "Professeur des Universités (RDC)",
      "Expert en restructuration et croissance des PME en Afrique",
      "Spécialiste en entrepreneuriat"
    ],
    education: "Doctorat en sciences de gestion (2009)",
    email: "justin.kamavuako@university.edu"
  },
  {
    id: 3,
    name: "Jean Nsonsumuna",
    position: "Secrétaire du Conseil de Direction",
    role: "Secrétaire",
    photo: researchImage1,
    highlights: [
      "Professeur à l'Université Kongo",
      "Co-fondateur du Centre CReFF-PME",
      "Expert en finance entrepreneuriale"
    ],
    education: "Doctorat ULB (2024)",
    email: "jean.nsonsumuna@creff-pme.org"
  }
])

let observer: IntersectionObserver | null = null

const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && observer) {
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

@keyframes float-fast {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .stagger-item,
  .animate-float-slow,
  .animate-float-medium,
  .animate-float-fast {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
  
  .fade-in-up.animate-in,
  .stagger-item.animate-in {
    opacity: 1;
    transform: none;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .fade-in-up,
  .stagger-item {
    transform: translateY(20px);
    transition-duration: 0.6s;
  }
}
</style>
