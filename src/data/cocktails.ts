export interface Cocktail {
  id: string;
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
  price: number;
  image: string;
  category: 'Signature' | 'Classique' | 'Fraîcheur';
  isPopular?: boolean;
}

export const COCKTAILS: Cocktail[] = [
  {
    id: 'old-fashioned',
    name: 'Le Smoking Old Fashioned',
    tagline: 'Fumé & Boisé',
    description: 'Bourbon haut de gamme affiné, réduction de sirop d’érable au feu de bois, bitter aromatic et essence d’orange flammée.',
    ingredients: ['Bourbon Réserve', 'Sirop d’érable fumé', 'Angostura Bitters', 'Zeste d’orange flammé'],
    price: 15,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    category: 'Signature',
    isPopular: true,
  },
  {
    id: 'passion-velvet',
    name: 'Le Velvet Passion',
    tagline: 'Exotique & Onctueux',
    description: 'Vodka infusée à la vanille bourbon de Madagascar, coulis de maracuja frais, liqueur artisanale et son shot de Prosecco millésimé.',
    ingredients: ['Vodka Vanille', 'Fruits de la passion frais', 'Liqueur de vanille', 'Prosecco DOC'],
    price: 14,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    category: 'Signature',
    isPopular: true,
  },
  {
    id: 'emerald-basil',
    name: 'L’Émeraude Basil Smash',
    tagline: 'Herbacé & Acidulé',
    description: 'London Dry Gin botanic, basilic génois fraîchement écrasé au pilon, jus de citron jaune bio et sirop de sucre de canne pur.',
    ingredients: ['Gin Botanique', 'Basilic frais du potager', 'Citron jaune pressé', 'Sirop de canne'],
    price: 13,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
    category: 'Fraîcheur',
  },
  {
    id: 'espresso-imperial',
    name: 'L’Espresso Martini Impérial',
    tagline: 'Intense & Torréfié',
    description: 'Une alliance onctueuse de vodka triple distillation, liqueur de café d’Éthiopie et extraction d’espresso fraîche surmontée de fève tonka râpée.',
    ingredients: ['Vodka Craft', 'Espresso bio fraîchement extrait', 'Kahlúa & Tonka', 'Grains de café torréfiés'],
    price: 14,
    image: 'https://images.unsplash.com/photo-1545438102-799c3991ffb2?auto=format&fit=crop&w=800&q=80',
    category: 'Classique',
    isPopular: true,
  },
  {
    id: 'hibiscus-paloma',
    name: 'Le Hibiscus Paloma Rosé',
    tagline: 'Solaire & Pétillant',
    description: 'Tequila 100% agave bleue, réduction florale d’hibiscus rouge, nectar de pamplemousse rose de Corse et liseré de sel noir d’Hawaï.',
    ingredients: ['Tequila 100% Agave', 'Infusion d’hibiscus', 'Soda pamplemousse rose', 'Sel noir volcanique'],
    price: 13,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    category: 'Fraîcheur',
  },
  {
    id: 'gold-negroni',
    name: 'Le Negroni Solaire 24K',
    tagline: 'Amer & Complexe',
    description: 'Gin distillé aux baies sauvages, vermouth rouge carpano antico, Campari premium vieilli et feuille d’or comestible 24 carats.',
    ingredients: ['Gin Baies Sauvages', 'Campari Bitter', 'Vermouth Rouge Réserve', 'Feuille d’or 24K'],
    price: 16,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
    category: 'Classique',
  },
];
