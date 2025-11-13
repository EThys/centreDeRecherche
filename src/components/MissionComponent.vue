<template>
  <section id="mission" class="mission-section">
    <div class="container">
      <!-- En-tête avec design amélioré -->
      <div class="section-header">
        <div class="academic-badge">
          <span class="badge-text">Notre Mission</span>
        </div>
        <h2 class="section-title">Objectifs et Vision Stratégique</h2>
        <p class="section-subtitle">
          Une approche intégrée pour l'excellence en recherche et la formation 
          dans le domaine du financement des PME
        </p>
      </div>

      <!-- Carousel Container -->
      <div class="carousel-container">
        <div class="carousel-wrapper">
          <div 
            class="carousel-track" 
            :style="{ transform: `translateX(-${currentIndex * cardWidth}px)` }"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
          >
            <div 
              class="carousel-slide" 
              v-for="(mission, index) in missions" 
              :key="mission.id"
              :class="{ 
                'active': isActive(index),
                'prev': isPrev(index),
                'next': isNext(index)
              }"
              @click="goToSlide(index)"
            >
              <div 
                class="mission-card" 
                :style="{ '--card-accent': mission.accentColor }"
              >
                <!-- Fond décoratif -->
                <div class="card-background">
                  <div class="accent-gradient"></div>
                  <div class="pattern-overlay"></div>
                </div>
                
                <!-- Contenu de la carte -->
                <div class="card-content">
                  <!-- En-tête de carte -->
                  <div class="card-header">
                    <div class="mission-icon">
                      <div class="icon-wrapper">
                        <component :is="mission.icon" />
                      </div>
                      <div class="icon-glow"></div>
                    </div>
                    <div class="mission-number">0{{ mission.id }}</div>
                  </div>

                  <!-- Corps de la carte -->
                  <div class="card-body">
                    <h3 class="mission-card-title">{{ mission.title }}</h3>
                    <p class="mission-card-description">{{ mission.description }}</p>
                    
                    <!-- Liste des points clés -->
                    <ul class="mission-list">
                      <li v-for="(item, itemIndex) in mission.items" :key="itemIndex">
                        <span class="list-icon">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                          </svg>
                        </span>
                        <span class="list-text">{{ item }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Footer de carte -->
                  <div class="card-footer">
                    <div class="mission-cta">
                      <span class="cta-text">En savoir plus</span>
                      <div class="cta-arrow">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Effet de bordure animée -->
                <div class="card-border"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Controls -->
        <div class="carousel-controls">
          <button 
            class="control-btn prev" 
            @click="prevSlide"
            :disabled="currentIndex === 0"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <!-- Indicators -->
          <div class="carousel-indicators">
            <button
              v-for="(mission, index) in missions"
              :key="mission.id"
              class="indicator"
              :class="{ 'active': currentIndex === index }"
              @click="goToSlide(index)"
            >
              <div class="indicator-dot"></div>
            </button>
          </div>

          <button 
            class="control-btn next" 
            @click="nextSlide"
            :disabled="currentIndex >= missions.length - visibleCards"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Slide Counter -->
        <div class="slide-counter">
          <span class="current-slide">0{{ currentIndex + 1 }}</span>
          <span class="counter-separator">/</span>
          <span class="total-slides">0{{ missions.length }}</span>
        </div>
      </div>

      <!-- Indicateurs de performance -->
      <div class="performance-indicators">
        <div class="indicator" v-for="indicator in performanceIndicators" :key="indicator.label">
          <div class="indicator-value">{{ indicator.value }}</div>
          <div class="indicator-label">{{ indicator.label }}</div>
          <div class="indicator-progress">
            <div class="progress-bar" :style="{ width: indicator.percentage + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const currentIndex = ref(0)
const cardWidth = 380 // Largeur d'une carte + gap
const visibleCards = 2.5 // 2 cartes complètes + 1 partielle
const touchStartX = ref(0)
const touchEndX = ref(0)

const isActive = (index: number) => {
  return index >= currentIndex.value && index < currentIndex.value + visibleCards
}

const isPrev = (index: number) => {
  return index < currentIndex.value
}

const isNext = (index: number) => {
  return index >= currentIndex.value + visibleCards
}

const nextSlide = () => {
  if (currentIndex.value < missions.length - visibleCards) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const goToSlide = (index: number) => {
  // Empêcher d'aller au-delà de la limite
  if (index <= missions.length - visibleCards) {
    currentIndex.value = index
  } else {
    currentIndex.value = missions.length - visibleCards
  }
}

// Gestion du swipe tactile
const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const diff = touchStartX.value - touchEndX.value
  const minSwipeDistance = 50

  if (Math.abs(diff) > minSwipeDistance) {
    if (diff > 0) {
      // Swipe gauche
      nextSlide()
    } else {
      // Swipe droite
      prevSlide()
    }
  }
}

const ResearchMissionIcon = {
  template: `
    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
    </svg>
  `
}

const TrainingMissionIcon = {
  template: `
    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
    </svg>
  `
}

const ImpactMissionIcon = {
  template: `
    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
    </svg>
  `
}

const missions = [
  {
    id: 1,
    icon: ResearchMissionIcon,
    title: "Excellence en Recherche",
    description: "Développer une recherche innovante et rigoureuse sur les écosystèmes de financement des PME",
    items: [
      "Publications scientifiques internationales",
      "Études terrain multi-pays",
      "Analyse comparative des politiques",
      "Revues systématiques de littérature"
    ],
    accentColor: "#3B82F6"
  },
  {
    id: 2,
    icon: TrainingMissionIcon,
    title: "Formation & Leadership",
    description: "Cultiver les talents et former les leaders de demain en finance d'entreprise",
    items: [
      "Encadrement doctoral et postdoctoral",
      "Ateliers méthodologiques avancés",
      "Séminaires internationaux d'excellence",
      "Programmes de mentorat personnalisé"
    ],
    accentColor: "#10B981"
  },
  {
    id: 3,
    icon: ImpactMissionIcon,
    title: "Impact & Transformation",
    description: "Créer un impact mesurable sur l'écosystème entrepreneurial et politique",
    items: [
      "Recommandations politiques fondées sur des données",
      "Accompagnement stratégique des PME",
      "Transfert de connaissances innovant",
      "Plateformes de dialogue multi-acteurs"
    ],
    accentColor: "#F59E0B"
  },
  {
    id: 4,
    icon: ResearchMissionIcon,
    title: "Innovation Digitale",
    description: "Lever les technologies émergentes pour révolutionner le financement des PME",
    items: [
      "Plateformes de financement digital",
      "Analyse de données avancée",
      "Solutions FinTech innovantes",
      "Transformation digitale des processus"
    ],
    accentColor: "#8B5CF6"
  }
]

const performanceIndicators = [
  { value: "15+", label: "Projets de Recherche", percentage: 85 },
  { value: "50+", label: "Publications", percentage: 75 },
  { value: "100+", label: "Chercheurs Formés", percentage: 90 },
  { value: "12+", label: "Pays Partenaires", percentage: 70 }
]
</script>

<style scoped>
/* Variables CSS modernes */
.mission-section {
  --primary: #1E40AF;
  --primary-dark: #1E3A8A;
  --primary-light: #3B82F6;
  --secondary: #10B981;
  --accent: #F59E0B;
  --accent-light: #FBBF24;
  --dark: #1F2937;
  --dark-light: #374151;
  --light: #F8FAFC;
  --gray: #6B7280;
  --gray-light: #E5E7EB;
  --white: #FFFFFF;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  --radius: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  
  --transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.mission-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, var(--light) 0%, #FFFFFF 50%, #F1F5F9 100%);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* En-tête de section */
.section-header {
  text-align: center;
  margin-bottom: 5rem;
}

.academic-badge {
  display: inline-flex;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border-radius: 50px;
  padding: 0.75rem 2rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow);
}

.badge-text {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.section-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  color: var(--dark);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--dark) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--gray);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 500;
}

