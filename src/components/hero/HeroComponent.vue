<template>
  <NavBarComponent/>
  <div class="hero-carousel h-screen relative overflow-hidden">
    <div
      class="carousel-container w-full h-full"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <!-- Carousel Slides -->
      <div
        class="slides-container flex h-full"
        :style="{ transform: `translateX(calc(-${currentSlide * 100}% + ${touchOffset}px))` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slide-item w-full h-full flex-shrink-0 relative"
        >
          <!-- Gradient Overlay -->
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
                <!-- Titre principal avec animation -->
                <div class="title-container">
                  <h1 
                    class="slide-title"
                    :class="{ 'title-enter': currentSlide === index }"
                  >
                    <span class="title-line">{{ slide.title }}</span>
                    <span class="highlight-text">{{ slide.highlight }}</span>
                  </h1>
                </div>

                <!-- Sous-titre avec animation -->
                <div class="subtitle-container">
                  <h2 
                    class="slide-subtitle"
                    :class="{ 'subtitle-enter': currentSlide === index }"
                  >
                    {{ slide.subtitle }}
                  </h2>
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
                
                <!-- Bouton CTA avec animation -->
                <div 
                  class="cta-container"
                  :class="{ 'cta-enter': currentSlide === index }"
                >
                  <router-link to="/about" class="cta-button">
                    <span class="button-text">{{ slide.cta }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="button-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Miniatures ancrées en bas à droite -->
      <div class="carousel-navigation">
        <div class="slide-counter">
          <span class="current-slide">{{ String(currentSlide + 1).padStart(2, '0') }}</span>
          <span class="separator"></span>
          <span class="total-slides">{{ String(slides.length).padStart(2, '0') }}</span>
        </div>
        <div class="thumbnails-container">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            :class="['thumbnail', { active: currentSlide === index }]"
            @click="goToSlide(index)"
            :aria-label="`Go to slide ${index + 1}`"
            :aria-current="currentSlide === index ? 'true' : undefined"
          >
            <img
              :src="slide.image"
              :alt="slide.title"
              class="thumbnail-image"
            />
            <span class="thumbnail-index">{{ String(index + 1).padStart(2, '0') }}</span>
          </button>
        </div>
        <div class="thumb-track" aria-hidden="true">
          <div
            class="thumb-track-fill"
            :style="{ width: `${((currentSlide + 1) / slides.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Contrôles de navigation -->
      <button 
        class="carousel-control prev" 
        @click="prevSlide" 
        aria-label="Previous slide"
        :class="{ 'control-visible': !isHovering }"
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
        :class="{ 'control-visible': !isHovering }"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
//@ts-ignore
import NavBarComponent from '../../components/navbar/NavBarComponent.vue'

import researchImage1 from '../../assets/carousel-1.jpg'
import researchImage2 from '../../assets/carousel-2.jpeg'
import researchImage3 from '../../assets/carousel-3.jpeg'
import researchImage4 from '../../assets/carousel-4.jpeg'

const { t } = useI18n()

const slides = computed(() => [
  {
    title: t('hero.welcome'),
    highlight: t('hero.creff'),
    subtitle: t('hero.subtitle'),
    description: t('hero.description'),
    cta: t('hero.cta'),
    ctaLink: '/about',
    image: researchImage1
  },
  {
    title: t('hero.publications.title'),
    highlight: t('hero.publications.highlight'),
    subtitle: t('hero.publications.subtitle'),
    description: t('hero.publications.description'),
    cta: t('hero.publications.cta'),
    ctaLink: '/publications',
    image: researchImage2
  },
  {
    title: t('hero.training.title'),
    highlight: t('hero.training.highlight'),
    subtitle: t('hero.training.subtitle'),
    description: t('hero.training.description'),
    cta: t('hero.training.cta'),
    ctaLink: '#activites',
    image: researchImage3
  },
  {
    title: t('hero.partnership.title'),
    highlight: t('hero.partnership.highlight'),
    subtitle: t('hero.partnership.subtitle'),
    description: t('hero.partnership.description'),
    cta: t('hero.partnership.cta'),
    ctaLink: '#partenariat',
    image: researchImage4
  }
])

const currentSlide = ref(0)
const isHovering = ref(false)
const isTransitioning = ref(false)
const isContentVisible = ref(true)
const touchStartX = ref(0)
const touchOffset = ref(0)
const isDragging = ref(false)
let interval: number | null = null

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
  }, 400)
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
  }, 400)
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
  }, 400)
}

