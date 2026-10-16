<template>
  <header
    class="fixed z-[100] inset-x-0 top-0 transition-all duration-400 ease-out"
    :class="{ 'is-scrolled': isScrolled }"
  >
    <div
      class="nav-shell w-full border-b overflow-hidden transition-all duration-400"
      :class="headerSurfaceClass"
    >
      <div class="nav-topbar">
        <a
          href="https://www.google.com/maps/search/?api=1&query=Universit%C3%A9+Kongo+Mbanza-Ngungu"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-coord nav-coord-place min-w-0"
        >
          <span class="nav-coord-icon" aria-hidden="true"><i class="fas fa-map-marker-alt"></i></span>
          <span class="truncate">Université Kongo, Mbanza-Ngungu</span>
        </a>
        <div class="nav-topbar-links">
          <a href="tel:+243850593211" class="nav-coord">
            <span class="nav-coord-icon" aria-hidden="true"><i class="fas fa-phone"></i></span>
            <span>+243 85 059 32 11</span>
          </a>
          <span class="nav-coord-sep nav-coord-sep-alt" aria-hidden="true"></span>
          <a href="tel:+243980495273" class="nav-coord nav-coord-alt">
            <span class="nav-coord-icon" aria-hidden="true"><i class="fas fa-phone"></i></span>
            <span>+243 980 49 52 73</span>
          </a>
          <span class="nav-coord-sep" aria-hidden="true"></span>
          <a href="mailto:creff.pme.uk@gmail.com" class="nav-coord nav-coord-mail min-w-0">
            <span class="nav-coord-icon" aria-hidden="true"><i class="fas fa-envelope"></i></span>
            <span class="truncate">creff.pme.uk@gmail.com</span>
          </a>
        </div>
      </div>
      <div class="px-3 sm:px-5 lg:px-6">
        <div class="flex justify-between items-center h-16 sm:h-[4.5rem] lg:h-[4.85rem]">
          <!-- Logo -->
          <router-link
            to="/"
            class="nav-brand z-60 group relative flex-shrink-0 min-w-0"
            aria-label="CReFF-PME, accueil"
            @click="closeMobileMenu"
          >
            <span class="nav-logo-clip">
              <img
                :src="logoImage"
                alt="CReFF-PME"
                class="nav-logo-img"
              />
            </span>
          </router-link>

          <!-- Desktop Navigation -->
          <nav v-if="!isMobile" class="nav-desktop hidden lg:flex items-center gap-0.5 xl:gap-1">
            <router-link
              to="/"
              class="nav-link"
              :class="[navLinkTone, linkActiveClass(route.path === '/')]"
            >
              {{ $t('nav.home') }}
            </router-link>

            <router-link
              to="/about"
              class="nav-link"
              :class="[navLinkTone, linkActiveClass(route.path.includes('/about'))]"
            >
              {{ $t('nav.about') }}
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
                class="nav-link inline-flex items-center"
                :class="[
                  navLinkTone,
                  linkActiveClass(
                    route.path.includes('/recherche') ||
                      route.path.includes('/actualites') ||
                      route.path.includes('/evenements') ||
                      route.path.includes('/publications') ||
                      route.path.includes('/comite-scientifique') ||
                      activeDropdown === 'recherche'
                  ),
                ]"
              >
                {{ $t('nav.research') }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3.5 h-3.5 ml-1 transition-transform duration-300"
                  :class="{ 'rotate-180': activeDropdown === 'recherche' }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <transition
                enter-active-class="transition duration-250 ease-out"
                enter-from-class="opacity-0 -translate-y-2 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 -translate-y-2 scale-95"
              >
                <Teleport to="body">
                  <div
                    v-if="activeDropdown === 'recherche'"
                    class="fixed z-[9998]"
                    :style="{
                      top: dropdownStyle.top.replace('px', '') ? `${parseFloat(dropdownStyle.top) - 12}px` : '0px',
                      left: dropdownStyle.left,
                      width: '300px',
                      height: '12px',
                      pointerEvents: 'auto',
                    }"
                    @mouseenter="handleDropdownEnter"
                    @mouseleave="handleDropdownLeave"
                  ></div>
                  <div
                    v-if="activeDropdown === 'recherche'"
                    class="fixed w-[300px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-900/10 border border-blue-100/80 py-2 z-[9999] overflow-hidden"
                    :style="dropdownStyle"
                    @click.stop
                    @mouseenter="handleDropdownEnter"
                    @mouseleave="handleDropdownLeave"
                  >
                    <div class="px-4 py-2.5 border-b border-slate-100">
                      <span class="text-[11px] font-semibold text-blue-700/80 uppercase tracking-[0.14em]">
                        {{ $t('nav.researchDomains') }}
                      </span>
                    </div>
                    <div class="py-1.5">
                      <router-link
                        v-for="item in researchLinks"
                        :key="item.to"
                        :to="item.to"
                        class="nav-drop-link flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 group/item"
                        @click="closeDropdowns"
                      >
                        <span class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm group-hover/item:bg-blue-100 transition-colors">
                          <i :class="item.icon"></i>
                        </span>
                        <span class="text-sm font-medium">{{ $t(item.labelKey) }}</span>
                      </router-link>
                    </div>
                  </div>
                </Teleport>
              </transition>
            </div>

            <router-link
              to="/programme-entrepreneurs"
              class="nav-link"
              :class="[navLinkTone, linkActiveClass(route.path.includes('/programme-entrepreneurs'))]"
            >
              {{ $t('nav.entrepreneurs') }}
            </router-link>

            <router-link
              to="/contact"
              class="nav-link"
              :class="[navLinkTone, linkActiveClass(route.path.includes('/contact'))]"
            >
              {{ $t('nav.contact') }}
            </router-link>

            <div class="h-6 w-px mx-1.5 xl:mx-2 flex-shrink-0 bg-slate-200"></div>

            <!-- Langue -->
            <div
              ref="languageDropdownRef"
              class="relative group flex-shrink-0"
              @mouseenter="handleLanguageDropdownEnter"
              @mouseleave="handleLanguageDropdownLeave"
            >
              <button
                ref="languageButtonRef"
                @click.stop="toggleLanguageMenu"
                class="nav-link inline-flex items-center gap-1.5"
                :class="navLinkTone"
              >
                <i class="fas fa-globe text-xs opacity-80"></i>
                <span class="uppercase text-xs tracking-wide">{{ currentLocale }}</span>
                <i
                  class="fas fa-chevron-down text-[10px] transition-transform duration-300"
                  :class="{ 'rotate-180': showLanguageMenu }"
                ></i>
              </button>

              <transition
                enter-active-class="transition duration-250 ease-out"
                enter-from-class="opacity-0 -translate-y-2 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 -translate-y-2 scale-95"
              >
                <Teleport to="body">
                  <div
                    v-if="showLanguageMenu"
                    class="fixed z-[9998]"
                    :style="{
                      top: languageDropdownStyle.top.replace('px', '')
                        ? `${parseFloat(languageDropdownStyle.top) - 12}px`
                        : '0px',
                      right: languageDropdownStyle.right,
                      width: '148px',
                      height: '12px',
                      pointerEvents: 'auto',
                    }"
                    @mouseenter="handleLanguageDropdownEnter"
                    @mouseleave="handleLanguageDropdownLeave"
                  ></div>
                  <div
                    v-if="showLanguageMenu"
                    class="fixed w-[148px] bg-white/95 backdrop-blur-xl rounded-xl shadow-xl shadow-blue-900/10 border border-blue-100/80 py-1.5 z-[9999] overflow-hidden"
                    :style="languageDropdownStyle"
                    @click.stop
                    @mouseenter="handleLanguageDropdownEnter"
                    @mouseleave="handleLanguageDropdownLeave"
                  >
                    <button
                      @click="changeLanguage('fr')"
                      class="w-full px-3.5 py-2 text-left hover:bg-blue-50 transition-colors flex items-center justify-between text-sm"
                      :class="{ 'bg-blue-50 text-blue-700': currentLocale === 'fr' }"
                    >
                      <span>Français</span>
                      <i v-if="currentLocale === 'fr'" class="fas fa-check text-blue-600 text-xs"></i>
                    </button>
                    <button
                      @click="changeLanguage('en')"
                      class="w-full px-3.5 py-2 text-left hover:bg-blue-50 transition-colors flex items-center justify-between text-sm"
                      :class="{ 'bg-blue-50 text-blue-700': currentLocale === 'en' }"
                    >
                      <span>English</span>
                      <i v-if="currentLocale === 'en'" class="fas fa-check text-blue-600 text-xs"></i>
                    </button>
                  </div>
                </Teleport>
              </transition>
            </div>

            <router-link
              to="/authentification"
              class="ml-1 xl:ml-2 relative px-4 xl:px-5 py-2 text-sm font-semibold rounded-full flex items-center gap-2 whitespace-nowrap flex-shrink-0 transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/25 hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ $t('nav.login') }}</span>
            </router-link>
          </nav>

          <!-- Mobile Menu Button -->
          <button
            v-if="isMobile"
            type="button"
            class="nav-burger lg:hidden"
            :class="{ 'is-open': isMobileMenuOpen }"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="nav-mobile-menu"
            aria-label="Menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <button
        v-if="isMobile && isMobileMenuOpen"
        type="button"
        class="nav-backdrop"
        aria-label="Fermer le menu"
        @click="closeMobileMenu"
      ></button>
    </transition>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-350 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="isMobile && isMobileMenuOpen"
        id="nav-mobile-menu"
        class="nav-drawer lg:hidden overflow-y-auto custom-scrollbar"
      >
        <div class="nav-mobile-list px-3 pt-2 pb-4 sm:px-4 space-y-1">
          <p class="nav-drawer-label">Menu</p>
          <router-link
            to="/"
            class="mobile-link"
            :class="{ 'mobile-link-active': route.path === '/' }"
            @click="closeMobileMenu"
          >
            <span class="mobile-icon"><i class="fas fa-home"></i></span>
            {{ $t('nav.home') }}
          </router-link>

          <router-link
            to="/about"
            class="mobile-link"
            :class="{ 'mobile-link-active': route.path.includes('/about') }"
            @click="closeMobileMenu"
          >
            <span class="mobile-icon"><i class="fas fa-building"></i></span>
            {{ $t('nav.about') }}
          </router-link>

          <!-- Recherche accordion -->
          <div class="rounded-xl overflow-hidden">
            <button
              type="button"
              class="mobile-link w-full justify-between"
              :class="{ 'mobile-link-active': researchOpen || isResearchRoute }"
              @click="researchOpen = !researchOpen"
            >
              <span class="flex items-center gap-3">
                <span class="mobile-icon"><i class="fas fa-flask"></i></span>
                {{ $t('nav.research') }}
              </span>
              <i
                class="fas fa-chevron-down text-xs text-slate-400 transition-transform duration-300"
                :class="{ 'rotate-180 text-blue-600': researchOpen }"
              ></i>
            </button>
            <transition
              enter-active-class="transition duration-250 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-80"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 max-h-80"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="researchOpen" class="overflow-hidden pl-2 pb-1 space-y-0.5">
                <router-link
                  v-for="item in researchLinks"
                  :key="item.to"
                  :to="item.to"
                  class="mobile-link mobile-sublink"
                  :class="{ 'mobile-link-active': route.path.includes(item.to) }"
                  @click="closeMobileMenu"
                >
                  <span class="mobile-icon mobile-icon-sm"><i :class="item.icon"></i></span>
                  {{ $t(item.labelKey) }}
                </router-link>
              </div>
            </transition>
          </div>

          <router-link
            to="/programme-entrepreneurs"
            class="mobile-link"
            :class="{ 'mobile-link-active': route.path.includes('/programme-entrepreneurs') }"
            @click="closeMobileMenu"
          >
            <span class="mobile-icon"><i class="fas fa-lightbulb"></i></span>
            {{ $t('nav.entrepreneurs') }}
          </router-link>

          <router-link
            to="/contact"
            class="mobile-link"
            :class="{ 'mobile-link-active': route.path.includes('/contact') }"
            @click="closeMobileMenu"
          >
            <span class="mobile-icon"><i class="fas fa-envelope"></i></span>
            {{ $t('nav.contact') }}
          </router-link>

          <!-- Langue -->
          <div class="mt-3 px-2 pt-3 border-t border-slate-100">
            <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2.5 px-1">
              {{ $t('common.language') || 'Langue' }}
            </p>
            <div class="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100/80">
              <button
                @click="changeLanguage('fr')"
                class="py-2.5 rounded-lg text-sm font-semibold transition-all duration-250"
                :class="
                  currentLocale === 'fr'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                "
              >
                FR
              </button>
              <button
                @click="changeLanguage('en')"
                class="py-2.5 rounded-lg text-sm font-semibold transition-all duration-250"
                :class="
                  currentLocale === 'en'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                "
              >
                EN
              </button>
            </div>
          </div>

          <router-link
            to="/authentification"
            class="flex items-center justify-center gap-2 mx-1 mt-4 mb-1 px-5 py-3.5 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all duration-300"
            @click="closeMobileMenu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ $t('nav.login') }}
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
import logoImage from '../../assets/logoCreff-PME.jpeg'

