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
          <div 
            class="gradient-overlay"
            :class="{ 'active-overlay': currentSlide === index }"
          ></div>
          
          <!-- Image avec effet parallax -->
          <div class="image-container">
            <img
              :src="slide.image"
              class="slide-image"
              :class="{ 
                active: currentSlide === index,
                'parallax-zoom': currentSlide === index 
              }"
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
                  'content-enter': isContentVisible && currentSlide === index,
                  'content-exit': !isContentVisible || currentSlide !== index,
                }"
              >
                <!-- Badge académique avec animation -->
                <div 
                  class="academic-badge"
                  :class="{ 'badge-animate': currentSlide === index }"
                >
                  <span class="badge-text">{{ slide.badge }}</span>
                </div>
                
                <!-- Titre avec animation séquentielle -->
                <div class="title-container">
                  <h5 
                    class="slide-pre-title"
                    :class="{ 'title-enter': currentSlide === index }"
                  >
                    {{ slide.title }} <span class="highlight-text">{{ slide.highlight }}</span>
                  </h5>
                </div>

                <!-- Sous-titre avec animation -->
                <div class="subtitle-container">
                  <h4 
                    class="slide-title"
                    :class="{ 'subtitle-enter': currentSlide === index }"
                  >
                    {{ slide.subtitle }}
                  </h4>
                </div>

                <!-- Description avec animation -->
                <div class="description-container">
                  <p 
                    class="slide-description"
                    :class="{ 'description-enter': currentSlide === index }"
                  >
                    {{ slide.description }}
                  </p>
                </div>
                
                <!-- Bouton CTA amélioré avec animation -->
                <div 
                  class="cta-container"
                  :class="{ 'cta-enter': currentSlide === index }"
                >
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
      <button 
        class="carousel-control prev" 
        @click="prevSlide" 
        aria-label="Previous slide"
        :class="{ 'control-enter': !isHovering }"
      >
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
      <button 
        class="carousel-control next" 
        @click="nextSlide" 
        aria-label="Next slide"
        :class="{ 'control-enter': !isHovering }"
      >
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
      <div 
        class="indicators-container"
        :class="{ 'indicators-enter': !isHovering }"
      >
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
    image: researchImage1,
    badge: 'Centre d\'Excellence'
  },
  {
    title: 'Recrutement',
    highlight: 'Assistant(e)s Chercheurs',
    subtitle: 'Rejoignez notre équipe de recherche',
    description: 'Participez à nos projets de recherche, bénéficiez d\'un encadrement académique et d\'opportunités de collaboration internationale.',
    cta: 'Postuler maintenant',
    ctaLink: 'Candidature_CReFF_102211.html',
    image: researchImage2,
    badge: 'Opportunités'
  },
  {
    title: 'Formation et',
    highlight: 'Encadrement',
    subtitle: 'Encadrement des jeunes chercheurs',
    description: 'Nous accompagnons les jeunes chercheurs dans l\'élaboration de projets de thèse et favorisons le transfert de connaissances vers les entrepreneurs.',
    cta: 'Nos activités',
    ctaLink: '#activites',
    image: researchImage3,
    badge: 'Formation'
  },
  {
    title: 'Partenariat',
    highlight: 'International',
    subtitle: 'Collaboration Université Kongo - ULB',
    description: 'Un partenariat stratégique entre l\'Université Kongo et l\'Université libre de Bruxelles pour l\'excellence en recherche sur le financement des PME.',
    cta: 'En savoir plus',
    ctaLink: '#partenariat',
    image: researchImage4,
    badge: 'Collaboration'
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
  interval = setInterval(nextSlide, 5000)
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
  --primary-dark: #1a1a2e;
  --primary-blue: #16213e;
  --primary-light: #0f3460;
  --accent-color: #396ef6;
  --secondary-accent: #4d7cfe;
  --tertiary-accent: #2d5bd6;
  --text-color: #ffffff;
  --light-text: #e2e8f0;
  --card-bg: rgba(255, 255, 255, 0.05);
  --transition-speed: 0.6s;
  --border-radius: 8px;
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

/* Overlay avec animation */
.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg, 
    rgba(26, 26, 46, 0.85) 0%,
    rgba(22, 33, 62, 0.7) 50%,
    rgba(15, 52, 96, 0.8) 100%
  );
  z-index: 1;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.gradient-overlay.active-overlay {
  opacity: 1;
}

/* Effet de profondeur supplémentaire */
.gradient-overlay::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
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
  transform: scale(1.1);
  transition: transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: brightness(0.8);
}

.slide-image.active {
  transform: scale(1);
}

.slide-image.parallax-zoom {
  animation: subtleZoom 20s infinite alternate ease-in-out;
}

@keyframes subtleZoom {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
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

/* Animations pour le contenu */
.text-content {
  max-width: 650px;
}

.content-enter {
  animation: contentSlideIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.content-exit {
  animation: contentSlideOut 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
}

@keyframes contentSlideIn {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes contentSlideOut {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(0.98);
  }
}

/* Animation du badge */
.academic-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  margin-bottom: 2rem;
  background: rgba(57, 110, 246, 0.15);
  border: 1px solid rgba(57, 110, 246, 0.3);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(57, 110, 246, 0.2);
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.academic-badge.badge-animate {
  opacity: 1;
  transform: translateY(0) scale(1);
  animation: badgePulse 2s infinite alternate;
}

@keyframes badgePulse {
  0% {
    box-shadow: 0 2px 8px rgba(57, 110, 246, 0.2);
  }
  100% {
    box-shadow: 0 4px 16px rgba(57, 110, 246, 0.4);
  }
}

.badge-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent-color);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Animations séquentielles pour le titre */
.title-container {
  overflow: hidden;
}

.slide-pre-title {
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--light-text);
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
  opacity: 0.9;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
}

