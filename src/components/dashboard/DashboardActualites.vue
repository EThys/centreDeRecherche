<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Gestion des Actualités</h2>
        <p class="text-gray-600 mt-1">Créez et gérez les actualités du centre</p>
      </div>
      <button
        @click="showForm = true; editingActuality = null"
        class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <i class="fas fa-plus"></i>
        <span>Nouvelle actualité</span>
      </button>
    </div>

    <!-- Formulaire -->
    <div v-if="showForm" class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">
        {{ editingActuality ? 'Modifier l\'actualité' : 'Nouvelle actualité' }}
      </h3>
      <form @submit.prevent="saveActuality" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
            <input
              v-model="actualityForm.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Titre de l'actualité"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
            <select
              v-model="actualityForm.category"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Sélectionnez...</option>
              <option value="Recherche">Recherche</option>
              <option value="Formation">Formation</option>
              <option value="Partenariat">Partenariat</option>
              <option value="Événement">Événement</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              v-model="actualityForm.image"
              type="url"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="https://..."
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date de publication *</label>
            <input
              v-model="actualityForm.publishDate"
              type="date"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Résumé *</label>
          <textarea
            v-model="actualityForm.summary"
            required
            rows="3"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            placeholder="Résumé de l'actualité..."
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Contenu *</label>
          <textarea
            v-model="actualityForm.content"
            required
            rows="6"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            placeholder="Contenu complet de l'actualité..."
          ></textarea>
        </div>
        <div class="flex gap-4">
          <button
            type="submit"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {{ editingActuality ? 'Modifier' : 'Créer' }}
          </button>
          <button
            type="button"
            @click="cancelForm"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>

    <!-- Liste -->
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold">Titre</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Catégorie</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th class="px-6 py-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="actuality in actualities" :key="actuality.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="font-medium text-gray-900">{{ actuality.title }}</div>
              </td>
              <td class="px-6 py-4">
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {{ actuality.category }}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ formatDate(actuality.publishDate) }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="editActuality(actuality)"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    @click="deleteActuality(actuality.id!)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="actualities.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                Aucune actualité pour le moment
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Actuality } from '@/models'

const showForm = ref(false)
const editingActuality = ref<Actuality | null>(null)
const actualities = ref<Actuality[]>([])

const actualityForm = ref({
  title: '',
  category: '',
  publishDate: '',
  summary: '',
  content: '',
  image: '',
  author: 'Admin',
  readTime: 5
})

const loadActualities = () => {
  // TODO: Charger depuis l'API
  actualities.value = []
}

const saveActuality = () => {
  // TODO: Sauvegarder via l'API
  if (editingActuality.value) {
    const index = actualities.value.findIndex(a => a.id === editingActuality.value?.id)
    if (index !== -1) {
      actualities.value[index] = { ...editingActuality.value, ...actualityForm.value }
    }
  } else {
    const newActuality: Actuality = {
      id: Date.now(),
      title: actualityForm.value.title,
      summary: actualityForm.value.summary,
      content: actualityForm.value.content,
      image: actualityForm.value.image,
      category: actualityForm.value.category,
      publishDate: actualityForm.value.publishDate,
      author: actualityForm.value.author,
      readTime: actualityForm.value.readTime,
      status: 'published',
      createdAt: new Date().toISOString()
    }
    actualities.value.push(newActuality)
  }
  cancelForm()
}

const editActuality = (actuality: Actuality) => {
  editingActuality.value = actuality
  actualityForm.value = {
    title: actuality.title || '',
    category: actuality.category || '',
    publishDate: actuality.publishDate || '',
    summary: actuality.summary || '',
    content: actuality.content || '',
    image: actuality.image || '',
    author: actuality.author || 'Admin',
    readTime: actuality.readTime || 5
  }
  showForm.value = true
}

const deleteActuality = (id: number | string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
    actualities.value = actualities.value.filter(a => a.id !== id)
  }
}

const cancelForm = () => {
  showForm.value = false
  editingActuality.value = null
  actualityForm.value = {
    title: '',
    category: '',
    publishDate: '',
    summary: '',
    content: '',
    image: '',
    author: 'Admin',
    readTime: 5
  }
}

const formatDate = (date?: string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  loadActualities()
})
</script>

