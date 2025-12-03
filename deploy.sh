#!/bin/bash

# Script de déploiement pour CReFF-PME
# Usage: ./deploy.sh [message de commit]

echo "🚀 Démarrage du déploiement..."

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Vérifier que nous sommes sur la branche main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}⚠️  Vous n'êtes pas sur la branche main. Branche actuelle: $CURRENT_BRANCH${NC}"
    read -p "Continuer quand même? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 2. Vérifier l'état du dépôt
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}📝 Fichiers modifiés détectés${NC}"
    git status --short
    
    read -p "Voulez-vous commiter ces changements? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        COMMIT_MSG=${1:-"chore: mise à jour avant déploiement"}
        git add .
        git commit -m "$COMMIT_MSG"
        echo -e "${GREEN}✅ Changements commités${NC}"
    fi
fi

# 3. Pull les dernières modifications
echo -e "${YELLOW}📥 Récupération des dernières modifications...${NC}"
git pull origin main

# 4. Installer les dépendances
echo -e "${YELLOW}📦 Installation des dépendances...${NC}"
npm install

# 5. Build pour la production
echo -e "${YELLOW}🏗️  Build du projet...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erreur lors du build. Arrêt du déploiement.${NC}"
    exit 1
fi

# 6. Copier .htaccess dans dist si nécessaire
if [ -f ".htaccess" ]; then
    cp .htaccess dist/
    echo -e "${GREEN}✅ .htaccess copié dans dist/${NC}"
fi

# 7. Push vers GitHub
echo -e "${YELLOW}📤 Push vers GitHub...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Code poussé vers GitHub avec succès!${NC}"
else
    echo -e "${RED}❌ Erreur lors du push vers GitHub${NC}"
    exit 1
fi

# 8. Afficher les instructions pour le déploiement
echo ""
echo -e "${GREEN}✅ Build terminé avec succès!${NC}"
echo ""
echo "📋 Prochaines étapes pour déployer sur LWS:"
echo ""
echo "Option 1 - FTP/SFTP:"
echo "  1. Connectez-vous à votre espace LWS via FTP"
echo "  2. Naviguez vers le dossier public (www/ ou public_html/)"
echo "  3. Uploadez TOUT le contenu du dossier dist/"
echo ""
echo "Option 2 - SSH:"
echo "  1. Connectez-vous en SSH: ssh utilisateur@votreserveur.lws.fr"
echo "  2. cd /chemin/vers/votre/site"
echo "  3. git pull origin main"
echo "  4. npm install && npm run build"
echo "  5. cp -r dist/* /chemin/vers/www/"
echo ""
echo "📁 Dossier dist/ prêt pour le déploiement:"
ls -lh dist/ | head -5
echo ""

