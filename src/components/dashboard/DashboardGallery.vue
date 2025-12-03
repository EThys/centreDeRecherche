<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Gestion de la Galerie</h2>
        <p class="text-gray-600 mt-1">Ajoutez et gérez les photos de la galerie</p>
      </div>
      <button
        @click="showUpload = true"
        class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <i class="fas fa-upload"></i>
        <span>Ajouter des photos</span>
      </button>
    </div>

    <!-- Formulaire d'upload -->
    <div v-if="showUpload" class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Ajouter une photo</h3>
      <form @submit.prevent="savePhoto" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Image *</label>
          <input
            @change="handleImageChange"
            type="file"
            accept="image/*"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <p class="text-xs text-gray-500 mt-1">Formats acceptés: JPEG, PNG, JPG, GIF (max 2MB)</p>
          <!-- Preview de l'image -->
          <div v-if="imagePreview" class="mt-3">
            <img :src="imagePreview" alt="Preview" class="w-48 h-48 object-cover rounded-lg border border-gray-200" />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
            <input
              v-model="photoForm.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Titre de la photo"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
            <div class="relative">
              <input
              v-model="photoForm.category"
                type="text"
                list="category-list"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Tapez ou sélectionnez une catégorie..."
                required
              />
              <datalist id="category-list">
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </datalist>
            </div>
            <p class="text-xs text-gray-500 mt-1">Exemples: Événements, Équipe, Installations, Collaborations, Formations, etc.</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="photoForm.description"
            rows="3"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            placeholder="Description de la photo (optionnel)"
          ></textarea>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date *</label>
            <input
              v-model="photoForm.date"
              type="date"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Auteur *</label>
            <input
              v-model="photoForm.author"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Nom de l'auteur"
            />
          </div>
        </div>
        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div class="flex items-center gap-2">
            <i class="fas fa-exclamation-circle"></i>
            <span>{{ error }}</span>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="saving"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <i v-if="saving" class="fas fa-spinner fa-spin"></i>
            <span>{{ saving ? 'Ajout en cours...' : 'Ajouter' }}</span>
          </button>
          <button
            type="button"
            @click="cancelUpload"
            :disabled="saving"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>

    <!-- Loading State -->
    <div v-if="loading && photos.length === 0" class="text-center py-12">
      <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
      <p class="text-gray-600">Chargement de la galerie...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error && photos.length === 0" class="text-center py-12">
      <i class="fas fa-exclamation-triangle text-4xl text-red-600 mb-4"></i>
      <h3 class="text-xl font-bold text-gray-900 mb-2">Erreur</h3>
      <p class="text-gray-600 mb-6">{{ error }}</p>
      <button
        @click="loadPhotos"
        class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        Réessayer
      </button>
    </div>

    <!-- Grille de photos -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div class="aspect-square overflow-hidden">
          <img
            :src="getImageUrl(photo.image)"
            :alt="photo.title || 'Photo'"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            @error="(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }"
          />
        </div>
        <div class="p-4">
          <h3 class="font-medium text-gray-900 mb-1">{{ photo.title || 'Sans titre' }}</h3>
          <p class="text-sm text-gray-500">{{ photo.category || 'Non catégorisé' }}</p>
          <p v-if="photo.date" class="text-xs text-gray-400 mt-1">{{ formatDate(photo.date) }}</p>
        </div>
        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            @click="deletePhoto(photo.id)"
            class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            :disabled="saving"
          >
            <i class="fas fa-trash text-sm"></i>
          </button>
        </div>
      </div>
      <div v-if="!loading && photos.length === 0" class="col-span-full text-center py-12 text-gray-500">
        <i class="fas fa-images text-4xl text-gray-300 mb-4"></i>
        <p>Aucune photo dans la galerie</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import type { GalleryPhoto } from '@/models'
import galleryService from '@/services/gallery.service'

const toast = useToast()

const showUpload = ref(false)
const photos = ref<GalleryPhoto[]>([])
const imageFile = ref<File | null>(null)
const imagePreview = ref<string | null>(null)
const loading = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)
const categories = ref<string[]>([])

const photoForm = ref({
  title: '',
  description: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  author: 'Admin'
})

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    
    // Vérifier la taille du fichier (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      error.value = 'Le fichier est trop volumineux. Taille maximale: 2MB'
      target.value = ''
      return
    }
    
    imageFile.value = file
    error.value = null
    
    // Créer une preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(imageFile.value)
  }
}

// Charger les photos depuis le backend
const loadPhotos = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await galleryService.getPhotos({
      limit: 100 // Charger toutes les photos pour le dashboard
    })
    photos.value = result.data
  } catch (err: any) {
    console.error('Erreur lors du chargement des photos:', err)
    error.value = err.message || 'Erreur lors du chargement de la galerie'
  photos.value = []
  } finally {
    loading.value = false
  }
}

