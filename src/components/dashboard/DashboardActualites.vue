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

    <!-- Message d'erreur -->
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
      <div class="flex items-center gap-2">
        <i class="fas fa-exclamation-circle"></i>
        <span>{{ error }}</span>
      </div>
      <button
        v-if="error.includes('serveur') || error.includes('connecter')"
        @click="loadActualities"
        class="mt-3 text-sm text-red-600 hover:text-red-800 underline"
      >
        Réessayer
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <input
              @change="handleImageChange"
              type="file"
              accept="image/*"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <p class="text-xs text-gray-500 mt-1">Formats acceptés: JPEG, PNG, JPG, GIF (max 2MB)</p>
            <!-- Preview de l'image -->
            <div v-if="imagePreview" class="mt-3">
              <img :src="imagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-lg border border-gray-200" />
            </div>
            <!-- Image existante si en mode édition -->
            <div v-else-if="editingActuality && actualityForm.image" class="mt-3">
              <img :src="actualityForm.image" alt="Image actuelle" class="w-32 h-32 object-cover rounded-lg border border-gray-200" />
              <p class="text-xs text-gray-500 mt-1">Image actuelle</p>
            </div>
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
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Ce que vous apprendrez</label>
          <p class="text-xs text-gray-500 mb-2">Ajoutez un point par ligne</p>
          <textarea
            v-model="learningPointsText"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            placeholder="Les dernières tendances en matière de financement des PME&#10;Comment préparer un dossier de financement convaincant&#10;Les différentes sources de financement disponibles&#10;Les erreurs à éviter lors de la recherche de financement"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Points clés à retenir</label>
          <p class="text-xs text-gray-500 mb-2">Ajoutez un point par ligne</p>
          <textarea
            v-model="keyPointsText"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            placeholder="Comprendre les mécanismes de financement adaptés aux PME&#10;Identifier les opportunités de croissance et de développement&#10;Optimiser la gestion financière de votre entreprise&#10;Accéder aux ressources et programmes disponibles"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Mots-clés (tags)</label>
          <p class="text-xs text-gray-500 mb-2">Séparez les tags par des virgules</p>
          <input
            v-model="tagsText"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Formation, PME, Financement, RDC"
          />
        </div>
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Enregistrement...</span>
            <span v-else>{{ editingActuality ? 'Modifier' : 'Créer' }}</span>
          </button>
          <button
            type="button"
            @click="cancelForm"
            :disabled="loading"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <tr v-if="loading && actualities.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                Chargement...
              </td>
            </tr>
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
                    :disabled="loading"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    @click="deleteActuality(actuality.id!)"
                    :disabled="loading"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!loading && actualities.length === 0">
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
import actualityService from '@/services/actuality.service'

const showForm = ref(false)
const editingActuality = ref<Actuality | null>(null)
const actualities = ref<Actuality[]>([])
const imageFile = ref<File | null>(null)
const imagePreview = ref<string | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

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

const learningPointsText = ref('')
const keyPointsText = ref('')
const tagsText = ref('')

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    imageFile.value = target.files[0]
    // Créer une preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(imageFile.value)
  }
}

const loadActualities = async () => {
  loading.value = true
  error.value = null
  try {
    console.log('🔄 Chargement des actualités...')
    const result = await actualityService.getActualities({ limit: 100 })
    console.log('✅ Réponse reçue:', result)
    
    if (result && result.data) {
      console.log(`📊 ${result.data.length} actualité(s) chargée(s)`)
      actualities.value = result.data
    } else {
      console.warn('⚠️ Aucune donnée dans la réponse:', result)
      actualities.value = []
      error.value = 'Aucune donnée reçue du serveur'
    }
  } catch (err: any) {
    console.error('❌ Erreur complète lors du chargement:', err)
    console.error('Détails:', {
      message: err.message,
      status: err.status,
      errors: err.errors,
      stack: err.stack
    })
    
    if (err.status === 500) {
      error.value = 'Erreur serveur. Vérifiez que le backend est démarré et que la base de données est accessible.'
    } else if (err.status === 404) {
      error.value = 'Endpoint non trouvé. Vérifiez la configuration de l\'API.'
    } else if (err.status === 0 || err.message?.includes('fetch') || err.message?.includes('Failed to fetch')) {
      error.value = 'Impossible de se connecter au serveur. Vérifiez que le backend est accessible.'
    } else {
      error.value = err.message || (err.errors ? JSON.stringify(err.errors) : 'Erreur lors du chargement des actualités')
    }
    actualities.value = []
  } finally {
    loading.value = false
  }
}

