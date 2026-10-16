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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <button
          v-for="(member, index) in teamMembers"
          :key="member.id"
          type="button"
          class="team-card group relative flex min-h-[30rem] cursor-zoom-in flex-col justify-end overflow-hidden rounded-2xl text-left shadow-lg transition-shadow duration-500 hover:shadow-2xl fade-in-up stagger-item lg:min-h-[32rem]"
          :style="{ animationDelay: `${index * 150}ms` }"
          data-animate
          :aria-label="`Agrandir la photo de ${member.name}`"
          @click="openPhoto(index)"
        >
          <div class="absolute inset-0">
            <img
              :src="member.photo"
              :alt="member.name"
              class="h-full w-full object-cover object-[center_18%]"
            />
            <div class="team-shade absolute inset-0"></div>
          </div>

          <div class="relative z-10 p-6 text-white sm:p-7">
            <div
              class="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
              :class="member.accent.badge"
            >
              {{ member.role }}
            </div>
            <h3 class="text-2xl font-bold leading-tight sm:text-3xl">
              {{ member.name }}
            </h3>
            <p class="mt-3 text-sm font-medium sm:text-base" :class="member.accent.title">
              {{ member.position }}
            </p>
            <div
              v-if="member.highlights.length || member.education"
              class="mt-3 space-y-2 border-t border-white/20 pt-3 text-sm text-gray-200"
            >
              <p
                v-for="(highlight, hIndex) in member.highlights"
                :key="hIndex"
                class="leading-relaxed"
              >
                {{ highlight }}
              </p>
              <p v-if="member.education" class="pt-1 text-xs text-gray-300">
                <i class="fas fa-graduation-cap mr-2"></i>
                {{ member.education }}
              </p>
            </div>
          </div>
        </button>
      </div>

      <vue-easy-lightbox
        :visible="lightboxOpen"
        :imgs="lightboxImages"
        :index="lightboxIndex"
        :scroll-disabled="true"
        @hide="lightboxOpen = false"
      />

   

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import VueEasyLightbox from 'vue-easy-lightbox'
import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css'
import type { TeamMember } from '@/models'

import presidentPhoto from '../assets/president.jpeg'
import vicePresidentPhoto from '../assets/prof.jpeg'
import directorPhoto from '../assets/nsomuna.jpeg'
import secretaryPhoto from '../assets/eunice.jpeg'
import assistantPhoto from '../assets/glodi.jpg'

const { t } = useI18n()

type HomeTeamMember = TeamMember & {
  accent: { badge: string; title: string }
}

const teamMembers = computed<HomeTeamMember[]>(() => [
  {
    id: 1,
    name: t('about.aboutView.team.board.president.name'),
    position: t('about.aboutView.team.board.president.title'),
    role: t('about.aboutView.team.roles.president'),
    photo: presidentPhoto,
    highlights: [
      t('about.aboutView.team.board.president.item1'),
      t('about.aboutView.team.board.president.item2'),
      t('about.aboutView.team.board.president.item3')
    ],
    education: t('about.aboutView.team.board.president.education'),
    accent: { badge: 'bg-blue-600/90', title: 'text-blue-200' }
  },
  {
    id: 2,
    name: t('about.aboutView.team.board.vicePresident.name'),
    position: t('about.aboutView.team.board.vicePresident.title'),
    role: t('about.aboutView.team.roles.vicePresident'),
    photo: vicePresidentPhoto,
    highlights: [
      t('about.aboutView.team.board.vicePresident.item1'),
      t('about.aboutView.team.board.vicePresident.item2'),
      t('about.aboutView.team.board.vicePresident.item3')
    ],
    education: t('about.aboutView.team.board.vicePresident.education'),
    accent: { badge: 'bg-blue-600/90', title: 'text-blue-200' }
  },
  {
    id: 3,
    name: t('about.aboutView.team.board.secretary.name'),
    position: t('about.aboutView.team.board.secretary.title'),
    role: t('about.aboutView.team.roles.secretary'),
    photo: directorPhoto,
    highlights: [
      t('about.aboutView.team.board.secretary.item1'),
      t('about.aboutView.team.board.secretary.item2'),
      t('about.aboutView.team.board.secretary.item3')
    ],
    education: t('about.aboutView.team.board.secretary.education'),
    accent: { badge: 'bg-blue-600/90', title: 'text-blue-200' }
  },
  {
    id: 4,
    name: t('about.aboutView.team.management.secretary.name'),
    position: t('about.aboutView.team.management.secretary.title'),
    role: t('about.aboutView.team.roles.secretary'),
    photo: secretaryPhoto,
    highlights: [
      t('about.aboutView.team.management.secretary.item1'),
      t('about.aboutView.team.management.secretary.item2'),
      t('about.aboutView.team.management.secretary.item3')
    ],
    education: '',
    accent: { badge: 'bg-indigo-600/90', title: 'text-indigo-200' }
  },
  {
    id: 5,
    name: t('about.aboutView.team.management.logistics.name'),
    position: t('about.aboutView.team.management.logistics.title'),
    role: t('about.aboutView.team.roles.logistics'),
    photo: assistantPhoto,
    highlights: [],
    education: t('about.aboutView.team.management.logistics.education'),
    accent: { badge: 'bg-cyan-600/90', title: 'text-cyan-200' }
  }
])

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const lightboxImages = computed(() =>
  teamMembers.value.map((member) => ({
    src: member.photo,
    title: member.name
  }))
)

const openPhoto = (index: number) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

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

.team-shade {
  background: linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.28) 46%, rgba(15, 23, 42, 0) 68%);
}

:global(.vel-modal) {
  z-index: 10050;
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
