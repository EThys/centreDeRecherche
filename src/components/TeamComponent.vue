<template>
  <section id="team" class="team-section">
    <div class="container">
      <!-- En-tête sobre -->
      <div class="section-header">
        <div class="academic-badge">
          <span class="badge-text">Notre Équipe</span>
        </div>
        <h2 class="section-title">Experts & Chercheurs</h2>
        <p class="section-subtitle">
          Une équipe pluridisciplinaire d'experts dédiée à l'excellence en recherche 
          et au développement des PME africaines
        </p>
      </div>

      <!-- Grid des membres -->
      <div class="team-grid">
        <div 
          class="team-card" 
          v-for="member in teamMembers" 
          :key="member.id"
        >
          <!-- Carte avant -->
          <div class="card-front">
            <div class="member-image-container">
              <div class="image-wrapper">
                <img :src="member.image" :alt="member.name" class="member-image" />
                <div class="image-overlay"></div>
              </div>
              <div class="member-badge">
                <span class="badge-text">{{ member.department }}</span>
              </div>
            </div>

            <div class="card-content">
              <div class="member-info">
                <h3 class="member-name">{{ member.name }}</h3>
                <p class="member-role">{{ member.role }}</p>
                <p class="member-expertise">{{ member.expertise }}</p>
              </div>

              <div class="member-stats">
                <div class="stat">
                  <span class="stat-value">{{ member.stats.projects }}+</span>
                  <span class="stat-label">Projets</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ member.stats.publications }}+</span>
                  <span class="stat-label">Publications</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ member.stats.experience }}+</span>
                  <span class="stat-label">Ans</span>
                </div>
              </div>

              <button class="flip-btn" @click="flipCard(member.id)">
                <span>Voir le profil</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Carte arrière (profil détaillé) -->
          <div class="card-back">
            <div class="back-content">
              <button class="close-btn" @click="flipCard(member.id)">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <div class="back-header">
                <h3 class="member-name">{{ member.name }}</h3>
                <p class="member-role">{{ member.role }}</p>
              </div>

              <div class="back-body">
                <div class="bio-section">
                  <h4>Biographie</h4>
                  <p class="member-bio">{{ member.bio }}</p>
                </div>

                <div class="skills-section">
                  <h4>Domaines d'Expertise</h4>
                  <div class="skills-list">
                    <span 
                      v-for="skill in member.skills" 
                      :key="skill"
                      class="skill-tag"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>

                <div class="education-section">
                  <h4>Formation</h4>
                  <div class="education-list">
                    <div 
                      v-for="edu in member.education" 
                      :key="edu.degree"
                      class="education-item"
                    >
                      <span class="edu-degree">{{ edu.degree }}</span>
                      <span class="edu-school">{{ edu.school }}</span>
                      <span class="edu-year">{{ edu.year }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="back-footer">
                <div class="social-links">
                  <a 
                    v-for="social in member.social" 
                    :key="social.name"
                    :href="social.url" 
                    class="social-link"
                    target="_blank"
                  >
                    <component :is="social.icon" />
                  </a>
                </div>
                <a :href="`mailto:${member.email}`" class="contact-btn">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Contacter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section sobre -->
      <div class="team-cta">
        <div class="cta-content">
          <h3 class="cta-title">Rejoindre Notre Équipe</h3>
          <p class="cta-description">
            Vous êtes chercheur ou expert en finance des PME ? 
            Découvrez les opportunités de collaboration.
          </p>
          <div class="cta-buttons">
            <a href="#contact" class="btn btn-primary">
              <span>Postuler</span>
            </a>
            <a href="#research" class="btn btn-secondary">
              <span>Voir nos recherches</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const flippedCards = ref<number[]>([])

// Icônes sociales
const LinkedinIcon = {
  template: `
    <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  `
}

const EmailIcon = {
  template: `
    <svg class="social-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  `
}

const TwitterIcon = {
  template: `
    <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
    </svg>
  `
}

const teamMembers = [
  {
    id: 1,
    name: "Dr. Jean Kabasele",
    role: "Directeur du Centre",
    expertise: "Finance d'Entreprise & PME",
    department: "Direction",
    email: "directeur@creff-pme.org",
    image: "/images/team/director.jpg",
    stats: {
      projects: 25,
      publications: 48,
      experience: 15
    },
    bio: "Expert reconnu en finance des PME avec plus de 15 ans d'expérience dans la recherche et le conseil aux entreprises. Docteur en Sciences Economiques de l'Université Paris-Dauphine.",
    skills: ["Finance d'Entreprise", "Stratégie PME", "Analyse Financière", "Gestion de Projet"],
    education: [
      { degree: "PhD Sciences Economiques", school: "Université Paris-Dauphine", year: "2008" },
      { degree: "Master Finance", school: "HEC Paris", year: "2004" }
    ],
    social: [
      { name: 'linkedin', url: '#', icon: LinkedinIcon },
      { name: 'email', url: 'mailto:directeur@creff-pme.org', icon: EmailIcon }
    ]
  },
  {
    id: 2,
    name: "Prof. Marie Lumbu",
    role: "Responsable Recherche",
    expertise: "Économétrie & Analyse Financière",
    department: "Recherche",
    email: "recherche@creff-pme.org",
    image: "/images/team/research-lead.jpg",
    stats: {
      projects: 18,
      publications: 32,
      experience: 12
    },
    bio: "Spécialiste en économétrie appliquée et analyse financière. Ses recherches portent sur les déterminants de la performance des PME africaines.",
    skills: ["Économétrie", "Analyse de Données", "Recherche Quantitative", "Méthodologie"],
    education: [
      { degree: "PhD Econométrie", school: "London School of Economics", year: "2010" },
      { degree: "Master Statistiques", school: "Université de Genève", year: "2006" }
    ],
    social: [
      { name: 'linkedin', url: '#', icon: LinkedinIcon },
      { name: 'email', url: 'mailto:recherche@creff-pme.org', icon: EmailIcon }
    ]
  },
  {
    id: 3,
    name: "Dr. Samuel Diallo",
    role: "Chercheur Senior",
    expertise: "Finance Inclusive & Microcrédit",
    department: "Recherche",
    email: "s.diallo@creff-pme.org",
    image: "/images/team/researcher-1.jpg",
    stats: {
      projects: 14,
      publications: 22,
      experience: 8
    },
    bio: "Expert en finance inclusive et mécanismes de microcrédit. Travaille sur l'inclusion financière des petites entreprises dans les zones rurales.",
    skills: ["Finance Inclusive", "Microcrédit", "Études Terrain", "Analyse Qualitative"],
    education: [
      { degree: "PhD Finance", school: "Université de Montréal", year: "2014" },
      { degree: "Master Développement", school: "SOAS London", year: "2010" }
    ],
    social: [
      { name: 'linkedin', url: '#', icon: LinkedinIcon },
      { name: 'email', url: 'mailto:s.diallo@creff-pme.org', icon: EmailIcon }
    ]
  },
  {
    id: 4,
    name: "Dr. Aminata Sow",
    role: "Responsable Formation",
    expertise: "Pédagogie & Entrepreneuriat",
    department: "Formation",
    email: "formation@creff-pme.org",
    image: "/images/team/training-lead.jpg",
    stats: {
      projects: 9,
      publications: 15,
      experience: 10
    },
    bio: "Spécialiste en pédagogie innovante et formation entrepreneuriale. Développe des programmes de formation adaptés aux besoins des entrepreneurs.",
    skills: ["Pédagogie", "Formation", "Entrepreneuriat", "Mentorat"],
    education: [
      { degree: "PhD Sciences de l'Education", school: "Université de Bourgogne", year: "2012" },
      { degree: "Master Entrepreneuriat", school: "EM Lyon", year: "2008" }
    ],
    social: [
      { name: 'linkedin', url: '#', icon: LinkedinIcon },
      { name: 'email', url: 'mailto:formation@creff-pme.org', icon: EmailIcon }
    ]
  }
]

const flipCard = (memberId: number) => {
  const index = flippedCards.value.indexOf(memberId)
  if (index > -1) {
    flippedCards.value.splice(index, 1)
  } else {
    flippedCards.value.push(memberId)
  }
}
</script>

<style scoped>
/* Variables CSS sobres */
.team-section {
  --primary: #1E40AF;
  --primary-dark: #1E3A8A;
  --gray-dark: #374151;
  --gray: #6B7280;
  --gray-light: #E5E7EB;
  --light: #F8FAFC;
  --white: #FFFFFF;
  
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  --radius: 12px;
  --radius-lg: 16px;
  
  --transition: all 0.3s ease;
}

.team-section {
  padding: 6rem 0;
  background: var(--white);
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* En-tête de section */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.academic-badge {
  display: inline-flex;
  background: var(--primary);
  border-radius: 50px;
  padding: 0.75rem 2rem;
  margin-bottom: 1.5rem;
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
  font-weight: 700;
  color: var(--gray-dark);
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--gray);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 400;
}

/* Grid des membres */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

/* Cartes d'équipe */
.team-card {
  position: relative;
  height: 480px;
  perspective: 1000px;
  cursor: pointer;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.6s ease;
  background: var(--white);
  border: 1px solid var(--gray-light);
}

.card-front {
  transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
}

.team-card.flipped .card-front {
  transform: rotateY(-180deg);
}

.team-card.flipped .card-back {
  transform: rotateY(0deg);
}

/* Carte avant */
.member-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.member-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.1) 100%);
}

