# Configuration de l'URL de l'API

## Détection automatique

L'application détecte automatiquement l'environnement et utilise l'URL appropriée :

- **Développement local** (`npm run dev` ou `localhost`/`127.0.0.1`) : `http://localhost:8000/api`
- **Production** (déployé en ligne) : `https://backend.creffpme.org/api`

## Configuration manuelle (optionnelle)

Si vous souhaitez forcer une URL spécifique, créez un fichier `.env.local` à la racine du projet :

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

ou pour la production :

```env
VITE_API_BASE_URL=https://backend.creffpme.org/api
```

## Notes

- Le fichier `.env.local` est ignoré par Git (déjà dans `.gitignore`)
- Les variables d'environnement doivent commencer par `VITE_` pour être accessibles dans le code frontend
- Après modification du fichier `.env.local`, redémarrez le serveur de développement
- La détection automatique fonctionne en vérifiant `import.meta.env.DEV` et `window.location.hostname`

