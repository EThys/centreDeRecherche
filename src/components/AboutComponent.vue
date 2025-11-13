<template>
  <section id="about" class="about-section">
    <div class="container">
      <!-- En-tête (conservé) -->
      <div class="section-header">
        <div class="academic-badge">
          <span class="badge-text">À Propos de Nous</span>
        </div>
        <h2 class="section-title">Centre de Recherche et de Formation sur le Financement des PME</h2>
        <p class="section-subtitle">
          Une initiative d'excellence dédiée au renforcement des capacités de recherche 
          et à la formation dans le domaine du financement des petites et moyennes entreprises.
        </p>
      </div>

      <!-- Contenu principal en deux colonnes -->
      <div class="two-column-layout">
        <!-- Colonne gauche - Image -->
        <div class="image-column">
          <div class="image-container">
            <div class="main-image">
              <div class="image-placeholder">
                <div class="image-content">
                  <svg class="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  <span class="image-text">Centre de Recherche PME</span>
                </div>
              </div>
            </div>
            <div class="image-decoration">
              <div class="decoration-dot dot-1"></div>
              <div class="decoration-dot dot-2"></div>
              <div class="decoration-dot dot-3"></div>
            </div>
          </div>
        </div>

        <!-- Colonne droite - Détails -->
        <div class="details-column">
          <!-- Mission -->
          <div class="mission-section">
            <h3 class="mission-title">Notre Mission</h3>
            <p class="mission-text">
              Le CReFF-PME a pour mission de développer une recherche de qualité sur les défis 
              du financement des PME en Afrique, tout en formant une nouvelle génération de 
              chercheurs et en accompagnant les entrepreneurs dans leur développement.
            </p>
          </div>

          <!-- Points clés -->
          <div class="key-points">
            <div class="key-point" v-for="point in keyPoints" :key="point.id">
              <div class="point-icon">
                <component :is="point.icon" />
              </div>
              <div class="point-content">
                <h4>{{ point.title }}</h4>
                <p>{{ point.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Icônes pour les points clés
const ResearchIcon = {
  template: `
    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
    </svg>
  `
}

const TeamIcon = {
  template: `
    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
    </svg>
  `
}

const PartnershipIcon = {
  template: `
    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9a9 9 0 00-9 9m9-9c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z"/>
    </svg>
  `
}

const keyPoints = ref([
  {
    id: 1,
    icon: ResearchIcon,
    title: "Recherche Appliquée",
    description: "Études approfondies sur les mécanismes de financement des PME en contexte africain."
  },
  {
    id: 2,
    icon: TeamIcon,
    title: "Équipe Pluridisciplinaire",
    description: "Experts en finance, économie, gestion et entrepreneuriat travaillant en synergie."
  },
  {
    id: 3,
    icon: PartnershipIcon,
    title: "Partenariats Stratégiques",
    description: "Collaboration avec des institutions académiques et financières internationales."
  }
])

const keyNumbers = ref([
  { value: "2023", label: "Année de Création" },
  { value: "2", label: "Universités Partenaires" },
  { value: "4", label: "Pays d'Intervention" }
])
</script>

<style scoped>
/* Variables CSS modernes */
.about-section {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --primary-light: #3b82f6;
  --secondary: #10b981;
  --accent: #f59e0b;
  --accent-light: #fbbf24;
  --dark: #1e293b;
  --dark-light: #334155;
  --light: #f8fafc;
  --gray: #64748b;
  --gray-light: #cbd5e1;
  --white: #ffffff;
  --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --radius: 12px;
  --radius-lg: 16px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Styles de base */
.about-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--light) 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* En-tête de section */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.academic-badge {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow);
}

.badge-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--white);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.section-title {
  font-size: clamp(2.25rem, 4vw, 3.5rem);
  font-weight: 800;
  color: var(--dark);
  line-height: 1.2;
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
  max-width: 800px;
  margin: 0 auto;
}

/* Layout en deux colonnes */
.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
}

/* Colonne image */
.image-column {
  position: relative;
}

.image-container {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.main-image {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.image-placeholder {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.image-content {
  text-align: center;
  color: var(--white);
  z-index: 2;
}

.placeholder-icon {
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.image-text {
  font-size: 1.25rem;
  font-weight: 600;
  display: block;
}

/* Décoration image */
.image-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.decoration-dot {
  position: absolute;
  border-radius: 50%;
  background: var(--accent-light);
  opacity: 0.6;
}

.dot-1 {
  width: 20px;
  height: 20px;
  top: 20px;
  right: 30px;
  animation: float 3s ease-in-out infinite;
}

.dot-2 {
  width: 15px;
  height: 15px;
  bottom: 40px;
  left: 20px;
  background: var(--secondary);
  animation: float 3s ease-in-out infinite 1s;
}

.dot-3 {
  width: 12px;
  height: 12px;
  top: 50%;
  right: 20px;
  background: var(--accent);
  animation: float 3s ease-in-out infinite 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Colonne détails */
.details-column {
  padding: 1rem;
}

/* Mission */
.mission-section {
  margin-bottom: 2.5rem;
}

.mission-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.mission-title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--secondary));
  border-radius: 2px;
}

.mission-text {
  font-size: 1.125rem;
  color: var(--gray);
  line-height: 1.7;
}

/* Points clés */
.key-points {
  margin-bottom: 2.5rem;
}

.key-point {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.key-point:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-lg);
}

.point-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
}

.point-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--white);
}

.point-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 0.5rem;
}

.point-content p {
  font-size: 0.9rem;
  color: var(--gray);
  line-height: 1.6;
  margin: 0;
}

/* Statistiques */
.stats-section {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: var(--radius-lg);
  padding: 2rem;
  color: var(--white);
  box-shadow: var(--shadow);
}

.stats-section h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--accent-light);
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

/* Boutons d'action */
.action-section-simple {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
  border: 2px solid transparent;
  font-size: 1rem;
  cursor: pointer;
  min-width: 200px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  color: var(--dark);
  box-shadow: 0 4px 6px rgba(245, 158, 11, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
}

.btn-secondary {
  background: transparent;
  color: var(--primary);
  border-color: var(--primary);
}

.btn-secondary:hover {
  background: var(--primary);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
}

/* Responsive Design */
@media (max-width: 968px) {
  .two-column-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .image-column {
    order: -1;
  }
  
  .image-placeholder {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 3rem 0;
  }
  
  .section-header {
    margin-bottom: 3rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .action-section-simple {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1.125rem;
  }
  
  .key-point {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
  
  .point-icon {
    align-self: center;
  }
}
</style>