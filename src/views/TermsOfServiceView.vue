<template>
  <div class="min-h-screen bg-white">
    <NavBarComponent />

    <!-- Hero Section -->
    <section class="relative pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <div class="absolute inset-0">
        <img 
          src="../assets/carousel-3.jpg" 
          alt="Background"
          class="w-full h-full object-cover opacity-10"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-900/80"></div>
      </div>
      
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center fade-in-up" data-animate>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Conditions d'utilisation
          </h1>
          <p class="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto">
            Dernière mise à jour : {{ lastUpdateDate }}
          </p>
        </div>
      </div>
    </section>

    <!-- Contenu -->
    <section class="py-12 sm:py-16 lg:py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="prose prose-lg max-w-none">
          <!-- Introduction -->
          <div class="mb-10 fade-in-up" data-animate>
            <p class="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
              Les présentes conditions d'utilisation régissent l'utilisation du site web du Centre de Recherche 
              et de Formation sur le Financement des PME en Afrique centrale (CReFF-PME). 
              En accédant et en utilisant ce site, vous acceptez d'être lié par ces conditions.
            </p>
          </div>

          <!-- Section 1 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              1. Acceptation des conditions
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              En accédant au site web du CReFF-PME, vous reconnaissez avoir lu, compris et accepté d'être lié 
              par les présentes conditions d'utilisation ainsi que par toutes les lois et réglementations applicables.
            </p>
          </div>

          <!-- Section 2 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              2. Utilisation du site
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Vous vous engagez à utiliser le site de manière légale et conforme à ces conditions. Il est interdit de :
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base ml-4">
              <li>Utiliser le site à des fins illégales ou non autorisées</li>
              <li>Tenter d'accéder à des zones restreintes du site sans autorisation</li>
              <li>Transmettre des virus, codes malveillants ou tout autre élément nuisible</li>
              <li>Collecter des informations sur d'autres utilisateurs sans leur consentement</li>
              <li>Reproduire, copier ou vendre tout contenu du site sans autorisation</li>
            </ul>
          </div>

          <!-- Section 3 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              3. Inscription et compte utilisateur
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Pour accéder à certains services, vous devrez peut-être créer un compte. Vous êtes responsable de :
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base ml-4">
              <li>Maintenir la confidentialité de vos identifiants de connexion</li>
              <li>Toutes les activités qui se produisent sous votre compte</li>
              <li>Fournir des informations exactes et à jour</li>
              <li>Notifier immédiatement toute utilisation non autorisée de votre compte</li>
            </ul>
          </div>

          <!-- Section 4 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              4. Propriété intellectuelle
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Tout le contenu du site, y compris mais sans s'y limiter, les textes, graphiques, logos, icônes, 
              images et logiciels, est la propriété du CReFF-PME ou de ses partenaires et est protégé par les lois 
              sur la propriété intellectuelle.
            </p>
          </div>

          <!-- Section 5 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              5. Services et formations
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Le CReFF-PME se réserve le droit de :
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base ml-4">
              <li>Modifier, suspendre ou interrompre tout service à tout moment</li>
              <li>Refuser toute inscription sans justification</li>
              <li>Annuler ou reporter des formations en cas de circonstances imprévues</li>
              <li>Modifier les programmes de formation sans préavis</li>
            </ul>
          </div>

          <!-- Section 6 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              6. Limitation de responsabilité
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Dans la mesure permise par la loi, le CReFF-PME ne sera pas responsable des dommages directs, 
              indirects, accessoires, spéciaux ou consécutifs résultant de l'utilisation ou de l'impossibilité 
              d'utiliser le site ou ses services.
            </p>
          </div>

          <!-- Section 7 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              7. Modifications des conditions
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Le CReFF-PME se réserve le droit de modifier ces conditions d'utilisation à tout moment. 
              Les modifications entreront en vigueur dès leur publication sur le site. 
              Il est de votre responsabilité de consulter régulièrement ces conditions.
            </p>
          </div>

          <!-- Section 8 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              8. Résiliation
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Le CReFF-PME se réserve le droit de suspendre ou de résilier votre accès au site et à ses services 
              à tout moment, sans préavis, pour toute violation de ces conditions d'utilisation.
            </p>
          </div>

          <!-- Section 9 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              9. Loi applicable
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Ces conditions d'utilisation sont régies par la législation de la République Démocratique du Congo. 
              Tout litige sera soumis à la compétence exclusive des tribunaux compétents de la RDC.
            </p>
          </div>

          <!-- Contact -->
          <div class="bg-blue-50 rounded-xl p-6 sm:p-8 mt-12 fade-in-up" data-animate>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Contact</h3>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Pour toute question concernant ces conditions d'utilisation :
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
import { ref, onMounted, onUnmounted } from 'vue'
//@ts-ignore
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'

const lastUpdateDate = ref('1er janvier 2024')

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