.member-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.member-badge .badge-text {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--white);
}

.card-content {
  padding: 2rem;
  height: calc(100% - 200px);
  display: flex;
  flex-direction: column;
}

.member-info {
  text-align: center;
  margin-bottom: 1.5rem;
}

.member-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-dark);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.member-role {
  color: var(--primary);
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.member-expertise {
  color: var(--gray);
  font-size: 0.875rem;
  line-height: 1.5;
}

.member-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--light);
  border-radius: var(--radius);
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--gray);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.flip-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid var(--primary);
  border-radius: var(--radius);
  color: var(--primary);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  margin-top: auto;
}

.flip-btn:hover {
  background: var(--primary);
  color: var(--white);
}

.flip-btn svg {
  width: 16px;
  height: 16px;
}

/* Carte arrière */
.back-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--white);
  border: 1px solid var(--gray-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  z-index: 3;
}

.close-btn:hover {
  background: var(--gray-light);
}

.close-btn svg {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--gray);
}

.back-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-top: 1rem;
}

.back-header .member-name {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.back-header .member-role {
  font-size: 1rem;
}

.back-body {
  flex: 1;
}

.bio-section,
.skills-section,
.education-section {
  margin-bottom: 1.5rem;
}

.back-body h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray-dark);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--gray-light);
}

