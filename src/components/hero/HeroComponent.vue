<template>
  <NavBarComponent/>
  <div class="hero-carousel h-screen relative overflow-hidden">
    <div
      class="carousel-container w-full h-full"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
    >
      <!-- Carousel Slides -->
      <div
        class="slides-container flex h-full"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slide-item w-full h-full flex-shrink-0 relative"
        >
          <!-- Gradient Overlay avec effet de profondeur -->
          <div class="gradient-overlay"></div>
          
          <!-- Image avec effet parallax -->
          <div class="image-container">
            <img
              :src="slide.image"
              class="slide-image"
              :class="{ active: currentSlide === index }"
              :alt="`Slide ${index + 1}: ${slide.title}`"
              loading="lazy"
            />
          </div>

          <!-- Contenu de la slide -->
          <div class="slide-content">
            <div class="content-wrapper">
              <div
                class="text-content"
                :class="{
                  visible: isContentVisible && currentSlide === index,
                  hidden: !isContentVisible || currentSlide !== index,
                }"
              >
                <!-- Badge académique -->
                <div class="academic-badge">
                
                </div>
                
                <h5 class="slide-pre-title">
                  {{ slide.title }} <span class="highlight-text">{{ slide.highlight }}</span>
                </h5>
                <h4 class="slide-title">
                  {{ slide.subtitle }}
                </h4>
                <p class="slide-description">
                  {{ slide.description }}
                </p>
                
                <!-- Bouton CTA amélioré -->
                <div class="cta-container">
                  <a :href="slide.ctaLink" class="cta-button">
                    <span class="button-text">{{ slide.cta }}</span>
                    <div class="button-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="cta-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contrôles du carousel -->
      <button class="carousel-control prev" @click="prevSlide" aria-label="Previous slide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="control-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button class="carousel-control next" @click="nextSlide" aria-label="Next slide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="control-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Indicateurs améliorés -->
      <div class="indicators-container">
        <div class="indicators-wrapper">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            :class="['indicator', { active: currentSlide === index }]"
            @click="goToSlide(index)"
            :aria-label="`Go to slide ${index + 1}`"
          >
            <span class="indicator-label">{{ index + 1 }}</span>
            <span class="progress-bar" v-if="currentSlide === index && !isHovering"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
//@ts-ignore
import NavBarComponent from '../../components/navbar/NavBarComponent.vue'

// Import des images (vous devrez ajouter ces images dans votre dossier assets)
import researchImage1 from '../../assets/carousel-1.jpg'
import researchImage2 from '../../assets/carousel-2.jpg'
import researchImage3 from '../../assets/carousel-3.jpg'
import researchImage4 from '../../assets/carousel-4.jpg'

const slides = ref([
  {
    title: 'Bienvenue au',
    highlight: 'CReFF-PME',
    subtitle: 'Centre de Recherche et de Formation sur le Financement des PME',
    description: 'Une initiative de l\'Université Kongo en partenariat avec l\'Université libre de Bruxelles pour renforcer la recherche sur l\'accès au financement des PME.',
    cta: 'Découvrir notre mission',
    ctaLink: '#mission',
    image: researchImage1
  },
  {
    title: 'Recrutement',
    highlight: 'Assistant(e)s Chercheurs',
    subtitle: 'Rejoignez notre équipe de recherche',
    description: 'Participez à nos projets de recherche, bénéficiez d\'un encadrement académique et d\'opportunités de collaboration internationale.',
    cta: 'Postuler maintenant',
    ctaLink: 'Candidature_CReFF_102211.html',
    image: researchImage2
  },
  {
    title: 'Formation et',
    highlight: 'Encadrement',
    subtitle: 'Encadrement des jeunes chercheurs',
    description: 'Nous accompagnons les jeunes chercheurs dans l\'élaboration de projets de thèse et favorisons le transfert de connaissances vers les entrepreneurs.',
    cta: 'Nos activités',
    ctaLink: '#activites',
    image: researchImage3
  },
  {
    title: 'Partenariat',
    highlight: 'International',
    subtitle: 'Collaboration Université Kongo - ULB',
    description: 'Un partenariat stratégique entre l\'Université Kongo et l\'Université libre de Bruxelles pour l\'excellence en recherche sur le financement des PME.',
    cta: 'En savoir plus',
    ctaLink: '#partenariat',
    image: researchImage4
  }
])

const currentSlide = ref(0)
const isHovering = ref(false)
const isTransitioning = ref(false)
const isContentVisible = ref(true)
let interval: number

const nextSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  isContentVisible.value = false

  setTimeout(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
    resetTimer()
    setTimeout(() => {
      isTransitioning.value = false
      isContentVisible.value = true
    }, 50)
  }, 600)
}

const prevSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  isContentVisible.value = false

  setTimeout(() => {
    currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
    resetTimer()
    setTimeout(() => {
      isTransitioning.value = false
      isContentVisible.value = true
    }, 50)
  }, 600)
}

const goToSlide = (index: number) => {
  if (isTransitioning.value || currentSlide.value === index) return
  isTransitioning.value = true
  isContentVisible.value = false

  setTimeout(() => {
    currentSlide.value = index
    resetTimer()
    setTimeout(() => {
      isTransitioning.value = false
      isContentVisible.value = true
    }, 50)
  }, 600)
}

const startAutoPlay = () => {
  isHovering.value = false
  interval = setInterval(nextSlide, 5000) // Réduit à 5 secondes pour un meilleur rythme
}

const stopAutoPlay = () => {
  isHovering.value = true
  if (interval) {
    clearInterval(interval)
  }
}

const resetTimer = () => {
  stopAutoPlay()
  if (!isHovering.value) {
    startAutoPlay()
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.hero-carousel {
  --primary-blue: #1e3a8a;
  --primary-light: #3b82f6;
  --primary-dark: #1e40af;
  --accent-yellow: #E5C95F;
  --accent-yellow-light: #fbbf24;
  --accent-green: #10b981;
  --accent-green-light: #34d399;
  --text-color: #ffffff;
  --light-text: #e2e8f0;
  --card-bg: rgba(255, 255, 255, 0.08); /* Réduit l'opacité */
  --transition-speed: 0.6s;
  --border-radius: 12px;
}

.carousel-container {
  position: relative;
  height: 100%;
}

.slides-container {
  transition: transform var(--transition-speed) cubic-bezier(0.33, 1, 0.68, 1);
  height: 100%;
}

.slide-item {
  position: relative;
  height: 100%;
}

/* Overlay avec dégradé réduit */
.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg, 
    rgba(30, 58, 138, 0.7) 0%, /* Opacité réduite */
    rgba(30, 64, 175, 0.5) 40%, /* Opacité réduite */
    rgba(16, 185, 129, 0.3) 100% /* Opacité réduite */
  );
  z-index: 1;
}

/* Effet de profondeur supplémentaire réduit */
.gradient-overlay::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25%; /* Hauteur réduite */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent); /* Opacité réduite */
  z-index: 1;
}

.image-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.15);
  transition: transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Animation plus lente */
  filter: brightness(0.9); /* Luminosité augmentée */
}

.slide-image.active {
  transform: scale(1);
}

.slide-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10%;
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.text-content {
  max-width: 650px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.text-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.text-content.hidden {
  opacity: 0;
  transform: translateY(30px);
}

/* Badge académique */
.academic-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  margin-bottom: 2rem;
}

.badge-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent-yellow);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.slide-pre-title {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--light-text);
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
  opacity: 0.9;
}

.highlight-text {
  color: var(--accent-yellow);
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}

.highlight-text::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px; /* Épaisseur réduite */
  background: linear-gradient(90deg, var(--accent-yellow), var(--accent-green));
  border-radius: 2px;
  opacity: 0.8; /* Opacité réduite */
}

.slide-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 2rem;
  line-height: 1.2;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
}

.slide-description {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.85); /* Opacité réduite */
  margin-bottom: 3rem;
  line-height: 1.7;
  font-weight: 300;
  max-width: 90%;
  background: var(--card-bg);
  backdrop-filter: blur(8px); /* Réduit le flou */
  padding: 1.5rem;
  border-radius: var(--border-radius);
  border-left: 3px solid var(--accent-green); /* Épaisseur réduite */
}

.cta-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, var(--accent-yellow), var(--accent-yellow-light));
  color: var(--primary-dark);
  padding: 1.125rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-decoration: none;
  font-size: 1.125rem;
  box-shadow: 0 8px 16px rgba(245, 158, 11, 0.2); /* Ombre réduite */
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent); /* Opacité réduite */
  transition: left 0.7s ease;
}

.cta-button:hover {
  background: linear-gradient(135deg, var(--accent-yellow-light), var(--accent-yellow));
  transform: translateY(-2px); /* Effet réduit */
  box-shadow: 0 12px 24px rgba(245, 158, 11, 0.3); /* Ombre réduite */
}

.cta-button:hover::before {
  left: 100%;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.75rem;
  transition: transform 0.3s ease;
}

.cta-button:hover .button-icon {
  transform: translateX(4px); /* Déplacement réduit */
}

