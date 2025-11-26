<template>
  <section class="relative py-24 bg-white overflow-hidden">
    <!-- Éléments décoratifs d'arrière-plan -->
    <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/30 to-transparent pointer-events-none"></div>
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none"></div>
    
    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <!-- En-tête minimaliste amélioré -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center gap-3 text-blue-600 mb-6">
          <div class="w-8 h-0.5 bg-blue-400 rounded-full"></div>
          <span class="text-sm font-medium tracking-wider uppercase">{{ $t('vision.header') }}</span>
          <div class="w-8 h-0.5 bg-blue-400 rounded-full"></div>
        </div>
        <h2 class="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
          {{ $t('vision.title') }}
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
          {{ $t('vision.description') }}
        </p>
      </div>

      <!-- Grille principale -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <!-- Colonne de gauche - Vision et Objectifs -->
        <div class="space-y-12">
          <!-- Carte Vision améliorée -->
          <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 group">
            <div class="flex items-start gap-6 mb-8">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <ChartBarIcon class="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-medium text-gray-900 mb-3">{{ $t('vision.vision2030.title') }}</h3>
                <p class="text-gray-600 leading-relaxed">
                  {{ $t('vision.vision2030.description') }}
                </p>
              </div>
            </div>

            <!-- Objectifs améliorés -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                {{ $t('vision.mainObjectives') }}
              </h4>
              <div v-for="(objective, index) in objectives" :key="index"
                   class="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/50 transition-all duration-300 group/item">
                <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-blue-200 transition-colors duration-300">
                  <CheckIcon class="w-3 h-3 text-blue-600" />
                </div>
                <span class="text-gray-700 leading-relaxed">{{ objective }}</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Colonne de droite - Statistiques et Domaines -->
        <div class="space-y-8">
          <!-- Cartes de statistiques améliorées -->
          <div v-for="(stat, index) in stats" :key="index"
               class="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 group">
            <div class="flex items-center justify-between mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow duration-300">
                <component :is="stat.icon" class="w-6 h-6 text-blue-600" />
              </div>
              <div class="text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">{{ stat.value }}</div>
            </div>
            <p class="text-gray-800 font-semibold text-lg mb-2">{{ stat.label }}</p>
            <p class="text-gray-500 text-sm leading-relaxed">{{ stat.description }}</p>
          </div>


        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  ChartBarIcon,
  CheckIcon,
  ArrowRightIcon,
  UserGroupIcon,
  LightBulbIcon,
  BuildingLibraryIcon,
  ChartBarSquareIcon,
  CpuChipIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
} from "@heroicons/vue/24/outline";
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stats = computed(() => [
  { 
    value: "50+", 
    label: t('vision.stats.specializedExperts'), 
    description: t('vision.stats.specializedExpertsDesc'),
    icon: UserGroupIcon
  },
  { 
    value: "120+", 
    label: t('vision.stats.researchProjects'), 
    description: t('vision.stats.researchProjectsDesc'),
    icon: LightBulbIcon
  },
  { 
    value: "30+", 
    label: t('vision.stats.countriesCovered'), 
    description: t('vision.stats.countriesCoveredDesc'),
    icon: GlobeAltIcon
  }
]);

const objectives = computed(() => [
  t('vision.objectives.1'),
  t('vision.objectives.2'),
  t('vision.objectives.3'),
  t('vision.objectives.4'),
  t('vision.objectives.5'),
  t('vision.objectives.6')
]);

</script>

<style scoped>
/* Améliorations de l'animation et des transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Effets d'ombre améliorés */
.shadow-sm {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
}

/* Dégradés élégants */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

/* Effets de flou pour les éléments décoratifs */
.blur-3xl {
  filter: blur(64px);
}

/* Typographie améliorée */
.tracking-tight {
  letter-spacing: -0.025em;
}

.font-light {
  font-weight: 300;
}

.font-normal {
  font-weight: 400;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

/* Espacement cohérent */
.space-y-12 > * + * {
  margin-top: 3rem;
}

.space-y-8 > * + * {
  margin-top: 2rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>