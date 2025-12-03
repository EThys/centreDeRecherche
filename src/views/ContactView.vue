<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { PaperAirplaneIcon, PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';
import { useToast } from 'vue-toast-notification';
import { useI18n } from 'vue-i18n';
import financingRequestService from '@/services/financing-request.service';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Corriger le problème des icônes par défaut de Leaflet
// Utiliser des URLs directes pour Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'
//@ts-ignore
import NavBar from '../components/navbar/NavBarComponent.vue'

const toast = useToast();
const { t } = useI18n();
const isSubmitting = ref(false);
const mapContainer = ref<HTMLElement | null>(null);
const map = ref<L.Map | null>(null);
const mapView = ref('osm'); // 'osm' = OpenStreetMap, 'satellite' = satellite, 'hybrid' = hybride
const form = ref({
  name: '',
  email: '',
  subject: '',
  amount: '',
  currency: 'USD',
  message: '',
});

const contactInfo = [
  { icon: EnvelopeIcon, title: 'Email', value: 'creff.pme.uk@gmail.com', link: 'mailto:creff.pme.uk@gmail.com' },
  { icon: PhoneIcon, title: 'Téléphone', value: '+243 85 059 32 11', link: 'tel:+243850593211' },
  { icon: PhoneIcon, title: 'Téléphone', value: '+243 980 49 52 73', link: 'tel:+243980495273' },
  { icon: MapPinIcon, title: 'Adresse', value: 'Université Kongo, Mbanza-Ngungu, Kongo-Central, RDC', link: '#' },
];

const submitForm = async () => {
  if (isSubmitting.value) return;
  
  isSubmitting.value = true;
  
  try {
    // Séparer le nom en prénom et nom
    const nameParts = form.value.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    // Préparer les données pour l'API (en camelCase car le service les convertira en snake_case)
    const amount = parseFloat(form.value.amount) || 0;
    
    const requestData = {
      companyName: form.value.name || 'Non spécifié',
      address: 'Non spécifié',
      city: 'Non spécifié',
      country: 'RDC',
      phone: '',
      email: form.value.email,
      contactFirstName: firstName || 'Non spécifié',
      contactLastName: lastName || 'Non spécifié',
      contactPhone: '',
      contactEmail: form.value.email,
      projectTitle: form.value.subject || 'Demande de financement',
      projectDescription: form.value.message,
      projectType: mapFinancingType(form.value.subject),
      requestedAmount: amount,
      currency: form.value.currency || 'USD',
    };
    
    await financingRequestService.submitRequest(requestData as any);
    
    toast.open({
      message: '✅ Votre demande de financement a été envoyée avec succès ! Nous vous répondrons sous 24h.',
      type: 'success',
      position: 'top-right',
      duration: 6000,
    });
    
    // Réinitialiser le formulaire
    form.value = { name: '', email: '', subject: '', amount: '', currency: 'USD', message: '' };
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi de la demande:', error);
    
    let errorMessage = 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.';
    
    if (error.status === 422) {
      const errors = error.errors || {};
      const firstError = Object.values(errors)[0] as string[];
      errorMessage = firstError?.[0] || 'Veuillez vérifier les informations saisies.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    toast.open({
      message: `❌ ${errorMessage}`,
      type: 'error',
      position: 'top-right',
      duration: 6000,
    });
  } finally {
    isSubmitting.value = false;
  }
};

// Mapper le type de financement depuis le sujet
const mapFinancingType = (subject: string): 'startup' | 'expansion' | 'equipment' | 'working-capital' | 'other' => {
  if (!subject) return 'other';
  
  const subjectLower = subject.toLowerCase();
  
  if (subjectLower.includes('prêt') || subjectLower.includes('pret')) {
    return 'working-capital';
  } else if (subjectLower.includes('subvention')) {
    return 'startup';
  } else if (subjectLower.includes('capital') || subjectLower.includes('investissement')) {
    return 'expansion';
  } else if (subjectLower.includes('bail') || subjectLower.includes('leasing')) {
    return 'equipment';
  }
  
  return 'other';
};

// Configuration de la carte Leaflet
const center: [number, number] = [-5.04491, 14.78416]; // Mbanza-Ngungu à Noki

