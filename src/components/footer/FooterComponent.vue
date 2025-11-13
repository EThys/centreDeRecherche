<template>
  <footer
    class="bg-gradient-to-br from-blue-800 via-indigo-800 to-indigo-900 text-white pt-16 pb-10 relative overflow-hidden"
  >
    <!-- Éléments décoratifs -->
    <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div
        class="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-400 filter blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-indigo-400 filter blur-3xl animate-pulse"
      ></div>
    </div>

    <!-- Effet de vagues animé -->
    <div class="absolute -top-1 left-0 w-full overflow-hidden leading-none rotate-180">
      <svg
        class="relative block w-full h-12"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
      >
        <path
          d="M985.66 92.83c-83.3-21.5-168.06-38.26-252.84-42.8C646.4 46.48 560.81 57 475.18 63.35 379.72 70.19 284.1 72.34 188.57 62.12c-62.9-6.85-125.82-19.76-188.57-35.39v93.27h1200V59.72c-71.62 21.93-145.58 38.54-221.34 33.11z"
          fill="url(#grad1)"
        ></path>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #2563eb; stop-opacity: 1"></stop>
            <stop offset="100%" style="stop-color: #4f46e5; stop-opacity: 1"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div class="container mx-auto px-6 relative">
      <!-- Contenu principal -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Colonne Logo -->
        <div class="md:col-span-2">
          <div class="flex items-center mb-6">
            <div
              class="bg-white/20 p-2.5 rounded-xl mr-4 backdrop-blur-sm transform transition duration-500 hover:rotate-12 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-9 w-9 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6l4 2"
                />
              </svg>
            </div>
            <h2
              class="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200"
            >
              École<span class="font-light">Nova</span>
            </h2>
          </div>
          <p class="text-indigo-100/90 text-lg mb-6 leading-relaxed">
            Une école d’excellence tournée vers l’avenir. Nous formons les leaders de demain grâce à
            des programmes innovants et une pédagogie moderne.
          </p>
          <div class="flex space-x-5">
            <a
              href="#"
              class="text-white hover:text-blue-300 transition-all duration-300 transform hover:-translate-y-1"
            >
              <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7h-2.5v-3h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 3h-2.4v7c4.7-.8 8.4-4.9 8.4-9.9z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="text-white hover:text-blue-300 transition-all duration-300 transform hover:-translate-y-1"
            >
              <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M8.3 20.2c7.5 0 11.7-6.3 11.7-11.7v-.5A8.3 8.3 0 0022 5.9a8.1 8.1 0 01-2.4.6 4.1 4.1 0 001.8-2.3 8.2 8.2 0 01-2.6 1A4.1 4.1 0 0012 9.4a11.6 11.6 0 01-8.5-4.3 4.1 4.1 0 001.3 5.5 4 4 0 01-1.9-.5v.1c0 2 1.4 3.7 3.3 4a4.2 4.2 0 01-1.9.1 4.1 4.1 0 003.8 2.9A8.2 8.2 0 012 18.4a11.6 11.6 0 006.3 1.8"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Liens rapides -->
        <div>
          <h3 class="text-xl font-semibold mb-5 pb-2 relative inline-block">
            <span class="relative z-10">Liens rapides</span>
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400/50 rounded-full"></span>
          </h3>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="flex items-center text-indigo-100/90 hover:text-white transition-all duration-300 group"
              >
                <span
                  class="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                ></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300"
                  >Accueil</span
                >
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center text-indigo-100/90 hover:text-white transition-all duration-300 group"
              >
                <span
                  class="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                ></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300"
                  >Programmes</span
                >
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center text-indigo-100/90 hover:text-white transition-all duration-300 group"
              >
                <span
                  class="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                ></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300"
                  >Admissions</span
                >
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center text-indigo-100/90 hover:text-white transition-all duration-300 group"
              >
                <span
                  class="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                ></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300"
                  >Contact</span
                >
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-xl font-semibold mb-5 pb-2 relative inline-block">
            <span class="relative z-10">Contact</span>
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400/50 rounded-full"></span>
          </h3>
          <ul class="space-y-4">
            <li class="flex items-start group">
              <div
                class="bg-indigo-900/30 p-1.5 rounded-lg mr-3 group-hover:bg-blue-700/50 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.9 5.3a2 2 0 002.2 0L21 8M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span class="text-indigo-100/90 group-hover:text-white transition-colors duration-300"
                >contact@ecolenova.com</span
              >
            </li>
            <li class="flex items-start group">
              <div
                class="bg-indigo-900/30 p-1.5 rounded-lg mr-3 group-hover:bg-blue-700/50 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.3a1 1 0 01.9.7l1.5 4.5a1 1 0 01-.5 1.2l-2.3 1.1a11 11 0 005.5 5.5l1.1-2.3a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.7.9V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z"
                  />
                </svg>
              </div>
              <span class="text-indigo-100/90 group-hover:text-white transition-colors duration-300"
                >+33 1 23 45 67 89</span
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="border-t border-indigo-500/20 pt-8 flex flex-col md:flex-row justify-between items-center"
      >
        <p class="text-indigo-100/80 text-sm mb-4 md:mb-0">
          © 2025 ÉcoleNova. Tous droits réservés.
        </p>
        <div class="flex flex-wrap justify-center gap-4 md:gap-6">
          <a
            href="#"
            class="text-indigo-100/80 hover:text-white text-sm transition-all duration-300 hover:underline underline-offset-4"
            >Mentions légales</a
          >
          <a
            href="#"
            class="text-indigo-100/80 hover:text-white text-sm transition-all duration-300 hover:underline underline-offset-4"
            >Politique de confidentialité</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.2);
  background-size: 200% 200%;
  animation: gradientBG 15s ease infinite;
}
@keyframes gradientBG {
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
a:hover svg {
  filter: drop-shadow(0 2px 6px rgba(59, 130, 246, 0.4));
}
</style>
