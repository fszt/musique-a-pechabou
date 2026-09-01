# CLAUDE.md

Ce fichier fournit des instructions à Claude Code (claude.ai/code) pour travailler sur le code de ce dépôt.

## Présentation du projet

Site web statique pour « Musique à Péchabou », une association musicale française (loi 1901) basée à Pechabou (31). Activité principale : cours de musique (piano, guitare acoustique, guitare électrique, basse, batterie, éveil musical). Ponctuellement : concerts de piano, Téléthon, fête de fin d'année.

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
| `index.html` | Accueil — hero + puce « prochain rendez-vous », aperçus compacts (cours, professeurs, association) qui renvoient vers les pages détaillées |
| `association.html` | L'association — projet, valeurs, vie de l'association |
| `cours.html` | Les cours — disciplines, jours, infos pratiques |
| `professeurs.html` | Les professeurs — vue d'ensemble, liens vers les portraits |
| `professeurs/{samuel,eddy,nouveau,sam}.html` | Une page portrait par professeur (`nouveau.html` : placeholder piano, poste en cours de recrutement) |
| `affiche.html` | À l'affiche — agenda des évènements |
| `adhesion.html` | Adhésion — inscriptions, tarifs, contact |

- **CSS** — `styles.css`, feuille partagée utilisant des propriétés personnalisées CSS (design tokens définis dans `:root`). Aucun préprocesseur.
- **JS** — `main.js` : bascule du menu hamburger mobile et apparition au défilement (« scroll-reveal ») via `IntersectionObserver`.
- **Polices** — chargées depuis Google Fonts (Fraunces, Work Sans, DM Mono). Aucun asset local.
- **Header/footer** — dupliqués dans chaque page : toute modification de la navigation ou du footer doit être répercutée dans **tous** les fichiers HTML. Le lien de la page courante porte `aria-current="page"`.
- **Chemins relatifs** — les pages du dossier `professeurs/` référencent les ressources avec `../` (`../styles.css`, `../main.js`, `../index.html`, etc.).

## Sources de vérité (limiter la duplication)

Chaque information volatile a **une page canonique** ; les autres pages n'en gardent qu'un écho minimal (listé ci-dessous) ou un simple lien. Ne pas réintroduire de détail dupliqué ailleurs.

| Information | Page canonique | Échos volontaires (à synchroniser) |
|---|---|---|
| Jours de cours, formats, descriptions des cours | `cours.html` (cartes avec ancres `#piano`, `#guitare-acoustique`, `#guitare-electrique-basse`, `#batterie`, `#eveil-musical`) | Champ « Jours de cours » des fiches profs |
| Dates des évènements | `affiche.html` | `.next-chip` de `index.html` ; date du forum dans l'étape 01 d'`adhesion.html` |
| Tarifs et modalités d'inscription | `adhesion.html` | aucun |
| Biographies et teasers des professeurs | pages `professeurs/*.html` (bios) et `professeurs.html` (teasers) | Cartes d'`index.html` : nom + rôle seulement, sans teaser |
| Projet et vie de l'association | `association.html` | Une phrase de résumé sur `index.html` |

L'accueil ne mentionne **ni jours, ni dates précises (hors puce), ni descriptions** : sa section cours pointe vers les ancres de `cours.html`.

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

La puce « Prochain rendez-vous » du hero de `index.html` (`.next-chip`) doit être mise à jour manuellement pour correspondre au prochain évènement à venir. La date du forum des associations apparaît aussi dans l'étape 01 d'`adhesion.html`.

## Mettre à jour un professeur

Chaque professeur a sa page dans `professeurs/`. Les photos sont dans `images/` (référencées en `../images/{nom}.jpg` depuis `professeurs/`) et affichées dans `.prof-portrait` via une `<img>` recadrée en `object-fit:cover` (format 4/5). Samuel et Sam ont leur vraie photo ; Eddy garde un monogramme (`.prof-portrait > span`) faute de photo — le remplacer par une `<img>` le jour venu.

Le lien vers un site/écoute perso est un bloc `.field` dans `.prof-facts` (ex. MySpace pour Samuel), avec `target="_blank" rel="noopener"`.

Les cartes des professeurs (monogrammes) apparaissent aussi sur `professeurs.html` (avec teaser) et sur `index.html` (nom + rôle seulement) — garder noms et rôles cohérents.

Les biographies de Samuel et Sam reprennent le contenu de l'ancien site Wix. La biographie d'Eddy est inventée (Eddy n'existait pas sur l'ancien site) — à compléter avec ses vraies infos le moment venu.

**Poste de piano vacant** — Mira (ancienne professeure de piano) a quitté l'association pour un poste au conservatoire de Castelnaudary. `professeurs/nouveau.html` est un placeholder générique (« Bientôt annoncé », monogramme `?`, pas de photo, pas de bio) en attendant la confirmation de sa remplaçante ; toutes les échos (`professeurs.html`, `index.html`, `cours.html`, navigation précédent/suivant d'`eddy.html`/`sam.html`) pointent vers ce fichier. Une fois la remplaçante confirmée, renommer `nouveau.html` avec son prénom, y ajouter photo/bio, et mettre à jour ces échos avec son vrai nom.

## Contenus à vérifier à chaque rentrée

- Tarifs dans `adhesion.html` (repris de l'ancien site, marqués « à confirmer »)
- Date du forum des associations (`affiche.html`, `.next-chip` d'`index.html`, étape 01 d'`adhesion.html`)
- Jours de cours dans `cours.html` et leur écho sur les fiches professeurs

## Langue du contenu

Tout le contenu est en français. Conserver le français pour toute nouvelle copie, tout label ou texte d'interface.
