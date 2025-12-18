<template>
  <div class="min-h-screen bg-white">
    <NavBarComponent />

    <section class="relative pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-24 min-h-[40vh] flex items-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="../assets/carousel-3.jpg"
          alt="Comité scientifique"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/80"></div>
        <div class="absolute inset-0 bg-blue-900/30"></div>
      </div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="text-center fade-in-up" data-animate>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Comité scientifique
          </h1>
          <p class="text-sm sm:text-base md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
            Présentation du comité scientifique du CReFF-PME, garant de la qualité des travaux de recherche et des orientations académiques.
          </p>
        </div>
      </div>
    </section>

    <section class="py-10 sm:py-14 lg:py-20 bg-white relative">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 sm:mb-14 fade-in-up" data-animate>
          <span class="text-blue-600 text-xs font-semibold tracking-[0.15em] uppercase">
            Comité scientifique
          </span>
          <h2 class="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Membres du comité scientifique
          </h2>
          <p class="mt-4 text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
            Cette page sera prochainement enrichie avec la liste complète des membres, leurs affiliations et leurs domaines d’expertise.
          </p>
        </div>
      </div>
    </section>

    <FooterComponent />
  </div>
</template>

<script setup>
import NavBarComponent from '../components/navbar/NavBarComponent.vue'
import FooterComponent from '../components/footer/FooterComponent.vue'
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
</style>