// Initialiser la carte
onMounted(() => {
  if (mapContainer.value) {
    // Créer la carte
    map.value = L.map(mapContainer.value, {
      center: center,
      zoom: 15,
      zoomControl: true,
      attributionControl: true,
    });

    // Ajouter les tuiles de base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.value as any);

    // Créer une icône personnalisée pour le marqueur
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          width: 50px;
          height: 50px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 4px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <i class="fas fa-map-marker-alt" style="
            color: white;
            font-size: 24px;
            transform: rotate(45deg);
          "></i>
        </div>
      `,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50],
    });

    // Ajouter le marqueur
    const marker = L.marker(center, { icon: customIcon }).addTo(map.value as any);
    
    // Ajouter un popup avec les informations
    marker.bindPopup(`
      <div style="text-align: center; padding: 8px;">
        <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1e40af;">CReFF-PME</h3>
        <p style="margin: 4px 0; color: #4b5563; font-size: 14px;">
          <i class="fas fa-map-marker-alt" style="color: #3b82f6;"></i>
          Mbanza-Ngungu à Noki
        </p>
        <p style="margin: 4px 0; color: #4b5563; font-size: 14px;">
          Kongo-Central, RDC
        </p>
      </div>
    `).openPopup();
  }
});

// Changer la vue de la carte
const changeMapView = (view: string) => {
  if (!map.value) return;
  
  mapView.value = view;
  
  // Supprimer toutes les couches existantes
  map.value.eachLayer((layer) => {
    if (layer instanceof L.TileLayer) {
      map.value?.removeLayer(layer);
    }
  });

  // Ajouter la nouvelle couche selon la vue sélectionnée
  switch (view) {
    case 'satellite':
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri',
        maxZoom: 19,
      }).addTo(map.value as any);
      break;
    case 'hybrid':
      // Couche satellite
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri',
        maxZoom: 19,
      }).addTo(map.value as any);
      // Couche de labels par-dessus
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri',
        maxZoom: 19,
        opacity: 0.7,
      }).addTo(map.value as any);
      break;
    case 'terrain':
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenTopoMap',
        maxZoom: 17,
      }).addTo(map.value as any);
      break;
    default: // 'osm'
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map.value as any);
  }
};

onUnmounted(() => {
  if (map.value) {
    map.value.remove();
  }
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <NavBar/>
    <header class="relative overflow-hidden bg-gradient-to-br pt-24 sm:pt-32 from-blue-800/90 to-blue-600/90 py-16 sm:py-24 w-full">
  <!-- Effets de fond animés -->
  <div class="absolute inset-0 overflow-hidden">
    <!-- Dégradé principal -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-blue-500/20"></div>
    <!-- Blobs animés -->
    <div class="absolute top-10 left-20 w-64 h-64 bg-indigo-400/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-slow"></div>
    <div class="absolute top-20 right-32 w-72 h-72 bg-cyan-300/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-fast"></div>
  </div>

  <div class="max-w-4xl mx-auto text-center relative z-10">
    <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 animate-gradient-text">
      <span class="block">{{ $t('contact.title') }}</span>
      <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mt-2">
        {{ $t('contact.subtitle') }}
      </span>
    </h1>

    <p class="text-xl text-blue-50 max-w-2xl mx-auto mb-10 animate-fade-in">
      {{ $t('contact.description') }}
    </p>

    <div class="flex flex-wrap justify-center gap-4">
      <a
        href="tel:+243970000000"
        class="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
      >
        {{ $t('contact.callAdvisor') }}
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
    </div>
  </div>

  <!-- Forme décorative en bas -->
  <div class="absolute bottom-0 left-0 right-0 h-16 bg-white/5 transform -skew-y-3 origin-bottom-left animate-wave"></div>
</header>

  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Conteneur principal -->
    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Formulaire de contact -->
          <div id="contact-form" class="py-10 px-6 sm:px-10 lg:px-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ $t('contact.formTitle') }}</h2>
            <p class="text-gray-600 mb-8">{{ $t('contact.formDescription') }}</p>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">
                  Nom complet <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  id="name"
                  required
                  class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Votre nom et prénom"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Adresse email <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  required
                  class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="votre@entreprise.com"
                />
              </div>
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700">
                  Type de financement <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.subject"
                  id="subject"
                  required
                  class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="">Sélectionnez un type de financement</option>
                  <option value="Prêt PME">Prêt PME</option>
                  <option value="Subventions">Subventions</option>
                  <option value="Capital-investissement">Capital-investissement</option>
                  <option value="Crédit-bail">Crédit-bail</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="sm:col-span-2">
                  <label for="amount" class="block text-sm font-medium text-gray-700">
                    Montant demandé <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.amount"
                    type="number"
                    id="amount"
                    min="0"
                    step="0.01"
                    required
                    class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label for="currency" class="block text-sm font-medium text-gray-700">
                    Devise <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.currency"
                    id="currency"
                    required
                    class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="USD">USD</option>
                    <option value="CDF">CDF</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700">
                  Description de votre projet <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="form.message"
                  id="message"
                  rows="5"
                  required
                  class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Décrivez votre projet et vos besoins spécifiques..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  :class="[
                    'w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg',
                    isSubmitting 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  ]"
                >
                  <PaperAirplaneIcon class="w-5 h-5 mr-2" />
                  {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Informations de contact -->
          <div class="py-10 px-6 sm:px-10 lg:px-12 bg-blue-50">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Nos coordonnées</h2>
            <p class="text-gray-600 mb-8">Plusieurs façons de nous contacter</p>
            
            <div class="space-y-6">
              <div v-for="(info, index) in contactInfo" :key="index" class="flex items-start">
                <div class="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <component
                    :is="info.icon"
                    class="w-6 h-6 text-blue-600"
                  />
                </div>
                <div class="ml-4">
                  <h3 class="text-sm font-medium text-gray-900">{{ info.title }}</h3>
                  <a
                    :href="info.link"
                    class="mt-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {{ info.value }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Informations CFFR PME -->
            <div class="mt-8 p-6 bg-white rounded-lg border border-blue-200 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">CFFR PME</h3>
              <p class="text-gray-600 text-sm mb-4">
                Centre de Financement et d'Accompagnement des Petites et Moyennes Entreprises
              </p>
              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex items-center">
                  <span><strong>Heures d'ouverture :</strong> Lun - Ven: 8h00 - 17h00</span>
                </div>
                <div class="flex items-center">
                  <span><strong>Services :</strong> Financement, Accompagnement, Conseil</span>
                </div>
                <div class="flex items-center">
                  <span><strong>Spécialité :</strong> Soutien aux PME congolaises</span>
                </div>
              </div>
            </div>

            <!-- Carte intégrée Leaflet -->
            <div class="mt-8 h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden border-2 border-blue-200 shadow-lg bg-gray-100 relative">
              <div ref="mapContainer" class="w-full h-full rounded-lg"></div>
              <!-- Contrôles de vue de la carte -->
              <div class="absolute top-2 right-2 flex flex-col gap-2 z-[1000]">
                <button
                  @click="changeMapView('osm')"
                  :class="[
                    'px-3 py-2 rounded-lg shadow-lg transition-all text-xs font-medium flex items-center backdrop-blur-sm',
                    mapView === 'osm' 
                      ? 'bg-blue-600 text-white shadow-blue-500/50' 
                      : 'bg-white/95 text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-xl'
                  ]"
                  title="Vue carte standard"
                >
                  <i class="fas fa-map mr-1.5"></i> Carte
                </button>
                <button
                  @click="changeMapView('satellite')"
                  :class="[
                    'px-3 py-2 rounded-lg shadow-lg transition-all text-xs font-medium flex items-center backdrop-blur-sm',
                    mapView === 'satellite' 
                      ? 'bg-blue-600 text-white shadow-blue-500/50' 
                      : 'bg-white/95 text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-xl'
                  ]"
                  title="Vue satellite"
                >
                  <i class="fas fa-satellite mr-1.5"></i> Satellite
                </button>
                <button
                  @click="changeMapView('hybrid')"
                  :class="[
                    'px-3 py-2 rounded-lg shadow-lg transition-all text-xs font-medium flex items-center backdrop-blur-sm',
                    mapView === 'hybrid' 
                      ? 'bg-blue-600 text-white shadow-blue-500/50' 
                      : 'bg-white/95 text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-xl'
                  ]"
                  title="Vue hybride (satellite + labels)"
                >
                  <i class="fas fa-layer-group mr-1.5"></i> Hybride
                </button>
                <button
                  @click="changeMapView('terrain')"
                  :class="[
                    'px-3 py-2 rounded-lg shadow-lg transition-all text-xs font-medium flex items-center backdrop-blur-sm',
                    mapView === 'terrain' 
                      ? 'bg-blue-600 text-white shadow-blue-500/50' 
                      : 'bg-white/95 text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-xl'
                  ]"
                  title="Vue relief"
                >
                  <i class="fas fa-mountain mr-1.5"></i> Relief
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <FooterComponent/>
  </div>
</template>

<style scoped>
/* Animations personnalisées */
.animate-blob-slow {
  animation: blob 7s infinite;
}

.animate-blob-fast {
  animation: blob 5s infinite;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-gradient-text {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-fade-in {
  animation: fadeIn 1.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-wave {
  animation: wave 3s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% {
    transform: -skew-y-3 scaleY(1);
  }
  50% {
    transform: -skew-y-3 scaleY(1.1);
  }
}

/* Styles pour la carte Leaflet */
:deep(.leaflet-container) {
  font-family: inherit;
  border-radius: 8px;
  z-index: 1;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.leaflet-control-zoom) {
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
}

:deep(.leaflet-control-zoom a) {
  background: white;
  color: #3b82f6;
  border: none;
  width: 32px;
  height: 32px;
  line-height: 32px;
  transition: all 0.2s;
}

:deep(.leaflet-control-zoom a:hover) {
  background: #3b82f6;
  color: white;
}

:deep(.leaflet-control-attribution) {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
}

/* Style pour les inputs */
input:focus, textarea:focus, select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Amélioration de la transition sur le bouton */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive design */
@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .text-6xl {
    font-size: 3rem;
  }
  
  .py-24 {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

/* Support pour la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .animate-blob-slow,
  .animate-blob-fast,
  .animate-gradient-text,
  .animate-fade-in,
  .animate-wave {
    animation: none;
  }
}
</style>