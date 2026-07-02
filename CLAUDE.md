# CLAUDE.md

Ce fichier fournit des instructions à Claude Code (claude.ai/code) pour travailler sur le code de ce dépôt.

## Présentation du projet

Site web statique pour « Musique à Péchabou », une association musicale française (loi 1901) basée à Pechabou (31). Activité principale : cours de musique (piano, guitare classique et flamenco, guitare électrique, basse, batterie, éveil musical). Ponctuellement : concerts de piano, Téléthon, fête de fin d'année.

Le site respecte l'état de l'art d'un site web statique. Il est entièrement autonome :

- pas de système de build
- pas de gestionnaire de paquets
- aucune dépendance JS externe

Pour prévisualiser le site, ouvrir `index.html` directement dans un navigateur ou le servir localement :

```sh
python3 -m http.server 8080
```

## Architecture

Site multi-pages. Chaque page est un fichier HTML complet qui partage `styles.css` et `main.js` :

| Fichier | Page |
|---|---|
| `index.html` | Accueil — hero, aperçu des cours, des professeurs et de l'association |
| `association.html` | L'association — projet, valeurs, vie de l'association |
| `cours.html` | Les cours — disciplines, jours, infos pratiques |
| `professeurs.html` | Les professeurs — vue d'ensemble, liens vers les portraits |
| `professeurs/{samuel,eddy,mira,sam}.html` | Une page portrait par professeur |
| `affiche.html` | À l'affiche — agenda des évènements |
| `adhesion.html` | Adhésion — inscriptions, tarifs, contact |

- **CSS** — `styles.css`, feuille partagée utilisant des propriétés personnalisées CSS (design tokens définis dans `:root`). Aucun préprocesseur.
- **JS** — `main.js` : bascule du menu hamburger mobile et apparition au défilement (« scroll-reveal ») via `IntersectionObserver`.
- **Polices** — chargées depuis Google Fonts (Fraunces, Work Sans, DM Mono). Aucun asset local.
- **Header/footer** — dupliqués dans chaque page : toute modification de la navigation ou du footer doit être répercutée dans **tous** les fichiers HTML. Le lien de la page courante porte `aria-current="page"`.
- **Chemins relatifs** — les pages du dossier `professeurs/` référencent les ressources avec `../` (`../styles.css`, `../main.js`, `../index.html`, etc.).

## Design tokens (propriétés personnalisées CSS)

| Variable | Rôle |
|---|---|
| `--ink` / `--ink-panel` | Fonds sombres (header, hero, sections `.dark`, contact) |
| `--gold` / `--gold-soft` | Accent principal — CTA, dates, mises en avant |
| `--cream` / `--cream-2` | Fonds clairs |
| `--rose` | Accent secondaire — à utiliser avec parcimonie |
| `--text-dark` / `--text-dark-soft` | Texte courant sur sections claires (`.light`) |
| `--text-light` / `--text-light-soft` | Texte courant sur sections sombres (`.dark`) |

## Mettre à jour l'agenda

Les évènements sont dans `affiche.html` : des éléments `<article class="event reveal">` à l'intérieur de `.programme`. Chaque évènement contient :
- `.ev-date` — la date sous forme de chaîne en français ; ajouter `<span class="tbc">…</span>` pour une date à confirmer
- `h3` — le titre de l'évènement (accepte `<em>` pour un accent en italique)
- `.ev-meta` — une grille à 2 colonnes de blocs `.field` avec `.label` et `.val`

La puce « Prochain rendez-vous » du hero de `index.html` (`.next-chip`) doit être mise à jour manuellement pour correspondre au prochain évènement à venir.

## Mettre à jour un professeur

Chaque professeur a sa page dans `professeurs/`. La photo est pour l'instant un monogramme (`.prof-portrait > span`) : le remplacer par une `<img>` quand une photo sera disponible. Les cartes des professeurs apparaissent aussi sur `index.html` et `professeurs.html` — garder les trois endroits cohérents.

La biographie d'Eddy est à compléter (voir le TODO dans `professeurs/eddy.html`).

## Contenus à vérifier à chaque rentrée

- Tarifs dans `adhesion.html` (repris de l'ancien site, marqués « à confirmer »)
- Date du forum des associations (`affiche.html`, `index.html`)
- Jours de cours dans `cours.html` et les pages professeurs

## Langue du contenu

Tout le contenu est en français. Conserver le français pour toute nouvelle copie, tout label ou texte d'interface.