const saveActuality = async () => {
  loading.value = true
  error.value = null
  
    try {
      // Convertir les textes en tableaux
      const learningPoints = learningPointsText.value
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
      
      const keyPoints = keyPointsText.value
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
      
      const tags = tagsText.value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      // Préparer les données
      const actualityData: Omit<Actuality, 'id' | 'createdAt' | 'updatedAt'> = {
        title: actualityForm.value.title.trim(),
        summary: actualityForm.value.summary.trim(),
        content: actualityForm.value.content.trim(),
        category: actualityForm.value.category.trim(),
        publishDate: actualityForm.value.publishDate,
        author: actualityForm.value.author.trim(),
        readTime: actualityForm.value.readTime,
        status: 'published',
        learningPoints: learningPoints, // Toujours envoyer un tableau, même vide
        keyPoints: keyPoints, // Toujours envoyer un tableau, même vide
        tags: tags // Toujours envoyer un tableau, même vide
      }

    if (editingActuality.value) {
      // Mise à jour
      await actualityService.updateActuality(
        editingActuality.value.id!,
        actualityData,
        imageFile.value || undefined
      )
    } else {
      // Création
      await actualityService.createActuality(actualityData, imageFile.value || undefined)
    }
    
    // Recharger la liste
    await loadActualities()
    cancelForm()
  } catch (err: any) {
    console.error('Erreur lors de la sauvegarde:', err)
    error.value = err.message || 'Erreur lors de la sauvegarde'
    if (err.errors) {
      // Afficher les erreurs de validation
      const validationErrors = Object.values(err.errors).flat().join(', ')
      error.value = `Erreurs de validation: ${validationErrors}`
    }
  } finally {
    loading.value = false
  }
}

// Fonction pour normaliser une date au format YYYY-MM-DD pour l'input date
const normalizeDate = (dateString?: string | null): string => {
  if (!dateString || typeof dateString !== 'string') return ''
  const trimmed = dateString.trim()
  if (!trimmed) return ''
  
  try {
    // Si c'est déjà au format YYYY-MM-DD, on le retourne tel quel
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      return trimmed
    }
    
    // Sinon, on essaie de parser la date
    const date = new Date(trimmed)
    if (isNaN(date.getTime())) {
      // Si la date est invalide, on essaie de parser comme YYYY-MM-DD
      const parts = trimmed.split('-')
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10)
        const month = parseInt(parts[1], 10)
        const day = parseInt(parts[2], 10)
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          const testDate = new Date(year, month - 1, day)
          if (testDate.getFullYear() === year && testDate.getMonth() === month - 1 && testDate.getDate() === day) {
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          }
        }
      }
      return ''
    }
    
    // Formater en YYYY-MM-DD
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (e) {
    console.warn('Erreur lors de la normalisation de la date:', dateString, e)
    return ''
  }
}

const editActuality = (actuality: Actuality) => {
  try {
    editingActuality.value = actuality
    actualityForm.value = {
      title: actuality.title || '',
      category: actuality.category || '',
      publishDate: normalizeDate(actuality.publishDate),
      summary: actuality.summary || '',
      content: actuality.content || '',
      image: actuality.image || '',
      author: actuality.author || 'Admin',
      readTime: actuality.readTime || 5
    }
    learningPointsText.value = actuality.learningPoints ? actuality.learningPoints.join('\n') : ''
    keyPointsText.value = actuality.keyPoints ? actuality.keyPoints.join('\n') : ''
    tagsText.value = actuality.tags ? actuality.tags.join(', ') : ''
    imageFile.value = null
    imagePreview.value = actuality.image || null
    showForm.value = true
  } catch (err) {
    console.error('Erreur lors de l\'édition de l\'actualité:', err)
    error.value = 'Erreur lors du chargement des données de l\'actualité'
  }
}

const deleteActuality = async (id: number | string) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
    return
  }
  
  loading.value = true
  error.value = null
  try {
    await actualityService.deleteActuality(id)
    await loadActualities()
  } catch (err: any) {
    console.error('Erreur lors de la suppression:', err)
    error.value = err.message || 'Erreur lors de la suppression'
  } finally {
    loading.value = false
  }
}

const cancelForm = () => {
  showForm.value = false
  editingActuality.value = null
  imageFile.value = null
  imagePreview.value = null
  learningPointsText.value = ''
  keyPointsText.value = ''
  tagsText.value = ''
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
  error.value = null
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

