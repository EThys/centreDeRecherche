# Modèles de données

Ce dossier contient tous les modèles TypeScript pour les entités de l'application.

## Structure

- **`team.model.ts`** : Modèles pour les équipes (TeamMember, TeamCategory)
- **`event.model.ts`** : Modèles pour les événements (Event, EventRegistration, EventSpeaker)
- **`actuality.model.ts`** : Modèles pour les actualités (Actuality)
- **`publication.model.ts`** : Modèles pour les publications (Publication, PublicationAuthor)
- **`gallery.model.ts`** : Modèles pour la galerie (GalleryPhoto, GalleryCategory)
- **`partner.model.ts`** : Modèles pour les partenaires (Partner)
- **`newsletter.model.ts`** : Modèles pour la newsletter (NewsletterSubscription, NewsletterCampaign)
- **`financing-request.model.ts`** : Modèles pour les demandes de financement (FinancingRequest)

## Utilisation

### Import des modèles

```typescript
import type { Actuality, Event, Publication } from '@/models'
```

### Exemple d'utilisation dans un composant

```typescript
<script setup lang="ts">
import { ref } from 'vue'
import type { Actuality } from '@/models'
import { actualityService } from '@/services'

const actualities = ref<Actuality[]>([])

const loadActualities = async () => {
  const response = await actualityService.getRecentActualities(3)
  actualities.value = response
}
</script>
```

## Types communs

Tous les modèles partagent certaines propriétés communes :
- `id?`: Identifiant unique
- `createdAt?`: Date de création
- `updatedAt?`: Date de mise à jour

Les réponses API suivent le format `ApiResponse<T>` défini dans `api.client.ts`.

