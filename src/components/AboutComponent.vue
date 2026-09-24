<template>
  <section
    ref="sectionRef"
    class="about-section relative overflow-hidden py-16 sm:py-20 lg:py-24"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white pointer-events-none"></div>
    <div class="absolute -top-24 right-0 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-100/30 blur-3xl pointer-events-none"></div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <!-- Contenu -->
        <div class="lg:col-span-6 order-2 lg:order-1">
          <h2
            class="reveal text-2xl sm:text-3xl lg:text-[2.35rem] font-bold text-slate-900 leading-[1.2] tracking-tight mb-5"
            :class="{ 'is-visible': isVisible }"
          >
            {{ $t('about.title') }}
            <span class="block mt-1 text-blue-600">{{ $t('about.titleHighlight') }}</span>
          </h2>

          <p
            class="reveal delay-1 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl"
            :class="{ 'is-visible': isVisible }"
          >
            {{ $t('about.description') }}
          </p>

          <!-- Stats -->
          <div
            class="reveal delay-2 grid grid-cols-3 gap-3 sm:gap-5 mb-8 max-w-lg"
            :class="{ 'is-visible': isVisible }"
          >
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="stat-block"
            >
              <p class="text-2xl sm:text-3xl font-bold text-blue-700 tabular-nums count-up" :data-target="stat.value">
                0+
              </p>
              <p class="text-[11px] sm:text-xs font-medium text-slate-500 mt-1 uppercase tracking-wide leading-snug">
                {{ stat.label }}
              </p>
            </div>
          </div>

          <div class="reveal delay-3" :class="{ 'is-visible': isVisible }">
            <router-link
              to="/about"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-md shadow-blue-600/25 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {{ $t('about.cta') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Visuel -->
        <div class="lg:col-span-6 order-1 lg:order-2">
          <div
            class="reveal delay-2 relative"
            :class="{ 'is-visible': isVisible }"
          >
            <div class="relative aspect-[4/3] sm:aspect-[5/4] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/5">
              <img
                src="../assets/carousel-1.jpg"
                alt="Équipe du CReFF-PME"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-tr from-blue-900/25 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <div
              class="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-4 w-[42%] sm:w-[38%] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ring-4 ring-white"
            >
              <img
                src="../assets/carousel-4.jpeg"
                alt="Formation CReFF-PME"
                class="w-full h-full object-cover"
              />
            </div>

            <div
              class="hidden sm:flex absolute top-4 right-4 items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-md text-xs font-semibold text-slate-700"
            >
              <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              CReFF-PME
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isVisible = ref(false)
const hasCounted = ref(false)
const sectionRef = ref(null)
const observer = ref(null)

const stats = computed(() => [
  { value: 50, label: t('about.stats.projects') },
  { value: 100, label: t('about.stats.researchers') },
  { value: 15, label: t('about.stats.publications') }
])

const startCountUp = () => {
  if (hasCounted.value || !sectionRef.value) return
  hasCounted.value = true

  const countUpElements = sectionRef.value.querySelectorAll('.count-up')

  countUpElements.forEach((element) => {
    const target = parseInt(element.getAttribute('data-target') || '0', 10)
    const duration = 1600
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        element.textContent = target + '+'
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current) + '+'
      }
    }, 16)
  })
}

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      isVisible.value = true
      setTimeout(startCountUp, 450)
    }
  })
}

onMounted(() => {
  observer.value = new IntersectionObserver(handleIntersection, {
    threshold: 0.2,
    rootMargin: '-40px'
  })

  if (sectionRef.value) {
    observer.value.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.about-section {
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

.delay-1 { transition-delay: 80ms; }
.delay-2 { transition-delay: 160ms; }
.delay-3 { transition-delay: 240ms; }
.delay-4 { transition-delay: 320ms; }

.stat-block {
  padding: 0.75rem 0.5rem 0.75rem 0;
  border-left: 2px solid #bfdbfe;
  padding-left: 0.85rem;
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
