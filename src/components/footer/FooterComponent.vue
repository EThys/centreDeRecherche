<template>
  <footer class="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
    <!-- Image de fond avec overlay -->
    <div class="absolute inset-0 z-0">
      <img 
        src="../../assets/carousel-4.jpg" 
        alt="Background Footer"
        class="w-full h-full object-cover opacity-20 transform scale-110"
      />
      <!-- Overlay bleu -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
      
      <!-- Éléments décoratifs animés -->
      <div class="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-float-slow"></div>
      <div class="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl animate-float-medium"></div>
      <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-300/10 rounded-full blur-2xl animate-float-fast"></div>
      <div class="absolute bottom-1/4 left-1/3 w-28 h-28 bg-cyan-300/10 rounded-full blur-2xl animate-float-slow"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <!-- Section principale du footer -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
        
        <!-- Colonne 1: Logo et description -->
        <div class="fade-in-up" data-delay="0">
          <div class="flex items-center mb-6 slide-in-left" data-delay="100">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <i class="fas fa-university text-white text-lg"></i>
            </div>
            <span class="text-xl font-bold text-white">CReFF-PME</span>
          </div>
          <p class="text-blue-100 leading-relaxed mb-6 fade-in-up" data-delay="200">
            Centre de Recherche et de Formation sur le Financement des PME en Afrique. 
            Nous œuvrons pour le développement économique grâce à la recherche appliquée 
            et la formation d'excellence.
          </p>
          <div class="flex space-x-4 fade-in-up" data-delay="300">
            <a 
              v-for="(social, index) in socialLinks"
              :key="social.name"
              :href="social.url"
              class="w-10 h-10 bg-white/10 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm"
              :style="`transition-delay: ${index * 100}ms`"
              target="_blank"
            >
              <i :class="social.icon" class="text-white text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Colonne 2: Liens rapides -->
        <div class="fade-in-up" data-delay="400">
          <h3 class="text-lg font-semibold text-white mb-6 flex items-center slide-in-up" data-delay="500">
            <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
            Liens Rapides
          </h3>
          <ul class="space-y-3">
            <li 
              v-for="(link, index) in quickLinks"
              :key="link.name"
              class="slide-in-left"
              :data-delay="600 + index * 100"
            >
              <router-link 
                :to="link.path"
                class="text-blue-100 hover:text-white transition-all duration-300 flex items-center group"
              >
                <div class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="group-hover:translate-x-2 transition-transform duration-300">{{ link.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Colonne 3: Contact -->
        <div class="fade-in-up" data-delay="800">
          <h3 class="text-lg font-semibold text-white mb-6 flex items-center slide-in-up" data-delay="900">
            <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
            Contact
          </h3>
          <ul class="space-y-4">
            <li 
              v-for="(contact, index) in contactInfo"
              :key="contact.type"
              class="flex items-start slide-in-right"
              :data-delay="1000 + index * 100"
            >
              <div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 mt-1 group-hover:bg-blue-500 transition-colors duration-300">
                <i :class="contact.icon" class="text-blue-300 text-sm"></i>
              </div>
              <div>
                <p class="text-blue-100 text-sm">{{ contact.value }}</p>
                <p class="text-blue-300/80 text-xs">{{ contact.label }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Colonne 4: Newsletter -->
        <div class="fade-in-up" data-delay="1200">
          <h3 class="text-lg font-semibold text-white mb-6 flex items-center slide-in-up" data-delay="1300">
            <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
            Newsletter
          </h3>
          <p class="text-blue-100 text-sm mb-4 fade-in-up" data-delay="1400">
            Restez informé de nos dernières recherches et événements.
          </p>
          <div class="space-y-3 fade-in-up" data-delay="1500">
            <input 
              type="email" 
              placeholder="Votre email"
              v-model="email"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
            >
            <button 
              @click="subscribeNewsletter"
              :disabled="!email"
              class="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              <span class="mr-2">S'abonner</span>
              <i class="fas fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Séparateur décoratif -->
      <div class="flex items-center justify-center my-12">
        <div class="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full expand-width" data-delay="1600"></div>
        <div class="mx-4 w-2 h-2 bg-cyan-400 rounded-full animate-bounce scale-in" data-delay="1700"></div>
        <div class="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full expand-width" data-delay="1600"></div>
      </div>

      <!-- Section bas du footer -->
      <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20 fade-in-up" data-delay="1800">
        <!-- Copyright -->
        <div class="text-blue-200 text-sm mb-4 md:mb-0 slide-in-left" data-delay="1900">
          <p>&copy; {{ currentYear }} CReFF-PME. Tous droits réservés.</p>
        </div>

        <!-- Liens légaux -->
        <div class="flex flex-wrap justify-center gap-6 slide-in-right" data-delay="2000">
          <a 
            v-for="(link, index) in legalLinks"
            :key="link.name"
            :href="link.url"
            class="text-blue-200 hover:text-white text-sm transition-colors duration-300 transform hover:scale-105"
            :style="`transition-delay: ${index * 100}ms`"
          >
            {{ link.name }}
          </a>
        </div>
      </div>

      <!-- Bouton back to top -->
      <button 
        @click="scrollToTop"
        class="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/20 fade-in-up"
        :class="{ 'opacity-0 translate-y-10': !showBackToTop }"
        data-delay="2100"
      >
        <i class="fas fa-chevron-up text-sm"></i>
      </button>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Données réactives
const email = ref('')
const showBackToTop = ref(false)
const currentYear = ref(new Date().getFullYear())

// Données du footer
const socialLinks = [
  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' },
  { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
  { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
  { name: 'YouTube', icon: 'fab fa-youtube', url: '#' }
]

const quickLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'À Propos', path: '/about' },
  { name: 'Recherche', path: '/research' },
  { name: 'Publications', path: '/publications' },
  { name: 'Événements', path: '/evenements' },
  { name: 'Contact', path: '/contact' }
]

const contactInfo = [
  { 
    type: 'address', 
    icon: 'fas fa-map-marker-alt', 
    value: '123 Avenue de la Recherche', 
    label: 'Kinshasa, RDC' 
  },
  { 
    type: 'phone', 
    icon: 'fas fa-phone', 
    value: '+243 81 234 5678', 
    label: 'Lun - Ven, 8h-17h' 
  },
  { 
    type: 'email', 
    icon: 'fas fa-envelope', 
    value: 'contact@creff-pme.org', 
    label: 'Nous répondons sous 24h' 
  }
]

const legalLinks = [
  { name: 'Politique de confidentialité', url: '#' },
  { name: 'Mentions légales', url: '#' },
  { name: 'Conditions d\'utilisation', url: '#' }
]

// Méthodes
const subscribeNewsletter = () => {
  if (email.value) {
    console.log('Inscription newsletter:', email.value)
    // Simulation d'envoi
    alert('Merci pour votre inscription à notre newsletter !')
    email.value = ''
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Gestion du bouton back to top
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 500
}

// Système d'animation
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

  // Observer tous les éléments avec des classes d'animation
  document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up, .scale-in, .expand-width').forEach(el => {
    observer.observe(el)
  })
}

// Cycle de vie
onMounted(() => {
  // Initialiser les animations
  setTimeout(() => {
    initScrollAnimations()
  }, 100)

  // Écouter le scroll pour le bouton back to top
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Animations d'apparition */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.slide-in-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-in-left.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.slide-in-right {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-in-right.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.slide-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.scale-in {
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.scale-in.animate-in {
  opacity: 1;
  transform: scale(1);
}

.expand-width {
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.expand-width.animate-in {
  opacity: 1;
  transform: scaleX(1);
}

/* Animations flottantes */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes float-medium {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes float-fast {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 4s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 3s ease-in-out infinite;
}

/* Animation de pulse */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Animation de rebond */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Délais personnalisés */
[data-delay="0"] { transition-delay: 0ms; }
[data-delay="100"] { transition-delay: 100ms; }
[data-delay="200"] { transition-delay: 200ms; }
[data-delay="300"] { transition-delay: 300ms; }
[data-delay="400"] { transition-delay: 400ms; }
[data-delay="500"] { transition-delay: 500ms; }
[data-delay="600"] { transition-delay: 600ms; }
[data-delay="700"] { transition-delay: 700ms; }
[data-delay="800"] { transition-delay: 800ms; }
[data-delay="900"] { transition-delay: 900ms; }
[data-delay="1000"] { transition-delay: 1000ms; }
[data-delay="1100"] { transition-delay: 1100ms; }
[data-delay="1200"] { transition-delay: 1200ms; }
[data-delay="1300"] { transition-delay: 1300ms; }
[data-delay="1400"] { transition-delay: 1400ms; }
[data-delay="1500"] { transition-delay: 1500ms; }
[data-delay="1600"] { transition-delay: 1600ms; }
[data-delay="1700"] { transition-delay: 1700ms; }
[data-delay="1800"] { transition-delay: 1800ms; }
[data-delay="1900"] { transition-delay: 1900ms; }
[data-delay="2000"] { transition-delay: 2000ms; }
[data-delay="2100"] { transition-delay: 2100ms; }

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .slide-in-left,
  .slide-in-right,
  .slide-in-up,
  .scale-in,
  .expand-width,
  .animate-float-slow,
  .animate-float-medium,
  .animate-float-fast,
  .animate-pulse,
  .animate-bounce {
    animation: none;
    transition: none;
    transform: none;
  }
  
  .fade-in-up.animate-in,
  .slide-in-left.animate-in,
  .slide-in-right.animate-in,
  .slide-in-up.animate-in,
  .scale-in.animate-in,
  .expand-width.animate-in {
    opacity: 1;
    transform: none;
  }
}

/* Optimisations pour mobile */
@media (max-width: 768px) {
  .fade-in-up,
  .slide-in-left,
  .slide-in-right,
  .slide-in-up {
    transform: translateY(20px) !important;
    transition-duration: 0.6s !important;
  }
  
  .slide-in-left { transform: translateX(-20px) !important; }
  .slide-in-right { transform: translateX(20px) !important; }
}

/* Amélioration des performances */
.transform {
  will-change: transform;
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Effets de brillance */
.shadow-2xl {
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

/* Transition pour le bouton back to top */
button {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>