// Charger les catégories depuis le backend
const loadCategories = async () => {
  try {
    const cats = await galleryService.getCategories()
    const backendCategories = cats.map(cat => cat.name || cat.id)
    
    // Catégories par défaut suggérées
    const defaultCategories = [
      'Événements',
      'Équipe',
      'Installations',
      'Collaborations',
      'Formations',
      'Conférences',
      'Ateliers',
      'Réunions',
      'Cérémonies',
      'Activités',
      'Projets',
      'Partenariats'
    ]
    
    // Combiner les catégories du backend avec les catégories par défaut
    // Utiliser un Set pour éviter les doublons
    const allCategories = new Set([...defaultCategories, ...backendCategories])
    categories.value = Array.from(allCategories).sort()
    
    // Si aucune catégorie, utiliser uniquement les catégories par défaut
    if (categories.value.length === 0) {
      categories.value = defaultCategories
    }
  } catch (err) {
    console.error('Erreur lors du chargement des catégories:', err)
    // Utiliser des catégories par défaut en cas d'erreur
    categories.value = [
      'Événements',
      'Équipe',
      'Installations',
      'Collaborations',
      'Formations',
      'Conférences',
      'Ateliers',
      'Réunions',
      'Cérémonies',
      'Activités',
      'Projets',
      'Partenariats'
    ]
  }
}

// Sauvegarder la photo via l'API
const savePhoto = async () => {
  if (!imageFile.value) {
    error.value = 'Veuillez sélectionner une image'
    toast.open({
      message: '⚠️ Veuillez sélectionner une image',
      type: 'warning',
      position: 'top-right',
      duration: 4000,
    })
    return
  }
  
  if (!photoForm.value.title || !photoForm.value.category) {
    error.value = 'Veuillez remplir tous les champs obligatoires'
    toast.open({
      message: '⚠️ Veuillez remplir tous les champs obligatoires',
      type: 'warning',
      position: 'top-right',
      duration: 4000,
    })
    return
  }
  
  saving.value = true
  error.value = null
  
  try {
    const newPhoto = await galleryService.uploadPhoto(imageFile.value, {
    title: photoForm.value.title,
      description: photoForm.value.description || '',
    category: photoForm.value.category,
      date: photoForm.value.date,
      author: photoForm.value.author
    })
    
    // Ajouter la nouvelle photo à la liste
    photos.value.unshift(newPhoto)
    
    // Réinitialiser le formulaire
    cancelUpload()
    
    // Afficher un message de succès
    toast.open({
      message: '✅ Photo ajoutée à la galerie avec succès !',
      type: 'success',
      position: 'top-right',
      duration: 5000,
    })
    
    // Émettre un événement pour mettre à jour les stats
    window.dispatchEvent(new CustomEvent('dashboard:update-stats'))
  } catch (err: any) {
    console.error('Erreur lors de l\'ajout de la photo:', err)
    const errorMessage = err.message || 'Erreur lors de l\'ajout de la photo'
    error.value = errorMessage
    toast.open({
      message: `❌ ${errorMessage}`,
      type: 'error',
      position: 'top-right',
      duration: 6000,
    })
  } finally {
    saving.value = false
  }
}

// Supprimer une photo via l'API
const deletePhoto = async (id: number | string | undefined) => {
  if (!id) return
  
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
    return
  }
  
  saving.value = true
  error.value = null
  
  try {
    await galleryService.deletePhoto(id)
    
    // Retirer la photo de la liste
    photos.value = photos.value.filter(p => p.id !== id)
    
    toast.open({
      message: '✅ Photo supprimée de la galerie avec succès !',
      type: 'success',
      position: 'top-right',
      duration: 5000,
    })
    
    // Émettre un événement pour mettre à jour les stats
    window.dispatchEvent(new CustomEvent('dashboard:update-stats'))
  } catch (err: any) {
    console.error('Erreur lors de la suppression de la photo:', err)
    const errorMessage = err.message || 'Erreur lors de la suppression de la photo'
    error.value = errorMessage
    toast.open({
      message: `❌ ${errorMessage}`,
      type: 'error',
      position: 'top-right',
      duration: 6000,
    })
  } finally {
    saving.value = false
  }
}

// Obtenir l'URL de l'image
const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) {
    return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
  return galleryService.getImageUrl(imagePath) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
}

// Formater la date
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return dateString
  }
}

const cancelUpload = () => {
  showUpload.value = false
  imageFile.value = null
  imagePreview.value = null
  error.value = null
  photoForm.value = {
    title: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Admin'
  }
}

onMounted(async () => {
  // Charger les catégories puis les photos
  await loadCategories()
  await loadPhotos()
})
</script>