const route = useRoute()
const { locale } = useI18n()

const isScrolled = ref(false)
const windowWidth = ref(window.innerWidth)
const isMobileMenuOpen = ref(false)
const researchOpen = ref(false)
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

const researchLinks = [
  { to: '/actualites', labelKey: 'nav.news', icon: 'fas fa-newspaper' },
  { to: '/evenements', labelKey: 'nav.events', icon: 'fas fa-calendar-alt' },
  { to: '/publications', labelKey: 'nav.publications', icon: 'fas fa-book-open' },
  { to: '/comite-scientifique', labelKey: 'nav.scientificCommittee', icon: 'fas fa-users' },
]

const currentLocale = computed(() => locale.value)
const isMobile = computed(() => windowWidth.value < 1024)
const isResearchRoute = computed(
  () =>
    route.path.includes('/actualites') ||
    route.path.includes('/evenements') ||
    route.path.includes('/publications') ||
    route.path.includes('/comite-scientifique')
)

const headerSurfaceClass = computed(() =>
  isScrolled.value
    ? 'bg-white border-slate-200/80 shadow-lg shadow-slate-900/8'
    : 'bg-white border-slate-200/70 shadow-md shadow-slate-900/5'
)

const navLinkTone = 'text-slate-600 hover:text-blue-600'