// Gestion du swipe tactile
const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
  isDragging.value = true
  stopAutoPlay()
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  const currentX = e.touches[0].clientX
  touchOffset.value = currentX - touchStartX.value
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  isDragging.value = false
  
  const threshold = 50
  if (Math.abs(touchOffset.value) > threshold) {
    if (touchOffset.value > 0) {
      prevSlide()
    } else {
      nextSlide()
    }
  } else {
    touchOffset.value = 0
  }
  
  // Redémarrer automatiquement après un court délai
  setTimeout(() => {
    touchOffset.value = 0
    if (!isDragging.value) {
      startAutoPlay()
    }
  }, 800)
}

const startAutoPlay = () => {
  if (interval) {
    clearInterval(interval)
  }
  isHovering.value = false
  interval = window.setInterval(() => {
    if (!isTransitioning.value && !isDragging.value) {
      nextSlide()
    }
  }, 5000)
}

const stopAutoPlay = () => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

const resetTimer = () => {
  stopAutoPlay()
  // Toujours redémarrer après un court délai
  setTimeout(() => {
    if (!isDragging.value) {
      startAutoPlay()
    }
  }, 500)
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
  --transition-speed: 0.5s;
}

.carousel-container {
  position: relative;
  height: 100%;
}

.slides-container {
  transition: transform var(--transition-speed) cubic-bezier(0.33, 1, 0.68, 1);
  height: 100%;
  will-change: transform;
}

.slide-item {
  position: relative;
  height: 100%;
}

/* Gradient Overlay — léger, lisibilité à gauche sans assombrir toute l'image */
.gradient-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      105deg,
      rgba(26, 26, 46, 0.48) 0%,
      rgba(22, 33, 62, 0.28) 42%,
      rgba(57, 110, 246, 0.1) 68%,
      transparent 100%
    ),
    linear-gradient(
      to top,
      rgba(15, 23, 42, 0.32) 0%,
      transparent 45%
    );
  z-index: 1;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
}

.gradient-overlay.active-overlay {
  opacity: 1;
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
  filter: brightness(1.02) saturate(1.03);
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
  padding: 8rem 5% 0;
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.text-content {
  max-width: 700px;
}

/* Animations du contenu améliorées */
.content-enter {
  animation: contentSlideIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.content-exit {
  animation: contentSlideOut 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
}

@keyframes contentSlideIn {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.92) rotateX(10deg);
    filter: blur(10px);
  }
  50% {
    opacity: 0.5;
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
    filter: blur(0);
  }
}

@keyframes contentSlideOut {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-30px) scale(0.95) rotateX(-5deg);
    filter: blur(8px);
  }
}

/* Titre principal */
.title-container {
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.slide-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--text-color);
  line-height: 1.1;
  letter-spacing: -0.02em;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-shadow: 0 2px 24px rgba(15, 23, 42, 0.35);
}

.title-line {
  opacity: 0;
  transform: translateX(-50px) translateY(20px);
  filter: blur(8px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
}

.slide-title.title-enter .title-line {
  opacity: 1;
  transform: translateX(0) translateY(0);
  filter: blur(0);
  animation: titleGlow 2s ease-in-out 1.2s infinite alternate;
}

.highlight-text {
  color: var(--accent-color);
  font-weight: 800;
  display: inline-block;
  position: relative;
  opacity: 0;
  transform: translateX(-50px) translateY(20px) scale(0.9);
  filter: blur(8px);
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s;
  text-shadow: 0 2px 20px rgba(57, 110, 246, 0.45);
}

.slide-title.title-enter .highlight-text {
  opacity: 1;
  transform: translateX(0) translateY(0) scale(1);
  filter: blur(0);
  animation: highlightPulse 2s ease-in-out 1.4s infinite alternate;
}

@keyframes titleGlow {
  0% {
    text-shadow: 0 2px 20px rgba(15, 23, 42, 0.3);
  }
  100% {
    text-shadow: 0 2px 28px rgba(57, 110, 246, 0.25);
  }
}

@keyframes highlightPulse {
  0% {
    text-shadow: 0 2px 16px rgba(57, 110, 246, 0.35);
    transform: scale(1);
  }
  100% {
    text-shadow: 0 2px 22px rgba(77, 124, 254, 0.5);
    transform: scale(1.01);
  }
}


/* Sous-titre */
.subtitle-container {
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.slide-subtitle {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--light-text);
  line-height: 1.4;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  filter: blur(5px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s;
  text-shadow: 0 1px 12px rgba(15, 23, 42, 0.3);
}

.slide-subtitle.subtitle-enter {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

/* Description */
.description-container {
  overflow: hidden;
  margin-bottom: 2.5rem;
}

.slide-description {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.7;
  font-weight: 300;
  max-width: 90%;
  opacity: 0;
  transform: translateY(30px) scale(0.98);
  filter: blur(5px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s;
  text-shadow: 0 1px 10px rgba(15, 23, 42, 0.25);
}

.slide-description.description-enter {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

/* CTA Button */
.cta-container {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
  filter: blur(5px);
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 1s;
}

.cta-container.cta-enter {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
  animation: ctaBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.1s;
}

@keyframes ctaBounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1.05);
  }
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, var(--accent-color), var(--tertiary-accent));
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.25);
  cursor: pointer;
  box-shadow: 0 8px 28px rgba(57, 110, 246, 0.35);
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
  box-shadow: 0 10px 32px rgba(57, 110, 246, 0.45);
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.cta-button:hover .button-icon {
  transform: translateX(4px);
}

/* Navigation : bandeau bas droite, hors du sujet de la photo */
.carousel-navigation {
  position: absolute;
  right: 2.25rem;
  bottom: 1.75rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.55rem;
  width: max-content;
}

.thumbnails-container {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.thumbnail {
  width: 4.35rem;
  height: 2.85rem;
  border-radius: 0.55rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  transition: width 0.35s ease, height 0.35s ease, opacity 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
  opacity: 0.62;
  background: none;
  padding: 0;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.22);
}

.thumbnail:hover {
  opacity: 1;
}

.thumbnail.active {
  width: 6.1rem;
  height: 3.85rem;
  opacity: 1;
  border-color: #fff;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.38);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.thumbnail-index {
  position: absolute;
  left: 0.35rem;
  bottom: 0.22rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #fff;
  text-shadow: 0 1px 6px rgba(15, 23, 42, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.thumbnail.active .thumbnail-index,
.thumbnail:hover .thumbnail-index {
  opacity: 1;
}

.thumb-track {
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.28);
  overflow: hidden;
}

.thumb-track-fill {
  height: 100%;
  background: #fff;
  border-radius: inherit;
  transition: width 0.45s ease;
}

/* Indicateur de progression */
.progress-indicator {
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-color), var(--secondary-accent));
  border-radius: 2px;
  transition: width 0.5s ease;
  box-shadow: 0 0 10px rgba(57, 110, 246, 0.5);
}

