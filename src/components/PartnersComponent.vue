<template>
  <section ref="sectionRef" class="partners-section relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-white">
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
    <div class="absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-blue-50/60 blur-3xl pointer-events-none"></div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="reveal text-center mb-12 sm:mb-16 max-w-2xl mx-auto"
        :class="{ 'is-visible': isVisible }"
      >
        <h2 class="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 tracking-tight leading-tight mb-4">
          {{ $t('partners.title') }}
          <span class="text-blue-600">{{ $t('partners.titleHighlight') }}</span>
        </h2>
        <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
          {{ $t('partners.description') }}
        </p>
      </div>

      <div
        class="reveal delay-1 grid sm:grid-cols-2 gap-6 lg:gap-8"
        :class="{ 'is-visible': isVisible }"
      >
        <a
          v-for="(partner, index) in partners"
          :key="partner.id"
          :href="partner.website"
          target="_blank"
          rel="noopener noreferrer"
          class="partner-card group"
          :style="{ transitionDelay: `${120 + index * 80}ms` }"
        >
          <div class="partner-logo-box">
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="partner-logo"
            />
          </div>
          <div class="partner-body">
            <h3 class="partner-name">{{ partner.name }}</h3>
            <p class="partner-desc">{{ partner.description }}</p>
            <span class="partner-link">
              Visiter
              <i class="fas fa-arrow-right text-xs ml-1.5 transition-transform duration-300 group-hover:translate-x-1"></i>
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Partner } from '@/models'
import solvayLogo from '../assets/solvay.jpeg'
import aresLogo from '../assets/ares.jpeg'

const partners = ref<Partner[]>([
  {
    id: 1,
    name: 'Solvay Brussels School',
    description: 'Economics & Management (ULB)',
    logo: solvayLogo,
    type: 'academic',
    active: true,
    website: 'https://www.solvay.edu',
    email: 'contact@solvay.edu'
  },
  {
    id: 2,
    name: 'ARES',
    description: "Académie de Recherche et d'Enseignement Supérieur (Belgique)",
    logo: aresLogo,
    type: 'institutional',
    active: true,
    website: 'https://www.ares-ac.be',
    email: 'info@ares-ac.be'
  }
])

const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.15, rootMargin: '-40px' }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.partners-section {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.delay-1 { transition-delay: 100ms; }

.partner-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-decoration: none;
  border-radius: 1.5rem;
  border: 1px solid #e2e8f0;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 55%);
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.partner-card:hover {
  border-color: #bfdbfe;
  box-shadow: 0 16px 40px rgba(37, 99, 235, 0.1);
  transform: translateY(-4px);
}

.partner-logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9.5rem;
  padding: 1.75rem;
  background: #fff;
  border-bottom: 1px solid #f1f5f9;
}

.partner-logo {
  max-height: 100%;
  max-width: 70%;
  object-fit: contain;
  filter: grayscale(0.25);
  transition: filter 0.3s ease, transform 0.3s ease;
}

.partner-card:hover .partner-logo {
  filter: grayscale(0);
  transform: scale(1.04);
}

.partner-body {
  padding: 1.35rem 1.5rem 1.5rem;
}

.partner-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
  margin-bottom: 0.4rem;
  transition: color 0.25s ease;
}

.partner-card:hover .partner-name {
  color: #2563eb;
}

.partner-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.partner-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: #396ef6;
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .partner-card:hover {
    transform: none;
  }
}
</style>