.slide-pre-title.title-enter {
  opacity: 1;
  transform: translateX(0);
}

.highlight-text {
  color: var(--accent-color);
  font-weight: 600;
  display: inline-block;
  position: relative;
}

.highlight-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: width 0.8s ease 0.5s;
}

.slide-pre-title.title-enter .highlight-text::after {
  width: 100%;
}

/* Animation du sous-titre */
.subtitle-container {
  overflow: hidden;
}

.slide-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.5px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
}

.slide-title.subtitle-enter {
  opacity: 1;
  transform: translateY(0);
  animation: titleGlow 3s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  0% {
    text-shadow: 0 0 10px rgba(57, 110, 246, 0.3);
  }
  100% {
    text-shadow: 0 0 20px rgba(57, 110, 246, 0.6);
  }
}

/* Animation de la description */
.description-container {
  overflow: hidden;
}

.slide-description {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  font-weight: 300;
  max-width: 90%;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s;
}

.slide-description.description-enter {
  opacity: 1;
  transform: translateY(0);
}

/* Animation du CTA */
.cta-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s;
}

.cta-container.cta-enter {
  opacity: 1;
  transform: translateY(0);
}

.cta-button {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, var(--accent-color), var(--tertiary-accent));
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(57, 110, 246, 0.3);
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button:hover {
  background: linear-gradient(135deg, var(--tertiary-accent), var(--accent-color));
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(57, 110, 246, 0.4);
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.75rem;
  transition: transform 0.3s ease;
}

.cta-button:hover .button-icon {
  transform: translateX(4px);
}

.cta-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Animations des contrôles */
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(57, 110, 246, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(57, 110, 246, 0.4);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease;
  opacity: 0;
}

.carousel-control.control-enter {
  opacity: 0.8;
  animation: controlSlideIn 0.5s ease forwards;
}

@keyframes controlSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-50%) scale(0.8);
  }
  100% {
    opacity: 0.8;
    transform: translateY(-50%) scale(1);
  }
}

.carousel-control:hover {
  opacity: 1;
  background-color: rgba(57, 110, 246, 0.25);
  transform: translateY(-50%) scale(1.05);
  border-color: rgba(57, 110, 246, 0.6);
}

.carousel-control.prev {
  left: 2rem;
}

.carousel-control.next {
  right: 2rem;
}

.control-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Animations des indicateurs */
.indicators-container {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  opacity: 0;
}

.indicators-container.indicators-enter {
  opacity: 1;
  animation: indicatorsSlideUp 0.5s ease 0.2s forwards;
}

@keyframes indicatorsSlideUp {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.indicators-wrapper {
  display: flex;
  gap: 0.5rem;
  background: rgba(57, 110, 246, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(57, 110, 246, 0.3);
  border-radius: 50px;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.indicator {
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  border: 1px solid rgba(57, 110, 246, 0.4);
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
  background: linear-gradient(135deg, var(--accent-color), var(--tertiary-accent));
  border-color: var(--accent-color);
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(57, 110, 246, 0.4);
}

.indicator:hover {
  transform: scale(1.1);
  border-color: rgba(57, 110, 246, 0.7);
}

.indicator-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--light-text);
  transition: color 0.3s ease;
}

.indicator.active .indicator-label {
  color: white;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(135deg, var(--accent-color), var(--secondary-accent));
  animation: progress 5s linear forwards;
  border-radius: 50%;
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

/* Effets de particules subtiles */
.slide-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(57, 110, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(77, 124, 254, 0.1) 0%, transparent 50%);
  z-index: 1;
  opacity: 0;
  transition: opacity 1s ease;
}

.slide-item.active::before {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .slide-title {
    font-size: 2.5rem;
  }

  .slide-content {
    padding: 0 8%;
  }
}

@media (max-width: 1024px) {
  .slide-title {
    font-size: 2.25rem;
  }

  .slide-description {
    font-size: 1.1rem;
  }

  .carousel-control {
    width: 2.75rem;
    height: 2.75rem;
  }

  .control-icon {
    width: 1.1rem;
    height: 1.1rem;
  }
}

@media (max-width: 768px) {
  .slide-content {
    padding: 0 5%;
    text-align: center;
  }

  .slide-pre-title {
    font-size: 1.1rem;
  }

  .slide-title {
    font-size: 2rem;
  }

  .slide-description {
    font-size: 1rem;
    max-width: 100%;
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

  /* Ajustements des animations pour mobile */
  .slide-title.subtitle-enter {
    animation: none;
  }
}

@media (max-width: 480px) {
  .slide-pre-title {
    font-size: 1rem;
  }

  .slide-title {
    font-size: 1.75rem;
  }

  .slide-description {
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  .cta-button {
    padding: 0.875rem 1.75rem;
    font-size: 0.9rem;
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
    padding: 0.4rem 1rem;
  }
  
  .badge-text {
    font-size: 0.7rem;
  }
}
</style>