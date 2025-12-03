# Guide de Déploiement - CReFF-PME

## 📋 Prérequis

- Compte GitHub configuré
- Compte LWS (ou autre hébergeur) avec accès SSH/FTP
- Node.js installé (version 20.19.0 ou >=22.12.0)

## 🚀 Étape 1 : Pousser vers GitHub

### 1.1 Vérifier l'état actuel
```bash
git status
```

### 1.2 Ajouter tous les fichiers (sauf ceux dans .gitignore)
```bash
git add .
```

### 1.3 Créer un commit si nécessaire
```bash
git commit -m "feat: préparation pour déploiement production"
```

### 1.4 Pousser vers GitHub
```bash
git push origin main
```

## 🏗️ Étape 2 : Build du projet

### 2.1 Installer les dépendances (si nécessaire)
```bash
npm install
```

### 2.2 Build pour la production
```bash
npm run build
```

Cette commande va créer un dossier `dist/` avec tous les fichiers optimisés pour la production.

## 📤 Étape 3 : Déploiement sur LWS

### Option A : Déploiement via FTP/SFTP

1. **Se connecter à votre espace LWS via FTP**
   - Utilisez FileZilla, WinSCP ou un autre client FTP
   - Hôte : `ftp.votredomaine.com` (ou l'adresse fournie par LWS)
   - Identifiants : ceux fournis par LWS

2. **Uploader les fichiers**
   - Naviguer vers le dossier public (généralement `www/` ou `public_html/`)
   - Uploader TOUT le contenu du dossier `dist/` (pas le dossier lui-même)
   - Structure attendue :
     ```
     www/
     ├── index.html
     ├── assets/
     │   ├── index-xxx.js
     │   ├── index-xxx.css
     │   └── ...
     ```

### Option B : Déploiement via SSH (si disponible)

1. **Se connecter en SSH**
   ```bash
   ssh utilisateur@votreserveur.lws.fr
   ```

2. **Cloner le projet (ou pull les dernières modifications)**
   ```bash
   cd /chemin/vers/votre/site
   git pull origin main
   ```

3. **Installer les dépendances et build**
   ```bash
   npm install
   npm run build
   ```

4. **Copier les fichiers dist vers le dossier public**
   ```bash
   cp -r dist/* /chemin/vers/www/
   ```

### Option C : Déploiement automatique avec GitHub Actions (Recommandé)

1. **Créer le fichier `.github/workflows/deploy.yml`**
   ```yaml
   name: Deploy to LWS
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       
       steps:
       - uses: actions/checkout@v3
       
       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '20'
       
       - name: Install dependencies
         run: npm install
       
       - name: Build
         run: npm run build
       
       - name: Deploy to LWS via FTP
         uses: SamKirkland/FTP-Deploy-Action@4.3.0
         with:
           server: ${{ secrets.FTP_SERVER }}
           username: ${{ secrets.FTP_USERNAME }}
           password: ${{ secrets.FTP_PASSWORD }}
           local-dir: ./dist/
           server-dir: /www/
   ```

2. **Configurer les secrets dans GitHub**
   - Allez dans Settings > Secrets and variables > Actions
   - Ajoutez :
     - `FTP_SERVER` : votre serveur FTP
     - `FTP_USERNAME` : votre nom d'utilisateur
     - `FTP_PASSWORD` : votre mot de passe

## ⚙️ Configuration de l'API en Production

### Important : Vérifier la configuration de l'API

Le fichier `src/services/api.client.ts` détecte automatiquement l'environnement :
- **Local** : `http://localhost:8000/api`
- **Production** : `https://backend.creffpme.org/api`

Assurez-vous que votre backend est accessible à l'adresse `https://backend.creffpme.org/api` en production.

### Si vous devez changer l'URL de l'API

Créez un fichier `.env.production` :
```env
VITE_API_BASE_URL=https://votre-backend.com/api
```

Puis rebuild :
```bash
npm run build
```

## 🔍 Vérifications Post-Déploiement

1. **Vérifier que le site est accessible**
   - Ouvrir `https://votredomaine.com` dans un navigateur

2. **Vérifier la console du navigateur**
   - Ouvrir les DevTools (F12)
   - Vérifier qu'il n'y a pas d'erreurs

3. **Tester les fonctionnalités**
   - Navigation
   - Appels API
   - Authentification
   - Formulaires

## 🐛 Résolution de Problèmes

### Problème : Les routes ne fonctionnent pas (404)
**Solution** : Configurer une réécriture d'URL sur LWS
- Créer un fichier `.htaccess` dans le dossier public :
  ```apache
  <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
  </IfModule>
  ```

### Problème : Les assets ne se chargent pas
**Solution** : Vérifier que le chemin de base est correct
- Dans `vite.config.ts`, vérifier `base: '/'`
- Si votre site est dans un sous-dossier, utiliser `base: '/sous-dossier/'`

### Problème : Erreurs CORS
**Solution** : Configurer CORS sur le backend Laravel
- Vérifier que `config/cors.php` autorise votre domaine frontend

## 📝 Notes Importantes

- ⚠️ Ne jamais commiter les fichiers `.env` avec des secrets
- ⚠️ Le dossier `dist/` est généré automatiquement, ne pas le commiter
- ✅ Toujours tester en local avec `npm run preview` avant de déployer
- ✅ Garder une copie de sauvegarde avant chaque déploiement

## 🔄 Mise à Jour

Pour mettre à jour le site après des modifications :

```bash
# 1. Pull les dernières modifications
git pull origin main

# 2. Installer les nouvelles dépendances (si nécessaire)
npm install

# 3. Rebuild
npm run build

# 4. Déployer (selon votre méthode choisie)
```