/* Carousel Styles */
.carousel-container {
  position: relative;
  margin-bottom: 4rem;
}

.carousel-wrapper {
  overflow: hidden;
  padding: 2rem 0;
  margin: 0 -2rem;
}

.carousel-track {
  display: flex;
  gap: 1.5rem;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  padding: 0 2rem;
}

.carousel-slide {
  flex: 0 0 360px;
  min-width: 360px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

/* États des slides */
.carousel-slide.active {
  transform: scale(1);
  opacity: 1;
}

.carousel-slide.prev,
.carousel-slide.next {
  transform: scale(0.95);
  opacity: 0.7;
}

.carousel-slide:not(.active):not(.prev):not(.next) {
  transform: scale(0.9);
  opacity: 0.4;
}

/* Mission Card Styles */
.mission-card {
  position: relative;
  background: var(--white);
  border-radius: var(--radius-xl);
  padding: 0;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  isolation: isolate;
  height: 100%;
  min-height: 550px;
}

.carousel-slide.active .mission-card {
  box-shadow: var(--shadow-xl);
}

.carousel-slide:hover .mission-card {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

/* Reste des styles de carte */
.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.accent-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--card-accent), transparent);
}

.pattern-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
  opacity: 0;
  transition: var(--transition);
}

.mission-card:hover .pattern-overlay {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.mission-icon {
  position: relative;
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, var(--card-accent), color-mix(in srgb, var(--card-accent) 80%, white));
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px color-mix(in srgb, var(--card-accent) 30%, transparent);
  transition: var(--transition);
}

