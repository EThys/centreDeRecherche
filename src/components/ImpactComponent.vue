<template>
  <section class="relative py-20">
    <div class="relative rounded-3xl overflow-hidden">
      <!-- Arrière-plan pour les chiffres clés -->
      <div class="absolute inset-0 z-0">
        <img 
          src="../assets/carousel-2.jpeg" 
          alt="Chiffres clés"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-blue-800/70"></div>
      </div>
      
      <div class="relative z-10 p-12 text-center">
        <h3 class="text-3xl lg:text-4xl font-bold text-white mb-12">
          Notre <span class="text-blue-400">Impact</span> en Chiffres
        </h3>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(stat, index) in keyFigures"
            :key="index"
            class="group cursor-pointer"
          >
            <div class="relative">
              <!-- Cercle de fond animé -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-24 h-24 rounded-full border-2 border-blue-400/30 group-hover:border-blue-400/60 transition-all duration-500 group-hover:scale-110"></div>
              </div>
              
              <!-- Valeur -->
              <div class="text-4xl lg:text-5xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">
                {{ stat.value }}
              </div>
            </div>
            
            <div class="text-blue-200 text-sm font-medium uppercase tracking-wider mt-4">
              {{ stat.label }}
            </div>
            <div class="w-16 h-0.5 bg-blue-400 mx-auto mt-3 group-hover:w-24 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template> 

<script setup>
const keyFigures = [
  { value: "50+", label: "Études Publiées" },
  { value: "15+", label: "Pays Partenaires" },
  { value: "100+", label: "Experts Mobilisés" },
  { value: "1000+", label: "Entrepreneurs Formés" }
]
</script>