<template>
  <section class="relative py-20">
    <div class="relative rounded-3xl overflow-hidden">
      <!-- Arrière-plan pour les témoignages -->
      <div class="absolute inset-0 z-0">
        <img 
          src="../assets/carousel-2.jpg" 
          alt="Témoignages"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-blue-800/80 to-purple-900/70"></div>
      </div>
      
      <div class="relative z-10 p-8 lg:p-12 text-center">
        <h3 class="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ils <span class="text-blue-400">Témoignent</span>
        </h3>
        <p class="text-blue-100 text-lg max-w-2xl mx-auto mb-12">
          Découvrez ce que nos partenaires et bénéficiaires disent de notre travail
        </p>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(testimony, index) in testimonies"
            :key="index"
            class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold mr-4">
                {{ testimony.initials }}
              </div>
              <div class="text-left">
                <h4 class="text-white font-semibold">{{ testimony.name }}</h4>
                <p class="text-blue-200 text-sm">{{ testimony.role }}</p>
              </div>
            </div>
            <p class="text-blue-100 text-sm italic text-left">"{{ testimony.quote }}"</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonies = [
  {
    initials: "PD",
    name: "Pierre D.",
    role: "Entrepreneur Béninois",
    quote: "Grâce aux outils développés par CReFF-PME, j'ai pu structurer mon entreprise et obtenir un financement adapté à mes besoins."
  },
  {
    initials: "MS",
    name: "Marie S.",
    role: "Chercheuse Partenaire",
    quote: "Le centre offre une plateforme unique pour connecter la recherche académique aux réalités du terrain entrepreneurial."
  },
  {
    initials: "AK",
    name: "Amadou K.",
    role: "Institution Financière",
    quote: "Les études de CReFF-PME nous ont permis de développer des produits mieux adaptés aux PME locales."
  }
]
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}
</style>