.mission-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.icon-wrapper .icon {
  width: 2rem;
  height: 2rem;
  color: var(--white);
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: var(--card-accent);
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0;
  transition: var(--transition);
  z-index: -1;
}

.mission-card:hover .icon-glow {
  opacity: 0.3;
}

.mission-number {
  font-size: 3rem;
  font-weight: 900;
  color: var(--gray-light);
  line-height: 1;
  transition: var(--transition);
}

.mission-card:hover .mission-number {
  color: var(--card-accent);
  transform: scale(1.1);
}

.card-body {
  flex: 1;
  margin-bottom: 2rem;
}

.mission-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.mission-card-description {
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.mission-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mission-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-light);
  transition: var(--transition);
}

.mission-list li:last-child {
  border-bottom: none;
}

.mission-list li:hover {
  transform: translateX(5px);
}

.list-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background: var(--card-accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.125rem;
}

.list-icon svg {
  width: 14px;
  height: 14px;
  color: var(--white);
}

.list-text {
  color: var(--dark-light);
  font-size: 0.9rem;
  line-height: 1.5;
  flex: 1;
}

.card-footer {
  margin-top: auto;
}

.mission-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--card-accent);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: var(--transition);
  cursor: pointer;
}

.mission-cta:hover {
  gap: 0.75rem;
}

.cta-arrow {
  width: 20px;
  height: 20px;
  transition: var(--transition);
}

.mission-cta:hover .cta-arrow {
  transform: translateX(3px);
}

.cta-arrow svg {
  width: 100%;
  height: 100%;
}

.card-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid transparent;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, var(--card-accent), transparent) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: subtract;
  opacity: 0;
  transition: var(--transition);
}

.mission-card:hover .card-border {
  opacity: 1;
}

/* Carousel Controls */
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
}

.control-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--white);
  border: 2px solid var(--gray-light);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);
}

.control-btn:hover:not(:disabled) {
  background: var(--primary);
  border-color: var(--primary);
  transform: scale(1.1);
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.control-btn svg {
  width: 24px;
  height: 24px;
  color: var(--gray);
  transition: var(--transition);
}

.control-btn:hover:not(:disabled) svg {
  color: var(--white);
}

/* Carousel Indicators */
.carousel-indicators {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.indicator {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: var(--transition);
}

.indicator-dot {
  width: 8px;
  height: 8px;
  background: var(--gray-light);
  border-radius: 50%;
  transition: var(--transition);
}

.indicator.active .indicator-dot {
  background: var(--primary);
  transform: scale(1.5);
}

.indicator:hover .indicator-dot {
  background: var(--primary-light);
  transform: scale(1.2);
}

/* Slide Counter */
.slide-counter {
  position: absolute;
  top: -60px;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--gray);
}

.current-slide {
  color: var(--primary);
  font-size: 1.25rem;
}

.total-slides {
  color: var(--gray-light);
}

.counter-separator {
  color: var(--gray-light);
}

/* Indicateurs de performance */
.performance-indicators {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 3rem;
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.indicator {
  text-align: center;
  position: relative;
}

.indicator-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 0.5rem;
  line-height: 1;
}

.indicator-label {
  font-size: 0.9rem;
  color: var(--gray);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.indicator-progress {
  height: 4px;
  background: var(--gray-light);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 2px;
  transition: width 1.5s ease-in-out;
}

/* Responsive */
@media (max-width: 1200px) {
  .carousel-slide {
    flex: 0 0 340px;
    min-width: 340px;
  }
}

@media (max-width: 768px) {
  .mission-section {
    padding: 4rem 0;
  }
  
  .container {
    padding: 0 1.5rem;
  }
  
  .section-header {
    margin-bottom: 3rem;
  }
  
  .carousel-slide {
    flex: 0 0 300px;
    min-width: 300px;
  }
  
  .card-content {
    padding: 2rem;
  }
  
  .carousel-controls {
    margin-top: 2rem;
  }
  
  .control-btn {
    width: 45px;
    height: 45px;
  }
  
  .slide-counter {
    position: relative;
    top: 0;
    justify-content: center;
    margin-top: 1rem;
  }
  
  .performance-indicators {
    grid-template-columns: repeat(2, 1fr);
    padding: 2rem;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .mission-section {
    padding: 3rem 0;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .carousel-slide {
    flex: 0 0 280px;
    min-width: 280px;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .card-header {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;
  }
  
  .mission-number {
    align-self: center;
  }
  
  .carousel-controls {
    gap: 1rem;
  }
  
  .performance-indicators {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
  
  .mission-card-title {
    font-size: 1.3rem;
  }
  
  .mission-card-description {
    font-size: 0.9rem;
  }
}
</style>