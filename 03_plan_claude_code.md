# Plan précis de développement avec Claude Code

## Méthode générale

**Analyser → Demander → Développer → Tester → Corriger → Valider → Commit Git**

Ne pas demander à Claude Code de construire tout le site en une seule fois.

## 1. Header + navigation
Créer uniquement :
- logo
- navigation
- CTA « Commander »
- menu mobile
- responsive

Valider : liens, CTA, menu mobile, absence de débordement, desktop/tablette/mobile.

```bash
git status
git add .
git commit -m "feat: ajout du header et de la navigation"
```

## 2. Hero
Créer :
- proposition de valeur
- titre
- description
- CTA principal
- CTA secondaire
- image de cocktail

Valider : lisibilité, CTA, image, responsive et absence de débordement.

```bash
git add .
git commit -m "feat: ajout de la hero section"
```

## 3. Cocktail Cards
Créer un composant réutilisable `CocktailCard` avec :
- image
- nom
- description
- ingrédients
- prix
- bouton Commander

Séparer les données de la présentation.

Valider : cohérence, images, prix, boutons et responsive.

```bash
git add .
git commit -m "feat: ajout des cartes de cocktails"
```

## 4. Formulaire contact / commande
Créer `ContactForm` avec :
- Nom
- Téléphone
- Email
- Cocktail
- Quantité
- Date
- Message
- Bouton

Prévoir les états : initial, focus, erreur, chargement, succès.

Tester formulaire vide, erreurs, formulaire valide et mobile.

```bash
git add .
git commit -m "feat: ajout du formulaire de contact"
```

## 5. Footer
Créer un composant Footer avec :
- logo
- présentation
- navigation
- cocktails
- coordonnées
- réseaux sociaux
- mentions légales
- copyright

Valider liens, coordonnées, responsive et absence de débordement.

```bash
git add .
git commit -m "feat: ajout du footer"
```

## 6. Audit global
Ne modifier aucun fichier au départ. Auditer :
- composants
- design
- responsive
- navigation
- interactions
- accessibilité
- UX
- duplication
- organisation

Classer : Critique / Important / Amélioration.

## 7. Corrections
Corriger un problème à la fois :
**Correction → Test → Validation → Commit**

## Workflow final
Cahier des charges → Design Stitch → Analyse → Header → Test → Commit → Hero → Test → Commit → Cocktail Cards → Test → Commit → Formulaire → Test → Commit → Footer → Test → Commit → Audit → Corrections → Validation finale.
