# 01_cahier_des_charges.md

# WEBNEXT ACADEMY — Cahier des charges
## Projet : Site vitrine de vente de cocktails

### Projet
Créer un site vitrine professionnel pour une activité de vente de cocktails.

### Objectif
Présenter l’entreprise, ses cocktails et faciliter la prise de commande ou de contact.

### Utilisateurs
- Visiteurs
- Clients
- Organisateurs d’événements

### Fonctionnalités
- Accueil
- Présentation de l’entreprise
- Cocktails avec photos, descriptions, ingrédients et prix
- Témoignages
- Contact
- Demande de commande
- CTA « Commander »

### Contraintes
- Design moderne et élégant
- Responsive desktop/tablette/mobile
- Navigation claire
- Orientation conversion
- Accessibilité
- Composants réutilisables
- Préparé pour Next.js et Claude Code

### Données
- Informations de l’entreprise
- Cocktails
- Prix
- Ingrédients
- Images
- Témoignages
- Coordonnées
- Informations de commande


---

# 02_prompt_google_stitch.md

# Prompt Google Stitch — Site vitrine de cocktails

Je souhaite concevoir l’interface complète d’un site vitrine professionnel pour une entreprise spécialisée dans la vente de cocktails.

## Objectif
Présenter clairement l’entreprise, mettre en valeur ses cocktails et encourager les visiteurs à commander ou à prendre contact.

## Structure
### Accueil
- Header et navigation
- Hero
- Proposition de valeur
- CTA « Commander maintenant »
- CTA « Découvrir nos cocktails »
- Présentation de l’entreprise
- Cocktails populaires
- Pourquoi nous choisir
- Témoignages
- CTA final
- Footer

### Cocktails
Chaque carte affiche :
- Photo
- Nom
- Description
- Ingrédients
- Prix
- Bouton « Commander »

### À propos
- Histoire
- Savoir-faire
- Qualité des ingrédients
- Engagements
- Philosophie

### Contact / Commande
- Nom
- Téléphone
- Email
- Cocktail souhaité
- Quantité
- Date souhaitée
- Message
- Bouton d’envoi

## Design
Moderne, élégant, premium, frais et visuel. Mettre fortement les cocktails en valeur.

## UX / Conversion
Parcours : Découvrir → Explorer → Choisir → Commander / Contacter.

## Responsive
Desktop, tablette et mobile. Expérience mobile particulièrement soignée.

## Accessibilité
Contrastes suffisants, textes lisibles, boutons accessibles, focus visible, hiérarchie des titres et textes alternatifs.

## Composants
Header, Navigation, Button, Hero, SectionTitle, CocktailCard, CocktailGrid, AboutSection, TestimonialCard, Testimonials, ContactForm, CTASection, Footer.

## Méthode
1. Structure
2. Direction artistique
3. Accueil
4. Composants
5. Pages secondaires
6. Responsive
7. Interactions
8. Améliorations
9. Vérification

Le résultat doit être prêt à être développé avec Next.js et Claude Code.


---

# 03_plan_claude_code.md

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


---

# 04_prompt_header.md

# Claude Code — Header et navigation

Analyse la structure actuelle du projet sans modifier de fichier.

Développe uniquement le Header et la navigation d’un site vitrine de vente de cocktails avec Next.js.

Le Header doit contenir :
- logo
- Accueil
- Cocktails
- À propos
- Contact
- CTA « Commander »
- navigation responsive
- menu mobile

Créer des composants propres et réutilisables. Ne développer aucune autre section.


---

# 05_prompt_hero.md

# Claude Code — Hero Section

Le Header et la navigation sont validés.

Ajoute uniquement la Hero Section :
- proposition de valeur
- titre principal
- description
- bouton « Commander maintenant »
- bouton « Découvrir nos cocktails »
- image de cocktail

Respecter la direction artistique et le responsive desktop/tablette/mobile.

Ne pas modifier le Header.


---

# 06_prompt_cocktail_cards.md

# Claude Code — Cocktail Cards

Le Header et la Hero sont validés.

Créer un composant réutilisable `CocktailCard` avec :
- image
- nom
- description
- ingrédients principaux
- prix
- bouton « Commander »

Créer une structure permettant plusieurs cartes et séparer les données de la présentation.

Ne pas modifier les fonctionnalités déjà validées.


---

# 07_prompt_contact.md

# Claude Code — Formulaire de contact / commande

Créer un composant `ContactForm` avec :
- Nom
- Téléphone
- Email
- Cocktail souhaité
- Quantité
- Date souhaitée
- Message
- Bouton d’envoi

Prévoir les états initial, focus, erreur, chargement et succès.

Valider les champs.

Ne pas connecter encore le formulaire à une base de données ou un service externe.


---

# 08_prompt_footer.md

# Claude Code — Footer

Créer uniquement le Footer avec :
- logo
- courte présentation
- navigation
- liens vers les cocktails
- coordonnées
- réseaux sociaux
- mentions légales
- copyright

Créer un composant Footer réutilisable et cohérent avec le Header.

Ne pas modifier les sections déjà validées.


---

# 09_audit_final.md

# Audit final — Cocktail House

Le site contient :
- Header
- Navigation
- Hero Section
- Cocktail Cards
- Formulaire de contact
- Footer

Effectuer un audit sans modifier aucun fichier.

Analyser :
- structure des composants
- cohérence du design
- responsive
- navigation
- interactions
- accessibilité
- UX
- duplication de code
- organisation

Classer les problèmes :
1. Critique
2. Important
3. Amélioration

Attendre la validation avant toute modification.

Après validation : corriger un problème à la fois, tester, valider et créer un commit après chaque correction.
