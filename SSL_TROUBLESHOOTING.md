# Guide de résolution des problèmes SSL/TLS

## Problème : "Ce site ne peut pas fournir de connexion sécurisée - protocole incompatible"

Ce problème survient généralement lorsque :
1. Le serveur utilise des protocoles TLS obsolètes (TLS 1.0 ou 1.1)
2. Le certificat SSL est invalide ou expiré
3. La configuration SSL du serveur est incorrecte

## Solutions

### 1. Vérifier le certificat SSL

Utilisez ces outils en ligne pour vérifier votre certificat :
- [SSL Labs SSL Test](https://www.ssllabs.com/ssltest/analyze.html?d=creffpme.org)
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html#hostname=creffpme.org)

### 2. Vérifier la configuration SSL dans cPanel

1. Connectez-vous à votre cPanel
2. Allez dans **SSL/TLS Status**
3. Vérifiez que votre certificat est valide et non expiré
4. Assurez-vous que le certificat couvre bien `creffpme.org` et `www.creffpme.org`

### 3. Configuration Apache (si vous avez accès)

Si vous avez accès à la configuration Apache, ajoutez ces directives dans votre fichier de configuration Apache ou `.htaccess` :

```apache
# Forcer TLS 1.2 et 1.3 uniquement
SSLProtocol +TLSv1.2 +TLSv1.3

# Cipher suites modernes
SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384
```

### 4. Vérifier via la ligne de commande

```bash
# Vérifier les protocoles supportés
openssl s_client -connect creffpme.org:443 -tls1_2
openssl s_client -connect creffpme.org:443 -tls1_3

# Vérifier le certificat
openssl s_client -connect creffpme.org:443 -showcerts
```

### 5. Contacter votre hébergeur

Si le problème persiste, contactez votre hébergeur (LWS) et demandez :
- D'activer TLS 1.2 et 1.3 uniquement
- De désactiver TLS 1.0 et 1.1
- De vérifier que le certificat SSL est valide et à jour
- De vérifier la configuration SSL du serveur

### 6. Vérifier les ressources mixtes (Mixed Content)

Assurez-vous que toutes les ressources (images, scripts, CSS) sont chargées en HTTPS :
- Vérifiez la console du navigateur pour les erreurs "Mixed Content"
- Tous les appels API doivent utiliser HTTPS
- Toutes les images doivent être chargées via HTTPS

### 7. Renouveler le certificat SSL

Si le certificat est expiré :
1. Allez dans cPanel > **SSL/TLS**
2. Cliquez sur **Manage SSL sites**
3. Sélectionnez votre domaine
4. Utilisez **AutoSSL** pour renouveler automatiquement le certificat

### 8. Vérifier la configuration DNS

Assurez-vous que votre DNS pointe correctement vers le serveur :
```bash
dig creffpme.org
nslookup creffpme.org
```

## Fichiers modifiés

Le fichier `.htaccess` a été mis à jour avec :
- Configuration SSL/TLS stricte
- Headers de sécurité (HSTS, CSP, etc.)
- Redirection HTTPS forcée
- Optimisations de cache

## Test après correction

1. Videz le cache de votre navigateur
2. Testez avec différents navigateurs (Chrome, Firefox, Safari)
3. Utilisez [SSL Labs](https://www.ssllabs.com/ssltest/) pour obtenir une note A ou A+
4. Vérifiez que le site fonctionne en HTTPS uniquement

## Support

Si le problème persiste après ces vérifications, contactez le support de votre hébergeur avec :
- Les résultats de SSL Labs
- Les messages d'erreur exacts
- Les navigateurs concernés
- Les captures d'écran des erreurs

