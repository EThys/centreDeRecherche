# Configuration pour la Production

## Configuration de l'API Backend

L'URL du backend en production est : **https://backend.creffpme.org**

### Détection Automatique de l'Environnement

Le système détecte automatiquement l'environnement (local ou production) et utilise l'URL appropriée :

- **En développement local** : `http://localhost:8000/api`
  - Détecté automatiquement si :
    - Mode développement Vite (`npm run dev`)
    - Hostname = `localhost`, `127.0.0.1`, `0.0.0.0`
    - Hostname commence par `192.168.` ou `10.0.` (réseau local)

- **En production** : `https://backend.creffpme.org/api`
  - Utilisé automatiquement si aucun des critères ci-dessus n'est détecté

### Configuration Frontend (Vue.js)

**Option 1 : Détection automatique (recommandé)**
Aucune configuration nécessaire ! Le système détecte automatiquement l'environnement.

**Option 2 : Configuration manuelle**
Pour forcer une URL spécifique, créez un fichier `.env` ou `.env.local` à la racine du projet avec :

```env
# Pour forcer l'URL de production même en local
VITE_API_BASE_URL=https://backend.creffpme.org/api

# Ou pour forcer l'URL locale
VITE_API_BASE_URL=http://localhost:8000/api
```

**Note :** Si `VITE_API_BASE_URL` est défini, il prendra toujours la priorité sur la détection automatique.

### Configuration Backend (Laravel)

#### 1. Configuration CORS

Le fichier `config/cors.php` est déjà configuré pour accepter les requêtes depuis :
- `https://creffpme.org`
- `https://www.creffpme.org`
- `http://creffpme.org`
- `http://www.creffpme.org`
- Les domaines de développement local

#### 2. Configuration Sanctum

Le fichier `config/sanctum.php` est configuré pour accepter les domaines :
- `creffpme.org`
- `www.creffpme.org`
- `backend.creffpme.org`
- Les domaines de développement local

#### 3. Variables d'environnement Backend

Dans le fichier `.env` du backend, configurez :

```env
APP_URL=https://backend.creffpme.org
FRONTEND_URL=https://creffpme.org

SANCTUM_STATEFUL_DOMAINS=creffpme.org,www.creffpme.org,backend.creffpme.org
```

## Déploiement

### Étapes de déploiement

1. **Backend (Laravel)**
   - Configurer les variables d'environnement dans `.env`
   - Exécuter `php artisan config:cache`
   - Exécuter `php artisan route:cache`
   - S'assurer que le lien symbolique de storage est créé : `php artisan storage:link`
   - Vérifier les permissions des dossiers `storage/` et `bootstrap/cache/`

2. **Frontend (Vue.js)**
   - Créer le fichier `.env.production` avec `VITE_API_BASE_URL=https://backend.creffpme.org/api`
   - Construire le projet : `npm run build`
   - Déployer le contenu du dossier `dist/` sur le serveur web

## Vérification

### Test de l'API

Pour tester que l'API est accessible :

```bash
curl https://backend.creffpme.org/api/actualities
```

### Test de l'authentification

```bash
curl -X POST https://backend.creffpme.org/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ethberg@example.com","password":"password123"}'
```

## Support

En cas de problème de connexion entre le frontend et le backend :

1. Vérifier que le backend est accessible via `https://backend.creffpme.org`
2. Vérifier la configuration CORS dans `config/cors.php`
3. Vérifier la configuration Sanctum dans `config/sanctum.php`
4. Vérifier les logs Laravel dans `storage/logs/laravel.log`
5. Vérifier la console du navigateur pour les erreurs CORS

