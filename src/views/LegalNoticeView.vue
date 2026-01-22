<template>
  <div class="min-h-screen bg-white">
    <NavBarComponent />

    <!-- Hero Section -->
    <section class="relative pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <div class="absolute inset-0">
        <img 
          src="../assets/carousel-2.jpeg" 
          alt="Background"
          class="w-full h-full object-cover opacity-10"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-900/80"></div>
      </div>
      
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center fade-in-up" data-animate>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Mentions légales
          </h1>
          <p class="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto">
            Informations légales sur le Centre CReFF-PME
          </p>
        </div>
      </div>
    </section>

    <!-- Contenu -->
    <section class="py-12 sm:py-16 lg:py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="prose prose-lg max-w-none">
          <!-- Éditeur -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Éditeur du site
            </h2>
            <div class="bg-gray-50 rounded-xl p-6 space-y-3 text-sm sm:text-base text-gray-700">
              <p><strong>Dénomination :</strong> Centre de Recherche et de Formation sur le Financement des PME en Afrique centrale (CReFF-PME)</p>
              <p><strong>Statut :</strong> Centre de recherche académique</p>
              <p><strong>Adresse :</strong> Université Kongo, Mbanza-Ngungu, Kongo-Central, République Démocratique du Congo</p>
              <p><strong>Téléphone :</strong> +243 980 49 52 73 / +243 850 59 32 11</p>
              <p><strong>Email :</strong> <a href="mailto:creff.pme.uk@gmail.com" class="text-blue-600 hover:underline">creff.pme.uk@gmail.com</a></p>
            </div>
          </div>

          <!-- Directeur de publication -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Directeur de publication
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>Jean Nsonsumuna</strong><br>
              Directeur du Centre de Recherche et de Formation sur le Financement des PME en Afrique centrale
            </p>
          </div>

          <!-- Hébergement -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Hébergement
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
              Le site est hébergé par un prestataire de services d'hébergement web. 
              Pour toute information concernant l'hébergement, veuillez nous contacter.
            </p>
          </div>

          <!-- Propriété intellectuelle -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Propriété intellectuelle
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              L'ensemble du contenu de ce site (textes, images, logos, graphismes, etc.) est la propriété du CReFF-PME 
              ou de ses partenaires et est protégé par les lois sur la propriété intellectuelle.
            </p>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
              Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, 
              quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable du CReFF-PME.
            </p>
          </div>

          <!-- Responsabilité -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Limitation de responsabilité
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Le CReFF-PME s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. 
              Cependant, le Centre ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
            </p>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
              Le CReFF-PME ne pourra être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur, 
              lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications, 
              soit de l'apparition d'un bug ou d'une incompatibilité.
            </p>
          </div>

          <!-- Liens externes -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Liens externes
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
              Le site peut contenir des liens vers d'autres sites web. Le CReFF-PME n'exerce aucun contrôle sur ces sites 
              et décline toute responsabilité quant à leur contenu ou leur accessibilité.
            </p>
          </div>

          <!-- Loi applicable -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Loi applicable
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
              Les présentes mentions légales sont régies par la législation de la République Démocratique du Congo. 
              Tout litige relatif à l'utilisation du site sera de la compétence exclusive des tribunaux compétents de la RDC.
            </p>
          </div>

          <!-- Contact -->
          <div class="bg-blue-50 rounded-xl p-6 sm:p-8 mt-12 fade-in-up" data-animate>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Contact</h3>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Pour toute question concernant ces mentions légales :
            </p>
            <div class="space-y-2 text-sm sm:text-base text-gray-700">
              <p><strong>Email :</strong> <a href="mailto:creff.pme.uk@gmail.com" class="text-blue-600 hover:underline">creff.pme.uk@gmail.com</a></p>
              <p><strong>Téléphone :</strong> +243 980 49 52 73 / +243 850 59 32 11</p>
              <p><strong>Adresse :</strong> Université Kongo, Mbanza-Ngungu, Kongo-Central, RDC</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'

let observer: IntersectionObserver | null = null

const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && observer) {
        entry.target.classList.add('animate-in')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document.querySelectorAll('[data-animate]').forEach(el => {
    if (observer) {
      observer.observe(el)
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    initScrollAnimations()
  }, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
  
  .fade-in-up.animate-in {
    opacity: 1;
    transform: none;
  }
}
</style>