const linkActiveClass = (active: boolean) => (active ? 'nav-link-active text-blue-600' : '')

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

const handleScroll = () => {
  isScrolled.value = window.scrollY > 24
}

watch(isMobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (windowWidth.value >= 1024) {
    isMobileMenuOpen.value = false
    activeDropdown.value = null
  }
}

const toggleDropdown = (menu: string) => {
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

  if (rechercheButtonRef.value && rechercheButtonRef.value.contains(target)) {
    return
  }

  if (languageButtonRef.value && languageButtonRef.value.contains(target)) {
    return
  }

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

const handleDropdownEnter = () => {
  if (dropdownCloseTimer.value) {
    clearTimeout(dropdownCloseTimer.value)
    dropdownCloseTimer.value = null
  }
  activeDropdown.value = 'recherche'
  updateDropdownPosition()
}

const handleDropdownLeave = () => {
  if (dropdownCloseTimer.value) {
    clearTimeout(dropdownCloseTimer.value)
  }
  dropdownCloseTimer.value = setTimeout(() => {
    activeDropdown.value = null
    dropdownCloseTimer.value = null
  }, 200)
}

const handleLanguageDropdownEnter = () => {
  if (languageDropdownCloseTimer.value) {
    clearTimeout(languageDropdownCloseTimer.value)
    languageDropdownCloseTimer.value = null
  }
  showLanguageMenu.value = true
  updateLanguageDropdownPosition()
}

const handleLanguageDropdownLeave = () => {
  if (languageDropdownCloseTimer.value) {
    clearTimeout(languageDropdownCloseTimer.value)
  }
  languageDropdownCloseTimer.value = setTimeout(() => {
    showLanguageMenu.value = false
    languageDropdownCloseTimer.value = null
  }, 200)
}

const updateLanguageDropdownPosition = async () => {
  if (!languageButtonRef.value || !showLanguageMenu.value) return

  await nextTick()
  const rect = languageButtonRef.value.getBoundingClientRect()

  languageDropdownStyle.value = {
    top: `${rect.bottom + 12}px`,
    right: `${window.innerWidth - rect.right}px`,
  }
}

const updateDropdownPosition = async () => {
  if (!rechercheButtonRef.value || activeDropdown.value !== 'recherche') return

  await nextTick()
  const rect = rechercheButtonRef.value.getBoundingClientRect()

  dropdownStyle.value = {
    top: `${rect.bottom + 12}px`,
    left: `${rect.left}px`,
  }
}

watch([activeDropdown, isScrolled], () => {
  if (activeDropdown.value === 'recherche') {
    updateDropdownPosition()
  }
})

watch(
  () => windowWidth.value,
  () => {
    if (activeDropdown.value === 'recherche') {
      updateDropdownPosition()
    }
  }
)

watch([showLanguageMenu, isScrolled], () => {
  if (showLanguageMenu.value) {
    updateLanguageDropdownPosition()
  }
})

watch(
  () => windowWidth.value,
  () => {
    if (showLanguageMenu.value) {
      updateLanguageDropdownPosition()
    }
  }
)

watch(
  () => route.path,
  () => {
    closeMobileMenu()
    if (isResearchRoute.value) {
      researchOpen.value = true
    }
  }
)

onMounted(() => {
  if (isResearchRoute.value) {
    researchOpen.value = true
  }
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
  document.body.style.overflow = ''
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', closeDropdowns)
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
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

header {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.nav-topbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 2.45rem;
  padding: 0.3rem 0.75rem;
  background:
    linear-gradient(90deg, rgba(57, 110, 246, 0.22), transparent 32%),
    linear-gradient(180deg, #16345c 0%, #0c2340 100%);
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.72rem;
  letter-spacing: 0.012em;
}

.nav-topbar::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(191, 219, 254, 0.75) 20%, rgba(191, 219, 254, 0.75) 80%, transparent);
}

@media (min-width: 640px) {
  .nav-topbar {
    min-height: 2.55rem;
    padding: 0.3rem 1.25rem;
    font-size: 0.78rem;
  }
}

@media (min-width: 1024px) {
  .nav-topbar {
    padding-inline: 1.5rem;
  }
}

.nav-topbar-links {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  min-width: 0;
  margin-left: auto;
}

.nav-coord {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
  color: inherit;
  white-space: nowrap;
  border-radius: 999px;
  padding: 0.18rem 0.4rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-coord:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.nav-coord-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 999px;
  background: rgba(191, 219, 254, 0.16);
  flex-shrink: 0;
}

.nav-coord-icon i {
  font-size: 0.58rem;
  color: #dbeafe;
}

.nav-coord-sep {
  width: 1px;
  height: 0.7rem;
  background: rgba(255, 255, 255, 0.22);
  flex-shrink: 0;
}

.nav-coord-mail {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.nav-coord-mail:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.28);
}

@media (max-width: 639px) {
  .nav-coord-place {
    display: none;
  }
}

@media (max-width: 767px) {
  .nav-coord-alt,
  .nav-coord-sep-alt {
    display: none;
  }
}

.nav-shell {
  position: relative;
  z-index: 2;
}

.nav-burger {
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 0.8rem;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex-shrink: 0;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.nav-burger span {
  display: block;
  width: 1.15rem;
  height: 2px;
  border-radius: 999px;
  background: #0f2744;
  transition: transform 0.28s ease, opacity 0.2s ease;
}

.nav-burger.is-open {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.nav-burger.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.nav-burger.is-open span:nth-child(2) {
  opacity: 0;
}

.nav-burger.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.nav-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1;
  border: 0;
  background: rgba(8, 18, 38, 0.62);
}

.nav-drawer {
  position: relative;
  z-index: 2;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.14);
  max-height: min(78vh, 640px);
}

.nav-drawer-label {
  margin: 0.35rem 0.35rem 0.45rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #94a3b8;
}

@media (max-width: 639px) {
  .nav-topbar {
    min-height: 2.15rem;
    padding-inline: 0.55rem;
  }

  .nav-coord-mail {
    max-width: none;
  }
}

.nav-logo-clip {
  position: relative;
  display: block;
  height: 3.35rem;
  width: 9.55rem;
  overflow: hidden;
  flex-shrink: 0;
}

.nav-logo-img {
  position: absolute;
  width: 110.8%;
  height: auto;
  max-width: none;
  left: -6.65%;
  top: -85.8%;
}

@media (min-width: 640px) {
  .nav-logo-clip {
    height: 3.75rem;
    width: 10.65rem;
  }
}

@media (min-width: 1024px) {
  .nav-logo-clip {
    height: 4.25rem;
    width: 12.1rem;
  }
}

@media (max-width: 639px) {
  .nav-logo-clip {
    height: 2.75rem;
    width: 7.85rem;
  }
}

.nav-link {
  position: relative;
  padding: 0.5rem 0.85rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0;
  transition: color 0.25s ease;
  white-space: nowrap;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0.2rem 0.25rem;
  border-radius: 0.55rem;
  background: rgba(57, 110, 246, 0.08);
  opacity: 0;
  transform: scale(0.94);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.nav-link:hover::before,
.nav-link-active::before {
  opacity: 1;
  transform: scale(1);
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0.85rem;
  right: 0.85rem;
  bottom: 0.15rem;
  height: 2px;
  border-radius: 999px;
  background: #396ef6;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-link-active::after {
  transform: scaleX(1);
}

.nav-link-active {
  font-weight: 600;
  color: #2563eb;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 0.9rem;
  border-radius: 0.9rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: #334155;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.mobile-link:hover {
  background: #eff6ff;
  color: #2563eb;
}

.mobile-link-active {
  background: linear-gradient(90deg, #dbeafe 0%, #eff6ff 100%);
  color: #2563eb;
  box-shadow: inset 3px 0 0 #396ef6;
}

.mobile-sublink {
  font-size: 0.875rem;
  font-weight: 500;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
}

.mobile-icon {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 0.7rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  color: #396ef6;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.mobile-icon-sm {
  width: 1.85rem;
  height: 1.85rem;
  font-size: 0.75rem;
  border-radius: 0.55rem;
}

.mobile-link-active .mobile-icon {
  background: #bfdbfe;
  color: #2563eb;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 999px;
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .nav-link {
    font-size: 0.8125rem;
    padding-left: 0.65rem;
    padding-right: 0.65rem;
  }
}

@keyframes navRise {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes navSweep {
  from {
    transform: translateX(-120%);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  to {
    transform: translateX(420%);
    opacity: 0;
  }
}

.nav-topbar {
  transition: min-height 0.35s ease, padding 0.35s ease;
}

.nav-topbar::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 28%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  animation: navSweep 1.5s ease-out 0.35s 1 backwards;
  pointer-events: none;
}

.nav-topbar > *,
.nav-topbar-links > * {
  animation: navRise 0.55s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.nav-topbar-links > *:nth-child(1) { animation-delay: 0.08s; }
.nav-topbar-links > *:nth-child(2) { animation-delay: 0.14s; }
.nav-topbar-links > *:nth-child(3) { animation-delay: 0.18s; }
.nav-topbar-links > *:nth-child(4) { animation-delay: 0.22s; }
.nav-topbar-links > *:nth-child(5) { animation-delay: 0.26s; }

.is-scrolled .nav-topbar {
  min-height: 2.15rem;
  padding-top: 0.12rem;
  padding-bottom: 0.12rem;
}

.nav-brand {
  display: flex;
  align-items: center;
  line-height: 0;
  animation: navRise 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s backwards;
}

.nav-logo-clip {
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-brand:hover .nav-logo-clip {
  transform: scale(1.045);
}

.nav-coord-icon {
  transition: transform 0.25s ease, background 0.25s ease;
}

.nav-coord:hover .nav-coord-icon {
  transform: translateY(-1px) scale(1.12);
}

.nav-desktop > * {
  animation: navRise 0.55s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.nav-desktop > *:nth-child(1) { animation-delay: 0.08s; }
.nav-desktop > *:nth-child(2) { animation-delay: 0.13s; }
.nav-desktop > *:nth-child(3) { animation-delay: 0.18s; }
.nav-desktop > *:nth-child(4) { animation-delay: 0.23s; }
.nav-desktop > *:nth-child(5) { animation-delay: 0.28s; }
.nav-desktop > *:nth-child(6) { animation-delay: 0.32s; }
.nav-desktop > *:nth-child(7) { animation-delay: 0.36s; }
.nav-desktop > *:nth-child(8) { animation-delay: 0.4s; }

.nav-drop-link {
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.25s ease;
}

.nav-drop-link:hover {
  transform: translateX(4px);
}

.nav-mobile-list > * {
  animation: navRise 0.42s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.nav-mobile-list > *:nth-child(1) { animation-delay: 0.04s; }
.nav-mobile-list > *:nth-child(2) { animation-delay: 0.08s; }
.nav-mobile-list > *:nth-child(3) { animation-delay: 0.12s; }
.nav-mobile-list > *:nth-child(4) { animation-delay: 0.16s; }
.nav-mobile-list > *:nth-child(5) { animation-delay: 0.2s; }
.nav-mobile-list > *:nth-child(6) { animation-delay: 0.24s; }
.nav-mobile-list > *:nth-child(7) { animation-delay: 0.28s; }

.mobile-icon {
  transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease;
}

.mobile-link:hover .mobile-icon {
  transform: scale(1.08);
}

@media (prefers-reduced-motion: reduce) {
  .nav-topbar > *,
  .nav-topbar-links > *,
  .nav-topbar::before,
  .nav-brand,
  .nav-desktop > *,
  .nav-mobile-list > * {
    animation: none;
  }

  .nav-logo-clip,
  .nav-coord-icon,
  .nav-topbar,
  .nav-drop-link,
  .mobile-icon {
    transition: none;
  }
}
</style>
