# Must Agence — Site Web

Site web premium pour Must Agence, agence créative spécialisée musique et marketing digital.

## Stack Technique

- **SSG** : Eleventy (11ty) v2
- **Templates** : Nunjucks (.njk)
- **CMS** : CloudCannon
- **Fonts** : Clash Display + Outfit + JetBrains Mono
- **Design** : Dark mode, accent vert fluo (#CCFF00)

## Installation Locale

```bash
npm install
npm start        # Dev server avec hot reload (http://localhost:8080)
npm run build    # Build statique dans _site/
```

## Structure du Projet

```
├── _data/                    # Données éditables (JSON)
│   ├── site.json             # Config globale, hero, vision, contact, footer
│   ├── team.json             # Membres de l'équipe
│   ├── stats.json            # Statistiques (home, artiste, entreprise)
│   ├── services_artiste.json # Services pôle artiste
│   └── services_entreprise.json # Services pôle entreprise
├── _includes/                # Templates Nunjucks
│   ├── base.njk              # Layout de base
│   ├── header.njk            # Navigation
│   ├── footer.njk            # Pied de page
│   ├── page-artiste-content.njk
│   ├── page-entreprise-content.njk
│   └── components/           # Composants réutilisables
│       ├── team-card.njk
│       ├── service-card.njk
│       ├── stats.njk
│       └── contact-form.njk
├── pages/
│   └── index.njk             # Page principale (SPA avec 3 vues)
├── src/
│   ├── css/style.css         # Styles complets
│   └── js/main.js            # JavaScript (SPA, animations, cursor)
├── .cloudcannon/             # Config CloudCannon
├── cloudcannon.config.yml    # Collections et champs éditables
├── .eleventy.js              # Config Eleventy
└── package.json
```

## Déploiement CloudCannon

1. Push le repo sur GitHub
2. Connecter le repo à CloudCannon
3. CloudCannon détecte automatiquement Eleventy et le `cloudcannon.config.yml`
4. Le client peut éditer via l'interface visuelle

## Ce que le client peut modifier

- ✅ Tous les textes (hero, services, vision, contact, footer)
- ✅ Membres de l'équipe (ajouter / modifier / supprimer)
- ✅ Services Artiste et Entreprise
- ✅ Statistiques chiffrées
- ✅ Études de cas / Portfolio
- ✅ Formulaire de contact (champs et options)
- ✅ Logos (via URL)
- ✅ Liens sociaux
- ❌ Le design, les animations et le code restent intacts
