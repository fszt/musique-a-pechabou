# CLAUDE.md

Ce fichier fournit des instructions à Claude Code (claude.ai/code) pour travailler sur le code de ce dépôt.

## Présentation du projet

Site web statique pour « Musique à Péchabou », une association musicale française (loi 1901) basée à Pechabou (31). 

Le site est entièrement autonome dans un unique fichier `index.html` — pas de système de build, pas de gestionnaire de paquets, aucune dépendance JS externe.

Pour prévisualiser le site, ouvrir `index.html` directement dans un navigateur ou le servir localement :

```sh
python3 -m http.server 8080
```

## Architecture

Tout se trouve dans `index.html` :

- **CSS** — bloc `<style>` en ligne utilisant des propriétés personnalisées CSS (design tokens définis dans `:root`). Aucun préprocesseur.
- **HTML** — cinq sections : `#asso` (association), `#agenda` (évènements), `#rejoindre` (adhésion), `#contact`, plus un header collant (« sticky ») et un footer.
- **JS** — deux petits scripts en ligne en bas de page : bascule du menu hamburger mobile et apparition au défilement (« scroll-reveal ») via `IntersectionObserver`.
- **Polices** — chargées depuis Google Fonts (Fraunces, Work Sans, DM Mono). Aucun asset local.

## Design tokens (propriétés personnalisées CSS)

| Variable | Rôle |
|---|---|
| `--ink` / `--ink-panel` | Fonds sombres (header, hero, agenda, contact) |
| `--gold` / `--gold-soft` | Accent principal — CTA, dates, mises en avant |
| `--cream` / `--cream-2` | Fonds clairs |
| `--rose` | Accent secondaire — à utiliser avec parcimonie |
| `--text-dark` / `--text-dark-soft` | Texte courant sur sections claires |
| `--text-light` / `--text-light-soft` | Texte courant sur sections sombres |

## Mettre à jour l'agenda

Les évènements sont des éléments `<article class="event reveal">` à l'intérieur de `.programme`. Chaque évènement contient :
- `.ev-date` — la date sous forme de chaîne en français
- `h3` — le titre de l'évènement (accepte `<em>` pour un accent en italique)
- `.ev-meta` — une grille à 2 colonnes de blocs `.field` avec `.label` et `.val`

La puce « Prochain rendez-vous » du hero (`.next-chip`) doit être mise à jour manuellement pour correspondre au prochain évènement à venir.

## Langue du contenu

Tout le contenu est en français. Conserver le français pour toute nouvelle copie, tout label ou texte d'interface.