.member-bio {
  color: var(--gray);
  line-height: 1.6;
  font-size: 0.9rem;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: var(--light);
  color: var(--gray-dark);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--gray-light);
}

.education-list {
  space-y: 0.75rem;
}

.education-item {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  background: var(--light);
  border-radius: var(--radius);
  border: 1px solid var(--gray-light);
}

.edu-degree {
  font-weight: 600;
  color: var(--gray-dark);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.edu-school {
  color: var(--gray);
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.edu-year {
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 500;
}

.back-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--gray-light);
}

.social-links {
  display: flex;
  gap: 0.5rem;
}

.social-link {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  border: 1px solid var(--gray-light);
}

.social-link:hover {
  background: var(--primary);
}

.social-link:hover .social-icon {
  color: var(--white);
}

.social-icon {
  width: 1rem;
  height: 1rem;
  color: var(--gray);
  transition: var(--transition);
}

.contact-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition);
  cursor: pointer;
}

.contact-btn:hover {
  background: var(--primary-dark);
}

.contact-btn svg {
  width: 1rem;
  height: 1rem;
}

/* CTA Section */
.team-cta {
  background: var(--light);
  border-radius: var(--radius-lg);
  padding: 3rem;
  text-align: center;
  border: 1px solid var(--gray-light);
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--gray-dark);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.cta-description {
  font-size: 1.125rem;
  color: var(--gray);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: var(--radius);
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition);
  border: 1px solid transparent;
}

.btn-primary {
  background: var(--primary);
  color: var(--white);
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-secondary {
  background: transparent;
  color: var(--primary);
  border-color: var(--primary);
}

.btn-secondary:hover {
  background: var(--primary);
  color: var(--white);
}

/* États flipped */
.team-card:hover .card-front:not(.flipped) {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.team-card.flipped .card-front {
  transform: rotateY(-180deg);
}

.team-card.flipped .card-back {
  transform: rotateY(0deg);
}

/* Responsive */
@media (max-width: 1024px) {
  .team-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {
  .team-section {
    padding: 4rem 0;
  }
  
  .container {
    padding: 0 1.5rem;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .team-card {
    height: 450px;
  }
  
  .back-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .team-cta {
    padding: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .team-section {
    padding: 3rem 0;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .card-content,
  .back-content {
    padding: 1.5rem;
  }
  
  .member-stats {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .team-cta {
    padding: 1.5rem;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
}
</style>