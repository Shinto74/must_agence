# Must Agence — Site Web

Site web premium pour Must Agence, agence créative spécialisée musique et marketing digital.
Construit avec Eleventy (11ty) et prêt pour CloudCannon.

## Stack

- **SSG** : Eleventy (11ty) v2
- **Templates** : Nunjucks (.njk)
- **CMS** : CloudCannon
- **Fonts** : Clash Display + Outfit + JetBrains Mono
- **Design** : Dark mode, accent vert fluo (#CCFF00)

## Installation locale

```bash
npm install
npm start        # Dev server → http://localhost:8080
npm run build    # Build statique → _site/
```

## Structure du projet

```
├── _data/                          # Données éditables via CloudCannon
│   ├── site.json                   # Config globale, hero, vision, contact, footer, logos
│   ├── team.json                   # 4 membres de l'équipe
│   ├── artistes.json               # 19 artistes (nom + photo)
│   ├── clients.json                # 15 logos entreprises (nom + logo)
│   ├── stats.json                  # Chiffres clés (home / artiste / entreprise)
│   ├── services_artiste.json       # 6 services + 3 piliers + process + CTA
│   └── services_entreprise.json    # 6 services + 3 piliers + process + CTA
├── _includes/                      # Templates Nunjucks
│   ├── base.njk                    # Layout HTML (fonts, loader, cursor, transition)
│   ├── header.njk                  # Navigation
│   ├── footer.njk                  # Pied de page
│   ├── page-artiste-content.njk    # Contenu pôle artiste
│   ├── page-entreprise-content.njk # Contenu pôle entreprise
│   └── components/
│       ├── artist-card.njk         # Carte artiste (photo + nom)
│       ├── team-card.njk           # Carte équipe (initiales + bio)
│       ├── service-card.njk        # Carte service (titre + desc + tags)
│       ├── stats.njk               # Barre de stats animées
│       └── contact-form.njk        # Formulaire de contact
├── pages/
│   └── index.njk                   # Page principale (SPA 3 vues)
├── src/
│   ├── css/style.css               # Styles complets
│   ├── js/main.js                  # JS (SPA, animations, cursor)
│   └── assets/images/
│       ├── logos/                   # logo_blanc.png + logo_vert.png
│       ├── artistes/               # 19 photos d'artistes
│       └── clients/                # 15 logos entreprises
├── .cloudcannon/
│   ├── initial-site-settings.json
│   └── schemas/page.njk
├── cloudcannon.config.yml          # 8 collections configurées
├── .eleventy.js
└── package.json
```

## Déploiement CloudCannon

1. Push sur GitHub
2. Connecter le repo à CloudCannon
3. CloudCannon détecte Eleventy + `cloudcannon.config.yml`
4. Le client édite via l'interface visuelle

## Ce que le client peut faire seul (sans code)

| Action | Collection CloudCannon |
|--------|----------------------|
| Modifier les textes (hero, vision, CTA...) | Paramètres du site |
| Changer les logos Must Agence | Paramètres du site |
| Ajouter / supprimer un artiste | Artistes |
| Remplacer une photo d'artiste | Artistes |
| Ajouter / supprimer un logo client | Clients / Logos |
| Modifier l'équipe | Équipe |
| Modifier les services (Artiste ou Entreprise) | Services Artiste / Entreprise |
| Modifier les statistiques | Statistiques |
| Modifier le formulaire de contact | Paramètres du site |
| Modifier les réseaux sociaux | Paramètres du site |

## Assets

- **36 images** hébergées dans le projet (pas de CDN externe)
- Toutes remplaçables via drag-and-drop dans CloudCannon
- Les uploads atterrissent dans `src/assets/images/uploads/`
