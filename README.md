# 📚 Lectio

Une alternative open source aux plateformes comme Glose - Plateforme de lecture collaborative

## 🚀 Fonctionnalités

- **Lecteurs intégrés** : Support EPUB et PDF avec interface moderne
- **Annotations collaboratives** : Système d'annotations avec synchronisation Hypothesis.is
- **Gestion des groupes** : Création et gestion de groupes de lecture
- **Interface d'administration** : Panneau complet pour la gestion des utilisateurs, livres et groupes
- **Authentification sécurisée** : Auth.js v5 avec support multi-providers
- **Design minimal** : Système de design Lectio (noir/blanc/gris)
- **Responsive** : Interface adaptée mobile et desktop

## 🛠️ Stack Technique

- **Frontend** : Next.js 15 (App Router), React 19, TypeScript
- **Backend** : Next.js API Routes, Prisma ORM
- **Base de données** : PostgreSQL
- **Authentification** : Auth.js v5
- **Lecteurs** : EPUB.js, PDF.js
- **Annotations** : Hypothesis.is API
- **Styles** : Tailwind CSS, CSS Variables
- **Déploiement** : Docker, Docker Compose

## 📋 Prérequis

- Node.js 20+
- PostgreSQL 14+
- Docker (optionnel, pour déploiement)

## 🏃‍♂️ Installation

### Développement Local

```bash
# Cloner le projet
git clone https://github.com/votre-username/lectio-app.git
cd lectio-app

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
# Éditer .env.local avec vos configurations

# Configurer la base de données
npx prisma generate
npx prisma db push

# Populer avec des données de test
npm run db:seed

# Lancer en mode développement
npm run dev
```

### Déploiement Docker

```bash
# Lancer avec Docker Compose
docker-compose up -d

# Ou pour la production avec Nginx
docker-compose --profile production up -d
```

## 🔧 Configuration

### Variables d'environnement

```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/lectio_db"

# Authentification
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Hypothesis API (optionnel)
HYPOTHESIS_API_KEY="your-hypothesis-api-key"
```

### Configuration PostgreSQL pour Unraid

```env
DATABASE_URL="postgresql://username:password@unraid-server-ip:5432/lectio_db"
```

## 👥 Comptes par défaut

Après l'exécution du seed :

- **Admin** : `admin@lectio.local` / `admin123`
- **Lecteur** : `reader@lectio.local` / `reader123`

## 📖 Utilisation

### Interface Utilisateur

1. **Connexion** : `/auth/signin`
2. **Tableau de bord** : `/`
3. **Lecteur EPUB** : `/reader/basic`
4. **Lecteur PDF** : `/reader/advanced`
5. **Annotations** : `/annotations`

### Interface Admin

1. **Panneau admin** : `/admin`
2. **Gestion utilisateurs** : `/admin/users`
3. **Gestion livres** : `/admin/books`
4. **Gestion groupes** : `/admin/groups`

### API Routes

- `GET/POST /api/annotations` - Gestion des annotations
- `POST /api/auth/[...nextauth]` - Authentification
- Plus d'endpoints à venir...

## 🎨 Design System

Lectio utilise un système de design minimal avec des variables CSS :

```css
:root {
  --lectio-white: #ffffff;
  --lectio-gray-50: #f9f9f9;
  --lectio-gray-900: #171717;
  --lectio-black: #000000;
  /* ... */
}
```

## 🔌 Intégrations

### Hypothesis.is

Synchronisation automatique des annotations avec l'API Hypothesis :

```typescript
// Configuration dans .env.local
HYPOTHESIS_API_KEY="your-api-key"

// Usage automatique lors de la création d'annotations
```

## 🐳 Docker

### Image de production

```dockerfile
# Build l'image
docker build -t lectio-app .

# Lancer le container
docker run -p 3000:3000 lectio-app
```

### Docker Compose complet

```yaml
version: '3.8'
services:
  lectio-app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:16-alpine
    # ... configuration
```

## 🚀 Déploiement sur OVH

1. **Serveur VPS/Dedicated** :
   ```bash
   # Installer Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   
   # Cloner et déployer
   git clone https://github.com/votre-username/lectio-app.git
   cd lectio-app
   docker-compose --profile production up -d
   ```

2. **Configuration Nginx** (incluse dans docker-compose)

3. **SSL Certificate** : Let's Encrypt recommandé

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- Inspiré par Glose et autres plateformes de lecture sociale
- Utilise EPUB.js et PDF.js pour les lecteurs
- Intégration Hypothesis.is pour les annotations
- Design system minimal et fonctionnel

---

**Lectio** - Une plateforme de lecture collaborative open source 📚