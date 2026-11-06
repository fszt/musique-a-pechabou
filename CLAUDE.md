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

## Mise en ligne

Le site est publié par **GitHub Pages** depuis la branche `main` (racine du dépôt) : https://fszt.github.io/musique-a-pechabou/. **Tout push sur `main` met le site en ligne** en une minute environ — vérifier le rendu localement avant de pousser. Pages fonctionne en mode « legacy » (Jekyll) : les fichiers et dossiers commençant par `_` ou `.` ne sont pas publiés, ni ceux listés dans `exclude` de `_config.yml` (dont ce CLAUDE.md).

## Architecture

Site multi-pages. Chaque page est un fichier HTML complet qui partage `styles.css` et `main.js` :

| Fichier | Page |
|---|---|
| `index.html` | Accueil — hero + puce « prochain rendez-vous », aperçus compacts (cours, professeurs, association) qui renvoient vers les pages détaillées |
| `association.html` | L'association — projet, valeurs, vie de l'association |
| `cours.html` | Les cours — disciplines, jours, infos pratiques |
| `professeurs.html` | Les professeurs — vue d'ensemble, liens vers les portraits |
| `professeurs/{samuel,eddy,caroline,sam}.html` | Une page portrait par professeur (`caroline.html` : professeure de piano) |
| `affiche.html` | À l'affiche — agenda des évènements |
| `adhesion.html` | Adhésion — inscriptions, tarifs, contact |

- **CSS** — `styles.css`, feuille partagée utilisant des propriétés personnalisées CSS (design tokens définis dans `:root`). Aucun préprocesseur.
- **JS** — `main.js` : bascule du menu hamburger mobile, retrait des évènements passés (`data-fin`, voir « Mettre à jour l'agenda ») et apparition au défilement (« scroll-reveal ») via `IntersectionObserver`.
- **Polices** — chargées depuis Google Fonts (Fraunces, Work Sans, DM Mono), non hébergées localement.
- **Images** — dossier `images/` (photos des professeurs).
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

**Retrait automatique** — un évènement daté porte `data-fin="AAAA-MM-JJ"` : `main.js` le retire de la page le lendemain de cette date. Pour une date à confirmer (« Décembre 2026 »), mettre le dernier jour de la période (`2026-12-31`). Sans date (« Au fil de l'année »), ne pas mettre d'attribut. La puce `.next-chip` d'`index.html` porte le même attribut : passé l'évènement, elle disparaît plutôt que d'annoncer une date périmée — à remplacer alors par le rendez-vous suivant.

Après chaque changement de date, synchroniser les échos listés dans « Sources de vérité » (puce de l'accueil et son `data-fin`, étape 01 d'`adhesion.html`).

## Mettre à jour un professeur

Chaque professeur a sa page dans `professeurs/`. Les photos sont dans `images/` (référencées en `../images/{nom}.jpg` depuis `professeurs/`) et affichées dans `.prof-portrait` via une `<img>` recadrée en `object-fit:cover` (format 4/5). Samuel, Sam et Caroline ont leur vraie photo ; Eddy garde un monogramme (`.prof-portrait > span`) faute de photo — à remplacer par une `<img>` le jour venu.

Le lien vers un site/écoute perso est un bloc `.field` dans `.prof-facts` (ex. MySpace pour Samuel), avec `target="_blank" rel="noopener"`.

Les cartes des professeurs (monogrammes) apparaissent aussi sur `professeurs.html` (avec teaser) et sur `index.html` (nom + rôle seulement) — garder noms et rôles cohérents.

Le bas de chaque fiche (`.prof-nav`) relie les portraits en boucle « ← Précédent / Suivant → », dans l'ordre des cartes : Samuel → Eddy → Caroline → Sam → Samuel. Ajouter, retirer ou renommer un professeur impose de reprendre cette boucle sur les fiches voisines, en plus des cartes, de `cours.html` et de la navigation.

Origine des biographies : celle de Samuel a été fournie par lui-même, celle de Caroline par l'association ; celle de Sam reprend l'ancien site Wix ; celle d'Eddy est **inventée** (absent de l'ancien site) — à remplacer par ses vraies infos le moment venu.

## Avant de publier

1. La puce « Prochain rendez-vous » annonce le prochain évènement à venir, avec le bon `data-fin`.
2. Les échos de « Sources de vérité » touchés par la modification sont synchronisés.
3. Aperçu local (`python3 -m http.server 8080`) des pages modifiées, y compris en largeur mobile.
4. Commit en français (`feat: …`, `chore: …`), puis push sur `main` **seulement avec l'accord explicite de l'utilisateur** — le push met le site en ligne.

## Contenus à vérifier à chaque rentrée

- Tarifs dans `adhesion.html` (repris de l'ancien site, marqués « à confirmer »)
- Date du forum des associations et ses échos (voir « Sources de vérité »)
- Jours de cours dans `cours.html` et leur écho sur les fiches professeurs

## Langue du contenu

Tout le contenu est en français. Conserver le français pour toute nouvelle copie, tout label ou texte d'interface.