.cta-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.1); /* Opacité réduite */
  backdrop-filter: blur(8px); /* Réduit le flou */
  border: 1px solid rgba(255, 255, 255, 0.08); /* Bordure plus subtile */
  color: white;
  width: 3.5rem; /* Taille réduite */
  height: 3.5rem; /* Taille réduite */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease; /* Transition plus rapide */
  opacity: 0.7;
}

.carousel-control:hover {
  opacity: 1;
  background-color: rgba(30, 58, 138, 0.8); /* Opacité réduite */
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.25); /* Ombre réduite */
}

.carousel-control.prev {
  left: 2rem;
}

.carousel-control.next {
  right: 2rem;
}

.control-icon {
  width: 1.5rem; /* Taille réduite */
  height: 1.5rem; /* Taille réduite */
}

.indicators-container {
  position: absolute;
  bottom: 2.5rem; /* Position remontée */
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.indicators-wrapper {
  display: flex;
  gap: 0.5rem; /* Espacement réduit */
  background: rgba(255, 255, 255, 0.08); /* Opacité réduite */
  backdrop-filter: blur(8px); /* Réduit le flou */
  border: 1px solid rgba(255, 255, 255, 0.08); /* Bordure plus subtile */
  border-radius: 50px;
  padding: 0.5rem; /* Padding réduit */
}

.indicator {
  width: 2.5rem; /* Taille réduite */
  height: 2.5rem; /* Taille réduite */
  background-color: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.25); /* Bordure plus subtile */
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.indicator.active {
  background-color: var(--accent-yellow);
  border-color: var(--accent-yellow);
  transform: scale(1.05); /* Effet réduit */
}

.indicator:hover {
  transform: scale(1.1); /* Effet réduit */
  border-color: rgba(255, 255, 255, 0.5); /* Couleur plus subtile */
}

.indicator-label {
  font-size: 0.75rem; /* Taille réduite */
  font-weight: 600;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.indicator.active .indicator-label {
  color: var(--primary-dark);
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--accent-green);
  animation: progress 5s linear forwards; /* Synchronisé avec le défilement automatique */
  border-radius: 50%;
  opacity: 0.7; /* Opacité réduite */
}

@keyframes progress {
  0% {
    clip-path: polygon(50% 50%, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  25% {
    clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 100%);
  }
  50% {
    clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%);
  }
  75% {
    clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%);
  }
  100% {
    clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%);
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .slide-title {
    font-size: 3rem;
  }

  .slide-content {
    padding: 0 8%;
  }
}

@media (max-width: 1024px) {
  .slide-title {
    font-size: 2.75rem;
  }

  .slide-description {
    font-size: 1.125rem;
  }

  .carousel-control {
    width: 3rem;
    height: 3rem;
  }

  .control-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

@media (max-width: 768px) {
  .slide-content {
    padding: 0 5%;
    text-align: center;
  }

  .slide-pre-title {
    font-size: 1.25rem;
  }

  .slide-title {
    font-size: 2.25rem;
  }

  .slide-description {
    font-size: 1.1rem;
    max-width: 100%;
    padding: 1.25rem;
  }

  .cta-container {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }

  .carousel-control {
    width: 2.5rem;
    height: 2.5rem;
    top: auto;
    bottom: 1.5rem;
    transform: none;
  }

  .carousel-control.prev {
    left: 1.5rem;
  }

  .carousel-control.next {
    right: 1.5rem;
  }

  .indicators-container {
    bottom: 5rem;
  }
  
  .indicators-wrapper {
    padding: 0.4rem;
  }
  
  .indicator {
    width: 2rem;
    height: 2rem;
  }
}

@media (max-width: 480px) {
  .slide-pre-title {
    font-size: 1.1rem;
  }

  .slide-title {
    font-size: 1.75rem;
  }

  .slide-description {
    font-size: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
  }

  .cta-button {
    padding: 1rem 2rem;
    font-size: 1rem;
  }

  .carousel-control {
    width: 2.25rem;
    height: 2.25rem;
    bottom: 1.25rem;
  }

  .carousel-control.prev {
    left: 1.25rem;
  }

  .carousel-control.next {
    right: 1.25rem;
  }

  .control-icon {
    width: 1rem;
    height: 1rem;
  }

  .indicators-container {
    bottom: 4rem;
  }

  .indicator {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .indicator-label {
    font-size: 0.7rem;
  }
  
  .academic-badge {
    padding: 0.35rem 0.9rem;
  }
  
  .badge-text {
    font-size: 0.7rem;
  }
}
</style>