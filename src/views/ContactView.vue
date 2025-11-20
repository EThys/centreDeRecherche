<script setup lang="ts">
import { ref } from 'vue';
import { PaperAirplaneIcon, PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';
import { useToast } from 'vue-toast-notification';
//@ts-ignore
import FooterComponent from '../components/footer/FooterComponent.vue'
//@ts-ignore
import NavBar from '../components/navbar/NavBarComponent.vue'

const toast = useToast();
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const contactInfo = [
  { icon: EnvelopeIcon, title: 'Email', value: 'contact@cffrepme.com', link: 'mailto:contact@cffrepme.com' },
  { icon: PhoneIcon, title: 'Téléphone', value: '+243 97 000 0000', link: 'tel:+243970000000' },
  { icon: MapPinIcon, title: 'Adresse', value: '123 Av. de la Justice, Kinshasa, RDC', link: '#' },
];

const submitForm = () => {
  toast.open({
    message: 'Votre message a été envoyé avec succès ! Nous vous répondrons sous 24h.',
    type: 'success',
    position: 'top-right',
    duration: 5000,
  });
  // Réinitialiser le formulaire
  form.value = { name: '', email: '', subject: '', message: '' };
};
</script>

<template>
  <NavBar/>
    <header class="relative overflow-hidden bg-gradient-to-br mt-5 sm:mt-15 from-blue-800/90 to-blue-600/90 py-24 w-full">
  <!-- Effets de fond animés -->
  <div class="absolute inset-0 overflow-hidden">
    <!-- Dégradé principal -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-blue-500/20"></div>
    <!-- Blobs animés -->
    <div class="absolute top-10 left-20 w-64 h-64 bg-indigo-400/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-slow"></div>
    <div class="absolute top-20 right-32 w-72 h-72 bg-cyan-300/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob-fast"></div>
  </div>

  <!-- Contenu principal -->
  <div class="max-w-4xl mx-auto text-center relative z-10">
    <!-- Badge "Contact" avec effet de verre -->
    <div class="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
      <svg class="w-5 h-5 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <span class="text-sm font-medium text-white">Contactez notre équipe</span>
    </div>

    <!-- Titre principal avec effet de dégradé animé -->
    <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 animate-gradient-text">
      <span class="block">Prenons contact</span>
      <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mt-2">
        pour financer votre PME
      </span>
    </h1>

    <!-- Sous-titre avec animation -->
    <p class="text-xl text-blue-50 max-w-2xl mx-auto mb-10 animate-fade-in">
      Notre équipe d'experts en financement est disponible pour répondre à vos questions sous <strong class="text-white">24 heures</strong>.
    </p>

    <!-- Boutons d'action -->
    <div class="flex flex-wrap justify-center gap-4">
      <a
        href="#contact-form"
        class="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Demander un financement
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
      <a
        href="tel:+243970000000"
        class="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
      >
        Appeler un conseiller
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
    </div>
  </div>

  <!-- Forme décorative en bas -->
  <div class="absolute bottom-0 left-0 right-0 h-16 bg-white/5 transform -skew-y-3 origin-bottom-left animate-wave"></div>
</header>

  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 sm:mt-7 lg:px-8">
    <!-- Conteneur principal -->
    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Formulaire de contact -->
          <div id="contact-form" class="py-10 px-6 sm:px-10 lg:px-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Demande de financement</h2>
            <p class="text-gray-600 mb-8">Remplissez ce formulaire pour être contacté par un de nos conseillers</p>
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
                  placeholder="Décrivez votre projet, le montant recherché et vos besoins spécifiques..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <PaperAirplaneIcon class="w-5 h-5 mr-2" />
                  Envoyer ma demande
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
                  <span class="w-5 h-5 mr-2">🏢</span>
                  <span><strong>Heures d'ouverture :</strong> Lun - Ven: 8h00 - 17h00</span>
                </div>
                <div class="flex items-center">
                  <span class="w-5 h-5 mr-2">💼</span>
                  <span><strong>Services :</strong> Financement, Accompagnement, Conseil</span>
                </div>
                <div class="flex items-center">
                  <span class="w-5 h-5 mr-2">🎯</span>
                  <span><strong>Spécialité :</strong> Soutien aux PME congolaises</span>
                </div>
              </div>
            </div>

            <!-- Carte intégrée -->
            <div class="mt-8 h-64 rounded-lg overflow-hidden border border-blue-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.527139749253!2d15.29215031475134!3d-4.325813696633325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a31d9f3b28b2d%3A0x5a8fefb9f67fda0!2sKinshasa%2C%20Democratic%20Republic%20of%20the%20Congo!5e0!3m2!1sen!2sus!4v1684320000000!5m2!1sen!2sus"
                class="w-full h-full border-0"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent/>
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