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
          <label class="block text-sm font-medium text-gray-700 mb-2">URL de l'image *</label>
          <input
            v-model="photoForm.url"
            type="url"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="https://..."
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
            <input
              v-model="photoForm.title"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Titre de la photo"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
            <select
              v-model="photoForm.category"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Sélectionnez...</option>
              <option value="Événements">Événements</option>
              <option value="Équipe">Équipe</option>
              <option value="Installations">Installations</option>
              <option value="Collaborations">Collaborations</option>
            </select>
          </div>
        </div>
        <div class="flex gap-4">
          <button
            type="submit"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Ajouter
          </button>
          <button
            type="button"
            @click="cancelUpload"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>

    <!-- Grille de photos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div class="aspect-square overflow-hidden">
          <img
            :src="photo.image"
            :alt="photo.title || 'Photo'"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div class="p-4">
          <h3 class="font-medium text-gray-900 mb-1">{{ photo.title || 'Sans titre' }}</h3>
          <p class="text-sm text-gray-500">{{ photo.category || 'Non catégorisé' }}</p>
        </div>
        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            @click="deletePhoto(photo.id)"
            class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <i class="fas fa-trash text-sm"></i>
          </button>
        </div>
      </div>
      <div v-if="photos.length === 0" class="col-span-full text-center py-12 text-gray-500">
        Aucune photo dans la galerie
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { GalleryPhoto } from '@/models'

const showUpload = ref(false)
const photos = ref<GalleryPhoto[]>([])

const photoForm = ref({
  url: '',
  title: '',
  category: ''
})

const loadPhotos = () => {
  // TODO: Charger depuis l'API
  photos.value = []
}

const savePhoto = () => {
  // TODO: Sauvegarder via l'API
  const newPhoto: GalleryPhoto = {
    id: Date.now(),
    image: photoForm.value.url,
    title: photoForm.value.title,
    description: '',
    category: photoForm.value.category,
    date: new Date().toISOString(),
    author: 'Admin',
    createdAt: new Date().toISOString()
  }
  photos.value.push(newPhoto)
  cancelUpload()
}

const deletePhoto = (id: number | string | undefined) => {
  if (!id) return
  if (confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
    photos.value = photos.value.filter(p => p.id !== id)
  }
}

const cancelUpload = () => {
  showUpload.value = false
  photoForm.value = {
    url: '',
    title: '',
    category: ''
  }
}

onMounted(() => {
  loadPhotos()
})
</script>