/* Compteur de slides */
.slide-counter {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-shadow: 0 1px 8px rgba(15, 23, 42, 0.45);
}

.current-slide {
  font-size: 0.85rem;
}

.separator {
  width: 1.1rem;
  height: 1px;
  background: rgba(255, 255, 255, 0.7);
}

.total-slides {
  opacity: 0.7;
}

/* Contrôles de navigation */
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  opacity: 0;
  pointer-events: none;
}

.carousel-control.control-visible {
  opacity: 0.8;
  pointer-events: all;
  animation: controlFadeIn 0.5s ease forwards;
}

@keyframes controlFadeIn {
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
  background: rgba(57, 110, 246, 0.45);
  transform: translateY(-50%) scale(1.1);
  border-color: rgba(77, 124, 254, 0.7);
}

.carousel-control.prev {
  left: 2rem;
}

.carousel-control.next {
  right: 2rem;
}

.control-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .gradient-overlay {
    background: linear-gradient(
      to top,
      rgba(8, 18, 38, 0.94) 0%,
      rgba(8, 18, 38, 0.86) 48%,
      rgba(8, 18, 38, 0.45) 72%,
      transparent 100%
    );
  }

  .slide-content {
    align-items: flex-end;
    justify-content: flex-start;
    padding: 0 1.15rem 7.4rem;
  }

  .text-content {
    max-width: 100%;
    text-align: left;
  }

  .slide-title {
    font-size: 1.9rem;
    gap: 0.15rem;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
  }

  .slide-subtitle {
    font-size: 1.05rem;
    margin-bottom: 0.65rem;
    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
  }

  .slide-description {
    font-size: 0.92rem;
    max-width: 100%;
    margin-bottom: 1.1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cta-button {
    padding: 0.8rem 1.4rem;
    font-size: 0.92rem;
  }

  .carousel-navigation {
    left: 0.85rem;
    right: 0.85rem;
    bottom: 0.7rem;
    width: auto;
    align-items: stretch;
  }

  .thumbnails-container {
    width: 100%;
  }

  .thumbnail,
  .thumbnail.active {
    flex: 1;
    width: auto;
    height: 2.65rem;
  }

  .carousel-control {
    display: none;
  }
}

@media (max-width: 480px) {
  .slide-title {
    font-size: 1.7rem;
  }

  .slide-subtitle {
    font-size: 1rem;
  }

  .slide-description {
    font-size: 0.88rem;
  }

  .thumbnail,
  .thumbnail.active {
    height: 2.35rem;
  }
}

@media (min-width: 1200px) {
  .slide-title {
    font-size: 4rem;
  }

  .slide-subtitle {
    font-size: 1.75rem;
  }
}

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .slide-image,
  .slide-title,
  .slide-subtitle,
  .slide-description,
  .cta-container,
  .carousel-control {
    animation: none !important;
    transition: none !important;
  }
}
</style>
