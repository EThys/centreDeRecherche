<template>
  <div class="min-h-screen bg-white">
    <NavBarComponent />

    <!-- Hero Section -->
    <section class="relative pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <div class="absolute inset-0">
        <img 
          src="../assets/carousel-1.jpg" 
          alt="Background"
          class="w-full h-full object-cover opacity-10"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-900/80"></div>
      </div>
      
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center fade-in-up" data-animate>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Politique de confidentialité
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
              Le Centre de Recherche et de Formation sur le Financement des PME en Afrique centrale (CReFF-PME) 
              s'engage à protéger la confidentialité et la sécurité des informations personnelles que vous nous confiez. 
              Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos données.
            </p>
          </div>

          <!-- Section 1 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              1. Collecte des informations
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Nous collectons les informations suivantes lorsque vous utilisez nos services :
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base ml-4">
              <li>Informations d'identification : nom, prénom, adresse email, numéro de téléphone</li>
              <li>Informations professionnelles : entreprise, poste, secteur d'activité</li>
              <li>Informations de navigation : adresse IP, type de navigateur, pages visitées</li>
              <li>Données de formulaire : informations soumises via nos formulaires d'inscription</li>
            </ul>
          </div>

          <!-- Section 2 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              2. Utilisation des informations
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Nous utilisons vos informations personnelles pour :
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base ml-4">
              <li>Fournir et améliorer nos services de formation et d'accompagnement</li>
              <li>Vous contacter concernant vos inscriptions et nos programmes</li>
              <li>Envoyer des communications importantes et des mises à jour</li>
              <li>Analyser l'utilisation de notre site web pour améliorer l'expérience utilisateur</li>
              <li>Respecter nos obligations légales et réglementaires</li>
            </ul>
          </div>

          <!-- Section 3 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              3. Protection des données
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger 
              vos informations personnelles contre tout accès non autorisé, perte, destruction ou altération. 
              Cependant, aucune méthode de transmission sur Internet n'est totalement sécurisée.
            </p>
          </div>

          <!-- Section 4 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              4. Partage des informations
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. 
              Nous pouvons partager vos informations uniquement dans les cas suivants :
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base ml-4">
              <li>Avec votre consentement explicite</li>
              <li>Avec nos partenaires académiques (Université Kongo, ULB) dans le cadre de nos activités</li>
              <li>Lorsque la loi l'exige ou pour protéger nos droits légitimes</li>
            </ul>
          </div>

          <!-- Section 5 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              5. Vos droits
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Conformément à la réglementation en vigueur, vous disposez des droits suivants :
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base ml-4">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l'effacement de vos données</li>
              <li>Droit à la portabilité de vos données</li>
              <li>Droit d'opposition au traitement de vos données</li>
            </ul>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:creff.pme.uk@gmail.com" class="text-blue-600 hover:underline">creff.pme.uk@gmail.com</a>
            </p>
          </div>

          <!-- Section 6 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              6. Cookies
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Notre site utilise des cookies pour améliorer votre expérience de navigation. 
              Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
            </p>
          </div>

          <!-- Section 7 -->
          <div class="mb-10 fade-in-up" data-animate>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              7. Modifications
            </h2>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
              Les modifications seront publiées sur cette page avec une mise à jour de la date de dernière modification.
            </p>
          </div>

          <!-- Contact -->
          <div class="bg-blue-50 rounded-xl p-6 sm:p-8 mt-12 fade-in-up" data-animate>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Contact</h3>
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter :
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

const lastUpdateDate = ref('27 Novembre 2025')

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

