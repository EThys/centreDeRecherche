# Services API

Ce dossier contient tous les services pour communiquer avec le backend.

## Structure

- **`api.client.ts`** : Client HTTP de base avec gestion de l'authentification
- **`team.service.ts`** : Gestion des équipes (Conseil de Direction et Comité de gestion)
- **`event.service.ts`** : Gestion des événements
- **`actuality.service.ts`** : Gestion des actualités
- **`publication.service.ts`** : Gestion des publications
- **`gallery.service.ts`** : Gestion de la galerie
- **`partner.service.ts`** : Gestion des partenaires
- **`newsletter.service.ts`** : Gestion de la newsletter
- **`financing-request.service.ts`** : Gestion des demandes de financement

## Configuration

L'URL de base de l'API est définie via la variable d'environnement `VITE_API_BASE_URL`.

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Utilisation

### Exemple avec les actualités

```typescript
import { actualityService } from '@/services'

// Récupérer les actualités récentes
const actualities = await actualityService.getRecentActualities(3)

// Récupérer une actualité par ID
const actuality = await actualityService.getActualityById(1)

// Créer une nouvelle actualité
const newActuality = await actualityService.createActuality({
  title: 'Nouvelle actualité',
  summary: 'Résumé...',
  content: 'Contenu complet...',
  image: 'https://...',
  category: 'news',
  author: 'Auteur',
  publishDate: new Date().toISOString(),
})
```

### Exemple avec les événements

```typescript
import { eventService } from '@/services'

// Récupérer les événements à venir
const upcomingEvents = await eventService.getUpcomingEvents(3)

// S'inscrire à un événement
await eventService.registerToEvent(1, {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
})
```

## Authentification

Le client API gère automatiquement l'authentification via le token stocké dans `localStorage` sous la clé `auth_token`.

Pour définir le token après une connexion :

```typescript
localStorage.setItem('auth_token', 'your-jwt-token')
```

## Gestion des erreurs

Tous les services lancent des exceptions de type `ApiError` en cas d'erreur :

```typescript
import { actualityService } from '@/services'
import type { ApiError } from '@/services/api.client'

try {
  const actualities = await actualityService.getRecentActualities()
} catch (error) {
  if (error instanceof Error) {
    const apiError = error as ApiError
    console.error('Erreur API:', apiError.message)
    console.error('Status:', apiError.status)
  }
}
```

